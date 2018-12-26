<template>
  <div class="create-panel">
    <div class="create-panel-inner">
    <h2>Opportunity</h2>
      <span class="is-gold"><b>Create Your Opportunities</b></span>
      <opportunity-back @click.native="$emit('back-start')"></opportunity-back>
      <h3>{{stepHeading | capitalize}}</h3>
      <progress-bar v-if="currentStep !== 3" class="progressbar-left" :current-step="currentStep" :setup-steps="setupSteps"></progress-bar>
      <transition name="fade" mode="out-in">
        <div v-if="currentStep > 0 && currentStep !== 3" class="is-lightgray small text-button back-button" @click="backStep"><i class="fa fa-chevron-left" aria-hidden="true" key="backButton"></i>Back to {{lastStep}}</div>
        <div v-else class="back-button small" key="home">Select opportunity types to begin</div>
      </transition>
      <transition name="fade" mode="out-in">
        <keep-alive>
          
          <component :is="stepComponent" ref="opportunitySteps" :continents="continents" :countries="countries" :opportunity-types="opportunityTypes" :categories="categories" :subcategories="subcategories" :payment-types="paymentTypes" :opp="opportunity" :postedOpp="postedOpportunity" @subcategory-change="changeSubcategories" @country-change="changeCountries" @send-data="addData" @post-opportunity="opportunityPost" :mode="mode"></component>
        
        </keep-alive>
      </transition>
    </div>
      <div v-if="currentStep < 2" class="opportunity-next is-silver" @click="nextStep">
        <i class="fa fa-chevron-right" style="font-size: 40px;" aria-hidden="true"></i>
      </div>


    <div v-if="currentStep < 2" class="bottom-button bottom-button-next is-silver" @click="nextStep">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>{{nextStepHeading}}
    </div>

    <div v-if="stepComponent === 'opportunity-complete'" class="is-darkgray middle-xs middle-md middle-lg row bottom-button" @click="newOpportunity">
      <i class="fa fa-chevron-right" aria-hidden="true"></i>Create new opportunity
    </div>

  </div>
</template>

<script>

import opportunityFilters from './opportunityFilters';
import opportunityDetails from './opportunityDetails';
import opportunityReview from './opportunityReview';
import opportunityComplete from './opportunityComplete';
import opportunityBack from './opportunityBack';
import countriesList from 'countries-list';
import progressBar from '@/components/progressBar';
import opportunityFilterMixin from '@/mixins/opportunityFilterMixin';
// import axios from 'axios'; // for dev

export default {
  name: 'opportunity',
  components: {
    'opportunity-filters': opportunityFilters,
    'opportunity-details': opportunityDetails,
    'opportunity-review': opportunityReview,
    'opportunity-complete': opportunityComplete,
    'opportunity-back': opportunityBack,
    'progress-bar': progressBar
  },
  mixins: [opportunityFilterMixin],
  data () {
    return {
      currentStep: 0,
      continents: countriesList.continents,
      countries: null,
      opportunity: {},
      postedOpportunity: {},
      mode: 'inputMode',
      setupSteps: [{heading: 'Create Opportunity', component: 'opportunity-filters'}, {heading: 'Opportunity Details', component: 'opportunity-details'}, {heading: 'Review Details', component: 'opportunity-review'}, {heading: null, component: 'opportunity-complete'}]
    }
  },
  computed: {
   stepHeading: function() {
      if(this.currentStep === 1) {
        return this.opportunity.opportunity_type
      } else {
        return this.setupSteps[this.currentStep].heading
      }
   },
   stepComponent: function() {
      return this.setupSteps[this.currentStep].component
   },
   lastStep: function() {
      var lastStep = this.currentStep - 1
      return this.setupSteps[lastStep].heading
   },
   nextStepHeading: function() {
      var lastStep = this.currentStep + 1
      return this.setupSteps[lastStep].heading
   }
  },
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
    nextStep: function() {
      this.$refs.opportunitySteps.sendData();
    },
    backStep: function() {
      this.currentStep -= 1
    },
    addData: function(data) {
      // console.log(data)
      Object.assign(this.opportunity, data)
      this.currentStep += 1
    },
    newOpportunity: function() {
      this.opportunity = {}
      this.currentStep = 0
    },
    opportunityPost: function() {
      this.$store.dispatch('postOpportunity', {idToken: this.$store.getters.currentUser.idToken, opportunity: this.opportunity}).then(res => {
          // console.log(res)
          this.opportunity = {}
          this.postedOpportunity = res.data
          this.currentStep += 1

        }).catch(error => {
          console.log(error)
        })
    }
  },
  created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';
.create-panel {
  min-height: 100%;
  height: 100%;
}

.back-button {
  margin-bottom: 25px;
}
.back-button i {
  margin-right: 1rem;
}


.bottom-button {
  display: flex;
  background: #f6f3ed;
  cursor: pointer;
  height: 72px;
  display: flex;
  align-items: center;
  padding-left: 100px;
  font-weight: bold;
  margin-left: -$body-padding-small;
  margin-right: -$body-padding-small;
}

.bottom-button i {
  margin-right: 40px;
}



.progressbar-left {
  justify-content: left !important;
}

.opportunity-next {
  display: none;
}


@media all and (min-width: $bp-med) {
  .create-panel {
    height: 325px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-right: -$body-padding-small;
  }

  .create-panel-inner {
    margin-right: 20px;
    width: 90%;
    flex-basis: auto;
    flex-grow: 2;
  }

  .opportunity-next {
    background: #f6f3ed;
    cursor: pointer;
    height: $tool-panel-height;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    max-width: 67px;
    flex-basis: auto;
  }

  .opportunity-next:hover, .bottom-button:hover {
    background: #ecddba;
    color: white;
  }


  .bottom-button-next {
    display: none;
  }




}
</style>
