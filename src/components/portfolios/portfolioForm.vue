<template>
	<modal @close="$emit('close')">
		<h3 slot='header' class='portfolio-header'>Edit Portfolio</h3>
		<hr slot='header' class='portfolio-line' />

		<div slot='body'>
			<label for="biography" class="strong label-header">Edit Biography</label>
			<textarea id="biography" v-model="biography" placeholder="please enter your biography"></textarea>
      <div class="button-row">
        <success-warning-notice  v-show="messageShow['biography']" :class="'warning-message'"></success-warning-notice>
        <button @click="updateProfileTools('biography', 'portfolio')" class="form-button">save</button>
      </div>

			
			<label class="strong label-header second-header">Opera Roles</label>
			<span class="smaller is-lightgray">Enter repertoire information</span>
			<div v-for="(role, index) in operaRoles" :key="index + 'operaRoles'" class="row opera-role middle-xs middle-sm">
				<div v-for="(value, key, ind) in role" :key="ind + key" class="col-xs-12 col-sm-6 input-space">
					<input v-if="key !== 'scenesOrCovers'" :id="key" :key="index" v-model="operaRoles[index][key]" :placeholder="key | camel-to-space" />
          <div class="inline-checkbox">
            <input v-if="key === 'scenesOrCovers'" type="checkbox" :id="index + 'scenes' " :key="ind + 'scenes'" v-model="operaRoles[index][key]">
            <label v-if="key === 'scenesOrCovers'" :for="index + 'scenes'" :key="ind + 'sceneLabel'"><span></span>Scenes or Covers</label>
          </div>
				</div>
				<div class="smaller is-gold col-xs-12 col-sm-12 text-right"><span class="add-role" @click="removeFields(index, 'operaRoles')">remove <i class="fa fa-minus" aria-hidden="true"></i></span></div>
			</div>
			<span @click="addFields('role', 'operaRoles')" class="smaller is-gold add-role">add <i class="fa fa-plus" aria-hidden="true"></i></span>
      <div class="button-row">
        <success-warning-notice  v-if="messageShow['operaRoles']" :class="'warning-message'"></success-warning-notice>
        <button @click="updateProfileTools('operaRoles', 'portfolio')" class="form-button">save</button>
      </div>

			<label class="strong label-header second-header">Concert and Oratorio</label>
			<span class="smaller is-lightgray">Enter repertoire information</span>

			<div v-for="(concert, index) in concertAndOratorios" :key="index + 'concertAndOratorios'" class="row opera-role">
				<div v-for="(value, key, ind) in concert" :key="ind + key" class="col-xs-12 col-sm-6 input-space">
						<input :id="key + index" :key="ind + key" v-model="concertAndOratorios[index][key]" :placeholder="key | camel-to-space" />
				</div>
				<div class="smaller is-gold col-xs-12 col-sm-12 text-right"><span class="add-role" @click="removeFields(index, 'concertAndOratorios')" >remove <i class="fa fa-minus" aria-hidden="true"></i></span></div>
			</div>

			<span @click="addFields('concert', 'concertAndOratorios')" class="smaller is-gold add-role">add <i class="fa fa-plus" aria-hidden="true"></i></span>
      <div class="button-row">
           <success-warning-notice  v-if="messageShow['concertAndOratorios']" :class="'warning-message'"></success-warning-notice>
         <button @click="updateProfileTools('concertAndOratorios', 'portfolio')" class="form-button">save</button>
      </div>

			<label class="strong label-header second-header">Training and Education</label>
			<span class="smaller is-lightgray">Enter information</span>

			<div v-for="(training, index) in trainingAndEducations" :key="index + 'trainingAndEducations'" class="row opera-role">
				<div v-for="(value, key, ind) in training" :key="ind + key" class="col-xs-12 col-sm-6 input-space">
						<input :id="key + index" :key="ind + key" v-model="trainingAndEducations[index][key]" :placeholder="key | camel-to-space" />
				</div>
				<div class="smaller is-gold col-xs-12 col-sm-12 text-right"><span class="add-role" @click="removeFields(index, 'trainingAndEducations')">remove <i class="fa fa-minus" aria-hidden="true"></i></span></div>
			</div>

			<span @click="addFields('training', 'trainingAndEducations')" class="smaller is-gold add-role">add <i class="fa fa-plus" aria-hidden="true"></i></span>
			<div class="button-row">
        <success-warning-notice  v-if="messageShow['trainingAndEducations']" :class="'warning-message'"></success-warning-notice>
           <button @click="updateProfileTools('trainingAndEducations', 'portfolio')" class="form-button">save</button>
      </div>

			<label class="strong label-header second-header">Competitions, Awards and Scholarships</label>
			<span class="smaller is-lightgray">Enter information</span>

			<div v-for="(award, index) in competitionAwardScholarships" :key="index + 'competitionAwardScholarships'" class="row opera-role">
				<div v-for="(value, key, ind) in award" :key="ind + key" class="col-xs-12 col-sm-6 input-space">
						<input :id="key + index" :key="ind + key" v-model="competitionAwardScholarships[index][key]" :placeholder="key | camel-to-space" />
				</div>
				<div class="smaller is-gold col-xs-12 col-sm-12 text-right"><span class="add-role" @click="removeFields(index, 'competitionAwardScholarships')" >remove <i class="fa fa-minus" aria-hidden="true"></i></span></div>
			</div>

			<span @click="addFields('award', 'competitionAwardScholarships')" class="smaller is-gold add-role">add <i class="fa fa-plus" aria-hidden="true"></i></span>
			<div class="button-row">
        <success-warning-notice  v-if="messageShow['competitionAwardScholarships']" :class="'warning-message'"></success-warning-notice>
           <button @click="updateProfileTools('competitionAwardScholarships', 'portfolio')" class="form-button">save</button>
      </div>


			<label for="skills" class="strong label-header second-header">Skills</label>
			<textarea id="skills" v-model="portfolio.skills" placeholder="please enter your skills, eg. languages, dance, instruments"></textarea>
      <div class="button-row">
        <success-warning-notice  v-if="messageShow['skills']" :class="'warning-message'"></success-warning-notice>
        <button @click="updateProfileTools('skills', 'portfolio')" class="form-button">save</button>
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
        biography: true,
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
  				// this[sectionKey].push(portfolioFields[sections[sectionKey]])
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
  margin-top: 0px;
}

.portfolio-line {
	border: 1px solid $color-gold;
}

#biography, #skills {
	height: 207px;
}

.second-header {
	margin-top: 40px;
}

.input-space {
	margin-top: 8px;
	margin-bottom: 8px;
}

.add-role {
	cursor: pointer;
	margin-bottom: 5px;
}

.fa-minus, .fa-plus {
  margin-left: 0.2rem;
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
  margin-left: 10px;
}

.warning-message {
  flex-grow: 2;
  max-width: 230px;
}

.button-row {
  margin-top: 25px;
  display: flex;
  flex-direct: row-reverse;
  justify-content: flex-end;
  align-items: center;
}

</style>
