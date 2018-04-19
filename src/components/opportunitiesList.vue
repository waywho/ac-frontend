<template>
  <div class="row center-xs center-md center-lg">
  	<div class="header-section col-xs-12 col-md-10 col-lg-10">
  		<h1>Opportunity Board</h1>
  		<p>Connect with Opportunities - All Over the World.</p>
  	</div>
  	<div class="opportunity-section col-xs-12 col-md-10 col-lg-10">
  		<h2>Personalize Your Opportunities</h2>
  		<p>Select your preferences below to filter opportunities.</p>
  		<div class="row">
  			<div class="col-xs-4 col-md-4 col-lg-4 options-selector">
  				<label>Region</label>
  				<select v-model="selectedContinent" @change="selectorEnable($event, 'country')">
  					<option value="all">All</option>
  					<option v-for="(continent, key) in continents" :value="key">{{continent}}</option>
  				</select>
  			</div>
  			<div class="col-xs-4 col-md-4 col-lg-4 options-selector">
  				<label>Country</label>
  				<select v-model="countrySelected" :disabled="countryDisable">
  					<option value="all">All</option>
  					<option v-for="country in countries" :value="country">{{country}}</option>
  				</select>
  			</div>
  			<div class="col-xs-4 col-md-4 col-lg-4 options-selector">
  				<label>Opportunity Type</label>
  				<select v-model="selectedOpportunityType">
  					<option value="all">All</option>
  					<option v-for="type in opportunityTypes" :value="type">{{type | capitalize}}</option>
  				</select>
  			</div>
  			<div class="col-xs-4 col-md-4 col-lg-4 options-selector">
  				<label>Category</label>
  				<select v-model="selectedCategory" @change="selectorEnable($event, 'subcategory')">
  					<option value="all">All</option>
  					<option v-for="category in categories" :value="category">{{category | capitalize}}</option>
  				</select>
  			</div>
  			<div class="col-xs-4 col-md-4 col-lg-4 options-selector">
  				<label>Subcategory</label>
  				<select v-model="subcategorySelected" :disabled="subcategoryDisable">
  					<option value="all">All</option>
  					<option v-for="subcategory in subcategories" :value="subcategory">{{subcategory | capitalize}}</option>
  				</select>
  			</div>
  			<div class="col-xs-4 col-md-4 col-lg-4 options-selector">
  				<label>Payment Type</label>
  				<select v-model="selectedPaymentType">
  					<option value="all">All</option>
  					<option v-for="type in paymentTypes" value="type">{{type | capitalize}}</option>
  				</select>
  			</div>
  		</div>
  		<button @click="applyFilter"><i class="fa fa-chevron-right" aria-hidden="true"></i> View Search Results</button>
  	</div>
  	<div class="opportunity-section col-xs-12 col-md-10 col-lg-10">
  		<h3>Opportunity Board Search Results</h3>
  		<p>Based on your selected criteria, opportunities are listed below. Click on the opportunities to apply</p>
  		<div class="opportunity-list row center-md center-lg top-md top-lg">
	  		<div class="opportunity-post col-xs-12 col-md-12 col-lg-12 row" v-for="op in opportunities" v-on:click="showOp(op)">
	  			<div class="col-md-2 col-lg-2 opportunity-icon"><small><i class="fa fa-globe" aria-hidden="true"></i> {{op.region}}</small></div> 
	  			<div class="col-md-2 col-lg-2 opportunity-icon"><small><i class="fa fa-flag-o" aria-hidden="true"></i> {{op.country}}</small></div>
	  			<div class="col-md-3 col-lg-3 opportunity-icon"><small><i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{op.opportunity_type | capitalize}}</small></div>
	  			<div class="col-md-2 col-lg-2 opportunity-icon"><small><i class="fa fa-bookmark" aria-hidden="true"></i> {{op.category_list.toString() | capitalize}}</small></div>
	  			<div class="col-md-2 col-lg-2 opportunity-icon"><small><i class="fa fa-check-square" aria-hidden="true"></i> {{op.payment_type | capitalize}}</small></div>
	  			<div class="col-md-1 col-lg-1"></div>

	  			<div class="col-md-2 col-lg-2 opportunity-date">
  					<div v-if="op.deadline">
  						<span class="large-date">{{op.deadline | moment("DD")}}</span><br />
  						<span class="large-month">{{op.deadline | moment("MMM").toUpperCase()}}</span>
  					</div>
  					<div class="large-date" v-else>TBA</div>
  					<div><small>Application Deadline</small></div>
	  			</div>

	  			<div class="col-md-8 col-lg-8">
		  			<div class="opportunity-company">{{op.company}}</div>
		  			<div class="opportunity-title">{{op.title}}</div>
		  			<span class="opportunity-description"><small>{{op.description | truncate(90)}}</small></span>
	  			</div>
	  			<div class="col-md-2 col-lg-2 row center-md center-lg middle-md middle-lg">
	  				<button class="apply-button"><i class="fa fa-chevron-right" aria-hidden="true"></i> More Info</button>
	  			</div>
	  		</div>
	  		<opportunity-post v-if="showOpportunity === true" v-bind:opp="currentOpportunity" @close="showOpportunity = false"></opportunity-post>
  		</div>
  	</div>
  </div>
