<template>
	<div  class="col-xs-12 col-md-10 col-lg-10">
  		<h3>Opportunity Board Search Results</h3>
  		<b class="is-golden">{{opportunityNum}} Matches Found</b>
  		<p>Based on your selected criteria, opportunities are listed below. Click on the opportunities to apply</p>
  		<div class="small search-revise" @click="$emit('filter-component', 'opportunity-filter')"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i><b> Revise Search Criteria</b></div>
  		<div class='sort-checkboxes form-checkboxes'>
	  		<b>Display Results by:</b><br /><br />
	        <div class='form-checkboxes'>
	        	<div v-for="(sorty, index) in sortOptions" class="inline-checkbox">
	          		<input :id='sorty.label' type='radio' :value='sorty.value' v-model='sortyBy' @change="applySort" />
	          		<label :for='sorty.label'><span></span>{{sorty.label | capitalize}}</label>
	        	</div>
	      	</div>
    	</div>
  		
  		<i v-if="loading" class="fa fa-circle-o-notch fa-spin loading-spinner"></i>
	  	<transition-group tag="div" class="opportunity-list row center-md center-lg top-md top-lg" v-on:before-enter="beforeListEnter" v-on:enter="listEnter" v-bind:css="false">
	  				
	  		<div class="opportunity-post col-md-12 col-lg-12 row" v-for="(op, index) in opportunities" :key="op.id"  v-bind:data-index="index" v-on:click="showOp(op)">	
	  			
	  			<div class="col-xs-7 col-sm-7 col-md-12 col-1g-12 row opportunity-icons">
		  			<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 opportunity-icon smaller"><i class="fa fa-globe" aria-hidden="true"></i> {{op.region}}</div> 
		  			<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 opportunity-icon smaller"><i class="fa fa-flag-o" aria-hidden="true"></i> {{op.country}}</div>
		  			<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 opportunity-icon smaller"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{op.opportunity_type | capitalize}}</div>
		  			<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 opportunity-icon smaller"><i class="fa fa-bookmark" aria-hidden="true"></i> {{op.category_list.toString() | capitalize}}</div>
		  			<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 opportunity-icon smaller"><i class="fa fa-check-square" aria-hidden="true"></i> {{op.payment_type | capitalize}}</div>
	  			
				</div>

	  			<div class="col-xs-4 col-md-2 col-lg-2 opportunity-date">
						<div v-if="op.deadline">
							<span class="large-date">{{op.deadline | moment("DD")}}</span><br />
							<span class="large-month">{{op.deadline | moment("MMM").toUpperCase()}}</span>
						</div>
						<div class="large-date" v-else>
	  					<span class="large-date"></span>
	  					<span class="large-month">TBA</span>
	  				</div>
						<div><small>Application Deadline</small></div>
	  			</div>

	  			
	  			<div class="col-xs-10 col-md-8 col-lg-8 opportunity-details">
		  			<div class="opportunity-company">{{op.company}}</div>
		  			<div class="opportunity-title">{{op.title}}</div>
		  			<span class="opportunity-description"><small>{{op.description | truncate(90)}}</small></span>
	  			</div>
	  			<div class="col-xs-1 col-md-2 col-lg-2 opportunity-button">
	  				<button class="apply-button" @click="showOp(op)"><i class="fa fa-chevron-right" aria-hidden="true"></i> More Info</button>
	  			</div>
	  			
	  		</div>
	  	</transition-group>
	  	<transition name="fade-long" mode="out-in">
			<opportunity-post v-if="showOpportunity === true" v-bind:opp="currentOpportunity" @close="showOpportunity = false" @start-application="applicationStart($event)"></opportunity-post>
		</transition>
		<transition name="fade-long" mode="out-in">
			<opportunity-application v-if="showApplication === true" v-bind:opp="currentOpportunity" @close="showApplication = false"></opportunity-application>
		</transition>
  </div>
</template>

<script>
import opportunityPost from './opportunityPost';
import opportunityApplication from './opportunityApplication';

