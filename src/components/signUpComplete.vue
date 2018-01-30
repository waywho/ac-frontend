<template>
  <div class="complete">
  		<h3>Complete</h3>
  		<div class="icon-container icon-complete-container">
			<i class="fa fa-chevron-right is-golden icon-complete" aria-hidden="true"></i>
		</div>
		<h4>Connecting you to the world of opera</h4>
		<p>Thank you for registering and completing the company profile setup. Please continue to the account page by clicking the button below. All information can be edited within the settings and account options.</p>
		<br />
		<br />
		<div class="strong">Continue to Account</div class="strong">
  		<div class="icon-container last-step">
			<router-link :to="{ name: 'profiles', params: { 'id': currentUser.id }}"><i class="fa fa-chevron-right is-golden icon" aria-hidden="true"></i></router-link>
		</div>
  </div>
</template>

<script>
	import { mapGetters } from 'vuex'
export default {
  name: 'signUpStepEight',
  data () {
    return {
      
    }
  },
  computed: {
  	...mapGetters(['currentUser'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';


.complete {
	text-align: center;
	width: 100%;
}

.icon-complete-container {
	height: 38px;
	width: 38px;
	background: $color-gold;
	color: white;
	margin: auto auto;
}

.icon-complete {
	color: white;
}
</style>
