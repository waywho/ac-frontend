<template>
	<div class="">
		<i v-if="step === 'next' class="fa fa-chevron-circle-right is-golden icon" aria-hidden="true"></i>
		<i v-if="step === 'last' class="fa fa-chevron-circle-left is-golden icon" aria-hidden="true"></i>
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
</style>
