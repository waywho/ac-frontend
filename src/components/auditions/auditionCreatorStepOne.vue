<template>
  <div class="row between-sm between-xs">
  	<div class="col-sm-12 col-xs-12">
		<span class="strong step-label">Step 1 of 2</span>
	</div>  	

	<div class="col-sm-9 col-xs-12">
	  		<h3>Audition Title</h3>
			<input type='text' id='title' placeholder="Enter a Title" v-model="newAudition.title" />
	  	
	  	<h3>Enter Address</h3>
	  	<div class="input-addon">
  			<span class="input-addon-item">Address</span>
  			<input type="text" class="input-addon-field" placeholder="Enter a street address" v-model="newAudition.address" />
  		</div>
  		<div class="input-addon">
  			<span class="input-addon-item">City</span>
  			<input type="text" class="input-addon-field" placeholder="Enter city" v-model="newAudition.city" />
  		</div>

		<h3>Date & Time</h3>

	  	<div class="inline-inputs">
			<div class="input-addon">
	  			<span class="input-addon-item">Date</span>
	  			<input type="date" class="input-addon-field" v-model="newAudition.date" />
	  		</div>
		  	<div class="input-addon">
		  		<span class="input-addon-item">Start</span>
		  		<input type="time" class="input-addon-field" v-model="newAudition.start"/>
		  	</div>
		  	<div class="input-addon">
		  		<span class="input-addon-item">End</span>
		  		<input type="time" class="input-addon-field" v-model="newAudition.end"/>
		  	</div>
	  	</div>

	  	<h3>Application Deadline</h3>
	  	<div class="inline-inputs">
	  		<div class="input-addon">
	  			<span class="input-addon-item">Date</span>
	  			<input type="date" class="input-addon-field" id='deadline' v-model="newAudition.applicationDeadline" />
	  		</div>
	  	</div>
	</div>
  	<div class="col-sm-3 col-xs-12" >
  		<div class="next-step">
  			<div>
			<span class="strong">Plan Audition</span>
			<div class="smaller">Continue Audition Setup</div>
			<next-last-step v-on:click.native="takeStep('auditionCreator-stepTwo', newAudition)" :step="'next'"></next-last-step>
			</div>
		</div>
  	</div>		
  </div>
</template>

<script>
import nextLastStep from './nextLastStep'
import stepMixin from '../mixins/stepMixin';

export default {
  name: 'auditionCreatorStepOne',
  components: {
  	'next-last-step': nextLastStep
  }, 
  props: {

  },
  data () {
    return {
    	newAudition: { }
    }
  },
  methods: {

  },
  mixins: [stepMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.next-step {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100%;
	text-align: center;
}

.step-label {
	display: inline-flex;
}


.next-step:hover > .icon-container, .next-step:hover .icon,
	.last-step:hover > .icon-container, .last-step:hover .icon {
	background-color: #cd9d2b;
	color: white;
}

.last-step {
	cursor: pointer;
}
</style>
