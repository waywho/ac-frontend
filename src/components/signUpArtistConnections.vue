<template>
  <div class="connections row">
  	<p>Search or enter below the name of any connections you wish to add to the company register</p>
  	<div class="col-xs-12 col-sm-12 row search-artist">
  		<div class="col-sm-4 col-xs-12 large strong">Search {{type | capitalize}}</div><div class="col-sm-8 col-xs-12"><input type="search" /></div>
  	</div>
  	<div class='form-checkboxes artist-checkboxes'>
        <div v-for="(v, index) in filters" class="inline-checkbox">
          <input :id='v' type='checkbox' :value="v" :key="index" v-model='filterValue' />
          <label :for="v"><span></span>{{v | capitalize}}</label>
        </div>
     </div>

     

     <div class="strong col-xs-12 col-sm-12"><span>Suggest for you</span>
     	<span v-if="type === 'artist'" v-on:click="type = 'company'" class="toggle-company small strong">List Companies</span>
     	<span v-if="type === 'company'" v-on:click="type = 'artist'" class="toggle-company small strong">List Artists</span>
     </div>


  		<connection-tile v-for="(connection, index) in filteredConnections" :connection="connection" :key="index" class="col-xs col-sm"></connection-tile>

  	
  	<next-last-step v-on:click.native="takeStep(1, connections)" :step="'next'" class="step-container"></next-last-step>
  </div>
</template>

<script>
import connectionTile from './connectionTile'
import nextLastStep from './nextLastStep'
import stepMixin from '../mixins/stepMixin';

export default {
  name: 'signUpArtistconnections',
  components: {
  	'next-last-step': nextLastStep,
  	'connection-tile': connectionTile
  },
  data () {
    return {
    	connections: [],
    	type: "artist",
    	filterValue: "",
    	voiceTypes: ['soprano', 'mezz soprano', 'tenor', 'baritone', 'bass', 'counter tenor'],
    	companyCities: ['Ontario', 'British Columbia', 'Quebec', 'Alberta', 'Manitoba']
    }
  },
  computed: {
  	filteredConnections: function() {
  		return this.connections.filter((connection) => {
  			return connection.profileType.match(this.type)
  		});
  	},
  	filters: function() {
  		if(this.type === "artist") {
  			return this.voiceTypes
  		} else if (this.type === "company") {
  			return this.companyCities
  		}
  	}
  },
  created() {
  	var usersArray = [];
  	this.connections = this.$store.state.users;
  	for (let key in this.connections) {
  		this.connections[key].id = key;
  		usersArray.push(this.connections[key]);
  	}
  	this.connections = usersArray;
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

.toggle-company {
	cursor: pointer;
	float: right;
}

.toggle-company:hover {
	color: $color-gold;
}
</style>
