export default{
	methods: {
	  	userAvatar: function(avatarURL) {
	  		if (avatarURL !== null && avatarURL !== undefined) {
	          return avatarURL
	        } else {
	          return require("../assets/images/avatar-holder.png")
	        }
	  	}								
	}
}
