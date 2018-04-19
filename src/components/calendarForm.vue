<template>
  <div class="schedule-form">
  	<div class="input-addon">
  		<span class="input-addon-item">Event Date</span>
  		<input type="date" class="input-addon-field" @focus="showMessage = false" v-model="newEvent.date" />
  	</div>
  	<div class="inline-inputs">
	  	<div class="input-addon margin-right">
	  		<span class="input-addon-item">Start</span>
	  		<input type="time" class="input-addon-field" v-model="newEvent.start"/>
	  	</div>
	  	<div class="input-addon">
	  		<span class="input-addon-item">End</span>
	  		<input type="time" class="input-addon-field" v-model="newEvent.end"/>
	  	</div>
  	</div>
  	<input type="text" placeholder="Event Title" class="form-field-bottom-margin" v-model="newEvent.title"/>
  	<input type="text" placeholder="Event Location" class="form-field-bottom-margin" v-model="newEvent.location"/>
  	<textarea placeholder="Event Description" class="form-field-bottom-margin" v-model="newEvent.desc"/>
  	<select class="form-field-bottom-margin" v-model="newEvent.type">
  		<option disabled selected value>Select an Event Type</option>
  		<option v-for="type in types">{{type}}</option>
  	</select>

    <success-warning-notice v-if="showMessage" :message="message" :type="messageType"></success-warning-notice>

  	<button @click="calendarAdd()" class="margin-top">Add Event</button>
  </div>
</template>

<script>
import profileToolsMixin from '../mixins/profileToolsMixin'
import validateFormMixin from '../mixins/validateFormMixin'
import successWarningNotice from './successWarningNotice'

export default {
  name: 'calendarForm',
  components: {
    'success-warning-notice': successWarningNotice
  },
  data () {
    return {
      showMessage: false,
      types: ['production', 'rehearsal', 'audition'],
      newEvent: {
      	date: "",
      	start: "",
      	end: "",
      	title: "",
      	location: "",
      	desc: "",
      	type: ""
      }
    }
  },
  mixins: [profileToolsMixin, validateFormMixin],
  methods: {
    calendarAdd: function() {
      if(this.requiredField(this.newEvent.date)) {
        this.$emit('addToCalendar', {'event': this.newEvent})
      } else {
        this.message = "Date is required"
        this.messageType = 'warning'
        this.showMessage = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.schedule-form {
	width: 70%;
	margin: 25px auto 25px auto;
	text-align: center;
  overflow-y: scroll;
}

.form-field-bottom-margin {
	margin-bottom: 20px;
}

.margin-right {
  margin-right: 10px;
}

.margin-top {
  margin-top: 20px;
}
</style>
