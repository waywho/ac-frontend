<template>
  <form class="signup-form" @submit.prevent="onSignUp">
  	<input type="text" class="signup-input" name="profileEmail" placeholder="Email Address" v-model="credentials.email" />
  	<input type="password" class="signup-input" name="profilePassword" placeholder="Password" v-model="credentials.password" />
    <div class="warning form-warning">{{comparePasswords}}</div>
    <input type="password" class="signup-input" name="confirmPassword" placeholder="Confirm Password" v-model="credentials.confirmPassword"/>
    <div class="inline-checkbox signup-input">
          <input id='consent' type='checkbox' v-model='credentials.consent' />
          <label for='consent'><span></span>I agree to receiving site updates and related news.</label>
    </div>
  	<button type="submit" class="signup-button">Sign Up</button>
  </form>
</template>

<script>

import stepMixin from '../mixins/stepMixin';

export default {
  name: 'signUpStepOne',
  data () {
    return {
      credentials: {
      	consent: true
      }
    }
  },
  computed: {
    comparePasswords() {
      return this.credentials.password !== this.credentials.confirmPassword ? 'Passwords do not match' : ''
    },
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    onSignUp: function() {
      this.$store.dispatch('signUserUp', this.credentials)
      // saveData(1, this.credentials)
    }
  },
  watch: {
    user(value) {
      if(value !== null && value !== undefined) {
        this.takeStep(1, null)
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
