import firebaseApp from '@/firebase/init';
const season = {
	actions: {
		createSeason({commit, dispatch, rootState}, payload) {
			// console.log(payload)
			let seasonRef = firebaseApp.database().ref("seasons").child(rootState.userId)
			let seasonKey = seasonRef.push().key
			let databaseRef = firebaseApp.database().ref();

			let seasonUpdates = {
				['seasons/' + rootState.userId + '/' + seasonKey]: payload.season,
				['profiles/' + rootState.userId + '/seasons/'+ seasonKey ]: payload.season
			}

			// console.log(seasonUpdates)

			return new Promise((resolve, reject) => {
			 		databaseRef.update(seasonUpdates, error => {
						if(error) {
							console.log(error)
							commit('setMessage', {
								message: error.message,
								messageType: 'warning'
							});
							reject(error)
						} else {
							// console.log(seasonUpdates)
							resolve({seasonId: seasonKey, season: payload.season})
						}
			 		})
			 	})
		},
		getSeason({commit, rootState}, payload) {
			return new Promise((resolve, reject) => {
				firebaseAxios.get('seasons/' + rootState.userId + '.json')
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
		updateSeason({commit, rootState}, payload) {
			let databaseRef = firebaseApp.database().ref();
			let seasonUpdates = {}

			for(var key in payload.season) {
				seasonUpdates['seasons/' + rootState.userId + '/' + payload.seasonId + '/' + key ] = payload.season[key]
				seasonUpdates['profiles/' + rootState.userId + '/seasons/' + payload.seasonId + '/' + key] = payload.season[key]
			}

			// console.log(seasonUpdates)

			let calendarData = {
						['toolsPublic/' + rootState.userId + '/calendar']: calendarEvents,
						['toolsAuthorized/' + rootState.userId + '/calendar']: calendarEvents
					}

			return new Promise((resolve, reject) => {
				databaseRef.update(seasonUpdates).then(error => {
					if(error) {
						console.log(error)
						commit('setMessage', {
							message: error.message,
							messageType: 'warning'
						});
						reject(error)
					} else {
						resolve()
					}
				})
				
			})
		},
		saveProductionImage({commit, dispatch, rootState}, payload) {
			// console.log(payload.data)
			
			let imageName = payload.data.name
			let ext = imageName.slice(imageName.lastIndexOf("."))

			payload.data['auth'] = rootState.idToken
			//add season name
			return new Promise((resolve, reject) => {
				firebaseApp.storage().ref('users').child(rootState.userId + '/seasons/' + payload.seasonId + '/'+ payload.productionName + ext).put(payload.data)
					.then(fileData => {
						// console.log(fileData)
						fileData.ref.getDownloadURL().then(downloadURL => {
							resolve({filepath: downloadURL})
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
		createProduction({commit, dispatch, rootState}, payload) {
			var profileSeasonRef = firebaseApp.database().ref("profiles").child(rootState.userId).child("seasons").child(payload.seasonId)
			var seasonRef = firebaseApp.database().ref("seasons").child(rootState.userId).child(payload.seasonId)
			var productionKey = profileSeasonRef.push().key
			let production = payload.production

			// console.log('production', production)

			if(production.imageFile !== null && production.imageFile !== undefined) {
			 	dispatch('saveProductionImage', {seasonId: payload.seasonId, productionName: production.name, data: production.imageFile})
	 				.then(res => {
	 					// console.log(res)
	 					production.imageURL = res.filepath
	 					delete production.imageFile
	 				}).catch(error => {
	 					console.log(error)
	 					commit('setMessage', {
							message: error.message,
							messageType: 'warning'
						});
	 				})
	 		} else {
	 			delete production.imageFile
	 		}

	 		return new Promise((resolve, reject) => {
	 			profileSeasonRef.child("productions").push(production).catch(error=> {
	 				commit('setMessage', {
						message: error.message,
						messageType: 'warning'
					});
	 				reject(error)
	 			})
		 		seasonRef.child("productions").push(production).catch(error => {
		 			commit('setMessage', {
						message: error.message,
						messageType: 'warning'
					});
		 			reject(error)
		 		})

		 		let calendarEvents = production.dates.map(productionDate => {
		 			if(productionDate.date !== null && productionDate !== undefined) {
		 				return { 
									date: productionDate.date,
						            start: productionDate.time,
						            end: '',
						            title:  production.name,
						            location: productionDate.location,
						            desc: production.description,
						            type: 'production'	
	        					}
		 			}
		 		})
								

				calendarEvents.forEach(event => {
					commit('addCalendarDate', {event: event})
				})

				var publicCalRef = firebaseApp.database().ref("toolsPublic/" + rootState.userId).child("calendar")
				var authorizedCalRef = firebaseApp.database().ref("toolsAuthorized/" + rootState.userId).child("calendar")

				publicCalRef.set(rootState.currentUserTools.calendar)
				authorizedCalRef.set(rootState.currentUserTools.calendar)
				resolve({productionId: productionKey})
		 	})
		},
		updateProduction({commit, dispatch, rootState}, payload) {
			let databaseRef = firebaseApp.database().ref();
			let seasonUpdates = {
				['seasons/' + rootState.userId + '/' + payload.seasonId  + '/productions/' + payload.productionIndex]: payload.production,
				['profiles/' + rootState.userId + '/seasons/' + payload.seasonId + '/productions/' + payload.productionIndex]: payload.production
			}

			if (payload.production.imageFile) {
				dispatch('saveProductionImage', {seasonId: payload.seasonId, productionName: payload.production.name, data: payload.production.imageFile})
	 				.then(res => {
	 					// console.log(res)
	 					for(var key in seasonUpdates) {
	 						delete seasonUpdates[key].imageFile
	 						seasonUpdates[key].imageURL = res.filepath
	 					}

	 				}).catch(error => {
	 					console.log(error)
	 					commit('setMessage', {
							message: error.message,
							messageType: 'warning'
						});
	 					return error
	 				})
			}

			return new Promise((resolve, reject) => {
				databaseRef.update(seasonUpdates).then(error => {
					if(error) {
						console.log(error)
						commit('setMessage', {
							message: error.message,
							messageType: 'warning'
						});
						return reject(error)
					} else {
						return resolve()
					}
				})
				
			})
		}
	}
};

export default season;
