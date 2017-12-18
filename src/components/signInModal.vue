<template>
  <modal @close="$emit('close')">
  	<img slot='header' src='../assets/images/logo-placeholder.png' alt="operaop logo" class="logo-image" />
  	<h3 slot='header' class='signin-heading'>Sign in.</h3>
  	<form slot='body' class="signin-form">
  		<input  type="text" placeholder="email" class='form-element' />
	  	<div class="checkbox form-element">
	          <input id='remember' type='radio' :value='remember' v-model='remember' />
	          <label for='remember'><span></span>Remeber me</label>
	    </div>
	  	<input slot='body' type="password" placeholder="password" class='form-element' />
	  	<div class="password form-element is-darkgray">forgot password</div>
	  	<input type="submit" class="button" value="Submit" @click="$emit('close')">
  	</form>
  	<div slot='footer' class="modal-footer is-darkgray">@artist.center 2017. All Rights Reserved.</div>
  </modal>
</template>

<script>
import modal from './modal';
export default {
  name: 'signIn',
  components: {
  	'modal': modal
  },
  data () {
    return {
      remember: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.logo-image {
	max-width: 329px;
	width: 80%;
	height: auto;
	margin: 0 auto;
}

.signin-heading {
  margin-top: 63px;
  color: $color-midgray;
}

.form-element {
	margin-bottom: 25px;
}

.password.form-element, .checkbox.form-element {
	margin-bottom: 45px;
}

.signin-form {
	width: 80%;
	margin: 0 auto;
}

.modal-footer {
	border-top: 2px solid $color-midgray;
	text-align: center;
	padding-top: 25px;
	margin: 45px auto 25px;
	width: 80%;
}

</style>
