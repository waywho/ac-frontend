<template>
  <div class="notifications">
  	<h3 class="xs-visible sm-hide is-gold">Notifications</h3>
  	<div v-for="note in notificationList" class="note">
        <avatar class="note-avatar" :image-source="note.image" :border="false" :name="note.name" :size="'small'"></avatar>
        <div class="note-details"><span class='is-gold'>{{note.name}}</span> {{note.action}}</div>
  	</div>
  </div>
</template>

<script>
import avatar from '@/components/avatar'
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
  components: {'avatar': avatar},
  created () {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.notifications h3 {
  margin-top: 0px;
  margin-bottom: 25px;
}

.note {
	padding: 10px 0px;
	margin-bottom: 2px;
  display: flex;
  align-items: center;
}

.xs-visible {
  display: block;
}

.note:hover {
	background-color: #f7edd4; 
}

.note-avatar {
  margin-right: 1rem;
}

.note-details {
  font-size: $font-size;
}

@media all and (min-width: $bp-med) {
  .sm-hide {
    display: none;
  }

  .note-details {
    font-size: $font-size-smaller;
}
}

</style>
