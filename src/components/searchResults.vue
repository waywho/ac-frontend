<template>
  <div class="search-results">
  	<div class="search-heading"><h3 class="is-golden">Search Results</h3></div>
  		<div class="search-results-inner">
  			<div class="section-title">
	  			<img src='../assets/images/artistprofile-icon.png' alt="artist profile results icon" class="result-icon" /><span class="medium large">People</span>
  			</div>
  			<div v-for="profile in artistProfiles" class="result-item row middle-xs middle-sm between-xs between-sm" @click='showProfile(profile.id)'>
  				<div class="avatar avatar-medium">
  					<img :src="userAvatar(profile.avatarURL)" :alt="profile.name + 'avatar'" />
  				</div>
  				<div class="col-xs col-sm">
  					<div class="medium">{{profile.name}}</div>
  					<div class="smaller"><span class="is-golden role">{{profile.role}}</span> in {{profile.city}}, {{profile.province}} </div>
  				</div>
  			</div>

  			<div class="section-title">
	  			<img src='../assets/images/companyprofile-icon.png' alt="artist profile results icon" class="result-icon" /><span class="medium large">Company</span>
  			</div>
  			<div v-for="profile in companyProfiles" class="result-item row middle-xs middle-sm between-xs between-sm" @click='showProfile(profile.id)'>
  				<div class="avatar avatar-medium">
  					<img :src="userAvatar(profile.avatarURL)" :alt="profile.name + 'avatar'" />
  				</div>
  				<div class="col-xs col-sm">
  					<div class="medium">{{profile.name}}</div>
  					<div class="smaller"><span class="is-golden role">{{profile.companyType}}</span> company in {{profile.city}}, {{profile.province}} </div>
  				</div>
  			</div>
  		</div>
  </div>
</template>

<script>
import profileSearchMixin from '@/mixins/profileSearchMixin';
import avatarMixin from '@/mixins/avatarMixin';

export default {
  name: 'searchesults',
  data () {
    return {
    }
  },
  computed: {
  	artistProfiles: function() {
  		return this.profileResults.filter((profile) => {
  			return profile.type.match("artist")
  		});
  	},
  	companyProfiles: function() {
  		return this.profileResults.filter((profile) => {
  			return profile.type.match("company")
  		});
  	}
  },
  mixins: [profileSearchMixin, avatarMixin],
  created() {
  	this.getUsers()
  },
  methods: {
  	showProfile: function(profileId) {
  		this.$router.push("/profiles/" + profileId)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.search-results {
	width: 859px;
	margin: 35px auto 50px;
}

.search-results-inner {
	width: 100%;
	background: white;
	padding: 1px 58px 58px;
}

.search-heading {
	width: 100%;
	text-align: right;
}

.result-icon {
	height: 40px;
	width: 40px;
	display: inline;
	margin-right: 34px;
}

.section-title {
	width: 100%;
	display: flex;
	align-items: center;
	margin: 58px 0px 58px;
}

.result-item {
	width: 100%;
	background-color: $color-tile;
	margin-bottom: 10px;
	height: 58px;
	display: flex;
	padding: 0px 10px;
	cursor: pointer;
}

.user-plus-icon {
	text-align: right;
}

.result-item:hover, .result-item:hover .role {
	background-color: $color-gold;
	color: white;
}
</style>
