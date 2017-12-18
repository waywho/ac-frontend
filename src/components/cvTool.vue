<template>
  <div class="cv">
  	<h3>{{name}}</h3>
  	<span>{{voiceType | capitalize}}</span>
  	<h5 class="is-golden">Engaged by</h5>
  	<div class="row middle-xs middle-sm">
  		<div class="col-xs-2 col-sm-2"><img src="../assets/images/myopera-logo.png" /></div>
  		<div class="col-xs-2 col-sm-2"><img src="../assets/images/tapestry-logo.png" /></div>
  		<div class="col-xs-2 col-sm-2"><img src="../assets/images/Opera_de_Montreal-logo.jpg" /></div>
  		<div class="col-xs-2 col-sm-2"><img src="../assets/images/ATGT-logo.png" /></div>
  		<div class="col-xs-2 col-sm-2"><img src="../assets/images/coc-logo.png" /></div>
  	</div>

  	<div v-for="(section, key) in cv">
  		<div v-if="key === 'opera_roles'">
	  		<h5 class="is-golden">{{key.split("_").join(" ") | capitalize}}</h5>
	  			<div v-for="(line, key) in section" class="row">
	  				<div v-for="item in line" class="col-xs col-sm small">{{item}}</div>
	  			</div>
  		</div>

  		<div v-if="key === 'awards'">
	  		<h5 class="is-golden">{{key.split("_").join(" ") | capitalize}}</h5>
	  		<ul>
	  			<li v-for="line in section" class="row cv-line small">
	  				{{Object.values(line).join(" ")}}
	  			</li>
	  		</ul>
  		</div>

  		<div v-if="key === 'education'">
	  		<h5 class="is-golden">{{key.split("_").join(" ") | capitalize}}</h5>
	  			<div v-for="line in section" class="row small">
	  				{{line.from}}-{{line.to}} {{line.accomplishment}} in {{line.major}}, {{line.institution}}
	  			</div>

  		</div>
  	</div>
  	
  	<div class="row">
	  	<div v-for="(section, key) in cv" >
	  		<div v-if="key === 'coaches' || key === 'instructors' || key === 'directors' || key === 'conductors'" class="col-xs col-sm between-sm between-xs">
	  			<h5 class="is-golden">{{key.split("_").join(" ") | capitalize}}</h5>
	  			<ul >
		  			<li v-for="item in section" class="small">{{item}}</li>
	  			</ul>
	  		</div>
	  	</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'cvTool',
  props: {
  	profileId: String
  },
  data () {
    return {
      cv: {},
      name: "",
      voiceType: ""
    }
  },
  created() {
  	this.cv = this.$store.state.profiles[this.profileId].cv;
  	this.name = this.$store.state.profiles[this.profileId].name;
  	this.voiceType = this.$store.state.profiles[this.profileId].details.voiceType;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.cv {
  padding-top: 40px;
  padding-left: 100px;
	height: 476px;
	overflow-y: scroll;
}

</style>
