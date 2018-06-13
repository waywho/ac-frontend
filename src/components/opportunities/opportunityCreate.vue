<template>
  <div>
    <div class="row">
      <div class="col-xs col-sm col-md col-lg tool-panel-left-padding">
      <h2>Opportunity</h2>
      <span class="is-golden"><b>Create Your Opportunities</b></span>
        <h3>{{stepHeading | capitalize}}</h3>
          <ul class="progress-bar" v-if="currentStep !== 3" >
            <li v-for="(step, index) in setupSteps" v-if="index !== 3" :class="[{active: currentStep === index}, 'small']"><span>{{index + 1}}</span></li>
          </ul>
        <transition name="fade" mode="out-in">
          <div v-if="currentStep > 0 && currentStep !== 3" class="is-lightgray small text-button back-button" @click="backStep"><i class="fa fa-chevron-left" aria-hidden="true" key="backButton"></i>Back to {{lastStep}}</div>
          <div v-else class="back-button small" key="home">Select opportunity types to begin</div>
        </transition>
        <transition name="fade" mode="out-in">
          <keep-alive>
            
            <component :is="stepComponent" ref="opportunitySteps" class="inner-panel-padding" :continents="continents" :countries="countries" :opportunity-types="opportunityTypes" :categories="categories" :subcategories="subcategories" :payment-types="paymentTypes" :opp="opportunity" :postedOpp="postedOpportunity" @subcategory-change="changeSubcategories" @country-change="changeCountries" @send-data="addData" @post-opportunity="opportunityPost" :mode="mode"></component>
          
          </keep-alive>
        </transition>
      </div>
      <div v-if="currentStep < 2" class="col-xs-2 col-sm-1 col-md-1 col-lg-1 opportunity-next is-silver" @click="nextStep">
        <i class="fa fa-chevron-right" style="font-size: 40px;" aria-hidden="true"></i>
      </div>
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
import countriesList from 'countries-list';
// import axios from 'axios'; // for dev

export default {
  name: 'opportunity',
  components: {
    'opportunity-filters': opportunityFilters,
    'opportunity-details': opportunityDetails,
    'opportunity-review': opportunityReview,
    'opportunity-complete': opportunityComplete
  },
  props: {
   
  },
  data () {
    return {
      currentStep: 0,
      continents: countriesList.continents,
      countries: null,
      opportunity: {},
      postedOpportunity: {},
      opportunityTypes: null,
      categories: null,
      subcategories: null,
      paymentTypes: null,
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
    changeSubcategories: function(selected) {
      this.subcategories = this.$store.state.categorySubcategories[selected]
    },
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
      console.log(data)
      Object.assign(this.opportunity, data)
      this.currentStep += 1
    },
    newOpportunity: function() {
      this.opportunity = {}
      this.currentStep = 0
    },
    opportunityPost: function() {
      this.$store.dispatch('postOpportunity', {idToken: this.$store.getters.currentUser.idToken, opportunity: this.opportunity}).then(res => {
          console.log(res)
          this.opportunity = {}
          this.postedOpportunity = res.data
          this.currentStep += 1

        }).catch(error => {
          console.log(error)
        })
    }
  },
  created() {
    this.opportunityTypes = this.$store.state.opportunityTypes
    this.categories = Object.keys(this.$store.state.categorySubcategories)
    this.paymentTypes = this.$store.state.paymentTypes
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.inner-panel-padding {
  padding-right: 20px;
  height: 320px;
  overflow-y: scroll;
}
.back-button {
  margin-bottom: 25px;
}
.back-button i {
  margin-right: 1rem;
}

.opportunity-next {
  background: #f6f3ed;
  cursor: pointer;
  height: 582px;
  display: flex;
  justify-content: center;
  align-items: center;
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
}

.bottom-button i {
  margin-right: 40px;
}

.opportunity-next:hover, .bottom-button:hover {
  background: #ecddba;
  color: white;
}

.bottom-button-next {
  display: none;
}

ul.progress-bar {
  margin-left: 0px;
}

li {
  width: 1em;
  height: 1em;
  text-align: center;
  line-height: 2em;
  border-radius: 1em;
  background: $color-gold;
  margin: 0em 66px 1em 1em;
  display: inline-block;
  color: white;
  position: relative;
}

li span {
  text-align: center;
  position: absolute;
  top: 1.2em;
  left: 0.4em;
  color: $color-darkgray;
}

li:first-child {
  margin-left: 0px;
}

li::before {
  content: '';
  position: absolute;
  top: .4em;
  left: -5.7em;
  width: 6em;
  height: .2em;
  background: $color-gold;
  z-index: 1;
}


li:first-child::before {
  display: none;
}

.active {
  background: $color-gold;
  width: 1.5em;
  height: 1.5em;
  top: 0.3em;

}

.active::before {
  top: .6em;
}

.active span {
  color: $color-gold;
  top: 1.4em;
}

.active ~ li {
  background: $color-lightgray;
}

.active ~ li::before {
  background: $color-lightgray;
}

@media screen and (max-width: 46rem) {
  .opportunity-next {
    display: none;
  }

  .tool-panel-left-padding {
    margin-left: 0.5rem;
    padding-left: 28px;
    height: 100%;
  }

  .inner-panel-padding {
    min-height: 600px;
  }

}
</style>
