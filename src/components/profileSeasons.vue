<template>
  <div class="seasons">
  	<h2 class="inline-header">Season</h2>
  	<span class="button-container">
  	 <i class="fa fa-plus is-darkgray button-fa" @click="showSeasonForm = true" aria-hidden="true"></i>
  	</span>
  	<season-form v-if="showSeasonForm === true" @close="showSeasonForm = false"></season-form>
  </div>
</template>

<script>
import seasonForm from './seasonForm'

export default {
  name: 'seasons',
  components: {
  	'season-form': seasonForm
  },
  data () {
    return {
      showSeasonForm: false
    }
  },
  methods: {
  	toggleForm: function() {

    },
    keepFormAlive: function() {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.seasons {
	height: 240px;
}

.inline-header {
	display: inline;
}

.button-container {
}

.button-fa {
	margin-left: 15px;
}

</style>
