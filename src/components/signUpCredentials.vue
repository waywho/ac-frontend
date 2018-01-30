<template>
  <div class="signup-form">
  	<input type="text" class="signup-input" name="profileEmail" placeholder="Email Address" v-model="credentials.email" />
  	<input type="password" class="signup-input" name="profilePassword" placeholder="Password" v-model="credentials.password" />
    <input type="password" class="signup-input" name="confirmPassword" placeholder="Confirm Password" v-model="credentials.confirmPassword"/>
    <div class="inline-checkbox signup-input">
          <input id='consent' type='checkbox' v-model='credentials.consent' />
          <label for='consent'><span></span>I agree to receiving site updates and related news.</label>
    </div>
    <success-warning-notice v-if="messageShow" :messaging="comparePasswords" class="signup-input"></success-warning-notice>
  	<button type="submit" v-on:click="onSignUp" class="signup-button">Sign Up</button>
  </div>
</template>

<script>
import stepMixin from '../mixins/stepMixin';
import successWarningNotice from './successWarningNotice'; 

export default {
  name: 'signUpStepOne',
  components: {
    'success-warning-notice': successWarningNotice
  },
  data () {
    return {
      messageShow: false,
      credentials: {
      	consent: true,
        password: null,
        confirmPassword: null
      }
    }
  },
  computed: {
    comparePasswords() {
      if (this.credentials.password !== this.credentials.confirmPassword) {
        this.messageShow = true
        return { message: 'Passwords do not match', messageType: 'warning'}
      } else {
        this.messageShow = false
        return
      }
    },
    idToken() {
      return this.$store.getters.currentUser.idToken
    }
  },
  methods: {
    onSignUp: function() {
      this.messageShow = false;
      this.$store.dispatch('signUserUp', this.credentials)
        .then(() => {        
        }, 
          error => {
            console.log('err', error); 
            this.messageShow = true;
          })
      // saveData(1, this.credentials)
    }
  },
  watch: {
    idToken(value) {
      if(value !== null && value !== undefined) {
        console.log('id', this.$store.getters.currentUser.id)
        this.takeStep(1, {})
      }
    }
  },
  mixins: [stepMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';
.signup-form {
  text-align: center;
}

.subheadline {
	margin-bottom: 65px;
}

.signup-input {
	margin-bottom: 34px;
  display: block;
}

.signup-button {
  margin: auto auto;
}
</style>
