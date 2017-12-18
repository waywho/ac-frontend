<template>
  <div class="schedule-form">
  	<div class="input-addon">
  		<span class="input-addon-item">Event Date</span>
  		<input type="date" class="input-addon-field" v-model="event.date" />
  	</div>
  	<div class="inline-inputs">
	  	<div class="input-addon">
	  		<span class="input-addon-item">Start</span>
	  		<input type="time" class="input-addon-field" v-model="event.start"/>
	  	</div>
	  	  <div class="input-addon">
	  		<span class="input-addon-item">End</span>
	  		<input type="time" class="input-addon-field" v-model="event.end"/>
	  	</div>
  	</div>
  	<input type="text" placeholder="Event Title" class="form-field" v-model="event.title"/>
  	<input type="text" placeholder="Event Location" class="form-field" v-model="event.location"/>
  	<textarea placeholder="Event Description" class="form-field" v-model="event.description"/>
  	<select class="form-field" v-model="event.type">
  		<option disabled selected value>Select an Event Type</option>
  		<option v-for="type in types">{{type}}</option>
  	</select>

  	<button>Add Event</button>
  </div>
</template>

<script>
export default {
  name: 'calendarForm',
  data () {
    return {
      types: ['production', 'rehearsal', 'audition'],
      event: {
      	date: "",
      	start: "",
      	end: "",
      	title: "",
      	location: "",
      	description: "",
      	type: ""
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.schedule-form {
	width: 70%;
	margin: auto;
	text-align: center;
}

.form-field {
	margin-bottom: 20px;
}
</style>
