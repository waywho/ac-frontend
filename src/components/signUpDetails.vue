<template>
  <div class="">
  	<h3>Profile Details</h3>
  	<div class="row">
    	<div v-for="(detail, key, index) in details" class="col-xs-12 col-sm-6" :id="key">
    		<label class="strong label-header">{{key | camel-to-space}}</label>
    		<input v-if="key !== 'descriptions'" type="text" class="signup-input" :key="key" :name="key" :placeholder="'Enter your ' + key" v-model="details[key]" />
    		<textarea v-if="key === 'descriptions'" type="text" class="signup-input" name="name" placeholder="Your description" v-model="details.descriptions" /></textarea>
    	</div>
  	</div>

	<next-last-step v-on:click.native="updateData(1, {'details': details})" :step="'next'" class="step-container"></next-last-step>
  </div>
</template>

<script>
import nextLastStep from './nextLastStep';
import stepMixin from '../mixins/stepMixin';

export default {
  name: 'signUpStepThree',
  components: {
  	'next-last-step': nextLastStep
  },
  data () {
    return {
      details: {
      	name: "",
      	phoneNumber: "",
      	address: "",
      	city: "",
        postcode: "",
      	country: "",
      	descriptions: ""
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

#address, #descriptions {
	flex-basis: 100% !important;
	max-width: 100%;
}

textarea.signup-input {
	height: 250px;
}

.step-container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 65px auto 0px;
}
</style>
