<template>
  <div class="search-results">
  	<div class="search-heading"><h3 class="is-gold">Search Results</h3></div>
  		<div class="search-results-inner">
  			<div class="section-title">
	  			<img src='../assets/images/artistprofile-icon.png' alt="artist profile results icon" class="result-icon" /><span class="medium large">People</span>
  			</div>
  			<div v-for="profile in artistProfiles" class="result-item" @click='showProfile(profile.id)'>
          <div class="avatar-box">
           <avatar :image-source="profile.avatarURL" :border="true" :size="'medium'" :name="profile.name"></avatar>
         </div>
  				<div class="profile-details">
  					<div class="medium">{{profile.name}}</div>
  					<div class="smaller"><span class="is-gold role">{{profile.role}}</span> in {{profile.city}}, {{profile.province}} </div>
  				</div>
  			</div>

  			<div class="section-title">
	  			<img src='../assets/images/companyprofile-icon.png' alt="artist profile results icon" class="result-icon" /><span class="medium large">Company</span>
  			</div>
  			<div v-for="profile in companyProfiles" class="result-item" @click='showProfile(profile.id)'>
          <div class="avatar-box">
  				  <avatar :image-source="profile.avatarURL" :border="true" :size="'medium'" :name="profile.name"></avatar>
          </div>
  				<div class="">
  					<div class="medium">{{profile.name}}</div>
  					<div class="smaller"><span class="is-gold role">{{profile.companyType}}</span> company in {{profile.city}}, {{profile.province}} </div>
  				</div>
  			</div>
  		</div>
  </div>
</template>

<script>
import profileSearchMixin from '@/mixins/profileSearchMixin';
import avatar from '@/components/avatar'

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
  components: {avatar},
  mixins: [profileSearchMixin],
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
	width: 90%;
  max-width: 859px;
	margin: 35px auto 50px;
}

.search-results-inner {
	width: 100%;
  max-width: 800px;
	background: white;
	padding: 1px $body-padding-small;
}

.search-heading {
	width: 92%;
  margin-left: 10px;
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
  height: auto;
	width: auto;
	background-color: $color-tile;
	margin-bottom: 10px;
  padding: 0.5rem 1rem;
	display: flex;
  align-items: center;
  justify-content: flex-start;
	cursor: pointer;
}

.avatar-box {
  margin-right: 25px;
}

.user-plus-icon {
	text-align: right;
}

.result-item:hover, .result-item:hover .role {
	background-color: $color-gold;
	color: white;
}
</style>
