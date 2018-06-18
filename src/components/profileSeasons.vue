<template>
  <div class="seasons row">
      <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 title-row row">
        <ul v-for="(season, key) in profileSeasons" class="season-list">
          <li class="season-list-li"><span class="selection selection-text-vertical">{{season.name}}</span> <span v-if="authorizedUser" class="smaller text-button season-edit" @click="seasonEdit(season, key)">edit</span></li>
        </ul>
        <div class="season-heading"> 
          <h2 class="inline-header season-title">Company Seasons</h2>
          <span v-if="authorizedUser" class="smaller text-button season-edit" @click="seasonAdd">add</span>
         
        </div>
      </div>
      
      <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 row bottom-xs slide">
        <div v-for="(production, index) in currentProductions" :key="index" class="col-xs-10 col-sm-5 col-md-5 col-lg-5 production-block" @click="viewProduction(production)">
          <div class="production-image">
            <img :src="production.imageURL | imageProcess('season')" />
          </div>
          <div class="production-title">
            <h3>{{production.name}}</h3>
            <span class="is-golden"><b>{{production.dates[0].date | moment("MMMM")}}</b></span>
          </div>
        </div>
    </div>
        	 
    <season-form v-if="showSeasonForm === true && authorizedUser" @close="showSeasonForm = false" :season="editSeason" :season-id="editSeasonId" :step="editStep" :edit-productions="editProductions" :mode="mode"></season-form >
    <production-details v-if="showProduction === true"  :production="currentProduction" :season="currentSeason" @close="showProduction = false"></production-details >

  </div>
</template>

<script>
import seasonForm from '@/components/seasons/seasonForm'
import productionDetails from './productionDetails'
import currentUser from '../mixins/currentUserMixin';

export default {
  name: 'seasons',
  components: {
  	'season-form': seasonForm,
    'production-details': productionDetails
  },
  props: {
    profileSeasons: Object,
    profileId: String
  },
  mixins: [currentUser],
  data () {
    return {
      showSeasonForm: false,
      showProduction: false,
      currentSeason:  null,
      editSeasonId: null,
      editProductions: null,
      editSeason: null,
      editStep: 0,
      mode: 'new',
      currentProduction: null
    }
  },
  computed: {
    currentProductions: function () {
      return this.currentSeason.productions
    }
  },
  methods: {
    seasonAdd: function () {
      this.editSeason = null
      this.currentSeasonId = null
      this.editProductions = null
      this.mode = 'new'
      this.editStep = 0
      this.showSeasonForm = true
    },
    seasonEdit: function (season, seasonId) {
      this.editSeason = season
      this.editSeasonId = seasonId
      this.editProductions = season.productions
      this.editStep = 2
      this.mode = 'edit'
      this.showSeasonForm = true
    },
    viewProduction: function(production) {
      this.currentProduction = production
      this.showProduction = true
    }
  },
  created() {
    this.currentSeason = this.profileSeasons[Object.keys(this.profileSeasons)[0]]
    this.currentProduction = this.currentSeason.productions[0]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.seasons {
	min-height: 180px;
}

.production-row {
  overflow: scroll;
}

.option-selections .text-button {
  display: block;
}

.title-row {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100px;
  margin-right: 10px;
}

.inline-header {
	display: inline;
  margin-bottom: 0px;
}

.season-heading {
  order: 2;
  margin-bottom: 1rem;
}

.season-list {
  order: 1;
  margin-left: 0px;
  margin-bottom: 0px;
}

.season-list li {
  list-style-type: none;
}

.selection-text-vertical {
  display: inline-block;
}

.text-button {
  margin-left: 8px;
}

.production-image {
  width: 100px;
  height: 100px;
  overflow: hidden;
  display: inline-block
}

.production-image img {
  height: 100%;
  width: auto;
}

.production-block {
  margin-right: 25px;
  cursor: pointer;
  padding-left: 0px;
}

.production-block:hover h3 {
  color: $color-gold;
}

.production-title {
  width: 100px;
  margin-left: 25px;
  display: inline-block;
}

.production-title h3 {
  margin-top: 0px;
  margin-bottom: 10px;
}

.season-edit {
  visibility: hidden;
}

.season-heading:hover .season-edit, .season-list-li:hover .season-edit {
  visibility: visible;
}

@media screen and (max-width: 46rem) {
  .title-row {
    justify-content: flex-start;
  }
  .season-heading {
    order: 1;
  }

  .season-list {
    order: 2;
  }
}
</style>
