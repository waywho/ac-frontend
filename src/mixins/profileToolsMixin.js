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

	 		this.$store.dispatch('updateUserTools', {userId: this.$store.getters.user.id, toolName: toolName, data: toolData})
	 		  	.then((response) => {
		        this.message = 'Updated Successfully',
		        this.messageType = 'success',
		        this.messageShow[fields] = true,
		        this.$emit(updateTool, toolData);
	    	});
		}
	}
}