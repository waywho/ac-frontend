<template>
  <form class="signup-form" v-on:submit.prevent="onSignUp">
  	<input type="email" class="signup-input" name="profileEmail" placeholder="Email Address" v-model="credentials.email" @input="$emit('update:email', credentials.email)" @focus="clearMessage"/>
  	<input type="password" class="signup-input" name="profilePassword" placeholder="Password with 6 or more characters" v-model="credentials.password" @focus="clearMessage"/>
    <input type="password" class="signup-input" name="confirmPassword" placeholder="Confirm Password" v-model="credentials.confirmPassword" @focus="clearMessage"/>
    <div class="inline-checkbox signup-input">
          <input id='consent' type='checkbox' v-model='credentials.consent' @input.lazy="$emit('update:consent', credentials.consent)" />
          <label for='consent'><span></span>I agree to receiving site updates and related news.</label>
    </div>
    <success-warning-notice v-if="messageShow" :messaging="messaging" class="signup-input"></success-warning-notice>
    <div class="button-container">
      <button type="submit" class="signup-button">Sign Up</button>
    </div>
  </form>
</template>

<script>
import stepMixin from '@/mixins/stepMixin';
import successWarningNotice from '@/components/successWarningNotice'; 

export default {
  name: 'signUpCredentials',
  components: {
    'success-warning-notice': successWarningNotice
  },
  props: {
    email: String,
    consent: Boolean
  },
  data () {
    return {
      messageShow: false,
      credentials: {
        email: null,
      	consent: true,
        password: null,
        confirmPassword: null
      },
      messaging: {
        message: null,
        messageType: null
      },
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
      // console.log(this.comparePasswords)
      if (this.comparePasswords) {
        this.messageShow = false;
        this.messaging.message = null
        this.messaging.messageType = null
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
          this.messaging.message = "You need a password"
          this.messaging.messageType = 'warning'
          this.messageShow = true
        } else {
          this.messaging.message = "Passwords do not match"
          this.messaging.messageType = 'warning'
          this.messageShow = true
        }
      }
    },
    clearMessage() {
      this.messaging.message = null
      this.messaging.messageType = null
      this.messageShow = false
    }
  },
  watch: {
    idToken(value) {
      if(value !== null && value !== undefined) {
        // console.log('id', this.$store.getters.currentUser.id)
        this.$emit('successful-signup')
      }
    }
  },
  mixins: [stepMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.subheadline {
	margin-bottom: 65px;
}

.signup-input {
	margin-bottom: 34px;
  display: block;
}

.button-container {
  text-align: center;
}

.signup-button {
  margin: auto auto;
  text-align: center;
}
</style>
