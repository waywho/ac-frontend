export default{
	methods: {
	  	takeStep(step, object) {
	  		this.$emit('takeStep', { theStep: step, newData: object});
	  	},
	  	updateData(step, object) {
	  		this.$emit('updateData', { theStep: step, newData: object});
	  	}
	}
}