</template>

<script>
import oppAxios from '../axios-opportunities.js';
import opportunityPost from './opportunityPost';
import countriesList from 'countries-list';

export default {
  name: 'opportunitiesList',
  components: {
  	'opportunity-post': opportunityPost
  },
  data () {
    return {
    	opportunities: null,
    	showOpportunity: false,
    	currentOpportunity: null,
    	continents: [],
    	selectedContinent: 'all',
    	countrySelected: 'all',
    	selectedOpportunityType: 'all',
    	selectedCategory: 'all',
    	subcategorySelected: 'all',
    	selectedPaymentType: 'all',
    	opportunityTypes: null,
    	categories: null,
    	paymentTypes: null,
    	subcategoryDisable: true,
    	countryDisable: true
    }
  },
  computed: {
  	countries: function() {
  		let countryList = []
  		for (var country in countriesList.countries) {
  			if(countriesList.countries[country].continent === this.selectedContinent) {
  				countryList.push(countriesList.countries[country].name)
  			}
  		}
  		
  		return countryList.sort();
  	},
  	 subcategories: function() {
 		return this.$store.state.categorySubcategories[this.selectedCategory]
 	}
  },
  methods: {
 	showOp: function(opportunity) {
 		this.currentOpportunity = opportunity
 		this.showOpportunity = true
 	},
 	selectorEnable(event, selector) {
 		if(event.target.value !== "all") {
 			this[selector+'Disable'] = false
 		} else {
 			this[selector+'Disable'] = true
 			this[selector + 'Selected'] = "all"
 		}
 	},
 	applyFilter: function() {
 		oppAxios.get('opportunities.json', {
 			params: {
  				idToken: this.$store.getters.currentUser.idToken,
  				page: 1,
  				region: countriesList.continents[this.selectedContinent],
  				country: this.countrySelected,
  				opportunity_type: this.selectedOpportunityType,
  				payment_type: this.selectedPaymentType,
  				category: this.selectedCategory,
  				subcategory: this.subcategorySelected
 			}
 		}).then(res => {
 			console.log(res)
 			this.opportunities = res.data
 		})
 	}
  },
  created() {
  	oppAxios.get('opportunities.json', {
  			params: {
  				idToken: this.$store.getters.currentUser.idToken,
  				page: 1
  			}

  		}).then(res => {
  			// console.log(res)
  			this.opportunities = res.data
  		}).catch(error => {
  			console.log(error)
  		})
  	this.continents = countriesList.continents
	this.opportunityTypes = this.$store.state.opportunityTypes
	this.categories = Object.keys(this.$store.state.categorySubcategories)
	this.paymentTypes = this.$store.state.paymentTypes
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.header-section {
	background-color: white;
	margin-top: 50px;
	margin-bottom: 24px;
	padding: 20px 20px;
}

.options-selector {
	margin-bottom: 40px;
}

.options-selector label {
	font-weight: bold;
}

.opportunity-section {
	background-color: white;
	padding: 0px 40px 40px;
	margin: 0px 0px 24px 0px;
	text-align: left;
}

.opportunity-list {
	height: 800px;
	overflow-y: scroll;
}

.opportunity-post {
	background-color: #faf6f6;
	text-align: left;
	margin-bottom: 20px;
	height: 200px;
	padding: 15px 15px;
}

.opportunity-post:hover, .opportunity-post:hover .opportunity-icon,
.opportunity-post:hover .opportunity-company, .opportunity-post:hover .opportunity-title,
.opportunity-post:hover .opportunity-description {
	background-color: $color-gold;
	cursor: pointer;
	color: white;
}

.opportunity-post:hover .apply-button {
	background-color: white;
	cursor: pointer;
	color: $color-gold;
}

.opportunity-icon {
	color: $color-gold;
	font-weight: bold;
	margin-bottom: 45px;
}

.opportunity-date {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-weight: bold;
}

.opportunity-company {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 5px;
	color: $color-gold;
}

.opportunity-title {
	font-size: 20px;
	font-weight: bold;
	color: $color-darkgray;
	margin-bottom: 14px;
}

.opportunity-description {
	color: $color-darkgray;
}

.large-date {
	font-size: 40px;
	font-weight: bold;
}

.large-month {
	font-size: 24px;
	font-weight: bold;
}
</style>
