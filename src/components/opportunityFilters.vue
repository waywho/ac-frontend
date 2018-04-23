<template>
	<div class="col-xs-12 col-md-10 col-lg-10">
  		<h2>Personalize Your Opportunities</h2>
  		<p>Select your preferences below to filter opportunities.</p>
  		<div class="row">
  			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 options-selector">
  				<label>Region</label>
  				<select v-model="filters.selectedContinent" @change="selectorEnable($event, 'country')">
  					<option value="all">All</option>
  					<option v-for="(continent, key) in continents" :value="key">{{continent}}</option>
  				</select>
  			</div>
  			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 options-selector">
  				<label>Country</label>
  				<select v-model="filters.countrySelected" :disabled="countryDisable">
  					<option value="all">All</option>
  					<option v-for="country in countries" :value="country">{{country}}</option>
  				</select>
  			</div>
  			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 options-selector">
  				<label>Opportunity Type</label>
  				<select v-model="filters.selectedOpportunityType">
  					<option value="all">All</option>
  					<option v-for="type in opportunityTypes" :value="type">{{type | capitalize}}</option>
  				</select>
  			</div>
  			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 options-selector">
  				<label>Category</label>
  				<select v-model="filters.selectedCategory" @change="selectorEnable($event, 'subcategory')">
  					<option value="all">All</option>
  					<option v-for="category in categories" :value="category">{{category | capitalize}}</option>
  				</select>
  			</div>
  			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 options-selector">
  				<label>Subcategory</label>
  				<select v-model="filters.subcategorySelected" :disabled="subcategoryDisable">
  					<option value="all">All</option>
  					<option v-for="subcategory in subcategories" :value="subcategory">{{subcategory | capitalize}}</option>
  				</select>
  			</div>
  			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 options-selector">
  				<label>Payment Type</label>
  				<select v-model="filters.selectedPaymentType">
  					<option value="all">All</option>
  					<option v-for="type in paymentTypes" value="type">{{type | capitalize}}</option>
  				</select>
  			</div>
  		</div>
  		<button @click="applyFilter"><i class="fa fa-chevron-right" aria-hidden="true"></i> View Search Results</button>
  	</div>
</template>

<script>

export default {
  name: 'opportunityFilters',
  props: {
  	   continents: Object,
  	   opportunityTypes: Array,
  	   categories: Array,
  	   subcategories: Array,
  	   paymentTypes: Array,
  	   countries: Array
  },
  data () {
    return {
    	filters: {
    		selectedContinent: 'all',
	    	countrySelected: 'all',
	    	selectedOpportunityType: 'all',
	    	selectedCategory: 'all',
	    	subcategorySelected: 'all',
	    	selectedPaymentType: 'all',
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
  		this.$emit("apply-filter", this.filters)
  	}
  },
  created() {
		this.opportunityTypes = this.$store.state.opportunityTypes
		this.paymentTypes = this.$store.state.paymentTypes
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.options-selector {
	margin-bottom: 40px;
}

.options-selector label {
	font-weight: bold;
}
</style>
