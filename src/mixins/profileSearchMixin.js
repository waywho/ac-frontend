import firebaseApp from '@/firebase/init';

export default {
	data() {
		return {
			profileSearch: this.$route.query.profiles,
			profileResults: [],
			searchResultMessage: ""
		}
	},
	methods: {
		getUsers: function() {
	  		if(this.profileSearch.length > 2) {
		  		var userArray = []
		  		var usersRef = firebaseApp.database().ref("users")

		  		usersRef.orderByChild("firstName")
		  			.startAt(this.profileSearch.toLowerCase().trim())
		  			.endAt(this.profileSearch.toLowerCase().trim() + "\uf8ff")
		  			.once("value", snapshot => {
		  			// console.log('firebase', snapshot.val())
		  			// console.log('firebase num', snapshot.numChildren())
		  			if(snapshot.numChildren() > 0) {
						userArray = Object.values(snapshot.val())
					}

		  		}).then(res => {
		  			usersRef.orderByChild("lastName")
		  				.startAt(this.profileSearch.toLowerCase().trim())
		  				.endAt(this.profileSearch.toLowerCase().trim() + "\uf8ff")
		  				.once("value", snapshotTwo => {
		  				// console.log('second search', snapshotTwo.val())
		  				// console.log(snapshotTwo.numChildren())

		  				if (snapshotTwo.numChildren() > 0 && userArray.length > 0) {
		  					// console.log(Object.values(snapshotTwo.val()))

		  					userArray.concat(Object.values(snapshotTwo.val()))
		  					
		  				} else if(snapshotTwo.numChildren() > 0) {
		  					userArray = Object.values(snapshotTwo.val())
		  				}
		  				// console.log(userArray)
		  				
		  				this.profileResults = userArray
		  				if(this.profileResults < 1) {
		  					this.searchResultMessage = "sorry, no profiles found."
		  				}
		  			})
		  		}, error => {
		  			console.log(error)
		  		})  			
	  		}

	  		}
		}
}