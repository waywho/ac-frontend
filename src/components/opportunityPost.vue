<template>
	<modal @close="$emit('close')">
		<div slot='header' class="post-header">
			<div class="row between-xs between-md between-lg">
				<div class="close-post smaller" @click="$emit('close')"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i> back to search results</div>
				<div class="close-post smaller" @click="$emit('close')">close window <i class="fa fa-times" aria-hidden="true"></i></div>
			</div>
			<h4 class='post-header'>{{opp.company}}</h4>
			<p class="big"><b>{{opp.title}}</b></p>
		</div>
		<div slot='body' class="post-body">
			<span class="smaller">Posted: {{opp.created_at | moment("MMMM DD, YYYY")}}</span>
			<div class="row">
				<div class="col-md-2 col-lg-2 opportunity-icon smaller"><i class="fa fa-globe" aria-hidden="true"></i> {{opp.region}}</div> 
	  			<div class="col-md-2 col-lg-2 opportunity-icon smaller"><i class="fa fa-flag-o" aria-hidden="true"></i> {{opp.country}}</div>
	  			<div class="col-md-3 col-lg-3 opportunity-icon smaller"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{opp.opportunity_type | capitalize}}</div>
	  			<div class="col-md-3 col-lg-3 opportunity-icon smaller"><i class="fa fa-bookmark" aria-hidden="true"></i> {{opp.category_list.toString() | capitalize}}</div>
	  			<div class="col-md-2 col-lg-2 opportunity-icon smaller"><i class="fa fa-check-square" aria-hidden="true"></i> {{opp.payment_type | capitalize}}</div>
			</div>
			<h5>Age Limit</h5>
			<p>{{opp.min_age}}-{{opp.max_age}}</p>
			<h5>Application Deadline</h5>
			<p>{{opp.deadline | moment("MMMM DD, YYYY")}}</p>
			<h5>Audition Dates & Locations</h5>
			<ul v-for="audition in opp.audition_dates">
				<li>{{audition.location}} - {{audition.from | moment("MMMM DD, YYYY")}}</li>
			</ul>
			<h5>Materials Required</h5>
			<p>{{opp.materials_required}}</p>
			<h5>Opportunity Description</h5>
			<p>{{opp.description}}</p>
			<h5>Payment</h5>
			<p>{{opp.payment_details}}</p>
			<h5>Contact Information</h5>
			<p>{{opp.contact_information}}</p>
		</div>
		<div slot="footer" class="post-footer">
			<button><i class="fa fa-chevron-right" aria-hidden="true"></i>Apply for this Opportunity</button>
		</div>
	</modal>
</template>

<script>
import modal from './modal';

export default {
  name: 'opportunityPost',
  props: {
  	opp: Object
  },
  components: {
  	'modal': modal
  },
  data () {
    return {
      
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.post-header {
	text-align: left;
}

.post-header h4 {
	color: $color-gold;
}

.post-header, .post-body, .post-footer {
	text-align: left;
}

.opportunity-icon {
	color: $color-gold;
	font-weight: bold;
}

.header-buttons

.close-post {
	cursor: pointer;
	color: $color-darkgray;
}

.close-post:hover {
	cursor: pointer;
	color: $color-gold;
}

</style>

