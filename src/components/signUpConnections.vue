<template>
  <div class="connections row">
  	<p>Search or enter below the name of any connections you wish to add to the company register</p>
  	<div class="col-xs-12 col-sm-12 row search-artist">
  		<div class="col-sm-4 col-xs-12 large strong">Search {{type | capitalize}}</div><div class="col-sm-8 col-xs-12"><input type="search" /></div>
  	</div>
  	<div class='form-checkboxes artist-checkboxes'>
        <div v-for="(v, index) in filters" class="inline-checkbox">
          <input :id='v' type='radio' :value="v" :key="index" v-model='filterValue' />
          <label :for="v"><span></span>{{v | capitalize}}</label>
        </div>
        <div class="inline-checkbox">
          <input id='clear' type='radio' value="" v-model='filterValue' />
          <label for="clear"><span></span>All</label>
        </div>
    </div>

     

    <div class="strong col-xs-12 col-sm-12"><span>Suggested for you</span>
     	<span v-if="type === 'artist'" v-on:click="type = 'company'" class="toggle-company small strong">List Companies</span>
     	<span v-if="type === 'company'" v-on:click="type = 'artist'" class="toggle-company small strong">List Artists</span>
    </div>

    <label v-for="(connection, index) in filteredConnections" :for="connection.name" class="connection-tile tile-container col-xs col-xm">

        <input :id="connection.name" type='checkbox' :value="connection.id" v-model="connectionRequests" />
            <label><span></span></label>

        <div class="avatar-medium connection-avatar">
          <img v-bind:src="connection.img" :alt="connection.firstName + connection.lastName + ' photo'" />
        </div>
        <div class="name strong small">{{ connection.name }}</div>
        <div class="place tiny">{{connection.city}} {{connection.province}}</div>
        <div v-if="connection.type === 'artist'" class="role smaller">{{ connection.role }}</div>
      <span class="small">CONNECT</span>
    </label>

<!--   		<connection-tile v-for="(connection, index) in filteredConnections" :connection="connection" :key="index" v-model="connectionRequests" class="col-xs col-sm"></connection-tile> -->

  	
  	<next-last-step v-on:click.native="saveData(1, {'connectionRequests': connectionRequests})" :step="'next'" class="step-container"></next-last-step>
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
      connectionRequests: [],
    	connections: [],
    	type: "artist",
    	filterValue: "",
    	voiceTypes: ['Soprano', 'Mezzo Soprano', 'Tenor', 'Baritone', 'Bass', 'Counter Tenor'],
    	companyCities: ['Ontario', 'British Columbia', 'Quebec', 'Alberta', 'Manitoba']
    }
  },
  computed: {
  	filteredConnections: function() {
  		return this.connections.filter((connection) => {
  			return connection.profileType.match(this.type)
  		})
      .filter((connection) => {
        return connection.role.match(this.filterValue)
      })
      .filter((connection) => {
        return connection.city.match(this.filterValue)
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
  methods: {
    addConnection: function(id) {
      console.log(id);
      this.connectionRequests.push(id);
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

// connection tile

.connection-tile {
  background: $color-tile;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  text-align: center;
  margin: 10px 5px;
  cursor: pointer;
}

.connection-avatar, .place, .role {
  margin-bottom: 10px;
  flex-grow: 1;
}

.tile-container:hover {
  background: $color-gold;
  color: white;
}

.tile-container input[type="checkbox"] + label span {
  float: right;
}

.circle {
  float: right;
  background: $color-tile;
  border-radius: 50%;
  color: $color-gold;
  width: 16px;
  height: 16px;
}

.name {
  margin-bottom: 5px;
}
</style>
