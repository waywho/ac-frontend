<template>
	<div class="step-container">
		<i v-if="step === 'next'" class="fa fa-chevron-circle-right is-midgray step-icon" aria-hidden="true"></i> 
		<i v-if="step === 'last'" class="fa fa-chevron-circle-left is-midgray step-icon" aria-hidden="true"></i> 
		<span class="small instruction">{{instruction}}</span>
	</div>
</template>

<script>
export default {
  name: 'nextLastStep',
  props: {
  	step: String,
  	instruction: {
  		type: String,
  		required: false
  	}
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.step-container {
	height: 25px;
	display: flex;
	align-items: center;
	cursor: pointer;
}

.instruction {
	margin-left: 1rem;
}

.step-container:hover, .step-container:hover .step-icon {
	color: $color-gold;
}

.step-icon {
	font-size: 25px;
	cursor: pointer;
}



</style>
