<template>
  <div class="row center-xs center-md center-lg">
  	<div class="header-section col-xs-12 col-md-10 col-lg-10">
  		<h1>Opportunity Board</h1>
  		<p>Connect with Opportunities - All Over the World.</p>
  	</div>

  	<keep-alive>
  		<component :is="component" class="opportunity-section col-xs-12 col-md-10 col-lg-10" :continents="continents" :countries="countries" :opportunity-types="opportunityTypes" :categories="categories" :subcategories="subcategories" :payment-types="paymentTypes" :selected-sort="selectedSort" :loading="loading" :opportunities="opportunities" @subcategory-change="changeSubcategories" @country-change="changeCountries" @apply-filter="filterApply" @apply-sort="sortApply" @filter-component="component = $event"></component>
  	</keep-alive>

  	<opportunity-list v-if="windowWidth >= 414" class="opportunity-list" :opportunities="opportunities" :loading="loading" :selected-sort="selectedSort" @apply-sort="sortApply"></opportunity-list>
  			
  		
  	</div>
  </div>
</template>

<script>
import oppAxios from '@/axios/axios-opportunities.js';
import opportunityList from './opportunityList';
import opportunityFilter from './opportunityFilters';
import countriesList from 'countries-list';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';
import firebaseApp from '@/firebase/init';
import opportunityFilterMixin from '@/mixins/opportunityFilterMixin';
// import axios from 'axios'

export default {
	name: 'opportunitiesBoard',
  	components: {
  		'opportunity-list': opportunityList,
  		'opportunity-filter': opportunityFilter
	},
  	data () {
    	return {
	    	windowWidth: 0,
	    	component: 'opportunity-filter',
	    	loading: true,
	    	countries: null,
	    	opportunities: null,
	    	continents: countriesList.continents,
	    	selectedCategory: null,
	    	selectedFilters: [],
	    	selectedSort: 'created_at DESC'
	    }
	},
	mixins: [opportunityFilterMixin],
	methods: {
		changeCountries: function(continent) {
	  		let countryList = []
	  		for (var country in countriesList.countries) {
	  			if(countriesList.countries[country].continent === continent) {
	  				countryList.push(countriesList.countries[country].name)
	  			}
	  		}
	  		
	  		this.countries = countryList.sort();
  		},
	  	getWindowWidth(event) {
	        this.windowWidth = document.documentElement.clientWidth;
	    },
		filterApply: function(filters) {
	 		this.opportunities = null
	 		this.loading = true
	 		this.selectedFilters = filters
	 		let filterParams = {}
	 		filterParams['idToken'] = this.$store.getters.currentUser.idToken
	 		filterParams['page'] = 1
	 		filterParams['sort'] = this.selectedSort

	 		Object.assign(filterParams, filters)
	 		// console.log(filterParams)

	 		oppAxios.get('opportunities.json', {
	 			params: filterParams
	 		}).then(res => {
	 			// console.log(res)
	 			this.opportunities = res.data
	 			if(this.windowWidth <= 413) {this.component = 'opportunity-list'}
	 			this.loading = false
	 		}).catch(error => {
	 			console.log(error)
	 			this.loading = true
	 		})
		},
		sortApply: function(selectedSort) {
			// console.log(selectedSort)
	 		this.opportunities = null
	 		this.loading = true
	 		oppAxios.get('opportunities.json', {
	 			params: {
	  				idToken: this.$store.getters.currentUser.idToken,
	  				page: 1,
	  				region: this.selectedFilters.region,
	  				country: this.selectedFilters.country,
	  				opportunity_type: this.selectedFilters.opportunity_type,
	  				payment_type: this.selectedFilters.payment_type,
	  				category_list: this.selectedFilters.category_list,
	  				subcategory_list: this.selectedFilters.subcategory_list,
	  				sort: selectedSort
	 			}
	 		}).then(res => {
	 			this.opportunities = res.data
	 			this.selectedSort = selectedSort
	 			this.loading = false
	 		}).catch(error => {
	 			console.log(error)
	 			this.loading = true
	 		})
		}
	},
	beforeRouteEnter (to, from, next) {
	  next(vm => {
	    // access to component instance via `vm`
	    // console.log('beforeRouteEnter')
	    let user = firebaseApp.auth().currentUser
        if(user) {
            // console.log('user')
            // user signed in proceed
            next()

        } else {
            // console.log('no user')
            //no user signed in redirect to signin
            next("/")
        }
	  })
	},
	created() {

		if(this.$store.getters.currentUser.idToken) {
			this.$store.dispatch('resetToken').then(() => {
			// console.log('reset token!')
				oppAxios.get('opportunities.json', {
		  			params: {
		  				idToken: this.$store.getters.currentUser.idToken,
		  				page: 1
		  			}
		  		}).then(res => {
		  			// console.log(res)
		  			this.opportunities = res.data
		  			this.loading = false
		  		}).catch(error => {
		  			console.log(error)
		  			this.loading = false
		  		})

				}).catch(error => {
					this.$router.push("/")
				})

		} else {
			// alert('Please sign in')
			// this.$router.push("/")
		}
		
	},
	mounted() {
	  	this.$nextTick(function() {
	      window.addEventListener('resize', this.getWindowWidth);

	      //Init
	    	this.getWindowWidth()
		})
	},
	beforeDestroy() {
	  window.removeEventListener('resize', this.getWindowWidth);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.header-section {
	background-color: white;
	margin-top: 50px;
	margin-bottom: 24px;
	padding: 20px 20px;
}


.opportunity-section, .opportunity-list {
	background-color: white;
	padding: 0px 40px 40px;
	margin: 0px 0px 24px 0px;
	text-align: left;
}

</style>
