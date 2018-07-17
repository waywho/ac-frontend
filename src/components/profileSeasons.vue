<template>
  <div class="seasons" v-if="profileSeasons">
      <div class="title-row">
        <ul v-for="(season, key) in profileSeasons" class="non-list season-list">
          <li class="season-list-li"><span class="selection selection-text" @click="currentSeason = season">{{season.name}}</span> <span v-if="authorizedUser" class="smaller text-button season-edit" @click="seasonEdit(season, key)">edit</span></li>
        </ul>
        <div class="season-heading"> 
          <h2 class="season-title">Company Seasons</h2>
          <span v-if="authorizedUser" class="smaller text-button season-edit" @click="seasonNew">add</span>
        </div>
      </div>
      
      <div class="production-row slide">
        <div v-for="(production, index) in currentProductions" :key="index" class="production-block" @click="viewProduction(production)">
          <div class="production-image">
            <img :src="production.imageURL | imageProcess('season')" />
          </div>
          <div class="production-title">
            <h3>{{production.name}}</h3>
            <span class="is-gold"><b>{{production.dates[0].date | moment("MMMM")}}</b></span>
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
      currentSeason: null,
      currentProduction: null,
      editSeasonId: null,
      editProductions: null,
      editSeason: null,
      editStep: 0,
      mode: 'new',
    }
  },
  computed: {
    thisSeason: function() {
      if(this.currentSeason) {
        return this.currentSeason
      } else {
        return []
      }
    },
    currentProductions: function () {
      if(this.currentSeason) {
        return this.thisSeason.productions
      } else {
        return null
      }
      
    }
  },
  methods: {
    seasonNew: function () {
      this.editSeason = null
      this.editSeasonId = null
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
    if(this.profileSeasons) {
      this.currentSeason = this.profileSeasons[Object.keys(this.profileSeasons)[0]]
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.seasons {
	min-height: 180px;
  display: flex;
  flex-direction: column;
}

.title-row {
  flex-basis: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100px;
  margin-right: 10px;
  margin-bottom: 1rem;
}

.season-heading {
  flex-basis: auto;
  width: 100%;
  order: 1;
  margin-bottom: 0.5rem;
}

.season-list {
  order: 2;
  margin-bottom: 0px;
}

.season-title, .selection {
  display: inline-block;
  margin-right: 0.2rem;
  margin-bottom: 0px;
}

.season-edit {
  float: right;
  visibility: hidden;
}

.season-heading:hover .season-edit, .season-list-li:hover .season-edit {
  visibility: visible;
}

.season-list-li {
  font-size: 18px;
  height: 1.75em;
  transition: all 0.1s ease-out;
  -webkit-transition: all 0.1s ease-out;
}

.season-list-li:hover .selection {
  font-size: 1.125em;
  line-height: 1.5em;
  vertical-align: baseline;
}

.production-row {
  display: flex;
  width: auto;
  flex-wrap: nowrap;
  overflow-x: scroll;
  padding: 10 px 0px;
}

.production-block {
  display: inline-flex;
  flex-grow: 1;
  flex-basis: auto;
  width: auto;
  margin-right: 35px;
  cursor: pointer;
  padding-left: 0px;
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


.selection-text {
  margin-left: 0;
}


@media all and (min-width: $bp-med) {
  .seasons {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }

  .title-row {
    justify-content: flex-end;
    width: 355px;
    min-width: 355px;
    margin-right: 65px;
    margin-bottom: 0px;
  }

  .season-heading {
    margin-bottom: 0px;
    order: 2;
  }

  .season-list {
    order: 1;
  }
}
</style>
