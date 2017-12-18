<template>
  <div class="">

  	<div class="row">
  		<div class="col-sm-2 col-xs-12">
        <h4>My Auditions</h4>
        <div class="audition-window">
          <div v-for="aud in auditions" class="audition-tile" v-on:click="currentAudition = aud">
            <div class="audition-date strong is-darkgray small" >
              {{aud.date | moment("DD MMM")}}
            </div>
            <div class="audition-title strong is-darkgray small">
              {{aud.title}}
            </div>
          </div>
        </div>
      </div>
  		<div class="col-sm-4 col-xs-12">
  			<h4>Candidates</h4>
  				<div class="candidates-row slide">
		  			<div v-for="(candidate, index) in currentAudition.invitedCandidates" class="candidate-tile" v-on:click="auditionee = candidate; auditioneeIndex = index">
		  				<div class="avatar avatar-small candidate-avatar">
		  					<img :src="candidate.img">
						  </div>
						  <div class="candidate-details">
							   <span class="small candidate-name strong">{{candidate.firstName}} {{candidate.lastName}}</span>
							   <span class="tiny">{{candidate.voice_type}}</span>
						  </div>
		  			</div>
	  			</div>
  		</div>
      <div class="col-sm-3 col-xs-12 schedule-panel">
        <div class="selected-auditionee">
          <div class="avatar-medium">
            <img :src="auditionee.img">
          </div>
          <div class="auditionee-details">
            <span class="candidate-name strong">{{auditionee.firstName}} {{auditionee.lastName}}</span>
            <span class="small">{{auditionee.city}}</span>
          </div>
        </div>

        <div class="schedule-functions">
          <div class="input-addon">
            <span class="input-addon-item">Time</span>
            <input class="input-addon-field" id="time" type="time" v-model="auditionTime"/>
          </div>

          <button v-on:click="addToSchedule()">Add to Schedule</button>
        </div>
      </div>
  		<div class="col-sm-3">
        <span v-if="currentAudition" class="large">Audition Date - {{currentAudition.date | moment("MMM DD, YYYY")}}</span>
        <div class='audition-schedule small'>
          <div v-for="(timeslot, index) in currentAudition.schedule" class='timeslot'>{{timeslot.time | moment("hh:mm a")}} {{timeslot.candidate}}<i v-on:click="unSchedule(index)" class="fa fa-trash-o" aria-hidden="true"></i></div>
        </div>
  			
  		</div>
  	</div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'auditionPlanner',
  props: {
    auditions: Array
  },
  data () {
    return {
      currentAudition: {},
      auditionee: "",
      auditionTime: '',
      auditioneeIndex: null,
      lastScheduledAuditionee: ""
    }
  },
  computed: {
    sortedSchedule: function() {
      if(this.currentAudition.schedule) {
        return this.currentAudition.schedule.sort((a, b) => {
          return a.time - b.time;
        });
      }
    }
  },
  methods: {
    addToSchedule: function() {
      var time = moment(this.currentAudition.date).format("YYYY-MM-DD") + "T" + this.auditionTime
      console.log(time)
      console.log(moment(time).valueOf())
      var parsedTime = moment(time).valueOf()

      this.currentAudition.schedule.push({time: parsedTime, candidate: this.auditionee.firstName + " " + this.auditionee.lastName})
      this.currentAudition.schedule = this.currentAudition.schedule.sort((a, b) => {
          return a.time - b.time;
        })
      this.currentAudition.invitedCandidates.splice(this.auditioneeIndex, 1)
      this.lastScheduledAuditionee = this.auditionee
      this.auditionee = ""
      this.auditionTime = ""
    },
    unSchedule: function(index) {
      this.currentAudition.schedule.splice(index, 1)
      this.currentAudition.invitedCandidates.splice(this.auditioneeIndex, 0, this.lastScheduledAuditionee)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.audition-window {
  overflow-y: scroll;
  height: 295px;
}

.audition-tile {
  background-color: #f7f4f4;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.audition-date {
  flex-basis: 10%;
  padding: 12px 14px;
  margin-right: 10px;
  text-align: center;
}

.audition-title {
  flex-basis: 90%;
  flex-grow: 1;
  min-height: 60px;
  padding: 12px 14px;
}

.audition-tile:hover {
  background-color: #cd9d2b;
  color: white;
}

.audition-tile:hover .audition-date, .audition-tile:hover .audition-title {
  color: white;
}

.audition-datetime {
	width: 700px;
}

.candidates-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.candidate-avatar {
	min-width: 41px;
	min-height: 41px;
	margin-right: 5px;
}


.candidate-details {
  flex-grow: 2;
}

.candidate-name {
	display: block;
}

.auditionee-details {
  text-align: center;
}

.candidate-tile {
	background-color: #f7f4f4;
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 7px;
	margin-right: 8px;
	flex-basis: 48%;
  flex-grow: 1;
	padding: 10px 10px;
	cursor: pointer;
}


.candidate-tile:hover {
	background-color: #cd9d2b;
	color: white;
}

.schedule-panel {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.selected-auditionee {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-basis: 70%;
}

.schedule-functions {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-basis: 30%;
}

.audition-schedule {
  border: 2px solid #706d6c;
  height: 90%;
  overflow-y: scroll;
}

.timeslot {
  background-color: #f7f4f4;
  margin-bottom: 5px;
  padding: 5px;
  padding-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.timeslot:hover {
  background-color: #cd9d2b;
  color: white;
}

@media screen and (max-width: 46rem) {

	.auditionee-tile {
		width: 90%;
	}

}
</style>
