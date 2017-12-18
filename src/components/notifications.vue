<template>
  <div class="notifications">
  	<h3 class="xs-visible sm-hide is-golden">Notifications</h3>
  	<div v-for="note in notificationDetails" class="note row smaller middle-xs middle-sm" v-html="note">
  	</div>
  </div>
</template>

<script>
export default {
  name: 'notifications',
  data () {
    return {
      notifications: [
      	{ profile: "Jane Smith",
      	img: require("../assets/images/Julie-Adams.png"),
      	actionNum: 0 },
      	{ profile: "Bob Smith",
      	img: require("../assets/images/Daevyd-Pepper.png"),
      	actionNum: 1 },
      	{ profile: "Allison Brant",
      	img: require("../assets/images/Caitlin-McCaughey.png"),
      	actionNum: 2 },
      	{ profile: "Jane Smith",
      	img: require("../assets/images/Julie-Adams.png"),
      	actionNum: 0 },
      	{ profile: "Ed Remi",
      	img: require("../assets/images/Brenden-Friesen.png"),
      	actionNum: 3 }
      ],
      actionNotes: [
      	'commented on your post',
      	'liked your post',
      	'sent you an invite',
      	'ask to connect'
      ]
    }
  },
  computed: {
  	notificationDetails: function() {
  		var notes = [];
  		this.notifications.forEach((note) => {
  			notes.push("<div class='col-xs-3 col-sm-3 avatar-small note-avatar'><img src='"+ note.img +"' /></div><div class='col-xs-9 col-sm-9'><span class='is-golden'>"+ note.profile + "</span> " + this.actionNotes[note.actionNum] + "</div>")
  		})
  		return notes;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.note {
	height: 58px;
	padding: 0px 0px;
	margin-bottom: 2px;
}

.note:hover {
	background-color: #f7edd4; 
}


@media screen and (max-width: 46rem) {
  .note {
  	font-size: $font-size;
  	height: 117px;
  }
}
</style>
