<template>
  <form class="signup-form" v-on:submit.prevent="onSignUp">
  	<input type="text" class="signup-input" name="profileEmail" placeholder="Email Address" v-model="credentials.email" @focus="clearMessage"/>
  	<input type="password" class="signup-input" name="profilePassword" placeholder="Password with 6 or more characters" v-model="credentials.password" @focus="clearMessage"/>
    <input type="password" class="signup-input" name="confirmPassword" placeholder="Confirm Password" v-model="credentials.confirmPassword" @focus="clearMessage"/>
    <div class="inline-checkbox signup-input">
          <input id='consent' type='checkbox' v-model='credentials.consent' />
          <label for='consent'><span></span>I agree to receiving site updates and related news.</label>
    </div>
    <success-warning-notice v-if="messageShow" :messaging="messaging" class="signup-input"></success-warning-notice>
  	<button type="submit" class="signup-button">Sign Up</button>
  </form>
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
      },
      messaging: null,
    }
  },
  computed: {
    idToken() {
      return this.$store.getters.currentUser.idToken
    },
    comparePasswords() {
        if (this.credentials.password !== this.credentials.confirmPassword) {
          return false
        } else {
          return true
        }     
    }
  },
  methods: {
    onSignUp: function() {
      console.log(this.comparePasswords)
      if (this.comparePasswords) {
        this.messageShow = false;
        this.messaging = null
        this.$store.dispatch('signUserUp', this.credentials)
          .then(() => {        
          }, 
          error => {
            console.log('err', error); 
            this.messageShow = true;
          })
      // saveData(1, this.credentials)
      } else {
        if (this.password === null) {
          this.messaging = {message: "You need a password", messageType: 'warning'}
          this.messageShow = true
        } else {
          this.messaging = {message: "Passwords do not match", messageType: 'warning'}
          this.messageShow = true
        }
      }
    },
    clearMessage() {
      this.messaging = null
      this.messageShow = false
    }
  },
  watch: {
    idToken(value) {
      if(value !== null && value !== undefined) {
        console.log('id', this.$store.getters.currentUser.id)
        this.takeStep(1, {id: this.$store.getters.currentUser.id})
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
