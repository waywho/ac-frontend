<template>
  <modal @close="$emit('close')">
  	<img slot='header' :src="require('@/assets/images/artistcenter-logo2.svg')" alt="operaop logo" class="logo-image" />
  	<h2 slot='header' class='signin-heading'>Sign In</h2>
  	<form slot='body' class="signin-form" @submit.prevent="onSignIn">
  		<input  type="text" placeholder="Email" class='form-element' @focus="messageShow = false" v-model="email" />
	  	<div class="checkbox form-element smaller">
	          <input id='remember-input' type='checkbox' v-model='remember' />
	          <label for='remember-input' class="smaller"><span></span>Remember Me</label>
	    </div>
	  	<input slot='body' type="password" placeholder="Password" @focus="messageShow = false" class='form-element' v-model="password" />
      <success-warning-notice v-if="messageShow" :messaging="messaging" class="form-element"></success-warning-notice>
	  	<div class="password form-element is-darkgray text-button" @click="resetPassword">Forgot Password</div>
	  	<div>
        <button type="submit" class="button sign-in-button">Sign In</button>
      </div>
  	</form>
  	<div slot='footer' class="modal-footer is-darkgray">@Artist.Center 2017. All Rights Reserved.</div>
  </modal>
</template>

<script>
import modal from '@/components/modal';
import successWarningNotice from '@/components/successWarningNotice';

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
     	email: null,
  		password: null,
  		messaging: {
  			message: null,
  			messageType: null
  		}
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
        .then(res => {
          this.$router.push({name: 'profiles', params: { id: res.uid }})
          this.$emit('close')
        },
          error => {
            this.messageShow = true
          })
  	},
  	resetPassword: function() {
  		this.messageShow = false
  		this.messaging.message = null
  		this.messaging.messageType = null

  		if(this.email !== null && this.email !== undefined) {
  			this.$store.dispatch('resetPasswordEmail', {email: this.email}).then(() => {

  				this.messageShow = true
  			}).catch(error => {
  				this.messageShow = true
  			})
  		} else {
  			this.messaging.message = "please enter an email address"
  			this.messaging.messageType = "warning"
  			this.messageShow = true
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

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
	text-align: center;
	padding-top: 25px;
	margin: 45px auto 25px;
	width: 80%;
}

.sign-in-button {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

</style>
