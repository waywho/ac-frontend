export default {
  computed: {
  	signedIn() {
  		return this.$store.getters.isSignedIn
  	},
    currentUser() {
      	return this.$store.getters.currentUser
    },
    authorizedUser() {
    	if (!this.signedIn) {
    		return
    	} 
		if (this.currentUser) {
			return this.profileId === this.$store.getters.currentUser.id
		} else {
			false
		}
	}
  }
}
