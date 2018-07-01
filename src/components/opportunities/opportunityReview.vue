<template>
  <div class="review-panel">
  	<div class="post-review">
  		<div class='post-header large is-gold'><b>{{opp.company}}</b></div>
		  <p class="big is-gold"><b>{{opp.title}}</b></p>

		  <span class="smaller">Posted: {{today | moment("MMMM DD, YYYY")}}</span>
  		<div class="row is-gold">
  			<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 opportunity-icon smaller"><i class="fa fa-globe" aria-hidden="true"></i> {{opp.region | capitalize}}</div> 
    			<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 opportunity-icon smaller"><i class="fa fa-flag-o" aria-hidden="true"></i> {{opp.country | capitalize}}</div>
    			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 opportunity-icon smaller"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{opp.opportunity_type | capitalize}}</div>
    			<div class="col-xs-2 col-sm-2 col-md-3 col-lg-3 opportunity-icon smaller"><i class="fa fa-bookmark" aria-hidden="true"></i> {{opp.category_list.toString() | capitalize}}</div>
    			<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 opportunity-icon smaller"><i class="fa fa-check-square" aria-hidden="true"></i> {{opp.payment_type | capitalize}}</div>
  		</div>
  		<h5 v-if="opp.min_age !== null || opp.max_age !== null">Age Limit</h5>
  		<p v-if="opp.min_age !== null || opp.max_age !== null" class="is-gold">{{opp.min_age}}-{{opp.max_age}}</p>
  		<h5>Application Deadline</h5>
  		<p v-if="opp.deadline !== null" class="is-gold">{{opp.deadline | moment("MMMM DD, YYYY")}}</p>
  		<p v-else>Unspecified</p>
  		<h5 v-if="opp.audition_dates.length > 1">Audition Dates & Locations</h5>
  		<ul v-if="opp.audition_dates.length > 1" v-for="audition in opp.audition_dates">
  			<li class="is-gold">{{audition.location}} - {{audition.from | moment("MMMM DD, YYYY")}}</li>
  		</ul>
  		<h5 v-if="opp.materials_required !== null">Materials Required</h5>
  		<p v-if="opp.materials_required !== null" class="post-text is-gold">{{opp.materials_required}}</p>
  		<h5>Opportunity Description</h5>
  		<p class="post-text is-gold">{{opp.description}}</p>
  		<h5>Payment</h5>
  		<p class="post-text is-gold">{{opp.payment_details}}</p>
  		<h5>Contact Information</h5>
  		<p class="post-text is-gold">{{opp.contact_information}}</p>
  	</div>
		<div class="is-darkgray bottom-button-review" @click="postOpportunity">
     		<i class="fa fa-chevron-right" aria-hidden="true" v-if="!loading"></i>
        <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
        Post opportunity
   	</div>
  </div>
</template>

<script>
export default {
  name: 'opportunityReview',
  props: {
  	opp: Object
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
  	today: function () {
  		return Date()
  	}
  },
  methods: {
  	postOpportunity: function() {
      this.loading = true;
      this.$emit("post-opportunity")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';
.inner-panel-padding {
	padding-right: 0px;
}

.review-panel {
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
}

.post-review {
	padding-left: 0px;
  flex-basis: auto;
}

.bottom-button-review {
  flex-basis: auto;
  display: flex;
  background: #f6f3ed;
  cursor: pointer;
  height: 72px;
  display: flex;
  align-items: center;
  padding-left: 25px;
  font-weight: bold;
}

.bottom-button-review i {
  margin-right: 40px;
}

.bottom-button:hover {
  background: #ecddba;
  color: white;
}

@media screen and (max-width: 46rem) {

}

</style>
