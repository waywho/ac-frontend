<template>
  <div id="calendar" class="tool-panel-paddings">
  	  <div class="calendar-title row">
        <h2 class="col-xs-10 col-sm-10">Schedule</h2>
        <i class="fa fa-plus is-darkgray button-fa col-xs col-sm" v-on:click="component='calendar-form'" aria-hidden="true" v-if="component === 'vue-event-calendar'"></i>
        <i class="fa fa-times is-darkgray button-fa col-xs col-sm" v-on:click="component='vue-event-calendar'" aria-hidden="true" v-if="component === 'calendar-form'"></i>
      </div>
      <div class="selection row" v-if="component === 'vue-event-calendar'">
        <span class="selection-text-horizontal col-sm-2 col-xs">Production</span>
        <span class="selection-text-horizontal col-sm-2 col-xs">Rehearsal</span>
        <span class="selection-text-horizontal col-sm-2 col-xs">Audition</span>
      </div>
      <div class="calendar">
        <keep-alive>
          <component :events="currentEvents" :is="component" @updateCalendar="calendarUpdate($event)"></component>
        </keep-alive>
      </div>
  </div>
</template>

<script>
import calendarForm from './calendarForm'
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
      currentEvents: []
    }
  },
  methods: {
    calendarUpdate: function(object) {
      this.currentEvents.push(object.event)
    }
  },
  computed: {

  },
  created() {
    this.currentEvents = this.calendar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#calendar {
  padding-left: 100px;
}

.calendar-title {
  align-items: center;
}

@media screen and (max-width: 46rem) {
  .calendar-title {
    padding-right: 0px;
  }
}
</style>
