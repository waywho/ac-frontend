<template>
  <div class="portfolio">

    <button @click="showPortfolioForm = true" class="portfolio-edit">Edit Portfolio</button>
    <keep-alive>
      <portfolio-form v-if="showPortfolioForm" v-bind:portfolio="currentPortfolio" @close="showPortfolioForm = false" @updatePortfolio="portfolioUpdate($event)"></portfolio-form>
    </keep-alive>
  	
    <div v-if="currentPortfolio === null || currentPortfolio === undefined || Object.keys(currentPortfolio).length === 0">Please enter your portfolio</div>

      <h5 v-if="currentPortfolio.biography" class="is-golden">Biography</h5>
      <div class="row">
        <div class="col-xs col-sm small">{{currentPortfolio.biography}}</div>
      </div>

	  	<h5 v-if="fullOperaRoles" class="is-golden">Opera Roles</h5>
	  	<div v-for="role in fullOperaRoles" class="row between-xs between-sm">
	  		<div class="col-xs col-sm small text-left">{{role.role}}</div>
        <div class="col-xs col-sm small">{{role.opera}} <span v-if="role.composer">| {{role.composer}}</span></div>
        <div class="col-xs col-sm small">{{role.company}}</div>
        <div class="col-xs col-sm small text-right"><span class="year-inner">{{role.year}}</span></div>
	  	</div>

      <h5 v-if="scenesCovers" class="is-golden">Scenes and Covers</h5>
      <div v-for="role in scenesCovers" class="row between-xs between-sm">
        <div class="col-xs col-sm small text-left">{{role.role}}</div>
        <div class="col-xs col-sm small">{{role.opera}} <span v-if="role.composer">| {{role.composer}}</span></div>
        <div class="col-xs col-sm small">{{role.company}}</div>
        <div class="col-xs col-sm small text-right"><span class="year-inner">{{role.year}}</span></div>
      </div>

      <h5 v-if="currentPortfolio.concertAndOratorios" class="is-golden">Concert and Oratorios</h5>
        <div v-for="concert in currentPortfolio.concertAndOratorios" class="row between-xs between-sm">
          <div  class="col-xs col-sm small">{{concert.role}}</div>
          <div class="col-xs col-sm small">{{concert.work}} <span v-if="concert.composer">| {{concert.composer}}</span></div>
          <div  class="col-xs col-sm small text-right"><span class="year-inner">{{concert.year}}</span></div>
        </div>


      <h5 v-if="currentPortfolio.trainingAndEducations" class="is-golden">Training and Education</h5>
        <li v-for="line in currentPortfolio.trainingAndEducations" class="cv-line small">
          {{Object.values(line).join(", ")}}
        </li>

  		<h5 v-if="currentPortfolio.competitionAwardScholarships" class="is-golden">Competition, Awards, and Scholarships</h5>
  		<ul>
  			<li v-for="line in currentPortfolio.competitionAwardScholarships" class="cv-line small">
  				{{Object.values(line).join(", ")}}
  			</li>
  		</ul>

      <h5 v-if="currentPortfolio.skills" class="is-golden">Skills</h5>
      <div class="row">
        <div class="col-xs col-sm small">{{currentPortfolio.skills}}</div>
      </div>

  </div>

  	

  </div>
</template>

<script>
import portfolioForm from './portfolioForm'

export default {
  name: 'portfolioTool',
  props: {
  	profileId: String,
    portfolio: Object
  },
  components: {
    'portfolio-form': portfolioForm
  },
  data () {
    return {
      currentPortfolio: {},
      showPortfolioForm: false
    }
  },
  computed: {
    scenesCovers: function() {
      var roles = this.portfolio.operaRoles.filter((role) => {
        return role.scenesOrCovers
      })

      if (roles !== null && roles !== undefined) {
        return roles
      } else {
        return false
      }
    },
    fullOperaRoles: function() {
      var roles = this.portfolio.operaRoles.filter((role) => {
        return !role.scenesOrCovers
      })

      if (roles !== null && roles !== undefined) {
        return roles
      } else {
        return false
      }
    }
  },
  methods: {
    portfolioUpdate(object) {
      let keysArray = Object.keys(object)
      // console.log(this.currentPortfolio)
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
@import '../styles/style-variables';

.portfolio {
  padding-top: 40px;
  padding-left: 100px;
  padding-bottom: 40px;
	height: 476px;
	overflow-y: scroll;
}

.year-inner {
  margin-right: 25px;
}

.portfolio-edit {
  float: right;
  margin-right: 20px;
}

</style>
