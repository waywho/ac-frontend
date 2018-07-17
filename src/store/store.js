import Vue from 'vue';
import Vuex from 'vuex';
import firebaseApp from '@/firebase/init';
import firebaseAxios from '@/axios/axios-firebase.js';
import router from '../router';
import cryptoRandomstring from 'crypto-random-string';
const cryptoRandomString = require('crypto-random-string');
import oppAxios from '@/axios/axios-opportunities.js';
import axios from 'axios';
import _ from 'lodash';
import content from './modules/content';
import season from './modules/season';

Vue.use(Vuex);

export const store = new Vuex.Store({
	strict: false,
	mutations: {
		authUser (state, userData) {
			state.idToken = userData.idToken;
			state.userId = userData.userId;
			state.userEmail = userData.userEmail;
			state.expires = userData.expires;
		},
		setCurrentUserProfile (state, payload) {
			// console.log('setCurrentUserProfile state', payload)
			state.currentUserProfile = payload;
		},
		clearAuthData (state) {
			state.idToken = null;
			state.userId = null;
			state.currentUserProfile = {};
			state.currentUserTools = null;
			state.userEmail = null;
			state.expires = null;
		},
		setToken (state, payload) {
			state.idToken = payload.idToken;
			state.expires = payload.expires;
		},
		setUserTools (state, payload) {
			state.currentUserTools = payload;
		},
		setExpirationDate(state, date) {
			state.expires = date;
		},
		setMessage(state, payload) {
			state.message = payload.message;
			state.messageType = payload.messageType;
		},
		clearMessage(state) {
			state.message = null;
			state.messageType = null;
		},
		setUserPosts (state, payload) {
			state.posts = payload;
		},
		addCalendarDate(state, payload) {
			state.currentUserTools.calendar.push(payload.event)
		}
	},
	actions: {
		clearingMessage({commit}) {
			commit('clearMessage')
		},
		setLocalStorage({state}) {
			// console.log('setting Session')
			let localData = {
				idToken: state.idToken, 
				userId: state.userId, 
				userEmail: state.userEmail, 
				expires: state.expires, 
				currentUserProfile: state.currentUserProfile,
				currentUserTools: state.currentUserTools
			}
			localStorage.setItem('artistCenter', JSON.stringify(localData))
		},
		resetToken({commit, dispatch}) {
			return new Promise((resolve, reject) => {
				firebaseApp.auth().onAuthStateChanged(function(user) {
					if (user) {				
						user.getIdToken(true).then(idToken => {
							const now = new Date()
							const expirationDate = new Date(now.getTime() + 3600 * 1000)
							
							commit('setToken', {'idToken': idToken, 'expires': expirationDate})
							dispatch('setLocalStorage')
							resolve()
						})
					} else {
						reject("not signed in")
					}
				})
			})
		},
		reAuthorizeUser({commit, dispatch, state}, idToken) {
			return new Promise((resolve, reject) => {

				firebaseApp.auth().onAuthStateChanged(function(user) {
					if (user) {
						console.log('reauthorized user')					
						user.getIdToken(true).then(idToken => {
							// console.log('authstate', user)
							const now = new Date()
							const expirationDate = new Date(now.getTime() + 3600 * 1000)
							resolve({idToken: idToken, expires: expirationDate})
						}).catch(error => {
							console.log(error)
							commit('setMessage', {
								message: error.message,
								messageType: 'warning'
							});
							reject(error)
						})
					} else {
						dispatch('signOut').then(() => {
							router.replace("/")
						})
						reject('signOut')
						return 
					}

				})
			})
		},
		signUserUp({commit, dispatch}, payload) {
			return new Promise((resolve, reject) => {

				firebaseApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
					.then(cred => {
						// console.log('sign up', user)
						cred.user.getIdToken(true).then(idToken => {
							// console.log('token', idToken)
							// set token expiry at 24 hours from now
							const now = new Date()
							const expirationDate = new Date(now.getTime() + 3600 * 1000)

							const newUser = {
								userId: cred.user.uid,
								idToken: idToken,
								userEmail: cred.user.email,
								expires: expirationDate
							}
							dispatch('createUser', {idToken: idToken, user: {id: cred.user.uid, email: cred.user.email, consent: payload.consent}}).then(() => {
								commit('authUser', newUser);
								commit('setMessage', {
									message: 'Signed Up Successfully',
									messageType: 'success'
								});
								dispatch('sendVerificationEmail')
								resolve(idToken)
							})

						})
					}).catch(
						error => {
							// console.log(error)
							commit('setMessage', {
								message: error.message,
								messageType: 'warning'
							});
							reject(error)
						}
					)				
			}) 

		},
		sendVerificationEmail({commit, dispatch}, payload) {
			var user = firebaseApp.auth().currentUser;

			return new Promise((resolve, reject) => {
				user.sendEmailVerification().then(() => {
					commit('setMessage', {
						message: "A verification email is sent to your email address, please verify your email",
						messageType: "notice"
					})

					resolve()
				}).catch((error) => {
					console.log(error)
					commit('setMessage', {
						message: error.message,
						messageType: 'warning'
					});
					reject(error)
				})
			}) 

		},
		resetPasswordEmail({commit, dispatch, state}, payload) {
			var auth = firebaseApp.auth()
			return new Promise((resolve, reject) => {
				auth.sendPasswordResetEmail(payload.email).then(() => {
					commit('setMessage', {
						message: "A reset password email is sent to your email address, please check your email",
						messageType: "notice"
					})
					resolve()
				}).catch(error => {
					console.log(error)
					commit('setMessage', {
						message: error.message,
						messageType: "warning"
					})
					reject(error)
				})
			})
	
		},
		signUserIn({commit, dispatch}, payload) {
			return new Promise((resolve, reject) => {
				firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
					.then(cred => {
						// console.log('current user', firebaseApp.auth().currentUser)
						// console.log('sign in', cred.user)
						cred.user.getIdToken(true).then(idToken => {
							// console.log('signed in token', idToken)
							// set token expiry at 24 hours from now
							const now = new Date()
							const expirationDate = new Date(now.getTime() + 3600 * 1000)
							// console.log('got idToken', idToken)
							const newUser = {
								idToken: idToken,
								userId: cred.user.uid,
								userEmail: cred.user.email,
								expires: expirationDate
							}

							
														
							Promise.all([dispatch('getUserProfile', newUser), dispatch('getUserTools', newUser)])
								.then(res => {
									commit('authUser', newUser);
									dispatch('setLocalStorage');
									resolve(cred.user)
								})						
						})
					})
					.catch(error => {
						console.log(error)
						commit('setMessage', {
								message: error.message,
								messageType: 'warning'
						})
						reject(error)
					})
				
			}) 			
		},
		signOut({commit}) {
			return new Promise((resolve, reject) => {
				console.log('signout')
					firebaseApp.auth().signOut().then(() => {
					commit('clearAuthData')
					localStorage.removeItem('artistCenter')
					resolve()
				})
			})
		},
		tryAutoSignIn2({commit, dispatch}) {
			if(firebaseApp.auth().currentUser) {

			}
			// firebaseApp.auth().onAuthStateChanged
		},
		tryAutoSignIn({commit, dispatch}) {
			if (!localStorage.getItem('artistCenter')) {
				dispatch('signOut').then(() => {
					router.replace("/")
				})
				return
			}
			const localData = JSON.parse(localStorage.getItem('artistCenter'))
			const expirationDate = new Date(localData.expires)
			let authData = {}
			// console.log('session expires', expirationDate)
			const now = new Date()

			if(now >= expirationDate) {
				dispatch('reAuthorizeUser')
					.then(res => {
						authData.userId = localData.userId
						authData.idToken = res.idToken
						authData.userEmail = localData.userEmail
						authData.expires = res.expires

						commit('authUser', authData);
						commit('setCurrentUserProfile', localData.currentUserProfile)
						// console.log('current user tools from session', localData.currentUserTools)
						commit('setUserTools', localData.currentUserTools)
						dispatch('setLocalStorage')
					})
			} else {
				authData.userId = localData.userId
				authData.idToken = localData.idToken
				authData.userEmail = localData.userEmail
				authData.expires = localData.expires
				commit('authUser', authData);
				commit('setCurrentUserProfile', localData.currentUserProfile)
				// console.log('current user tools from session', localData.currentUserTools)
				commit('setUserTools', localData.currentUserTools)
				dispatch('setLocalStorage')
			}
		},
		createUser({commit, dispatch, state}, payload) {
			// console.log('creating user', payload)
			var notificationKey = firebaseApp.database().ref('notifications').child(payload.user.id).push().key
			payload.user.timestamp = Date.now()
			let user = {
				['/profiles/' + payload.user.id]: payload.user,
				['/users/' + payload.user.id]: payload.user,
				['/notifications/' + payload.user.id + '/' + notificationKey]: {action: "profile created", "created": Date.now(), name: "Artist Center", image: "https://firebasestorage.googleapis.com/v0/b/artist-center-production.appspot.com/o/users%2Fj0uKacM5oJNkemmn81Cqu5KWhPz1%2Fj0uKacM5oJNkemmn81Cqu5KWhPz1avatar.png?alt=media&token=a45188cb-5099-4bf8-852e-6ff159eb647f"},
			}

			return new Promise((resolve, reject) => {
				firebaseApp.database().ref().update(user, error => {
					if(error) {
						console.log(error)
						commit('setMessage', {
							message: error.message,
							messageType: 'warning'
						});
						reject(error)
					} else {
						dispatch('getUserProfileOnce', {userId: payload.user.id}).then(res => {
							resolve(res)
						})
					}
				})
			})

		},
		updateUserProfile({commit, dispatch, state}, payload) {
			if(!state.idToken) {
				return
			}
			// console.log(payload)
			// format {userId: 'id', data: {'data'}}
			let dataKey = Object.keys(payload.data)[0]

			switch (dataKey) {
				case 'type':
					var data = {
							['profiles/' + payload.userId + '/' + dataKey]: payload.data[dataKey],
							['users/' + payload.userId + '/' + dataKey]:  payload.data[dataKey],
					}
					break;
				case 'details':
					var data = {
						['profiles/' + payload.userId + '/' + dataKey]: payload.data[dataKey],
						['users/' + payload.userId + '/name']: payload.data.details.name,
						['users/' + payload.userId + '/firstName']: payload.data.details.name.toLowerCase().slice(0, payload.data.details.name.lastIndexOf(" ")).trim(),
						['users/' + payload.userId + '/lastName']: payload.data.details.name.toLowerCase().split(" ").pop().trim(),
						['users/' + payload.userId + '/city']: payload.data.details.city,
						['users/' + payload.userId + '/country']: payload.data.details.country,
						['users/' + payload.userId + '/role']: payload.data.details.role
					}

					dispatch('sendWelcomeMessage', {user: {id: payload.userId, name: payload.data.details.name}})

					break;
				default: 
					var data = {['profiles' + '/' + payload.userId + '/' + dataKey]: payload.data[dataKey]}
			}

			return new Promise((resolve, reject) => {
				firebaseAxios.patch('.json' + '?auth=' + state.idToken, data)
					.then(res => {
						// console.log(res)
						dispatch('getUserProfileOnce', {userId: payload.userId})
						commit('setMessage', {
							message: 'Profile updated successfully',
							messageType: 'success'
						});
						resolve(res)
					}).catch(error => {
						console.log(error)
						commit('setMessage', {
							message: error.message,
							messageType: 'warning'
						});
						reject(error);
					})
			})



			// console.log(payload.data)
			// firebaseApp.database().ref('profiles/' + payload.userId).update(payload.data)
			// 	.then(
			// 		function(data) {
			// 			// console.log(data)
			// 			dispatch('getUserProfile', {id: payload.userId})
			// 		}
			// 	).catch(
			// 		error => 
			// 		console.log(error)
			// 	)
		},
		sendWelcomeMessage({commit, dispatch, state}, payload) {
			// auto send a welcome message
					var databaseRef = firebaseApp.database().ref();
					let chatKey = databaseRef.child("chatMemberships").push().key;
					let chatData = {['chats/' + payload.user.id + "/" + chatKey ]: {
			  				'chatee': {
			  					name: "Artist Center",
			  					avatarURL: "https://firebasestorage.googleapis.com/v0/b/artist-center-production.appspot.com/o/users%2Fj0uKacM5oJNkemmn81Cqu5KWhPz1%2Fj0uKacM5oJNkemmn81Cqu5KWhPz1avatar.png?alt=media&token=a45188cb-5099-4bf8-852e-6ff159eb647f"
			  				},
							lastMessage: `Hello ${payload.user.name}, welcome to Artist Center! Please make yourself at home and explore!`,
							sender: "Artist Center",
							timestamp: Date.now()
							},
							['chats/' + "j0uKacM5oJNkemmn81Cqu5KWhPz1" + "/" + chatKey ]: {
								'chatee': {
				  					name: payload.user.name,
				  					avatarURL: null
				  				},
							lastMessage: `Hello ${payload.user.name}, welcome to Artist Center! Please make yourself at home and explore!`,
							sender: "Artist Center",
							timestamp: Date.now()
							}
						}
						chatData['chatMemberships/' + chatKey] = { 
  							[payload.user.id]: true,
  							"j0uKacM5oJNkemmn81Cqu5KWhPz1": true
  						}
  					var newThread = {
						content: `Hello ${payload.user.name}, welcome to Artist Center! Please make yourself at home and explore!`,
						sender: payload.user.name,
						timestamp: Date.now()
					}
  					databaseRef.update(chatData, error => {
		  				if(error) {
		  					console.log(error)
		  					commit('setMessage', {
								message: error.message,
								messageType: 'warning'
							});
		  				} else {
		  					firebaseApp.database().ref("threads").child(chatKey).push().update(newThread, error => {
		  						if(error) {
		  							console.log(error)
		  							commit('setMessage', {
										message: error.message,
										messageType: 'warning'
									});
		  						}
		  					})
		  					
		  				}
		  			})
		},
		getUserProfileOnce({commit, dispatch, state}, payload) {
			return new Promise((resolve, reject) => {
				firebaseApp.database().ref("/profiles/" + payload.userId).once('value', snapshot => {
					// console.log(snapshot.val())
					commit('setCurrentUserProfile', snapshot.val())
					dispatch('setLocalStorage');
					resolve(snapshot.val())
				})
								
			}).catch(error => {
				console.log(error);
				commit('setMessage', {
					message: error.message,
					messageType: 'warning'
				});
				reject(error);
			})

		},
		getUserProfile({commit, dispatch, state}, payload) {
			return new Promise((resolve, reject) => {
				firebaseApp.database().ref("/profiles/" + payload.userId).on('value', snapshot => {
					// console.log(snapshot.val())
					commit('setCurrentUserProfile', snapshot.val())
					dispatch('setLocalStorage');
					resolve(snapshot.val())
				})
								
			}).catch(error => {
				console.log(error);
				commit('setMessage', {
					message: error.message,
					messageType: 'warning'
				});
				reject(error);
			})

		},
		saveProfileImages({commit, dispatch, state}, payload) {
			// console.log(payload)
			const filename = Object.keys(payload.data)[0]
			// console.log(filename)
			const imageName = payload.data[filename].name
			const ext = imageName.slice(imageName.lastIndexOf('.'))
			// console.log(ext)
			// payload.data['auth'] = state.idToken
			return new Promise((resolve, reject) => {
				var uploadImageTask = firebaseApp.storage().ref('users').child(payload.userId + '/' + payload.userId + filename + ext).put(payload.data[filename])
					.then( fileData => {
						// console.log(fileData)
						fileData.ref.getDownloadURL().then(downloadURL => {
							// console.log(downloadURL)
							let imageURL = downloadURL
							var userImage
							if(filename === 'avatar') {
								userImage = {
									['profiles/' + payload.userId + '/' + filename + 'URL']: imageURL,
									['users/' + payload.userId + '/' + filename + 'URL']: imageURL,
								}
							} else {
								userImage = { ['profiles' + '/' + payload.userId + '/' + filename + 'URL']: imageURL }
							}

							firebaseAxios.patch('.json' + '?auth=' + state.idToken, userImage)
								.then(res => {
									// console.log('imageURL', res)
									dispatch('getUserProfileOnce', {'userId': state.userId})
									return resolve({
										key: filename + 'URL',
										path: imageURL})
								}).catch(error => {
									console.log(error)
									commit('setMessage', {
										message: error.message,
										messageType: 'warning'
									});
								 	return reject(error)
								})
						})
					}).catch(error => {
						console.log(error)
						commit('setMessage', {
							message: error.message,
							messageType: 'warning'
						});
						return reject(error)
					})
			})
		},
		saveMediaImage({commit, dispatch, state}, payload) {
			// console.log(payload)
			const filename = Object.keys(payload.data)[0]
			// console.log(filename)
			const imageName = payload.data[filename].name
			const ext = imageName.slice(imageName.lastIndexOf('.'))

			return new Promise((resolve, reject) => {
				firebaseApp.storage().ref('users').child(payload.userId + "/gallery/" + payload.userId + filename + ext ).put(payload.data[filename])
					.then(fileData => {
						fileData.ref.getDownloadURL().then(downloadURL => {
							let mediaData = {
								host: "Image Gallery",
								source: downloadURL,
								type: "image"
							}

							firebaseApp.database().ref("toolsAuthorized").child(payload.userId).child("medias").push(mediaData)
							firebaseApp.database().ref("toolsPublic").child(payload.userId).child("medias").push(mediaData)
							dispatch('getUserTools', {userId: payload.userId})
							resolve()
						}).catch(error => {
							console.log(error)
							commit('setMessage', {
								message: error.message,
								messageType: 'warning'
							});
						})
					})
			})

		},
		updateUserMedia({commit, dispatch, state}, payload) {
			return new Promise((resolve, reject) => {
				var mediaKey
				if(payload.delete) {
					mediaKey = payload.mediaKey
				} else {
					var toolAuthRef = firebaseApp.database().ref("toolsAuthorized").child(state.userId).child("medias")
					var mediaKey = toolAuthRef.push().key
				}
				
				var mediaUpdate = {
					["toolsAuthorized/" + state.userId + "/medias/" + mediaKey ]: payload.data,
					["toolsPublic/" + state.userId + "/medias/" + mediaKey ]: payload.data
				}

			
				firebaseApp.database().ref().update(mediaUpdate)
				.then(res => {
					dispatch('getUserTools', {userId: state.userId})
					resolve({key: mediaKey})
				}).catch(error => {
					console.log(error)
					commit('setMessage', {
						message: error.message,
						messageType: 'warning'
					});
					reject(error)
				})				
			})

		},
		createUserTools({commit, dispatch, state}, payload) {
			if(!state.idToken) {
				return
			}
			// console.log(payload)
			return new Promise((resolve, reject) => {
				firebaseAxios.put('/tools/' + payload.userId + '.json' + '?auth=' + state.idToken, payload.data)
					.then(res => {
						// console.log('create tools', res)
						dispatch('getUserTools', {userId: payload.userId})
						resolve(res)
					}).catch(error => {
						console.log(error)
						commit('setMessage', {
							message: error.message,
							messageType: 'warning'
						});
						reject(error)
					})				
			})

		},
		updateUserTools({commit, dispatch, state}, payload) {
			if(!state.idToken) {
				return
			}
			// console.log(payload)
			// format (userId: 'id', "toolName: 'settings': {}, 'calendar': [], 'portfolio': {}," 'media': [], 'messages')
			// tools private vs tools public
			var dataKey = Object.keys(payload.data)[0]

			switch (payload.toolName) {
				case 'settings':
					var toolData = {
						['toolsAuthorized/' + payload.userId + '/' + payload.toolName + '/' + dataKey]: payload.data[dataKey]
					}
				break;
				case 'messages':
					var toolData = {
						['toolsAuthorized/' + payload.userId + '/' + payload.toolName + '/' + dataKey]: payload.data[dataKey]
					}
				break;
				case 'calendar':
					// over-write complete calendar node
					var toolData = {
						['toolsPublic/' + payload.userId + '/' + payload.toolName]: payload.data,
						['toolsAuthorized/' + payload.userId + '/' + payload.toolName]: payload.data
					}
				break;
				case 'medias':
					// over-write complete calendar node
					var toolData = {
						['toolsPublic/' + payload.userId + '/' + payload.toolName]: payload.data,
						['toolsAuthorized/' + payload.userId + '/' + payload.toolName]: payload.data
					}
				break;
				default:
					var toolData = {
						['toolsPublic/' + payload.userId + '/' + payload.toolName + '/' + dataKey]: payload.data[dataKey],
						['toolsAuthorized/' + payload.userId + '/' + payload.toolName + '/' + dataKey]: payload.data[dataKey]
					}
			}
			

			return new Promise((resolve, reject) => {
				firebaseAxios.patch('.json' + '?auth=' + state.idToken, toolData)
					.then(res => {
						// console.log('updated tools', res)
						commit('setMessage', {
							message: 'Updated successfully',
							messageType: 'success'
						});
						dispatch('getUserTools', {userId: payload.userId})
						resolve(res)
					}).catch(error => {
						console.log(error)
						commit('setMessage', {
							message: error.message,
							messageType: 'warning'
						});
						reject(error)
					})				
			})


			// firebaseApp.database().ref('tools/' + payload.userId).child(payload.toolName).update(payload.data)
			// 	.then(
			// 		function(data) {
			// 			// console.log(data)
			// 			dispatch('getUserTools', {id: payload.userId})
			// 		}
			// 	).catch(
			// 		error => 
			// 		console.log(error)
					// commit('setMessage', {
					// 	message: error.message,
					// 	messageType: 'warning'
					// });
			// 	)
		},
		getUserTools({commit, dispatch, state}, payload) {
			// getUserTools public vs get Tools private
			// console.log('state idToken getUserTools', state.idToken)
			// console.log('disptaching getUserTools', state.idToken)
			// let token = state.idToken
			// console.log(token)

			return new Promise((resolve, reject) => {
				firebaseApp.database().ref('toolsAuthorized/' + payload.userId).on('value', snapshot => {
					// console.log('changed!', snapshot.val());

					commit('setUserTools', snapshot.val())
					dispatch('setLocalStorage')
					resolve(snapshot.val())
				})
			}).catch(error => {
					console.log(error)
					commit('setMessage', {
						message: error.message,
						messageType: 'warning'
					});
					reject(error)
			})
		},
		requestConnections({commit, state}, payload) {
			// user1 makes request to user2 to connect
			// connecitonRequests/id2/requestFrom = array {id, name, role, city, country, avatar}
			// connectionREquests/id1/requestTo = array
			let requests = {}
			let requester = { id: state.userId, 
				name: state.currentUserProfile.details.name, 
				city: state.currentUserProfile.details.city, 
				country: state.currentUserProfile.details.country, 
				roleType: state.currentUserProfile.details.companyType !== null && state.currentUserProfile.details.companyType !== undefined ? state.currentUserProfile.details.companyType : state.currentUserProfile.details.voiceType,
				avatarURL: state.currentUserProfile.avatarURL }

			payload.data.forEach(profile => {
				requests[profile.id + '/' + 'requestsFrom' + '/' + requester.id] = requester
				requests[state.userId + '/' + 'requestsTo' + '/' + profile.id ] = profile
			})

			// console.log(requests)

			return new Promise((resolve, reject) => {
				firebaseAxios.patch('/connectionRequests/' + payload.userId + '.json' + '?auth=' + state.idToken, requests)
					.then(res => {
						// console.log('reqests', res)
						commit('setMessage', {
							message: 'Requests Sent',
							messageType: 'success'
						});
						resolve(res)
					}).catch(error => {
						
						console.log(error)
						commit('setMessage', {
							message: error.message,
							messageType: 'warning'
						});
						reject(error)

					})				
			})
		},
		createUserProfilePost({commit, state}, payload) {
			// console.log(payload.userId)

			return new Promise((resolve, reject) => {
				firebaseAxios.post('/posts/' + payload.userId + '.json' + '?auth=' + state.idToken, payload.data)
					.then(res => {
						// console.log('posts', res)
						
						if (payload.images.length !== null) {

							var userStorage = firebaseApp.storage().ref('users');
							var imagePromises = []
							
							payload.images.forEach(imageFile => {
								
								var filename = cryptoRandomString(30)
								var imageName = imageFile.name
								var ext = imageName.slice(imageName.lastIndexOf('.'))

								var imageRef = userStorage.child(payload.userId + /posts/ + res.data.name + '-' + filename + ext)

								imagePromises.push(
									imageRef.put(imageFile).then(fileData => {
										// console.log(fileData)
										fileData.ref.getDownloadURL().then(downloadURL => {
											return downloadURL
										})
										
									})
								)
								
							})

							// console.log(imagePromises)

							Promise.all(imagePromises).then(data => {
								// console.log('resp', data)
								
								firebaseAxios.patch('/posts/' + payload.userId + '/' + res.data.name + '.json' + '?auth=' + state.idToken, {'imageURLs': data })
								.then(imageURLData => {
									imageURLData.data['postId'] = res.data.name
									resolve(imageURLData)
								}).catch(error => {
									console.log(error)
									commit('setMessage', {
										message: error.message,
										messageType: 'warning'
									});
								})
							})				
						}
					}).catch(error => {
						console.log(error)
						commit('setMessage', {
							message: error.message,
							messageType: 'warning'
						});
						reject(error)
					})					
			})

		},
		createPostComment({commit, state}, payload) {
			return new Promise((resolve, reject) => {
				firebaseAxios.post('/posts/' + payload.userId + '/' + payload.data.postId + '/comments.json' + '?auth=' + state.idToken, payload.data)
					.then(res => {
						// console.log(res)
						resolve(res)
					}).catch(error => {
						console.log(error)
						commit('setMessage', {
							message: error.message,
							messageType: 'warning'
						});
						reject(error)
					})
				})
		},
		postOpportunity({commit, state}, payload) {
			return new Promise((resolve, reject) => {
				oppAxios.post("/opportunities.json", 
					payload)
        		.then(res => {
					resolve(res)
				}).catch(error => {
					console.log(error)
					commit('setMessage', {
						message: error.message,
						messageType: 'warning'
					});
					reject(error)
					
				})
			})
		},
		addCalendarDate({commit, dispatch, state}, payload) {
			var publicToolRef = firebaseApp.database().ref("toolsPublic/" + state.userId)
			var authorizedToolRef = firebaseApp.database().ref("toolsAuthorized/" + state.userId)

			publicToolsRef.push(payload.event)
			authorizedToolRef.push(payload.event)
		}
	},
	getters: {
		currentUser(state) {
			return { idToken: state.idToken, id: state.userId}
		},
		currentUserId(state) {
			return state.userId
		},
		profile(state) {
			return state.currentUserProfile;
		},
		currentUserTools(state) {
			return state.currentUserTools
		},
		isSignedIn(state) {
			return state.idToken !== null
		},
		stateMessage(state) {
			return {message: state.message, messageType: state.messageType}
		},
		posts(state) {
			return state.posts
		}
	},
	state: {
		message: null,
		messageType: null,
		idToken: null,
		userId: null,
		userEmail: null,
		expires: null,
		currentUserProfile: {},
		currentUserTools: {},
		userPosts: null,
		

	},
	modules: {
		content: content,
		season: season
	}
})