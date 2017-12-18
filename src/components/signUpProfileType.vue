<template>
  <div class="">
  	<h3>Account Type</h3>
		<div v-for="profileType in profileTypes" :class="[type === profileType.name ? 'selected' : '',  'inputbox-container']" v-on:click="type = profileType.name">
			<div class="checkbox-group">
				<input :id="profileType.name" type='radio' :value="profileType.name" v-model='type' />
	          	<label :for="profileType.name" class="medium">{{profileType.name | capitalize }}</label>
          	</div>
          	<span class="small color-lightgray option-hint">{{profileType.description}}</span>
        </div>
		<next-last-step v-on:click.native="takeStep(1, type)" :step="'next'" class="step-container"></next-last-step>
  </div>
</template>

<script>
import nextLastStep from './nextLastStep'
import stepMixin from '../mixins/stepMixin';

export default {
  name: 'signUpStepTwo',
  components: {
  	'next-last-step': nextLastStep
  },
  data () {
    return {
      type: "",
      profileTypes: [
      	{
      		name: "company",
      		description: "as an opera company, we offer you company specific tools to help succeed."
      	},
      	{
      		name: "artist",
      		description: "as an artist, you can connect with opera companies."
      	}
      ]
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


.step-container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 65px auto 0px;
}

</style>
