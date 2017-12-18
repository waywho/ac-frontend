<template>
	<div class="">
		<div class="icon-container" v-if="step === 'next'">
			<i class="fa fa-chevron-right is-golden icon" aria-hidden="true"></i>
		</div>
		<div class="icon-container" v-if="step === 'last'">
			<i class="fa fa-chevron-left is-golden icon" aria-hidden="true"></i>
		</div>
	</div>
</template>

<script>
export default {
  name: 'nextLastStep',
  props: {
  	step: String
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.next-step {
	display: inline-block;
}

.icon-container {
	height: 38px;
	width: 38px;
}
</style>
