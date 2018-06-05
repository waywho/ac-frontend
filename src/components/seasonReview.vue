<template>
  <div class="">
      {{season.name}} season from {{season.from}} to {{season.to}}
      <span class="small is-darkgray text-button" @click="editSeason">edit</span><br />
      <b>publish date:</b> {{season.published_at | moment("MMMM D YYYY")}} 
      <p><b>Productions:</b>
            <ul>
              <li v-for="(production, index) in productions" :key="index">
                {{production.name}}, from {{production.dates[0].date}} to {{production.dates[production.dates.length - 1].date}} <span class="small is-darkgray text-button" @click="editProduction(index)">edit</span>
              </li>
            </ul>
        </p>
      <success-warning-notice :messaging="messaging"></success-warning-notice>
        <br />
      <button v-if="mode !== 'edit'" class="button-right" @click="saveSeason">Save Season</button>
      <button class="button-right button-right-margin" @click="productionNew">Add Another Production</button>
      <span @click="cancelSeason" class="small text-button button-right button-right-margin cancel-button">cancel</span>
  </div>
</template>

<script>
import successWarningNotice from './successWarningNotice';

export default {
  name: 'seasonReview',
  props: {
  	season: Object,
  	productions: Array,
  	mode: String,
  	messaging: {
  		type: Object,
  		required: false
  	}
  },
  components: {
  	'success-warning-notice': successWarningNotice
  },
  data () {
    return {
      
    }
  },
  methods: {
  	productionNew: function () {
  		this.$emit('production-new')
  	},
  	saveSeason: function() {
  		this.$emit('season-save')
  	},
  	editSeason: function() {
  		this.$emit('season-edit')
  	},
  	editProduction: function(index) {
  		this.$emit('production-edit', index)
  	},
  	cancelSeason: function() {
  		this.$emit('cancel-season')
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';
.button-right {
  float: right;
}

.cancel-button {
	min-height: 30px;
	padding: 3px 10px;
	line-height: 24px;
}

.text-button {
	margin-left: 15px;
}
</style>
