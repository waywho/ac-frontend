export default{
	methods: {
	  	makeStep: function(num) {
    	this.currentStep += 1
    	this.component = signUpSteps[this.currentStep]
    },
	  	saveData(step, object) {
	  		this.$emit('saveData', { theStep: step, newData: object});
	  	}
	}
}

