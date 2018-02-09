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
	  		let updateTool = 'update' + toolName

	 		this.$store.dispatch('updateUserTools', {userId: this.$store.getters.currentUser.id, toolName: toolName, data: toolData})
	 		  	.then((response) => {
		        this.messageShow[fields] = true,
		        this.$emit(updateTool, toolData);
	    	});
		}
	}
}