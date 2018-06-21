<template>
  <div class="connections row">
  	<p>Search or enter below the name of any connections you wish to add to the company register</p>
  	<div class="col-xs-12 col-sm-12 row search-artist">
  		<div class="col-sm-4 col-xs-12 large strong">Search {{typeFilter | capitalize}}</div><div class="col-sm-8 col-xs-12"><input type="search" /></div>
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
     	<span v-if="typeFilter === 'artist'" v-on:click="typeFilter = 'company'" class="toggle-company small strong">List Companies</span>
     	<span v-if="typeFilter === 'company'" v-on:click="typeFilter = 'artist'" class="toggle-company small strong">List Artists</span>
    </div>

    <label v-for="(connection, index) in filteredProfiles" :for="connection.id" class="connection-tile tile-container col-xs col-xm">

        <input :id="connection.id" type='checkbox' :value="connection" v-model="connectionRequests" />
            <label><span></span></label>

        <div class="avatar-medium connection-avatar" :style="{'background-image': 'url('+ connection.avatarURL +')'}" :title="connection.name + ' avatar image'">
        </div>
        <div class="name strong small">{{ connection.name }}</div>
        <div class="place tiny">{{connection.city}} {{connection.province}}</div>
        <div class="role smaller">{{ connection.roleType }}<span v-if="connection.type === 'company'"> company</span> </div>
      <span class="small">CONNECT</span>
    </label>

<!--   		<connection-tile v-for="(connection, index) in filteredProfiles" :connection="connection" :key="index" v-model="connectionRequests" class="col-xs col-sm"></connection-tile> -->

  	
  	<next-last-step v-on:click.native="requestConnects()" :step="'next'" class="step-container"></next-last-step>
  </div>
</template>

<script>
import connectionTile from '@/components/auth/connectionTile'
import nextLastStep from '@/components/nextLastStep'
import stepMixin from '@/mixins/stepMixin'
import firebaseAxios from '@/axios/axios-firebase.js'

export default {
  name: 'signUpArtistconnections',
  components: {
  	'next-last-step': nextLastStep,
  	'connection-tile': connectionTile
  },
  data () {
    return {
      connectionRequests: [],
    	profilesArray: [],
      profilesObjects: null,
    	typeFilter: "artist",
    	filterValue: "",
    	voiceTypes: ['Soprano', 'Mezzo Soprano', 'Tenor', 'Baritone', 'Bass', 'Counter Tenor'],
    	companyCities: ['Ontario', 'British Columbia', 'Quebec', 'Alberta', 'Manitoba']
    }
  },
  mixins: [stepMixin],
  computed: {
  	filteredProfiles: function() {
  		return this.profilesArray.filter((profile) => {
  			return profile.type.match(this.typeFilter)
  		})
      .filter((profile) => {
        return profile.id !== this.$store.getters.currentUser.id
      })
      .filter((profile) => {
        return profile.roleType.match(this.filterValue)
      })
      .filter((profile) => {
        return profile.city.match(this.filterValue)
      });
  	},
  	filters: function() {
  		if(this.typeFilter === "artist") {
  			return this.voiceTypes
  		} else if (this.typeFilter === "company") {
  			return this.companyCities
  		}
  	}
  },
  methods: {
    addConnection: function(id) {
      // console.log(id);
      // function not in use
      this.connectionRequests.push(id);
    },
    requestConnects: function() {
      this.$store.dispatch('requestConnections', {userId: this.$store.getters.currentUser.id, data: this.connectionRequests})
        .then(() => {
          this.takeStep(1, {"connectionRequests": this.connectionRequests})
        },
          error => {
            this.messageShow = true
          })
    }
  },
  created() {
  	var usersArray = [];

    firebaseAxios.get("/users.json" + '?auth=' + this.$store.getters.currentUser.idToken)
        .then(res => {
          console.log(res)

          this.profilesArray = Object.values(res.data)
          this.profilesObjects = res.data
          console.log('profiles', this.profilesArray);
        })
        // TODO: add message if data is not found somwehere
        .catch(error => console.log(error))

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

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
