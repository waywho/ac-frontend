export default {
  computed: {
    currentUser() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    authorizedUser() {
		if (this.currentUser) {
			return this.id === this.$store.getters.user.id
		} else {
			false
		}
	}
  }
}
