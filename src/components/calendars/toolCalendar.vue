<template>
  <div id="tool-panel-flow" class="tool-panel-paddings">
  	  <div class="calendar-title row">
        <h2 class="col-xs-10 col-sm-10">Schedule</h2>
        <button v-on:click="toggleForm();" aria-hidden="true" v-if="component === 'vue-event-calendar' && authorizedUser"><i class="fa fa-chevron-right" ></i> Add</button>
        <i class="fa fa-times is-darkgray button-fa col-xs col-sm text-right" v-on:click="keepFormAlive()" aria-hidden="true" v-if="component === 'calendar-form'"></i>
      </div>
      <div class="selection row" v-if="component === 'vue-event-calendar'">
        <span class="selection-text-horizontal col-sm-2 col-xs">Production</span>
        <span class="selection-text-horizontal col-sm-2 col-xs">Rehearsal</span>
        <span class="selection-text-horizontal col-sm-2 col-xs">Audition</span>
      </div>
      <div class="calendar">
        <keep-alive :include="include" >
          <component :events="currentEvents" :is="component" @addToCalendar="calendarUpdate($event)"></component>
        </keep-alive>
      </div>
  </div>
</template>

<script>
import calendarForm from './calendarForm'
import profileToolsMixin from '@/mixins/profileToolsMixin'
import currentUser from '@/mixins/currentUserMixin';

export default {
  name: 'calendar',
  components: {
    'calendar-form': calendarForm
  },
  props: {
    calendar: {
      type: Array,
      required: false
    },
    profileId: String
  },
  data () {
    return {
      component: 'vue-event-calendar',
      include: ''
    }
  },
  mixins: [profileToolsMixin, currentUser],
  methods: {
    calendarUpdate: function(object) {
      this.currentEvents.push(object.event)
      this.component = 'vue-event-calendar'
      this.include = ''
      let eventsData = {}

      this.currentEvents.forEach((event, index) => {
        eventsData[index] = {event}
      })

      this.$store.dispatch('updateUserTools', {userId: this.$store.getters.user.id, toolName: 'calendar', data: eventsData})
      
    },
    toggleForm: function() {
      this.include = 'calendarForm'
      this.component='calendar-form'
    },
    keepFormAlive: function() {
      this.include = 'calendarForm'
      this.component='vue-event-calendar'
    }
  },
  computed: {
    currentEvents: function() {
      if(this.calendar !== null && this.calendar !== undefined) {
        return this.calendar
      } else {
        var now = new Date()
        var dd = now.getDate()
        var mm = now.getMonth() + 1
        var yyyy = now.getFullYear()
        if(dd<10) {
          dd = '0'+ dd
        }
        if(mm<10) {
          mm = '0'+ mm
        }
        let today = yyyy + '/' + mm + '/' + dd
        console.log(now)
        console.log(today)
        return [
          { date: today,
            start: '',
            end: '',
            title:  "you have no events yet",
            location: '',
            desc: 'longlonglong description',
            type: 'production'}
          ]
      }
    }
  },
  created() {
    this.include = 'calendar-form'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tool-panel-flow {
  padding-left: 100px;
  overflow-y: auto;
}

.calendar-title {
  align-items: center;
}

.button-fa {
  margin-right: 30px;
}

@media screen and (max-width: 46rem) {
  .calendar-title {
    padding-right: 0px;
  }

  #tool-panel-flow {
    padding-left: 0px;
  }
}
</style>
