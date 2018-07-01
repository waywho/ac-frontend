<template>
  <div class="tool-panel-paddings calendar-panel">
  	  <div class="calendar-title">
        <div class="title-piece">
          <h2 >Calendar</h2>
        </div>
        <div class='button-piece'>
          <button v-on:click="toggleForm();" aria-hidden="true" v-if="component === 'calendar-display' && authorizedUser"><i class="fa fa-plus" ></i> Add</button>
          <i class="fa fa-times is-darkgray col-xs col-sm text-right" v-on:click="keepFormAlive()" aria-hidden="true" v-if="component === 'calendar-form'"></i>
        </div>
      </div>
      <div class="row top-xs">
          <keep-alive :include="include" >
            <component :events="currentEventList" :is="component" @addToCalendar="calendarUpdate($event)" :class="'col-xs-12 col-md calendar-display'"></component>
          </keep-alive>

        <event-list class="col-xs-12 col-md" v-if="component !== 'calendar-form'" :events="calendar"></event-list>
      </div>
  </div>
</template>

<script>
import calendarForm from './calendarForm';
import profileToolsMixin from '@/mixins/profileToolsMixin';
import currentUser from '@/mixins/currentUserMixin';
import moment from 'moment'
import calendarDisplay from './calendarDisplay';
import eventList from './eventList';

export default {
  name: 'Calendar',
  components: {
    'calendar-form': calendarForm,
    'calendar-display': calendarDisplay,
    'event-list': eventList
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
      currentEventList: this.calendar,
      dateContext: null,
      component: 'calendar-display', //'vue-event-calendar',
      include: ''
    }
  },
  mixins: [profileToolsMixin, currentUser],
  methods: {
    calendarUpdate: function(object) {
      this.currentEventList.push(object.event)
      this.component = 'calendar-display'
      this.include = ''

      this.$store.dispatch('updateUserTools', {userId: this.$store.getters.currentUser.id, toolName: 'calendar', data: this.currentEventList})
      
    },
    toggleForm: function() {
      this.include = 'calendarForm'
      this.component='calendar-form'
    },
    keepFormAlive: function() {
      this.include = 'calendarForm'
      this.component='calendar-display'
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
<style lang="scss" scoped>
@import '../../styles/style-variables';

.calendar-panel {
  height: 100%;
}

.calendar-title {
  display: flex;
  justify-content: space-between;
}

.tool-panel-paddings {
  padding-left: $body-padding-small;
  padding-right: $body-padding-small;
}

.calendar-display {
  margin-bottom: 25px;
}

#tool-panel-flow {
  padding-left: $body-padding-small;
  overflow-y: auto;
}

.fa-times {
  cursor: pointer;
}


@media all and (min-width: $bp-small) {

  .tool-panel-paddings {
    padding-left: $body-padding-small;
    padding-right: $body-padding-small;
  }

}

@media all and (min-width: $bp-med) {

  .tool-panel-paddings {
    padding-left: $body-padding-small;
    padding-right: $body-padding-small;
  }

}


@media all and (min-width: $bp-med-2) {
  .tool-panel-paddings {
    padding-left: $body-padding-large;
    padding-right: $body-padding-small;
  }

}
</style>
