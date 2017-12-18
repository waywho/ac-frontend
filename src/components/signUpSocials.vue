<template>
  <div class="">
  	<h3>Social</h3>
  	<p>Please enter your social network profiles</p>
  	<div class='row'>
	  	<div v-for="(social, key, index) in socials" class="col-sm-6 col-xs-12 social-form">
	  		<label class="strong">{{key | capitalize}}</label>
	  		<input type="text" class="signup-input" :key="key" :name="key" placeholder="Enter Your Profile URL" v-model="socials[key]" />
	  	</div>
  	</div>
  	<next-last-step v-on:click.native="takeStep(1, socials)" :step="'next'" class="step-container"></next-last-step>
  </div>
</template>

<script>
import nextLastStep from './nextLastStep'
import stepMixin from '../mixins/stepMixin';

export default {
  name: 'signUpStepThree',
  components: {
  	'next-last-step': nextLastStep
  },
  data () {
    return {
      socials: {
      	facebook: "",
      	twitter: "",
      	linkedin: "",
      	instagram: "",
      	youtube: "",
      	vimeo: ""
      }
    }
  },
  mixins: [stepMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';
.subheadline {
	margin-bottom: 65px;
}

.signup-input {
	margin-top: 15px;
	margin-bottom: 34px;
}

.social-form {
	text-align: left;
}

.step-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 65px auto 0px;
}
</style>
