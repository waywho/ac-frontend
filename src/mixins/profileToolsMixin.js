export default{
	data () {
		return {
			message: null,
      		messageType: null,
		}
	},
	methods: {
		updateProfileTools: function(fields, toolName) {
	  		let toolData = { [fields]: this[fields]}
	  		// console.log(toolData)
	  		let updateTool = 'update' + toolName.charAt(0).toUpperCase() + toolName.slice(1);
	  		// console.log(updateTool)
	 		this.$store.dispatch('updateUserTools', {userId: this.$store.getters.currentUser.id, toolName: toolName, data: toolData})
	 		  	.then((response) => {
		        	this.messageShow[fields] = true,
		        	this.$emit(updateTool, toolData);
		        	// console.log(response)
	    	}, error => console.log(error));
		}
	}
}