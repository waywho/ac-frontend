<template>
	<modal @close="$emit('close')">
		<h3 slot='header' class='portfolio-header'>Edit Portfolio</h3>
		<hr slot='header' class='portfolio-line' />

		<div slot='body'>
			<label for="biography" class="strong label-header">Edit Biography</label>
			<textarea id="biography" v-model="biography" placeholder="please enter your biography"></textarea>
      <div class="row reverse middle-xs middle-sm form-utilities">
        <div class='col-xs-2 col-sm-2'>
          <button @click="updateProfileTools('biography', 'portfolio')" class="form-button">save</button>
        </div>
        <success-warning-notice  v-if="messageShow['biography']" :class="'col-xs-4 col-sm-4'"></success-warning-notice>
      </div>

			
			<label class="strong label-header second-header">Opera Roles</label>
			<span class="smaller is-lightgray">Enter repertoire information</span>
			<div v-for="(role, index) in operaRoles" class="row opera-role middle-xs middle-sm">
				<div v-for="(value, key) in role" class="col-xs-12 col-sm-6 input-space">
					<input v-if="key !== 'scenesOrCovers'" :id="key" v-model="operaRoles[index][key]" :placeholder="key | camel-to-space" />
          <div class="inline-checkbox">
            <input v-if="key === 'scenesOrCovers'" type="checkbox" id="scenes" v-model="operaRoles[index].scenesOrCovers">
            <label v-if="key === 'scenesOrCovers'" for="scenes"><span></span>Scenes or Covers</label>
          </div>
				</div>
				<div @click="removeFields(index, 'operaRoles')" class="smaller is-golden add-role col-xs-12 col-sm-12 text-right">remove <i class="fa fa-minus" aria-hidden="true"></i></div>
			</div>
			<span @click="addFields('role', 'operaRoles')" class="smaller is-golden add-role">add <i class="fa fa-plus" aria-hidden="true"></i></span>
      <div class="row reverse middle-xs middle-sm form-utilities">
        <div class='col-xs-2 col-sm-2'>
			     <button @click="updateProfileTools('operaRoles', 'portfolio')" class="form-button">save</button>
          </div>
        <success-warning-notice  v-if="messageShow['operaRoles']" :class="'col-xs-4 col-sm-4'"></success-warning-notice>
      </div>

			<label class="strong label-header second-header">Concert and Oratorio</label>
			<span class="smaller is-lightgray">Enter repertoire information</span>
			<div v-for="(concert, index) in concertAndOratorios" class="row opera-role">
				<div v-for="(value, key) in concert" class="col-xs-12 col-sm-6 input-space">
						<input :id="key" v-model="concertAndOratorios[index][key]" :placeholder="key | camel-to-space" />
				</div>
				<div @click="removeFields(index, 'concertAndOratorios')" class="smaller is-golden add-role col-xs-12 col-sm-12 text-right">remove <i class="fa fa-minus" aria-hidden="true"></i></div>
			</div>
			<span @click="addFields('concert', 'concertAndOratorios')" class="smaller is-golden add-role">add <i class="fa fa-plus" aria-hidden="true"></i></span>
      <div class="row reverse middle-xs middle-sm form-utilities">
        <div class='col-xs-2 col-sm-2'>
			     <button @click="updateProfileTools('concertAndOratorios', 'portfolio')" class="form-button">save</button>
           </div>
        <success-warning-notice  v-if="messageShow['concertAndOratorios']" :class="'col-xs-4 col-sm-4'"></success-warning-notice>
      </div>

			<label class="strong label-header second-header">Training and Education</label>
			<span class="smaller is-lightgray">Enter information</span>
			<div v-for="(training, index) in trainingAndEducations" class="row opera-role">
				<div v-for="(value, key) in training" class="col-xs-12 col-sm-6 input-space">
						<input :id="key" v-model="trainingAndEducations[index][key]" :placeholder="key | camel-to-space" />
				</div>
				<div @click="removeFields(index, 'trainingAndEducations')" class="smaller is-golden add-role col-xs-12 col-sm-12 text-right">remove <i class="fa fa-minus" aria-hidden="true"></i></div>
			</div>
			<span @click="addFields('training', 'trainingAndEducations')" class="smaller is-golden add-role">add <i class="fa fa-plus" aria-hidden="true"></i></span>
			<div class="row reverse middle-xs middle-sm form-utilities">
        <div class='col-xs-2 col-sm-2'>
          <button @click="updateProfileTools('trainingAndEducations', 'portfolio')" class="form-button">save</button>
        </div>
        <success-warning-notice  v-if="messageShow['trainingAndEducations']" :class="'col-xs-4 col-sm-4'"></success-warning-notice>
      </div>

			<label class="strong label-header second-header">Competitions, Awards and Scholarships</label>
			<span class="smaller is-lightgray">Enter information</span>
			<div v-for="(award, index) in competitionAwardScholarships" class="row opera-role">
				<div v-for="(value, key) in award" class="col-xs-12 col-sm-6 input-space">
						<input :id="key" v-model="competitionAwardScholarships[index][key]" :placeholder="key | camel-to-space" />
				</div>
				<div @click="removeFields(index, 'competitionAwardScholarships')" class="smaller is-golden add-role col-xs-12 col-sm-12 text-right">remove <i class="fa fa-minus" aria-hidden="true"></i></div>
			</div>
			<span @click="addFields('award', 'competitionAwardScholarships')" class="smaller is-golden add-role">add <i class="fa fa-plus" aria-hidden="true"></i></span>
			<div class="row reverse middle-xs middle-sm form-utilities">
        <div class='col-xs-2 col-sm-2'>
          <button @click="updateProfileTools('competitionAwardScholarships', 'portfolio')" class="form-button">save</button>
        </div>
        <success-warning-notice  v-if="messageShow['competitionAwardScholarships']" :class="'col-xs-4 col-sm-4'"></success-warning-notice>
      </div>


			<label for="skills" class="strong label-header second-header">Edit Skills</label>
			<textarea id="skills" v-model="skills" placeholder="please enter your skills, eg. languages, dance, instruments"></textarea>
      <div class="row reverse middle-xs middle-sm form-utilities">
        <div class='col-xs-2 col-sm-2'>
			    <button @click="updateProfileTools('skills')" class="form-button">save</button>
        </div>
        <success-warning-notice  v-if="messageShow['skills']" :class="'col-xs-4 col-sm-4'"></success-warning-notice>
      </div>
		</div>

		<div slot="footer"></div>
		
	</modal>
