<template>
  	<div class="opportunity-panel">
  		<div v-if="component === '' && profileType === 'company'">
  			<h2>Opportunity</h2>
			<span class="is-gold"><b>Manage or Create Your Opportunities</b></span>
			
			<div class="start-options" @click="component = 'opportunity-create'">
				<h3>Create Opportunity</h3>
				<p>
					Create your company's opportunities. In 3 easy steps your audition will be created and posted to the Artist.Center opportunity board.
				</p>
				<i class="fa fa-chevron-right"></i> <b>Start Setup</b>
			</div>

			<div class="start-options" @click="component = 'opportunity-manage'">
				<h3>Manage Opportunities</h3>
				<p>
					View your opportunity applicants.
				</p>
				<i class="fa fa-chevron-right"></i> <b>Arrange & Manage</b>
			</div>
		</div>
		<opportunity-manage-artist v-if="profileType === 'artist'"></opportunity-manage-artist>
		<component :is="component" class="" v-on:back-start="component = ''"></component>
  	</div>
</template>

<script>
import opportunityCreate from './opportunityCreate'
import opportunityManage from './opportunityManage'
import opportunityManageArtist from './opportunityManageArtist'

export default {
  name: 'opportunityTool',
  components: {
  	'opportunity-create': opportunityCreate,
  	'opportunity-manage': opportunityManage,
  	'opportunity-manage-artist': opportunityManageArtist
  },
  props: {
  	profileType: String
  },
  data () {
    return {
      component: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';
.opportunity-panel {
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0px $body-padding-small;
}

.start-options {
	padding-right: 50px;
	color: $color-midgray;
	margin-top: 60px;
	cursor: pointer;
}

.start-options h3 {
	color: $color-midgray;
}

.start-options:hover, .start-options:hover h3 {
	color: $color-gold;
	transition: all 0.2s;
}




@media all and (min-width: $bp-small) {

  .opportunity-panel {
    padding-left: $body-padding-small;
  }

}

@media all and (min-width: $bp-med) {

  .opportunity-panel {
    padding-left: $body-padding-small;
  }

}


@media all and (min-width: $bp-med-2) {
  .opportunity-panel {
    padding-left: $body-padding-large;
  }

}

</style>
