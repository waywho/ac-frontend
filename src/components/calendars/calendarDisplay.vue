<template>
	<div class="calendar">
		<div class="calendar-header">
			<i class="month-arrow  fa fa-chevron-left smaller" aria-hidden="true" v-on:click="subtractMonth"></i>
			{{month}} {{year}}
			<i class="month-arrow fa fa-chevron-right smaller" aria-hidden="true" v-on:click="addMonth"></i>
		</div>
		<ul class="non-list weekdays">
			<li v-for="day in days" class="small">{{day}}</li>
		</ul>
		<ul class="non-list dates smaller">
			<li v-for="blank in firstDayOfMonth">&nbsp;</li>
			<li v-for="date in daysInMonth" :class="['date-num', {'event-date': date.events !== null}]" @click="eventsShow(date)">{{date.date}}</li>
		</ul>
	</div>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';
import { bus } from '@/main';

export default {
	name: 'calendarDisplay',
	props: {
		events: {
			type: Array,
			required: false
		}
	},
	data () {
		return {
			today: moment(),
			dateContext: moment(),
			days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		}
	},
	computed: {
		year: function() {
			return this.dateContext.format('Y');
		},
		month: function() {
			return this.dateContext.format('MMMM');
		},
		daysInMonth: function() {
			var days = this.dateContext.daysInMonth();
			var dates = []
			
			for(var d = 1; d <= days; d++ ) {
				if(this.events !== null && this.events !== undefined) {
					var dayEvents = this.events.filter(event => {
						var eventDay = Number(moment(event.date).format("D"));
						var eventMonth = moment(event.date).format('MMMM');
						var eventYear = moment(event.date).format('Y');

						if(eventYear === this.year && eventMonth === this.month && eventDay === d) {
							return event	
						}
					})
				} else {
					var dayEvents = []
				}
				dates.push({date: d, events: dayEvents.length > 0 ? dayEvents : null})
			}
			return dates
		},
		currentDate: function() {
			return this.dateContext.get('date');
		},
		firstDayOfMonth: function() {
			var firstDay = moment(this.dateContext).subtract((this.currentDate - 1), 'days');
			return firstDay.weekday();
		},
		initialDate: function() {
			this.today.get('date');
		},
		initialMonth: function() {
			this.today.format('MMMM');
		},
		initialYear: function() {
			this.today.format('Y');
		}
	},
	methods: {
		addMonth: function() {
			this.dateContext = moment(this.dateContext).add(1, 'month');
		},
		subtractMonth: function() {
			this.dateContext = moment(this.dateContext).subtract(1, 'month');
		},
		eventsShow: function(dateData) {
			// console.log(dateData)
			var selectedDate = moment(this.year + "-" + this.dateContext.format("MM") + "-" + dateData.date).format("YYYY-MM-DD")
			// console.log(selectedDate)
			var data = {
				dateContext: selectedDate,
				events: dateData.events
			}
			bus.$emit('showEvents', data)
		},
		setDateContext: function() {
			if(this.events) {
				let sortedEvents = _.sortBy(this.events, ["date"], ["asc"])
				this.dateContext =  moment(sortedEvents[0].date);
			} else {
				this.dateContext = moment();
			}
		}
	},
	created() {
		this.setDateContext();
		bus.$on('resetDateContext', () => {
			this.setDateContext()
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.calendar {
	width: 100%;
	min-width: 300px;
	margin-left: auto;
	margin-right: auto;
}

.calendar-header {
	margin-bottom: 1rem;
}

.month-arrow {
	cursor: pointer;
}

.month-arrow.fa-chevron-left {
	margin-right: 0.5rem;
}

.month-arrow.fa-chevron-right {
	margin-left: 0.5rem;
}


.weekdays, .dates {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 0px;
}

.weekdays li, .dates li {
	padding: 0.5rem 0.5rem;
	width: 14%;
	flex-basis: auto;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}

.dates .date-num {
 	border-left: 0.6em solid white;
 	border-right: 0.6em solid white;
 	border-top: 0.4em solid white;
 	border-bottom: 0.4em solid white;
 	color: white;
 	background-color: $color-lightgray;
}

.dates .event-date {
	border: 2px solid white;
	color: white;
	background-color: $color-darkred;
	cursor: pointer;
}

@media all and (min-width: $bp-med) {
	.calendar {
		width: 50%;
		min-width: 300px;
	}
}
</style>
