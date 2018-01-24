<template>
  <div id="calendar" class="tool-panel-paddings">
  	  <div class="calendar-title row">
        <h2 class="col-xs-10 col-sm-10">Schedule</h2>
        <i class="fa fa-plus is-darkgray button-fa col-xs col-sm text-right" v-on:click="toggleForm();" aria-hidden="true" v-if="component === 'vue-event-calendar'"></i>
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
import profileToolsMixin from '../mixins/profileToolsMixin'

export default {
  name: 'calendar',
  components: {
    'calendar-form': calendarForm
  },
  props: {
    calendar: Array
  },
  data () {
    return {
      component: 'vue-event-calendar',
      currentEvents: this.calendar,
      include: ''
    }
  },
  mixins: [profileToolsMixin],
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

  },
  created() {
    this.include = 'calendar-form'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#calendar {
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
}
</style>
