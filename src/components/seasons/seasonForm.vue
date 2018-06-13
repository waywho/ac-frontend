<template>
  <modal @close="$emit('close')">
  		<h3 slot='header' class='portfolio-header'>{{stepHeading}}<span v-if="currentSeason.name">: <span class="is-golden">{{currentSeason.name}}</span></span></h3>
		<hr slot='header' class='portfolio-line' />

		<div slot='body'>
			<component :is="currentComponent" 
                  :season="currentSeason" 
                  :production="currentProduction" 
                  :productions="productions" 
                  :index="currentProductionIndex"
                  :mode="mode"
                  :messaging="messaging" 
                  @next-step="nextStep" 
                  @season-save="saveSeason()" 
                  @season-edit="editSeason()"
                  @season-update="updateSeason()"
                  @season-review="currentStep = 2" 
                  @production-add="saveProduction($event)" 
                  @production-new="newProduction" 
                  @production-edit="editProduction($event)" 
                  @production-update="updateProduction($event)"
                  @production-edit-update="updateEditProduction($event)" 
                  @cancel-production="cancelProduction()" 
                  @cancel-season="cancelSeason()"></component>
      
		</div>
		<div slot='footer'>
      
    </div>
  </modal>
</template>

<script>
import modal from '@/components/modal';
import seasonFields from './seasonFields';
import seasonProductionFields from './seasonProductionFields';
import seasonReview from './seasonReview';

export default {
  name: 'seasonForm',
  components: {
  	'modal': modal,
    'season-fields': seasonFields,
    'season-production-fields': seasonProductionFields,
    'season-review': seasonReview
  },
  props: {
    mode: String,
    season: {
      type: Object,
      required: false
    },
    seasonId: {
      type: String,
      required: false
    },
    editProductions: {
      type: Array,
      required: false
    },
    step: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      messaging: {
        message: null,
        messageType: null
      },
      currentStep: 0,
      currentProduction: null,
      currentProductionIndex: null,
      component: "",
      currentSeason: {
        name: null,
        from: null,
        to: null,
        published_at: null,
      },
      productions: [],
      steps: [{heading: "Add Season", component: "season-fields"}, {heading: "Add Productions", component: "season-production-fields"}, {heading: "Review/Edit Season", component: "season-review"}]
    }
  },
  computed: {
    stepHeading: function() {
      return this.steps[this.currentStep].heading
    },
    currentComponent: function() {
      return this.component = this.steps[this.currentStep].component
    }
  },
  methods: {
    nextStep: function () {
      this.currentStep += 1
    },
    cancelProduction: function () {
      this.currentProduction = null
      this.currentStep = 2
    },
    newProduction: function() {
      this.currentProduction = null
      this.currentStep = 1
    },
    addSeason: function () {
      // console.log(object)
      this.currentStep += 1
    },
    saveSeason: function () {
      // alert('save season')
      console.log(this.currentSeason)

      this.$store.dispatch('createSeason', {season: this.currentSeason, productions: this.productions})
        .then(res => {
          console.log(res)
          // this.$emit('close')
        })
    },
    editSeason: function () {
      this.currentStep = 0
    },
    updateSeason: function () {
      // update season through store

      this.$store.dispatch('updateSeason', {season: this.currentSeason, seasonId: this.seasonId})
        .then(res => {
          console.log(res)
        this.messaging.message = "season info is updated"
        this.messaging.messageType = 'success'
        this.currentStep = 2
          // this.$emit('close')
        })
    },
    cancelSeason: function () {
      this.currentSeason = null
      this.$emit('close')
    },
    saveProduction: function (object) {
      this.productions.push(object)
        this.messaging.message = object.name + " production is added"
        this.messaging.messageType = 'success'
      // console.log('before sent', this.currentSeason)
      this.currentStep = 2
    },
    editProduction: function (index) {
      this.currentProduction = this.productions[index]
      this.currentProductionIndex = index
      this.currentStep = 1
    },
    updateProduction: function(object) {
      this.productions[object.index] = object.production
        this.messaging.message = object.production.name + " production is updated"
        this.messaging.messageType = 'success'
      this.currentStep = 2
    },
    updateEditProduction: function(object) {
      this.productions[object.index] = object.production
      this.$store.dispatch('updateProduction', {seasonId: this.seasonId, productionIndex: object.index, production: object.production}).then(res => {
          this.messaging.message = object.production.name + " production is updated"
          this.messaging.messageType = 'success'
          this.currentStep = 2
      })
      
    }
  },
  created() {
    if(this.season) {
      this.currentSeason = this.season
    }

    if(this.editProductions) {
      this.productions = this.editProductions
    }

    if(this.step) {
      this.currentStep = this.step
    } else {
      this.currentStep = 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

</style>
