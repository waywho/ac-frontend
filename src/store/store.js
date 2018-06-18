import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
// import authAxios from '../axios-auth.js';
import firebaseAxios from '@/axios/axios-firebase.js';
import router from '../router';
import cryptoRandomstring from 'crypto-random-string';
const cryptoRandomString = require('crypto-random-string');
import oppAxios from '@/axios/axios-opportunities.js';
import axios from 'axios';
import _ from 'lodash';

Vue.use(Vuex);

export const store = new Vuex.Store({
	strict: false,
	mutations: {
		authUser (state, userData) {
			state.idToken = userData.idToken
			state.userId = userData.userId
			state.userEmail = userData.userEmail
			state.expires = userData.expires
		},
		setCurrentUserProfile (state, payload) {
			// console.log('setCurrentUserProfile state', payload)
			state.currentUserProfile = payload;
		},
		clearAuthData (state) {
			state.idToken = null;
			state.userId = null;
			state.currentUserProfile = {};
			state.currentUserTools = null
			state.userEmail = null;
			state.expires = null;
		},
		setToken (state, payload) {
			state.idToken = payload.idToken
			state.expires = payload.expires
		},
		setUserTools (state, payload) {
			state.currentUserTools = payload;
		},
		setExpirationDate(state, date) {
			state.expires = date
		},
		setMessage(state, payload) {
			state.message = payload.message
			state.messageType = payload.messageType
		},
		setUserPosts (state, payload) {
			state.posts = payload
		}
	},
	actions: {
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
				firebase.auth().onAuthStateChanged(function(user) {
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

				firebase.auth().onAuthStateChanged(function(user) {
					if (user) {
						console.log('reauthorized user', user)					
						user.getIdToken(true).then(idToken => {
							// console.log('authstate', user)
							const now = new Date()
							const expirationDate = new Date(now.getTime() + 3600 * 1000)
							resolve({idToken: idToken, expires: expirationDate})
						}).catch(error => {
							console.log(error)
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

				firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
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
		signUserIn({commit, dispatch}, payload) {
			return new Promise((resolve, reject) => {
				firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
					.then(cred => {
						// console.log('current user', firebase.auth().currentUser)
						console.log('sign in', cred.user)
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
					firebase.auth().signOut().then(() => {
					commit('clearAuthData')
					localStorage.removeItem('artistCenter')
					resolve()
				})
			})
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
			// console.log('expiration', expirationDate)
			// console.log('now', now)
			// console.log('is it expired?', now >= expirationDate)
			// console.log('is it expired?', now < expirationDate)
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
			console.log('creating user', payload)
			let user = {
				['/profiles/' + payload.user.id]: payload.user,
				['users/' + payload.user.id]: payload.user,
			}

			return new Promise((resolve, reject) => {
				firebase.database().ref().update(user, error => {
					if(error) {
						console.log(error)
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
					break;
				default: 
					var data = {['profiles' + '/' + payload.userId + '/' + dataKey]: payload.data[dataKey]}
			}

			return new Promise((resolve, reject) => {
				firebaseAxios.patch('.json' + '?auth=' + state.idToken, data)
					.then(res => {
						console.log(res)
						dispatch('getUserProfileOnce', {userId: payload.userId})
						commit('setMessage', {
							message: 'Updated Profile Successfully',
							messageType: 'success'
						});
						resolve(res)
					}).catch(error => {
						console.log(error)
						reject(error);
					})
			})



			// console.log(payload.data)
			// firebase.database().ref('profiles/' + payload.userId).update(payload.data)
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
		getUserProfileOnce({commit, dispatch, state}, payload) {
			return new Promise((resolve, reject) => {
				firebase.database().ref("/profiles/" + payload.userId).once('value', snapshot => {
					console.log(snapshot.val())
					commit('setCurrentUserProfile', snapshot.val())
					resolve(snapshot.val())
				})
								
			}).catch(error => {
				console.log(error);
				reject(error);
			})

		},
		getUserProfile({commit, dispatch, state}, payload) {
			return new Promise((resolve, reject) => {
				firebase.database().ref("/profiles/" + payload.userId).on('value', snapshot => {
					console.log(snapshot.val())
					commit('setCurrentUserProfile', snapshot.val())
					resolve(snapshot.val())
				})
								
			}).catch(error => {
				console.log(error);
				reject(error);
			})

		},
		saveProductionImage({commit, dispatch, state}, payload) {
			console.log(payload.data)
			
			let imageName = payload.data.name
			let ext = imageName.slice(imageName.lastIndexOf("."))

			payload.data['auth'] = state.idToken
			//add season name
			return new Promise((resolve, reject) => {
				firebase.storage().ref('users').child(state.userId + '/seasons/' + payload.seasonId + '/'+ payload.productionName + ext).put(payload.data)
					.then(fileData => {
						console.log(fileData)
						fileData.ref.getDownloadURL().then(downloadURL => {
							resolve({filepath: downloadURL})
						})
						
					}).catch(error => {
						console.log(error)
						return reject(error)
					})
			})

		},
		saveProfileImages({commit, dispatch, state}, payload) {
			console.log(payload)
			const filename = Object.keys(payload.data)[0]
			// console.log(filename)
			const imageName = payload.data[filename].name
			const ext = imageName.slice(imageName.lastIndexOf('.'))

			// console.log(ext)

			// payload.data['auth'] = state.idToken

			return new Promise((resolve, reject) => {
				var uploadImageTask = firebase.storage().ref('users').child(payload.userId + '/' + payload.userId + filename + ext).put(payload.data[filename])
					.then( fileData => {
						console.log(fileData)
						fileData.ref.getDownloadURL().then(downloadURL => {
							console.log(downloadURL)
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
									console.log('imageURL', res)
									dispatch('getUserProfileOnce', {'userId': state.userId})
									return resolve({
										key: filename + 'URL',
										path: imageURL})
								}).catch(error => {
									console.log(error)
								 	return reject(error)
								})
						})
					}).catch(error => {
						reject(error)
						return console.log(error)
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
						console.log('create tools', res)
						dispatch('getUserTools', {userId: payload.userId})
						resolve(res)
					}).catch(error => {
						reject(error)
						console.log(error)})				
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
						console.log('updated tools', res)
						commit('setMessage', {
							message: 'Updated Tools Successfully',
							messageType: 'success'
						});
						dispatch('getUserTools', {userId: payload.userId})
						resolve(res)
					}).catch(error => {
						reject(error)
						console.log(error)})				
			})


			// firebase.database().ref('tools/' + payload.userId).child(payload.toolName).update(payload.data)
			// 	.then(
			// 		function(data) {
			// 			// console.log(data)
			// 			dispatch('getUserTools', {id: payload.userId})
			// 		}
			// 	).catch(
			// 		error => 
			// 		console.log(error)
			// 	)
		},
		getUserTools({commit, dispatch, state}, payload) {
			// getUserTools public vs get Tools private
			// console.log('state idToken getUserTools', state.idToken)
			// console.log('disptaching getUserTools', state.idToken)
			// let token = state.idToken
			// console.log(token)

			return new Promise((resolve, reject) => {
				firebase.database().ref('toolsAuthorized/' + payload.userId).on('value', snapshot => {
					console.log(snapshot.val());
					commit('setUserTools', snapshot.val())
					dispatch('setLocalStorage')
					resolve(snapshot.val())
				})
			}).catch(error => {
					console.log(error)
			})
		},
		getProfileTools({commit, state}, payload) {
			// console.log('disptaching getProfileTools')
			return new Promise((resolve, reject) => {
				firebaseAxios.get("/toolsPublic/" + payload.profileId + ".json")
					.then(res => {
						// console.log('tools', res)
						resolve(res)
					}).catch(error => {
						reject(error)
						console.log(error)
					})				
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
						console.log('reqests', res)
						commit('setMessage', {
							message: 'Requests Sent',
							messageType: 'success'
						});
						resolve(res)
					}).catch(error => {
						reject(error)
						console.log(error)})				
			})

	
		},
		createUserProfilePost({commit, state}, payload) {
			// console.log(payload.userId)

			return new Promise((resolve, reject) => {
				firebaseAxios.post('/posts/' + payload.userId + '.json' + '?auth=' + state.idToken, payload.data)
					.then(res => {
						// console.log('posts', res)
						
						if (payload.images.length !== null) {

							var userStorage = firebase.storage().ref('users');
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
								}).catch(error => console.log(error))

							})				
						}
					}).catch(error => {
						reject(error)
						console.log(error)})					
			})

		},
		createPostComment({commit, state}, payload) {
			return new Promise((resolve, reject) => {
				firebaseAxios.post('/posts/' + payload.userId + '/' + payload.data.postId + '/comments.json' + '?auth=' + state.idToken, payload.data)
					.then(res => {
						console.log(res)
						resolve(res)
					}).catch(error => {
						console.log(error)
					})
				})
		},
		getProfilePosts({commit, state}, payload) {
			// console.log('disptaching getProfilePosts', state.idToken)
			return new Promise((resolve, reject) => {

				firebaseAxios.get("/posts/" + payload.profileId + ".json" + '?auth=' + state.idToken)
					.then(res => {
						// console.log('posts', res)
						resolve(res)
					}).catch(error => {
						reject(error)
						console.log(error)
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
					reject(error)
					console.log(error)
				})
			})
		},
		createSeason({commit, dispatch, state}, payload) {
			console.log(payload)
			let seasonRef = firebase.database().ref("seasons").child(state.userId)
			let seasonKey = seasonRef.push().key
			let databaseRef = firebase.database().ref();

			let seasonUpdates = {
				['seasons/' + state.userId + '/' + seasonKey]: payload.season,
				['profiles/' + state.userId + '/seasons/'+ seasonKey ]: payload.season
			}

			console.log(seasonUpdates)

			return new Promise((resolve, reject) => {
				let imagePromises = payload.productions.map(production => {
		 		if(production.imageFile !== null && production.imageFile !== undefined) {
			 			return dispatch('saveProductionImage', {seasonId: seasonKey, productionName: production.name, data: production.imageFile})
			 				.then(res => {
			 					console.log(res)
			 					production.imageURL = res.filepath
			 					delete production.imageFile
			 					return production

			 				}).catch(error => {
			 					console.log(error)
			 					return error
			 				})
			 		} else {
			 				delete production.imageFile
			 				return production
			 		}
			 		
		 		})

			 	Promise.all(imagePromises).then(res => {
			 		console.log(res)
			 		seasonUpdates['seasons/' + state.userId + '/' + seasonKey]['productions'] = res
					seasonUpdates['profiles/' + state.userId + '/seasons/'+ seasonKey ]['productions'] = res
			 		
			 		let calendarEvents = res.map(production => {
						return production.dates.map(productionDate => {
							return { 
								date: productionDate.date,
					            start: productionDate.time,
					            end: '',
					            title:  production.name,
					            location: '',
					            desc: production.description,
					            type: 'production'	
        					}
						})
			 		})

			 		calendarEvents = _.flatten(calendarEvents)

			 		let calendarData = {
						['toolsPublic/' + state.userId + '/calendar']: calendarEvents,
						['toolsAuthorized/' + state.userId + '/calendar']: calendarEvents
					}
			 		
					let fullData = Object.assign(seasonUpdates, calendarData)
			 		console.log('events', calendarEvents)
			 		console.log('calendar data', calendarData)
			 		console.log('full data', fullData)
			 		console.log('after production update', seasonUpdates)

			 		databaseRef.update(fullData, error => {
						if(error) {
							console.log(error)
							reject(error)
						} else {
							console.log(seasonUpdates)
							resolve(seasonUpdates['seasons/' + state.userId + '/' + seasonKey])
						}
			 		})
			 	})
			})
		 	
	 		

		},
		getSeason({commit, state}, payload) {
			return new Promise((resolve, reject) => {
				firebaseAxios.get('seasons/' + state.userId + '.json')
				 .then(res => {
				 	resolve(res)
				 }).catch(error => {
				 	reject(error)
				 	console.log(error)
				 })
			})
		},
		updateSeason({commit, state}, payload) {
			let databaseRef = firebase.database().ref();
			let seasonUpdates = {}

			for(var key in payload.season) {
				seasonUpdates['seasons/' + state.userId + '/' + payload.seasonId + '/' + key ] = payload.season[key]
				seasonUpdates['profiles/' + state.userId + '/seasons/' + payload.seasonId + '/' + key] = payload.season[key]
			}

			console.log(seasonUpdates)

			return new Promise((resolve, reject) => {
				databaseRef.update(seasonUpdates).then(error => {
					if(error) {
						console.log(error)
						reject(error)
					} else {
						resolve()
					}
				})
				
			})
		},
		updateProduction({commit, dispatch, state}, payload) {
			let databaseRef = firebase.database().ref();
			let seasonUpdates = {
				['seasons/' + state.userId + '/' + payload.seasonId  + '/productions/' + payload.productionIndex]: payload.production,
				['profiles/' + state.userId + '/seasons/' + payload.seasonId + '/productions/' + payload.productionIndex]: payload.production
			}

			if (payload.production.imageFile) {
				dispatch('saveProductionImage', {seasonId: payload.seasonId, productionName: payload.production.name, data: payload.production.imageFile})
	 				.then(res => {
	 					console.log(res)
	 					for(var key in seasonUpdates) {
	 						delete seasonUpdates[key].imageFile
	 						seasonUpdates[key].imageURL = res.filepath
	 					}

	 				}).catch(error => {
	 					console.log(error)
	 					return error
	 				})
			}

			return new Promise((resolve, reject) => {
				databaseRef.update(seasonUpdates).then(error => {
					if(error) {
						console.log(error)
						return reject(error)
					} else {
						return resolve()
					}
				})
				
			})
		}
	},
	getters: {
		currentUser(state) {
			return { idToken: state.idToken, id: state.userId}
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
		staticPages: {
			"center": {
				title: "About",
				heroImage: require('@/assets/images/supportheatre.jpg'),
				contentEN: "<p>To date, no solution exists to manage promotional material and other opera singers' data so that these documents are always up-to-date with the stakeholders who use them. Employers, unions, festivals, competitions, auditions, social networks and other websites deal with singers their photos, letters of recommendation, application forms, resumes, biographies, repertory lists, audio and video recordings and contracts. Monitoring is difficult with all these portals and stakeholders; it is almost impossible to keep up with everyone's demands and demands while remaining up-to-date. Dissatisfaction on both sides is thus created and is as harmful to the artists' careers as to the efficiency of the companies that hire them.</p><p>The Boussole des Arts is a turnkey service centered around an interactive portal, first adapted to the needs of the opera industry at www.operaop.com. It straddles the professional network, the tabloid posting job postings and the database package. It offers its users an information system adapted to the needs of opera houses, tools for the production of shows and ticket sales, a professional networking platform for self-employed workers, hosting of pages web promotional and especially a central system of data transfer and automated updates administering both artistic promotional material and production activities.</p>",
				contentFR: "<p>À ce jour, aucune solution n’existe pour gérer les documents promotionnels et autres données des chanteurs d’opéra de manière à ce que ces documents soient toujours à jour chez les intervenants qui recourent. Employeurs, syndicats, festivals, compétitions, auditions, réseaux sociaux et autres sites web transigent avec les chanteurs leurs photos, lettres de recommandation, formulaires d’application, CV, biographies, listes de répertoire,  enregistrements audio et vidéo et contrats. Le suivi est bien difficile avec tous ces portails et intervenants&nbsp;; il s’avère presque impossible de demeurer conforme aux demandes et exigences de chacun tout en demeurant à jour. Des insatisfactions de part et d’autre sont ainsi créées et nuisent autant à la carrière des artistes qu’à l’efficacité des entreprises qui les embauchent. <br><br>La Boussole des Arts est un service clef en main, centré autour d’un portail interactif, adapté d’abord aux besoins inhérents à l’industrie de l’opéra basé à l’adresse www.operaop.com. Il est à cheval entre le réseau professionnel, le tabloïd affichant des offres d’emploi et le progiciel de base de données. Il offre à ses utilisateurs un système d’information adapté aux besoins des maisons d’opéra, des outils au service de la production de spectacles et de la vente de billets, une plateforme de réseautage professionnel destinée aux travailleurs autonomes, l’hébergement de pages web promotionnelles et surtout un système central de transfert de données et de mises à jour automatisées administrant tant les documents promotionnels artistiques que les activités de production.</p>"
			},
			"terms": {
				title: "Terms of Use Agreement",
				heroImage: require('@/assets/images/supportheatre.jpg'),
				contentEN: "<p>for Members of La Boussole des arts’ web portals, OperaOp &amp; OperaCompass</p><p>Effective Date: This Terms of Use Agreement was last updated on January&nbsp; 24th, 2013.</p><p>ATTENTION: PLEASE READ THESE TERMS CAREFULLY BEFORE USING THIS WEBSITE OR REGISTERING WITH La Boussole des Arts inc.. USING THIS WEBSITE INDICATES THAT YOU ACCEPT THESE TERMS. IF YOU DO NOT ACCEPT THESE TERMS, IMMEDIATELY CEASE ALL USAGE OF THIS WEBSITE.</p><p>This Terms of Use Agreement (“Agreement”) sets forth the standards of use of the La Boussole des Arts inc. services. La Boussole des Arts inc. reserves the right, at any time, to modify, alter, or update the terms and conditions of this agreement without prior notice. Users will be notified about the changes, with the chance to agree with the new Terms or cancel their account.</p><p><br><h3>1. Registration Terms and Requirements</h3></p><p>Your registration with the La Boussole des Arts inc. service is for your own personal and business use. You may authorize others to use your registration, but you may not assign or otherwise transfer your account to any other person or entity. You are responsible for logging out if your computer is accessible to others. This prevents unauthorized access.</p><p>Either you or La Boussole des Arts inc. may terminate your OperaOp membership at any time, for any reason, without explanation, effective upon sending written notice to La Boussole des Arts inc.. La Boussole des Arts inc. reserves the right to immediately suspend or terminate your access to www.operaop.com, without notice, upon any breach of this Agreement by you.</p><p><br><h3>2. Disclaimer of Warranties.</h3></p><p>La Boussole des Arts inc. provides service on an 'as is' basis and grants no warranties of any kind, expressed, implied, statutory, in any communication with La Boussole des Arts inc. or its representatives, or otherwise with respect to the service. La Boussole des Arts inc.</p><p>specifically disclaims any implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property. Local and applicable law may not allow the exclusion of implied warranties, so this exclusion may not apply to you.</p><p><br><h3>3. Modifications and Interruption to Service</h3></p><p>La Boussole des Arts inc. reserves the right to modify or discontinue the OperaOp service with or without notice to the Member. Should La Boussole des Arts inc. discontinue the OperaOp service, La Boussole des Arts inc. will refund membership or advertising fees paid by the Member for those months not used due to La Boussole des Arts inc. service being discontinued. La Boussole des Arts inc. shall not be liable to the Member or any third party for any other reason should La Boussole des Arts inc. exercise its right to modify or discontinue the La Boussole des Arts inc. service. Member acknowledges and accepts that La Boussole des Arts inc. does not guarantee continuous, uninterrupted or secure access to our website and operation of our website may be interfered with or adversely affected by numerous factors or circumstances outside of our control.</p><p><br><h3>4. Limitation of Liability</h3></p><p>La Boussole des Arts inc. is not liable for the integrity of statements made by members or users of www.operaop.com. By registering with OperaOp services, you are agreeing that neither La Boussole des Arts inc. nor any of its associates may be liable for any damages, direct, indirect, incidental and/or consequential, arising out of the use of this service, or any websites linked to this website, including, without limitation, to damages arising out of communicating and/or meeting with other members of this service, or introduced to you via this service. Such damages include, without limitation, monetary damages, physical damages, bodily injury and or emotional distress and discomfort.</p><p>Notwithstanding anything to the contrary contained herein, La Boussole des Arts inc.’s liability to you for any cause whatsoever, under any legal theory whatsoever, and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to La Boussole des Arts inc. for the service during the term of the OperaOp membership.</p><p><br><h3>5. Indemnification</h3></p><p>Member agrees to indemnify and hold La Boussole des Arts inc. its parents, subsidiaries, affiliates, officers and employees, harmless from any claim or demand, including reasonable attorneys’ fees and costs, made by any third party due to or arising out of Member’s use of the<br>OperaOp service, the violation of this Agreement, or infringement by Member, or other user of the Service using Member’s computer, of any<br>intellectual property or any other right of any person or entity.</p><p><h3>6. Information Supplied by Member</h3></p><p>La Boussole des Arts inc. will keep all personal information supplied by you to OperaOp confidential, and shall only use or disclose such information as necessary to ensure the safety and integrity of our Members and users, to fulfill our service obligations to you, and in accordance with our Privacy Policy, see www.operaop.com/privacy. Note that user’s names and/or company names may be disclosed by La<br>Boussole des Arts inc. through publication of a user’s list. No other personal information will accompany such publication. By registering with OperaOp you are consenting to such use of your name and/or company name.</p><p><br><h3>7. Content Posted By Parties Other Than La Boussole des Arts inc.</h3></p><p>Opinions, advice, statements, offers, or other information or content made available through the La Boussole des Arts inc. service of www.operaop.com, but not directly by La Boussole des Arts inc., are those of their respective authors, and should not necessarily be relied upon. Such authors are solely responsible for such content. La Boussole des Arts inc. does not guarantee the accuracy, completeness, or<br>usefulness of any information on the service and neither adopts nor endorses nor is responsible for the accuracy or reliability of any opinion, advice, or statement made by parties other than La Boussole des Arts inc.. Under no circumstances will La Boussole des Arts inc. be&nbsp; responsible for any loss or damage resulting from anyone's reliance on information or other content posted on www.operaop.com or transmitted to OperaOp members.</p><p>It is possible that other OperaOp members or users (including unauthorized users, or 'hackers') may post or transmit offensive materials on the OperaOp website and that you may be involuntarily exposed to such offensive materials. Additionally, should an unauthorized user gain<br>La Boussole des Arts : <a href='http://www.OperaOp.com'>www.OperaOp.com</a> access to La Boussole des Arts inc. site, such unauthorized user may be able to post offensive material directly to artists websites, through the content management system services. La Boussole des Arts inc. takes precautions to avoid unauthorized users from accessing our site; however, we offer no guarantee that such will not occur.</p><p>La Boussole des Arts inc. is not responsible for the use of any personal information that you disclose on the Service. Please carefully select the type of information that you post on the OperaOp service or release to others. La Boussole des Arts inc. reserves the right, but has no obligation, to monitor the materials posted in the public access areas of the www.operaop.com service. The display of any violent or obscene <br>language or picture is strictly prohibited. La Boussole des Arts inc. shall have the right to remove any such material that in its sole opinion violates, or is alleged to violate, the law or this Agreement. Notwithstanding this right of La Boussole des Arts inc., you remain solely responsible for the content of the materials you post in the public access areas of the service and in your private e-mail messages. E-mails or in- Mails sent between you and other OperaOp members that are not readily accessible to the general public will be treated as private by La Boussole des Arts inc. to the extent required by applicable law. Use of this website, including any materials posted to this website by you, is entirely at your own risk.</p><p><br><h3>8. Complaints</h3></p><p>To submit a complaint to La Boussole des Arts inc. regarding the OperaOp service or to report conduct violating this Agreement, you should first contact La Boussole des Arts inc. Customer Support by sending an email at support@operaop.com</p><p><br><h3>9. Disclaimer Regarding Accuracy</h3></p><p>the OperaOp service may obtain Product specifications and other information by the Third parties or collected from publicly available sources. While La Boussole des Arts inc. makes every effort to ensure that the information on this website is accurate, we do not endorse nor make any representations or warranties as to the accuracy or reliability of any information provided on this website. The OperaOp Service may contain information from third parties.</p><p>La Boussole des Arts inc. makes no warranties or representations whatsoever with regard to such information provided, or any results that may be obtained through using them, and you acknowledge that any reliance on representations and warranties provided by any Third party<br>shall be at your own risk.</p><p><br><h3>10. Governing Jurisdiction</h3></p><p>La Boussole des Arts inc. is organized under the laws of the Province of Quebec, in Canada. As such, we are subject to the laws of the Province of Quebec, and such laws will govern this Terms of Use, without giving effect to any choice of law rules. We make no representation that our website or other services are appropriate, legal or available for use in other locations. Accordingly, if you choose to access our site you agree to do so subject to the internal laws of the Province of Quebec, and you are responsible for compliance with applicable local laws. You thus agree to pay the entire fee of the membership you choose to subscribe for.</p><p><br><h3>11. Compliance with Laws</h3></p><p>Member assumes all knowledge of applicable law and is responsible for&nbsp; compliance with any such laws. Member may not use the Service in any way that violates applicable state, federal, or international laws, regulations or other government requirements. Member further agrees<br>not to transmit any material that encourages conduct that could constitute a criminal offense, give rise to civil liability or otherwise violate any applicable local, state, national, or international law or regulation. Access or use of our website from territories where the contents are illegal is prohibited.</p><p><br><h3>12. Proprietary Rights</h3></p><p>La Boussole des Arts inc. owns and retains other proprietary rights in all services offered by OperaOp. www.operaop.com contains the&nbsp; copyrighted material, trademarks, and other proprietary information of www.operaop.com, its licensors and licensees. In addition, other members may post copyrighted information, which has copyright protection whether or not it is identified as copyrighted. Except for that information which is in the public domain or for which you have been given permission, you will not copy, modify, publish, transmit, distribute,<br>perform, display, or sell any such proprietary information. By posting information or content to any public area of www.operaop.com, you automatically grant, and you represent and warrant that you have the right to grant to OperaOp members an irrevocable, perpetual, non-<br>exclusive, fully-paid, worldwide license to use, copy, perform, display and distribute such information and content and to prepare derivative<br>works of, or incorporate into other works, such information and content, and to grant and authorize sub-licenses of the foregoing.</p><p><br><h3>13. Copyrights and Trademark Information</h3></p><p>All content included or available on this site, including site design, text, graphics, interfaces, and the selection and arrangements thereof is<br>©2009-2013 La Boussole des Arts inc., will all rights reserved, or is the property of La Boussole des Arts inc. and/or third parties protected by<br>intellectual property rights. Any use of materials on the website, including reproduction for purposes other than those noted above, modification, distribution, or replication, any form of data extraction or data mining, or other commercial exploitation of any kind, without prior<br>written permission of an authorized officer of La Boussole des Arts inc. is strictly prohibited. Member agree that they will not use any robot, spider, or other automatic device, or manual process to monitor or copy our web pages or the content contained therein without prior written permission of an authorized officer of La Boussole des Arts inc..</p><p>La Boussole des Arts inc., OperaOp, OperaCompass are proprietary marks of La Boussole des Arts inc.. La Boussole des Arts inc.’s trademarks may not be used in connection with any product or service that is not provided by La Boussole des Arts inc., in any manner that is likely to cause confusion among customers, or in any manner that disparages or discredits La Boussole des Arts inc..<br><br></p><p></p>",
				contentFR: ""
			}
		},
		opportunityTypes: [
			'competitions', 
			'general auditions', 
			'young artist programms', 
			'chorus', 
			'orchestra', 
			'training programms', 
			'collaborations', 
			'job offers'
		],
    	categorySubcategories: {
    		'singers/actors': [
    			'soprano',
    			'mezzo-soprano',
    			'alto & contralto',
    			'countertenor',
    			'tenor',
    			'baritone',
    			'bass & bass-baritone',
				'backing vocals',
				'chorus',
				'actors',
				'extras & silent roles',
				'other'
    		],
    		'instruments': [
				'piano',
				'harpsichord',
				'organ',
				'other keyboards',
				'strings',
				'violin',
				'viola ',
				'cello',
				'double bass',
				'harp',
				'guitar',
				'bass',
				'other strings',
				'flute',
				'oboe',
				'clarinet',
				'bassoon',
				'trumpet',
				'trombone',
				'french horn',
				'bass trombone',
				'tuba',
				'saxophone',
				'drums',
				'timpani',
				'other percussions',
				'other instruments'
	   		],
    		'administration, production & other': [
    			'agent',
				'teacher',
				'conductor',
				'musicologist',
				'production',
				'administration',
				'other'
    		]
    	},
    	paymentTypes: [
    		'paid',
    		'unpaid',
    		'pay to play or sing',
    		'prize money'
    	]

	}
})