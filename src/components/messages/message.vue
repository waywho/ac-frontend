<template>
  <div class="message-container">
  	<div :class="getPosition">
  		<div class="message-text smaller">
  		{{ message.content || message.lastMessage }}
  		</div>
  		<span class="tiny">{{ dateObject | moment("MM/DD/YYYY hh:mm")}}</span>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'message',
  props: {
  	message: {
  		type: Object,
  		required: true
  	}
  },
  data () {
    return {
 		
    }
  },
  computed: {
    dateObject: function() {
      return new Date(this.message.timestamp)
    },
  	getPosition() {
  		if (this.message.sender === this.$store.getters.profile.details.name) {
  			return 'my message'
  		} else {
  			return 'message'
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.my.message {
	text-align: right;
	border-radius: 5px;
	float: right;
	clear: both;
}

.message-text {
	border: 2px solid #ecddba; /*gold*/
	border-radius: 5px;
	padding: 10px;
}

.my.message > .message-text {
	background: #ecddba; /*gold*/
	color: white;
	font-weight: 500;
}

.message {
	margin: 5px 0px;
	float: left;
	display: block;
	max-width: 75%;
	clear: both;
}

</style>
