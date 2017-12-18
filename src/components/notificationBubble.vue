<template>
  <div class="bubble">
  </div>
</template>

<script>
export default {
  name: 'notificationBubble',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.bubble {
	height: 25px;
	width: 25px;
	border-radius: 50%;
	background-color: $color-darkred;
}

</style>
