<template>
  <div class="">
  	<h3>Profile Details</h3>
  	<div class="row">
    	<div v-for="(detail, key, index) in details" class="col-xs-12 col-sm-6" :id="key" :key="key">
        <div v-if="key !== 'descriptions' && key !== 'role' && key !== 'country'">
      		<label class="strong label-header">{{key | camel-to-space}}</label>
      		<input type="text" class="signup-input" :key="key" :name="key" :placeholder="'Enter ' + type +' ' + key" v-model="details[key]" />
        </div>
    		<div v-if="key === 'descriptions'" class="description-input-kit">
          <label class="strong label-header">{{key | camel-to-space}}</label>
          <textarea type="text" class="signup-input" name="name" :placeholder="'Enter ' + type + ' descriptions'" v-model="currentDetails[key]" rows="7" maxlength="160" /></textarea>
          <span class="smaller word-count is-gold">{{160 - currentDetails.descriptions.length}}</span>
        </div>
        <div v-if="key === 'country'">
          <label class="strong label-header">{{key | camel-to-space}}</label>
          <select class="signup-input" v-model="details[key]">
            <option disabled selected value>Select a Country</option>
            <option v-for="country in countries" :value="country">{{country | capitalize}}</option>
          </select>
        </div>
        <div v-if="type === 'artist' && key === 'role'">
          <label class="strong label-header">{{key | camel-to-space}}</label>
          <select class="signup-input" v-model="details[key]">
            <option disabled selected value>Select a Voice Type</option>
            <option v-for="type in voiceTypes" :value="type">{{type | capitalize}}</option>
          </select>
        </div>

        <div v-if="type === 'company' && key === 'role'">
          <label  class="strong label-header">{{key | camel-to-space}}</label>
          <select class="signup-input" v-model="details[key]">
            <option disabled selected value>Select a Company Type</option>
            <option v-for="type in companyTypes" :value="type">{{type | capitalize}}</option>
          </select>
        </div>
    	</div>
  	</div>
  </div>
</template>

<script>
import countriesList from 'countries-list';
import _ from 'lodash';

export default {
  name: 'signUpcurrentDetails',
  props: {
    details: Object,
    type: String
  },
  data () {
    return {
      voiceTypes: ['soprano', 'mezzo soprano', 'tenor', 'baritone', 'bass'],
      companyTypes: ['regional company', 'national company', 'touring company', 'other'],
      currentDetails: {
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
  computed: {
    countries: function() {
      let countryList = Object.values(countriesList.countries).map(country => {
        return country.name
      })

      countryList = _.sortBy(countryList)
      return countryList
    }
  },
  created() {
    console.log(countriesList)
  }
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

.description-input-kit {
  position: relative;
}

.word-count {
  position: absolute;
  z-index: 2;
  bottom: 0.5rem;
  right: 2rem;
}




.step-container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 65px auto 0px;
}
</style>
