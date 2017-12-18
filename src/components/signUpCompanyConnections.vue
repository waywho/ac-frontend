<template>
  <div class="connections row">
  	<div class="col-xs-12 col-sm-12 row search-artist">
  		<div class="col-sm-4 col-xs-12 large strong">Search Companies</div><div class="col-sm-8 col-xs-12"><input type="search" /></div>
  	</div>
  	<div class='form-checkboxes artist-checkboxes'>
        <div v-for="(c, index) in cities" class="inline-checkbox">
          <input :id='c' type='checkbox' :value="c" :key="index" v-model='city' />
          <label :for="c"><span></span>{{c | capitalize}}</label>
        </div>
     </div>
     <div class="strong col-xs-12 col-sm-12"> Suggest for you</div>
  	<connection-tile v-for="(connection, key) in filteredConnections" :connection="connection" :key="key" class="col-xs col-sm"></connection-tile>
  	<next-last-step v-on:click.native="takeStep(1, type)" :step="'next'" class="step-container"></next-last-step>
  </div>
</template>

<script>
import connectionTile from './connectionTile'
import nextLastStep from './nextLastStep'
import stepMixin from '../mixins/stepMixin'

export default {
  name: 'signUpStepSeven',
  components: {
  	'next-last-step': nextLastStep,
  	'connection-tile': connectionTile
  },
  data () {
    return {
    	connections: [],
    	city: "",
    	cites: ['Ontario', 'British Columbia', 'Quebec', 'Alberta', 'Manitoba']
    }
  },
  computed: {
  	filteredConnections: function() {
  		return this.connections = this.$store.state.users;
  	}
  },
  mixins: [stepMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.connections {
	width: 100%;
}

.connections .row {
	align-items: center;
}

.search-artist, .artist-checkboxes {
	margin-bottom: 25px;
}

.suggestion-headings {
	margin-bottom: 15px;
}

.step-container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 65px auto 0px;
}
</style>
