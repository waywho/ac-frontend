export default{
	methods: {
	  	userAvatar: function(avatarURL) {
	  		if (avatarURL) {
	          return avatarURL
	        } else {
	          return require("../assets/images/avatar-holder.png")
	        }
	  	}								
	}
}
