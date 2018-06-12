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
  props: {
    profileId: String,
    notificationList: Array
  },
  data () {
    return {
      
    }
  },
  computed: {
  	notificationDetails: function() {
  		var notes = [];
  		this.notificationList.forEach((note) => {
  			notes.push("<div class='col-xs-3 col-sm-3 avatar-small note-avatar'><img src='"+ note.image +"' /></div><div class='col-xs-9 col-sm-9'><span class='is-golden'>"+ note.name + "</span> " + note.action + "</div>")
  		})
  		return notes;
  	}
  },
  created () {
    
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
