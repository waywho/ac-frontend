<template>
  <modal @close="$emit('close')">
  	<img slot='header' src='../assets/images/artistcenter-logo2.svg' alt="operaop logo" class="logo-image" />
  	<h3 slot='header' class='signin-heading'>Sign in.</h3>
  	<form slot='body' class="signin-form" @submit.prevent="onSignIn">
  		<input  type="text" placeholder="email" class='form-element' v-model="email" />
	  	<div class="checkbox form-element">
	          <input id='remember' type='radio' :value='remember' v-model='remember' />
	          <label for='remember'><span></span>Remember me</label>
	    </div>
	  	<input slot='body' type="password" placeholder="password" class='form-element' v-model="password" />
      <success-warning-notice v-if="messageShow" class="form-element"></success-warning-notice>
	  	<div class="password form-element is-darkgray">forgot password</div>
	  	<button type="submit" class="button">Sign in</button>
  	</form>
  	<div slot='footer' class="modal-footer is-darkgray">@artist.center 2017. All Rights Reserved.</div>
  </modal>
</template>

<script>
import modal from './modal';
import successWarningNotice from './successWarningNotice'; 

export default {
  name: 'signIn',
  components: {
  	'modal': modal,
    'success-warning-notice': successWarningNotice
  },
  data () {
    return {
      messageShow: false,
      remember: true,
      email: "",
  		password: ""
    }
  },
  computed: {
    user () {
      return this.$store.getters.currentUser
    }
  },
  methods: {
  	onSignIn: function(){
      this.messageShow = false
  		this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
        .then(() => {},
          error => {
            this.messageShow = true
          })
  	}
  },
  watch: {
  	user (value) {
  		if (value !== null && value !== undefined) {
  			console.log(value)
  			this.$router.push({name: 'profiles', params: { id: value.id }})
  			this.$emit('close')
  		}
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
