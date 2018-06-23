export default {
  computed: {
  	signedIn() {
  		return this.$store.getters.isSignedIn
  	},
    currentUser() {
      	return this.$store.getters.currentUser
    },
    currentUserAvatar() {
      if(this.signedIn) {
        var avatarURL = !this.$store.getters.profile ? null : this.$store.getters.profile.avatarURL
        if (avatarURL !== null && avatarURL !== undefined && avatarURL.length > 0) {
          return avatarURL
        } else {
          return require("../assets/images/avatar-holder.png")
        }
      } else {
        return require("../assets/images/avatar-holder.png")
      }
    }
  },
  methods: {
    authorizedUser: function(profileId) {
      if (!this.signedIn) {
        return false
      };
      return profileId === this.$store.getters.currentUser.id;
    }
  }
}
