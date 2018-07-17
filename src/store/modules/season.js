import firebaseApp from '@/firebase/init';
const season = {
	actions: {
		createSeason({commit, dispatch, state}, payload) {
			// console.log(payload)
			let seasonRef = firebaseApp.database().ref("seasons").child(state.userId)
			let seasonKey = seasonRef.push().key
			let databaseRef = firebaseApp.database().ref();

			let seasonUpdates = {
				['seasons/' + state.userId + '/' + seasonKey]: payload.season,
				['profiles/' + state.userId + '/seasons/'+ seasonKey ]: payload.season
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
		getSeason({commit, state}, payload) {
			return new Promise((resolve, reject) => {
				firebaseAxios.get('seasons/' + state.userId + '.json')
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
		updateSeason({commit, state}, payload) {
			let databaseRef = firebaseApp.database().ref();
			let seasonUpdates = {}

			for(var key in payload.season) {
				seasonUpdates['seasons/' + state.userId + '/' + payload.seasonId + '/' + key ] = payload.season[key]
				seasonUpdates['profiles/' + state.userId + '/seasons/' + payload.seasonId + '/' + key] = payload.season[key]
			}

			// console.log(seasonUpdates)

			let calendarData = {
						['toolsPublic/' + state.userId + '/calendar']: calendarEvents,
						['toolsAuthorized/' + state.userId + '/calendar']: calendarEvents
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
		saveProductionImage({commit, dispatch, state}, payload) {
			// console.log(payload.data)
			
			let imageName = payload.data.name
			let ext = imageName.slice(imageName.lastIndexOf("."))

			payload.data['auth'] = state.idToken
			//add season name
			return new Promise((resolve, reject) => {
				firebaseApp.storage().ref('users').child(state.userId + '/seasons/' + payload.seasonId + '/'+ payload.productionName + ext).put(payload.data)
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
		createProduction({commit, dispatch, state}, payload) {
			var profileSeasonRef = firebaseApp.database().ref("profiles").child(state.userId).child("seasons").child(payload.seasonId)
			var seasonRef = firebaseApp.database().ref("seasons").child(state.userId).child(payload.seasonId)
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

				var publicCalRef = firebaseApp.database().ref("toolsPublic/" + state.userId).child("calendar")
				var authorizedCalRef = firebaseApp.database().ref("toolsAuthorized/" + state.userId).child("calendar")

				publicCalRef.set(state.currentUserTools.calendar)
				authorizedCalRef.set(state.currentUserTools.calendar)
				resolve({productionId: productionKey})
		 	})
		},
		updateProduction({commit, dispatch, state}, payload) {
			let databaseRef = firebaseApp.database().ref();
			let seasonUpdates = {
				['seasons/' + state.userId + '/' + payload.seasonId  + '/productions/' + payload.productionIndex]: payload.production,
				['profiles/' + state.userId + '/seasons/' + payload.seasonId + '/productions/' + payload.productionIndex]: payload.production
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
