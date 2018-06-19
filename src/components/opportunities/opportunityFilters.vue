<template>
	<div class="">
  		<h2 v-if="mode !== 'inputMode'">Personalize Your Opportunities</h2>
  		<p v-if="mode !=='inputMode'">Select your preferences below to filter opportunities.</p>
  		<div class="row filters-panel">
  			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 options-selector">
  				<label>Region</label>
  				<select v-model="selectedFilters.region" @change="selectorEnable($event, 'country')" @focus="showMessage = false">
  					<option v-if="mode !== 'inputMode'" value="all">All</option>
  					<option v-for="(continent, key) in continents" :value="key">{{continent}}</option>
  				</select>
  			</div>
  			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 options-selector">
  				<label>Country</label>
  				<select v-model="selectedFilters.country" :disabled="countryDisable" @focus="showMessage = false">
  					<option v-if="mode !== 'inputMode'"value="all">All</option>
  					<option v-for="country in countries" :value="country">{{country}}</option>
  				</select>
  			</div>
  			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 options-selector">
  				<label>Opportunity Type</label>
  				<select v-model="selectedFilters.opportunity_type" @focus="showMessage = false">
  					<option v-if="mode !== 'inputMode'" value="all">All</option>
  					<option v-for="type in opportunityTypes" :value="type">{{type | capitalize}}</option>
  				</select>
  			</div>
  			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 options-selector">
  				<label>Category</label>
  				<select :multiple="mode === 'inputMode'" v-model="selectedFilters.category_list" @change="selectorEnable($event, 'subcategory')" @focus="showMessage = false">
  					<option v-if="mode !== 'inputMode'" value="all">All</option>
  					<option v-for="category in categories" :value="category">{{category | capitalize}}</option>
  				</select>
  			</div>
  			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 options-selector">
  				<label>Subcategory</label>
  				<select :multiple="mode === 'inputMode'" v-model="selectedFilters.subcategory_list" :disabled="subcategoryDisable" @focus="showMessage = false">
  					<option v-if="mode !== 'inputMode'" value="all">All</option>
  					<option v-for="subcategory in subcategories" :value="subcategory">{{subcategory | capitalize}}</option>
  				</select>
  			</div>
  			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 options-selector">
  				<label>Payment Type</label>
  				<select v-model="selectedFilters.payment_type" @focus="showMessage = false">
  					<option v-if="mode !== 'inputMode'" value="all">All</option>
  					<option v-for="type in paymentTypes" :value="type">{{type | capitalize}}</option>
  				</select>
  			</div>
  		</div>
      <div v-if="mode === 'inputMode'"><success-warning-notice v-if="showMessage" :messaging="messaging"></success-warning-notice></div>
  		<button @click="applyFilter" v-if="mode !== 'inputMode'" class="filter-button"><i class="fa fa-chevron-right" aria-hidden="true"></i>View Search Results</button>
  	</div>
</template>

<script>
import validateFormMixin from '@/mixins/validateFormMixin'
import successWarningNotice from '@/components/successWarningNotice'

export default {
  name: 'opportunityFilters',
  components: {
    successWarningNotice,
  },
  mixins: [validateFormMixin],
  props: {
  	   continents: Object,
  	   opportunityTypes: Array,
  	   categories: Array,
  	   subcategories: Array,
  	   paymentTypes: Array,
  	   countries: Array,
       mode: String
  },
  data () {
    return {
      showMessage: false,
      messaging: {
        message: '',
        messageType: ''
      },
    	selectedFilters: {
    		region: '',
	    	country: '',
	    	opportunity_type: '',
	    	category_list: ['all'],
	    	subcategory_list: ['all'],
	    	payment_type: ''
    	},
    	subcategoryDisable: true,
    	countryDisable: true
    }
  },
  methods: {
   	selectorEnable(event, selector) {
   		if(event.target.value !== "all") {
   			this.$emit(selector + '-change', event.target.value)
   			this[selector+'Disable'] = false
   		} else {
   			this[selector+'Disable'] = true
   			this[selector + 'Selected'] = "all"
   		}
  	},
  	applyFilter: function() {
  		this.$emit("apply-filter", this.selectedFilters)
  	},
    sendData: function() {
      console.log(this.anyEmpty(this.selectedFilters))

      if(this.anyEmpty(this.selectedFilters)) {
        this.messaging.message = 'all fields are required'
        this.messaging.messageType = 'warning'
        this.showMessage = true
      } else {
        this.$emit("send-data", this.selectedFilters)
      }

    }
  },
  created() {
		this.opportunityTypes = this.$store.state.opportunityTypes
		this.paymentTypes = this.$store.state.paymentTypes
    if(this.mode !== 'inputMode') {
      this.selectedFilters.region = 'all'
      this.selectedFilters.country = 'all'
      this.selectedFilters.opportunity_type = 'all'
      this.selectedFilters.paymentType = 'all'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.filters-panel {
  height: 100%;
}

.options-selector {
	margin-bottom: 40px;
}

.options-selector label {
	font-weight: bold;
}

.filter-button i {
  margin-right: 12px;
}

.message-container {
  height: 30px;
}
</style>