</template>

<script>
import modal from '@/components/modal';
import successWarningNotice from '@/components/successWarningNotice';
import profileToolsMixin from '@/mixins/profileToolsMixin';

export default {
  name: '',
  components: {
  	'modal': modal,
    'success-warning-notice': successWarningNotice
  },
  props: {
  	portfolio: Object
  },
  mixins: [profileToolsMixin],
  data () {
    return {
      messageShow: {
        biography: false,
        operaRoles: false,
        concertAndOratorios: false,
        trainingAndEducations: false,
        competitionAwardScholarships: false,
        skills: false
      },
      biography: this.portfolio.biography,
      operaRoles: [],
      concertAndOratorios: [],
      trainingAndEducations: [],
      competitionAwardScholarships:[],
      skills: ''
    }
  },
  methods: {
  	// TODO: validate if the new data has been saved, warning if unsaved
  	removeFields: function(index, fields) {
  		this.$delete(this[fields], index)
  	},
  	addFields: function(field, fields) {
      let portfolioFields = {
        role: {
            composer: '', opera: '', role: '', company: '', conductor: '',
            director: '', year: '', scenesOrCovers: false,
        },
        concert: {
            composer: '', work: '', role: '', company: '',
            conductor: '', year: ''
        },
        award: {
          achievement: '',
          competitionAwardScholarship: '',
          year: ''
        },
        training: {
          programmeOrDegree: '',
          institution: '',
          year: ''
        }
    }

  		this[fields].push(portfolioFields[field])
  	}
  },
  created () {
    let portfolioFields = {
        role: {
            composer: '', opera: '', role: '', company: '', conductor: '',
            director: '', year: '', scenesOrCovers: false,
        },
        concert: {
            composer: '', work: '', role: '', company: '',
            conductor: '', year: ''
        },
        award: {
          achievement: '',
          competitionAwardScholarship: '',
          year: ''
        },
        training: {
          programmeOrDegree: '',
          institution: '',
          year: ''
        }
    }

    let sections = {'operaRoles': 'role', 'concertAndOratorios': 'concert', 'competitionAwardScholarships': 'award', 'trainingAndEducations': 'training'}
    
  	if (this.portfolio !== null && this.portfolio !== undefined) {
  		
  		Object.keys(sections).forEach((sectionKey) => {
  			if(this.portfolio[sectionKey] !== null && this.portfolio[sectionKey] !== undefined) {
  				this[sectionKey] = this.portfolio[sectionKey]
  				this[sectionKey].push(portfolioFields[sections[sectionKey]])
  			} else {
  				this[sectionKey].push(portfolioFields[sections[sectionKey]])
  			}
  		})
  	} else {
      Object.keys(sections).forEach((sectionKey) => {
        this[sectionKey].push(portfolioFields[sections[sectionKey]])
      })
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.portfolio-header {
	text-align: left !important;
	color: $color-darkgray;
}

.portfolio-line {
	border: 1px solid $color-gold;
}

#biography, #skills {
	height: 207px;
}

.second-header {
	margin-top: 66px;
}

.input-space {
	margin-top: 8px;
	margin-bottom: 8px;
}

.add-role {
	cursor: pointer;
	margin-bottom: 5px;
}

.opera-role {
	border-bottom: 1px solid $color-lightgray;
}

.form-utilities {
  margin-top: 21px;
}

.form-button {
  max-width: 30px;
  max-height: 70px;
}

</style>