export default {
  name: 'opportunityList',
  components: {
  	'opportunity-post': opportunityPost,
  	'opportunity-application': opportunityApplication
  },
  props: {
  	opportunities: Array,
  	loading: Boolean,
  	selectedSort: String
  },
  data () {
    return {
        showOpportunity: false,
        showApplication: false,
       	sortOptions: [{label: 'posted Date', value: 'created_at DESC'}, {label: 'alphabetical', value: 'title ASC'}, {label: 'Application Deadline', value: 'deadline ASC'}],
        sortyBy: this.selectedSort,
        currentOpportunity: null
    }
  },
  computed: {
  	opportunityNum: function() {
  		if (this.opportunities !== null) return this.opportunities.length
  	}
  },
  methods: {
  	showOp: function(opportunity) {
 		this.currentOpportunity = opportunity
 		this.showOpportunity = true
 	},
 	beforeListEnter: function(el) {
 		el.style.opacity = 0
 	},
 	listEnter: function(el, done) {
 		var delay = el.dataset.index * 150
 		setTimeout(function() {
 			Velocity(el, {opacity: 1}, {duration: 1000}, {complete: done})
 		}, delay)
 	},
 	applySort: function() {
 		this.$emit('apply-sort', this.sortyBy)
 	},
 	applicationStart: function (opportunity) {
 		this.currentOpportunity = opportunity
 		this.showOpportunity = false
 		this.showApplication = true
 	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';
.opportunity-list {
	max-height: 800px;
	min-height: 200px;
	overflow-y: scroll;
	overflow-x: hidden;
}

.opportunity-post {
	background-color: #faf6f6;
	text-align: left;
	margin-bottom: 20px;
	height: 200px;
	padding: 15px 15px;
}

.opportunity-post:hover, .opportunity-post:hover .opportunity-icon,
.opportunity-post:hover .opportunity-company, .opportunity-post:hover .opportunity-title,
.opportunity-post:hover .opportunity-description {
	background-color: $color-gold;
	cursor: pointer;
	color: white;
}

.opportunity-post:hover .apply-button {
	background-color: white;
	cursor: pointer;
	color: $color-gold;
}

.opportunity-icon {
	color: $color-gold;
	font-weight: bold;
}

.opportunity-icons {
	margin-bottom: 45px;
	order: 1;
}

.opportunity-date {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-weight: bold;
	order: 2;
}

.opportunity-details {
	order: 3;
}

.opportunity-company {
	width: 100%;
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 5px;
	color: $color-gold;
}

.opportunity-title {
	width: 100%;
	font-size: 20px;
	font-weight: bold;
	color: $color-darkgray;
	margin-bottom: 14px;
}

.opportunity-description {
	width: 100%;
	color: $color-darkgray;
}

.large-date {
	font-size: 40px;
	font-weight: bold;
}

.large-month {
	font-size: 24px;
	font-weight: bold;
}

.opportunity-button {
	text-align: center;
	order: 4;
}

.sort-checkboxes {
	margin-bottom: 25px;
}

.search-revise {
	display: none;
}

@media screen and (max-width: 62rem) {
	.opportunity-list {
		flex-wrap: nowrap;
		height: 500px;
		overflow-y: hidden;
		overflow-x: scroll;
		padding-top: 25px;
	}

	.opportunity-post {
		// width: 100%;
		min-height: 444px;
		height: 444px;
		min-width: 350px;
		width: 350px;
		max-width: 100%;
		flex: 0 1;
		margin-right: 25px;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-content: stretch;
		justify-content: flex-start;
	}

	.opportunity-date {
		padding-top: 15px;
		margin-bottom: 15px;
		min-width: 33.3%;
		width: 150px;
		order: 1;
	}

	.opportunity-icons {
		margin-top: 15px;
		margin-bottom: 0px;
		min-width: 33.3%;
		width: 200px;
		max-width: 30%;
		order: 2;
	}

	.opportunity-icon i {
		display: block;
	}

	.opportunity-details {
		min-width: 60%;
		max-width: 60%;
		order: 3;
	}

	.opportunity-title {
		margin-bottom: 45px;
	}

	.opportunity-button {
		order: 4;
		min-width: 66.6%;
	}

	.opportunity-row-1 {
		display: inline-flex;
		flex-direction: column;
		max-width: 30%;
		height: 100%;
	}


	.opportunity-row-2 {
		display: inline-flex;
		flex-direction: column;
		max-width: 60%;
		height: 100%;
		align-items: stretch;
		justify-content: flex-start;
	}

	.search-revise {
		display: block;
		color: $color-darkgray;
		margin-bottom: 16px;
		cursor: pointer;
	}

}
</style>
