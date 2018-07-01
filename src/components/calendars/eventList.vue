<template>
	<div class="event-list">
		<span v-if="currentDateContext" class="is-gold large">{{currentDateContext | moment("dddd MMMM DD, YYYY")}}</span><span v-if="currentDateContext" class="text-button" @click="resetDates">see all</span>
		<div v-for="event in currentEvents" class="event-item">
			<div class='dot-content'>
				<div class="dot"></div>
			</div>
			<div class="event-item-content">
				<div class="content-full big medium">{{event.title}}</div>
				<div v-if="!currentDateContext" class="content-half small">{{event.date | moment("YYYY-MM-DD")}}</div>
				<div v-else class="content-half is-gold smaller strong">{{event.type}}</div>

				<div class="content-half text-right small">{{event.start}}</div>
				<div v-if="!currentDateContext" class="content-full is-gold smaller strong">{{event.type}}</div>
				<div class="content-full small">{{event.desc}}</div>
				
			</div>
		</div>
	</div>
</template>

<script>
import { bus } from '@/main';
import _ from 'lodash'

export default {
	name: 'calendarEvents',
	props: {
		events: {
			type: Array,
			required: false
		},
		dateContext: {
			type: String,
			required: false
		}
	},
	data () {
		return {
			currentEvents: this.events,
			currentDateContext: null
		}
	},
	methods: {
		resetDates: function() {
			this.currentDateContext = null
			this.currentEvents = this.events
			bus.$emit('resetDateContext')
		}
	},
	created() {
		bus.$on('showEvents', data => {
			this.currentEvents = _.sortBy(data.events, ['date'], ['asc'])
			this.currentDateContext = data.dateContext
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.dot-content {
	padding-top: 0.8rem;
	padding-right: 0.8rem;
}

.dot {
	background-color: $color-gold;
	width: 12px;
	height: 12px;
	border-radius: 50%;
}

.event-list {
	height: 300px;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}

.event-item {
	display: flex;
	padding: 0.8rem 0.8rem;
	margin: 0.5rem 0rem;
	align-items: flex-start;
}

.event-item-content {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}

.event-item:hover {
	background-color: $color-lightgold;
	color: white;
}

.event-item:hover .dot {
	background-color: white;
}

.content-full {
	width: 100%;
	flex-basis: auto;
	margin: 0.25rem 0rem 0rem;
}

.content-half {
	width: 50%;
	flex-basis: auto;
	margin: 0.25rem 0rem 0rem;
}

.text-button {
	margin-left: 1rem;
}

@media all and (min-width: $bp-small) {
	.event-list {
		height: 160px;
	}
}

@media all and (min-width: $bp-med) {
	.event-list {
		height: 470px;
	}
}

</style>
