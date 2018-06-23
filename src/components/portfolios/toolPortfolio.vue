<template>
  <div class="portfolio">
    <h2>Portfolio</h2><span v-if="portfolioPresent && authorizedUser(profileId)" @click="showPortfolioForm = true" class="text-button">Edit</span><br />
    <button v-if="!portfolioPresent && authorizedUser(profileId)" @click="showPortfolioForm = true" class="portfolio-edit">Create Portfolio</button>
    <keep-alive>
      <portfolio-form v-if="showPortfolioForm" v-bind:portfolio="currentPortfolio" @close="showPortfolioForm = false" @updatePortfolio="portfolioUpdate($event)"></portfolio-form>
    </keep-alive>
  	
    <div v-if="!portfolioPresent && authorizedUser(profileId)">Please create your portfolio</div>

      <h4 v-if="currentPortfolio.biography" class="is-golden inline-heading first-heading">Biography</h4><span v-if="currentPortfolio.biography && authorizedUser(profileId)" @click="showPortfolioForm = true" class="text-button">Edit</span>
      <div class="row">
        <div class="col-xs col-sm small">{{currentPortfolio.biography}}</div>
      </div>

	  	<h4 v-if="fullOperaRoles" class="is-golden inline-heading">Opera Roles</h4><span v-if="fullOperaRoles && authorizedUser(profileId)" @click="showPortfolioForm = true" class="text-button">Edit</span>
	  	<div v-for="role in fullOperaRoles" class="row between-xs between-sm">
	  		<div class="col-xs col-sm small text-left">{{role.role}}</div>
        <div class="col-xs col-sm small">{{role.opera}} <span v-if="role.composer">| {{role.composer}}</span></div>
        <div class="col-xs col-sm small">{{role.company}}</div>
        <div class="col-xs col-sm small text-right"><span class="year-inner">{{role.year}}</span></div>
	  	</div>

      <h4 v-if="scenesCovers" class="is-golden inline-heading">Scenes and Covers</h4><span v-if="scenesCovers && authorizedUser(profileId)" @click="showPortfolioForm = true" class="text-button">Edit</span>
      <div v-for="role in scenesCovers" class="row between-xs between-sm">
        <div class="col-xs col-sm small text-left">{{role.role}}</div>
        <div class="col-xs col-sm small">{{role.opera}} <span v-if="role.composer">| {{role.composer}}</span></div>
        <div class="col-xs col-sm small">{{role.company}}</div>
        <div class="col-xs col-sm small text-right"><span class="year-inner">{{role.year}}</span></div>
      </div>

      <h4 v-if="currentPortfolio.concertAndOratorios" class="is-golden inline-heading">Concert and Oratorios</h4><span v-if="currentPortfolio.concertAndOratorios && authorizedUser(profileId)" @click="showPortfolioForm = true" class="text-button">Edit</span>
        <div v-for="concert in currentPortfolio.concertAndOratorios" class="row between-xs between-sm">
          <div  class="col-xs col-sm small">{{concert.role}}</div>
          <div class="col-xs col-sm small">{{concert.work}} <span v-if="concert.composer">| {{concert.composer}}</span></div>
          <div  class="col-xs col-sm small text-right"><span class="year-inner">{{concert.year}}</span></div>
        </div>


      <h4 v-if="currentPortfolio.trainingAndEducations" class="is-golden inline-heading">Training and Education</h4><span v-if="currentPortfolio.trainingAndEducations &&authorizedUser(profileId)" @click="showPortfolioForm = true" class="text-button">Edit</span>
        <li v-for="line in currentPortfolio.trainingAndEducations" class="cv-line small">
          {{Object.values(line).join(", ")}}
        </li>

  		<h4 v-if="currentPortfolio.competitionAwardScholarships" class="is-golden inline-heading">Competition, Awards, and Scholarships</h4><span v-if="currentPortfolio.competitionAwardScholarships && authorizedUser(profileId)" @click="showPortfolioForm = true" class="text-button">Edit</span>
  		<ul>
  			<li v-for="line in currentPortfolio.competitionAwardScholarships" class="cv-line small">
  				{{Object.values(line).join(", ")}}
  			</li>
  		</ul>

      <h4 v-if="currentPortfolio.skills" class="is-golden inline-heading">Skills</h4><span v-if="currentPortfolio.skills && authorizedUser(profileId)" @click="showPortfolioForm = true" class="text-button">Edit</span>
      <div class="row">
        <div class="col-xs col-sm small">{{currentPortfolio.skills}}</div>
      </div>

  </div>

  	

  </div>
</template>

<script>
import portfolioForm from './portfolioForm'
import currentUserMixin from '@/mixins/currentUserMixin'

export default {
  name: 'portfolioTool',
  props: {
  	profileId: String,
    portfolio: Object
  },
  components: {
    'portfolio-form': portfolioForm
  },
  mixins: [currentUserMixin],
  data () {
    return {
      currentPortfolio: null,
      showPortfolioForm: false
    }
  },
  computed: {
    portfolioPresent: function() {
      if (this.currentPortfolio !== null && this.currentPortfolio !== undefined && Object.keys(this.currentPortfolio).length > 0) {
        return true
      } else {
        return false
      }
    },
    scenesCovers: function() {
      if (this.currentPortfolio.operaRoles !== null && this.currentPortfolio.operaRoles !== undefined) {
        var roles = this.currentPortfolio.operaRoles.filter((role) => {
          return role.scenesOrCovers
        })

        if (roles !== null && roles !== undefined) {
          return roles
        } else {
          return false
        }
      }
    },
    fullOperaRoles: function() {
      if (this.currentPortfolio.operaRoles !== null && this.currentPortfolio.operaRoles !== undefined) {
          var roles = this.currentPortfolio.operaRoles.filter((role) => {
            return !role.scenesOrCovers
          })

          if (roles !== null && roles !== undefined) {
            return roles
          } else {
            return false
          }
      }
      
    }
  },
  methods: {
    portfolioUpdate(object) {
      let keysArray = Object.keys(object)
      console.log('i should be triggered')
      keysArray.forEach((element) => {
        // console.log(element)
        // console.log({[element]: object[element]})
        this.currentPortfolio[element] = object[element]
      })

    }
  },
  created() {
    if(this.portfolio !== null && this.portfolio !== undefined) {
      this.currentPortfolio = this.portfolio
    } else {
      this.currentPortfolio = new Object()
    }
    console.log(this.currentPortfolio)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.portfolio {
  padding: 40px $body-padding-small;
	height: 476px;
  min-height: 476px;
	overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.portfolio h2 {
  display: inline-block;
  margin-top: 0rem;
  margin-right: 1rem;
}

.year-inner {
  margin-right: 25px;
}

.portfolio-edit {
  float: right;
  margin-right: 20px;
}


.inline-heading {
  margin-top: 45px;
  margin-right: 1rem;
}

.first-heading {
  margin-top: 0px;
}


@media all and (min-width: $bp-med) {
  .portfolio {
    padding-left: $body-padding-large;
  }
}

</style>
