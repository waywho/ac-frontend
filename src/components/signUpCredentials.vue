<template>
  <div class="signup-form">
  	<input type="text" class="signup-input" name="profileName" placeholder="User Name" v-model="credentials.name" />
  	<input type="text" class="signup-input" name="profileEmail" placeholder="Email Address" v-model="credentials.email" />
  	<input type="password" class="signup-input" name="profilePassword" placeholder="Password" v-model="credentials.password" />
  	<div class="inline-checkbox signup-input">
          <input id='consent' type='checkbox' v-model='credentials.consent' />
          <label for='consent'><span></span>I agree to receiving site updates and related news.</label>
    </div>
  	<button class="signup-button" v-on:click="saveData(1, credentials)">Sign Up</button>
  </div>
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
