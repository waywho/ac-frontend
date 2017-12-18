<template>
  	<div class="auditions">
		<div class="row between-sm">
			<div class="col-sm-10 col-xs-10">
				<h2>Audition Planner</h2>
			</div>
			<div class="selection col-sm-2 col-xs-2">
				<span v-on:click="setFilter(true, 'all', 'auditionCreator-stepOne')" class="selection-text-vertical">Audition Creator</span>
				<span v-on:click="setFilter(true, 'all', 'company-auditionPlanner')" class="selection-text-vertical">Audition Planner</span>
			</div>
		</div>
		<div class="selection selection-xs slide row" v-if="component === 'company-auditionCandidates'">
				<span v-on:click="setFilter(false, 'soprano');" class="selection-text-horizontal">Soprano</span>
				<span v-on:click="setFilter(false, 'mezzo soprano')" class="selection-text-horizontal">Mezzo Soprano</span>
				<span v-on:click="setFilter(false, 'tenor')" class="selection-text-horizontal">Tenor</span>
				<span v-on:click="setFilter(false, 'baritone')" class="selection-text-horizontal">Baritone</span>
				<span v-on:click="setFilter(false, 'bass')" class="selection-text-horizontal">Bass</span>
		</div>
		<keep-alive>
			<component :is="component" :audition="newAudition" :auditions="auditions" :auditionees="filteredAuditionees" v-on:takeStep="updateAudition($event)" v-on:saveData="saveAudition($event)"></component>
		</keep-alive>
	</div>
</template>

<script>
import auditionCandidates from './auditionCandidates'
import auditionPlanner from './auditionPlanner'
import auditionCreatorStepOne from './auditionCreatorStepOne'
import auditionCreatorStepTwo from './auditionCreatorStepTwo'

export default {
  name: 'auditions',
  components: {
  	'company-auditionCandidates': auditionCandidates,
  	'company-auditionPlanner': auditionPlanner,
    'auditionCreator-stepOne': auditionCreatorStepOne,
    'auditionCreator-stepTwo': auditionCreatorStepTwo
  },
  props: {
    profileId: String
  },
  data () {
    return {
    	component: 'company-auditionPlanner',
      voiceType: "",
      filterSelected: false,
      auditionees: [],
      auditions: [],
      newAudition: {},
      currentStep: 0,
      auditionCreatorSteps: [
        'auditionCreator-stepOne',
        'auditionCreator-stepTwo'
      ]
    }
  },
  computed: {
	filteredAuditionees: function() {
		if(this.filterSelected) {
			return this.auditionees.filter((auditionee) => {
				return auditionee.selected
			}).slice(0, 8)
		} else {
			return this.auditionees.filter((auditionee) => {
				return auditionee.voice_type.toLowerCase().match(this.voiceType);
			}).slice(0, 8)
		}

	}
  },
  methods: {
  	setFilter: function(filterSelected, voiceType = 'all', toolName = 'company-auditionCandidates') {
  		if (filterSelected) {
  			this.filterSelected = filterSelected;
  			this.voiceType = '';
  			this.component = toolName;
  		} else if (voiceType === 'all') {
  			this.filterSelected = filterSelected;
  			this.voiceType = '';
  			this.component = toolName;
  		} else {
  			this.filterSelected = filterSelected;
  			this.voiceType = voiceType;
  			this.component = toolName;
  		}
  	},
    updateAudition: function(object) {
      this.component = object.theStep
      this.newAudition = Object.assign({}, this.newAudition, object.newData)
    },
    saveAudition: function(object) {
      this.component = object.theStep
      this.newAudition = Object.assign({}, this.newAudition, object.newData)
      this.auditions.push(this.newAudition)
    }
  },
  created() {
  		this.auditionees = this.$store.state.profiles.companyXYZ.auditionCandidates.slice(0, 8);
      this.auditions = this.$store.state.profiles.companyXYZ.auditions;
  		// this.filteredAuditionees = this.auditionees.slice(0, 8);
		// console.log(this.auditionees);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.audition-panel {

}

</style>
