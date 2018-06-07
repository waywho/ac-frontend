<template>
  <modal @close="$emit('close')">
  	<div slot="header">
  		<h2>Opportunity Application</h2>

  		<i class="fa fa-times large is-darkgray close-button" aria-hidden="true" @click="$emit('close')"></i>
  	</div>
  	
  	<component slot="body" :is="component" :opp="opp" :profile="profile" :messaging="messaging"></component>

  	<div slot="footer">
  		<button v-if="component === 'opportunity-application-submission'" @click="createApplication"><i class="fa fa-chevron-right" aria-hidden="true"></i> Submit Application</button>
  	</div>
  </modal>
</template>

<script>
import modal from './modal';
import oppAxios from '../axios-opportunities.js';
// import axios from 'axios';
import opportunityApplicationSubmission from './opportunityApplicationSubmission';
import opportunityApplicationSuccess from './opportunityApplicationSuccess';

export default {
  name: 'opportunityApplication',
  props: {
  	opp: Object
  },
  components: {
  	modal,
  	opportunityApplicationSubmission,
  	opportunityApplicationSuccess
  },
  data () {
    return {
    	component: 'opportunity-application-submission',
	    profile: {
	      	user_id: this.$store.getters.profile.id,
	      	profile_url: "/profiles/" + this.$store.getters.profile.id,
	      	avatar_url: this.$store.getters.profile.avatarURL,
	      	name: this.$store.getters.profile.details.name,
	      	role: null
	    },
	    messaging: null
    }
  },
  methods: {
  	createApplication: function() {
  		oppAxios.post(`/opportunities/${this.opp.id}/opportunity_applications.json`, {
  			idToken: this.$store.getters.currentUser.idToken,
  			opportunity_application: this.profile
  		}).then(res => {
  			console.log(res)
			this.messaging = res.data
			this.component = "opportunity-application-success"
  		}).catch(error => {
  			console.log(error.response)
  			this.messaging = error.response.data
  		})
  	}
  },
  created() {
  	console.log(this.$store.getters.profile.type)
  	if(this.$store.getters.profile.type === "company") {
  		this.profile.role = this.$store.getters.profile.details.companyType
  	} else if (this.$store.getters.profile.type === "artist") {
  		this.profile.role = this.$store.getters.profile.details.voiceType
  	}

  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

</style>
