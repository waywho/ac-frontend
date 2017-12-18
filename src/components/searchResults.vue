<template>
  <div class="search-results">
  	<div class="search-heading"><h3 class="is-golden">Search Results</h3></div>
  		<div class="search-results-inner">
  			<div class="section-title">
	  			<img src='../assets/images/artistprofile-icon.png' alt="artist profile results icon" class="result-icon" /><span class="medium large">People</span>
  			</div>
  			<div v-for="profile in artistProfiles" class="result-item row middle-xs middle-sm between-xs between-sm">
  				<div class="col-xs col-sm">
  					<img :src="profile.img" class="avatar" :alt="profile.name + 'avatar'" />
  				</div>
  				<div class="col-xs col-sm">
  					<div class="medium">{{profile.name}}</div>
  					<div class="smaller"><span class="is-golden role">{{profile.role}}</span> in {{profile.city}}, {{profile.province}} </div>
  				</div>
  				<i class="fa fa-user-plus col-xs col-sm user-plus-icon" aria-hidden="true"></i>
  			</div>

  			<div class="section-title">
	  			<img src='../assets/images/companyprofile-icon.png' alt="artist profile results icon" class="result-icon" /><span class="medium large">Company</span>
  			</div>
  			<div v-for="profile in companyProfiles" class="result-item row middle-xs middle-sm between-xs between-sm">
  				<div class="col-xs col-sm">
  					<div class="avatar">
  						<img :src="profile.img" :alt="profile.name + 'avatar'" />
  					</div>
  				</div>
  				<div class="col-xs col-sm">
  					<div class="medium">{{profile.name}}</div>
  					<div class="smaller"><span class="is-golden role">{{profile.companyType}}</span> company in {{profile.city}}, {{profile.province}} </div>
  				</div>
  				<i class="fa fa-user-plus col-xs col-sm user-plus-icon" aria-hidden="true"></i>
  			</div>
  		</div>
  </div>
</template>

<script>
export default {
  name: 'searchesults',
  data () {
    return {
      term: this.$route.params.term,
      results: [
  		{
			name: "Jane Smith",
			role: "Artistic Director",
			img: require("../assets/images/Caitlin-McCaughey.png"),
			city: "Toronto",
			province: "ON",
			profileType: "artist"
		}, 
		{
			name: "John Smith",
			role: "Baritone",
			img: require("../assets/images/Daevyd-Pepper.png"),
			city: "Vancouver",
			province: "BC",
			profileType: "artist"
		}, 
		{
			name: "James Smith",
			role: "Conductor",
			img: require("../assets/images/Brenden-Friesen.png"),
			city: "Montreal",
			province: "QC",
			profileType: "artist"
		}, 
		{
			name: "Opera Smith",
			companyType: "Regional",
			img: require("../assets/images/myopera-logo.png"),
			city: "Vancouver",
			province: "BC",
			profileType: "company"
		}, 
		{
			name: "Smith Opera",
			companyType: "National",
			img: require("../assets/images/myopera-logo.png"),
			city: "Montreal",
			province: "QC",
			profileType: "company"
		}, 
		{
			name: "James Smith Opera",
			companyType: "Regional",
			img: require("../assets/images/myopera-logo.png"),
			city: "Winnipeg",
			province: "MB",
			profileType: "company"
		}
      ]
    }
  },
  computed: {
  	artistProfiles: function() {
  		return this.results.filter((profile) => {
  			return profile.profileType.match("artist")
  		});
  	},
  	companyProfiles: function() {
  		return this.results.filter((profile) => {
  			return profile.profileType.match("company")
  		});
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
