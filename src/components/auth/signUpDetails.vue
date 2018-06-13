<template>
  <div class="">
  	<h3>Profile Details</h3>
  	<div class="row">
    	<div v-for="(detail, key, index) in details" :class="['col-xs-12', 'col-sm-6', newProfile.type === 'artist' && key === 'voiceType' ? 'companyType-hide' : 'voiceType-hide' ]" :id="key" :key="key">
        <div v-if="key !== 'descriptions' && key !== 'voiceType' && key !== 'companyType'">
      		<label class="strong label-header">{{key | camel-to-space}}</label>
      		<input type="text" class="signup-input" :key="key" :name="key" :placeholder="'Enter your ' + key" v-model="details[key]" />
        </div>
    		<div v-if="key === 'descriptions'">
          <textarea type="text" class="signup-input" name="name" placeholder="Your description" v-model="details[key]" /></textarea>
        </div>
        <div v-if="newProfile.type === 'artist' && key === 'voiceType'">
          <label class="strong label-header">{{key | camel-to-space}}</label>
          <select class="signup-input" v-model="details[key]">
            <option disabled selected value>Select a Voice Type</option>
            <option v-for="type in voiceTypes">{{type | capitalize}}</option>
          </select>
        </div>

        <div v-if="newProfile.type === 'company' && key === 'companyType'">
          <label  class="strong label-header">{{key | camel-to-space}}</label>
          <select class="signup-input" v-model="details[key]">
            <option disabled selected value>Select a Company Type</option>
            <option v-for="type in companyTypes">{{type | capitalize}}</option>
          </select>
        </div>


    	</div>
  	</div>

	<next-last-step v-on:click.native="updateData(1, {'details': details})" :step="'next'" class="step-container"></next-last-step>
  </div>
</template>

<script>
import nextLastStep from '@/components/nextLastStep';
import stepMixin from '@/mixins/stepMixin';

export default {
  name: 'signUpStepThree',
  components: {
  	'next-last-step': nextLastStep
  },
  props: {
    newProfile: Object
  },
  data () {
    return {
      voiceTypes: ['soprano', 'mezzo soprano', 'tenor', 'baritone', 'bass'],
      companyTypes: ['regional', 'national', 'touring'],
      details: {
        name: "",
        voiceType: "",
        companyType: "",
        city: "",
        provinceOrState: "",
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
@import '../../styles/style-variables';

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

.voiceType-hide#voiceType, .companytype-hide#companyType {
  display: none;
}

.step-container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 65px auto 0px;
}
</style>
