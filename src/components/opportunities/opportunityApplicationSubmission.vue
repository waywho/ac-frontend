<template>
  <div>
	<div class="tile">
		<div class="is-golden"><b>{{opp.company}}</b></div>
		<div class="small">{{opp.title}}</div>
	</div>
	<h3>Application Submission</h3>
	<div class="application-submission">
		<div>
			<span class="is-golden"><b>Artist.Center Profile</b></span><br />
			<p class="small">Your profile, portfolio, and contact will be used to apply for this opportunity.</p>
		</div>
		<a target="_blank" :href="profile.profile_url" alt="profile url">
			<div class="candidate-tile" >
				<avatar :image-source="profile.avatar_url" :border="true" :size="'medium'" :name="profile.name"></avatar>
				
				<div class="candidate-details">
					<div class="candidate-name strong is-golden">{{profile.name}}</div>
	        	<div class="small">{{profile.role}}</div>
	        	
				</div>
			</div>
		</a>
	</div>
	<success-warning-notice :messaging="messaging"></success-warning-notice>
  </div>
</template>

<script>
import successWarningNotice from '@/components/successWarningNotice'
import avatar from '@/components/avatar';

export default {
  name: 'opportunityApplicationSubmission',
  props: {
  	opp: Object,
  	profile: Object,
  	messaging: Object
  },
  components: {
  	successWarningNotice,
  	avatar
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';
.tile {
	background-color: #f7f4f4;
	margin-bottom: 7px;
	margin-right: 8px;
	padding: 10px 10px;
	max-width: 50%;
}

.application-submission {
	display: flex;
}

.applicant-avatar {
	width: 65px;
	height: 65px;
}

.candidate-tile {
	margin-left: 25px;
	width: 250px;
}

.message-box {
	margin-top: 25px;
}
</style>
