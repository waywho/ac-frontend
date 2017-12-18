export default{
	methods: {
	  	takeStep(step, object) {
	  		this.$emit('takeStep', { theStep: step, newData: object});
	  	},
	  	saveData(step, object) {
	  		this.$emit('saveData', { theStep: step, newData: object});
	  	}
	}
}
