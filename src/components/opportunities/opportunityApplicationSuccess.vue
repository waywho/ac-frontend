<template>
  <div class="text-center">
  	<div class="avatar-icon-border">
  		<i class="fa fa-check is-gold" aria-hidden="true"></i>
  	</div><br />
  	<h3 class="is-gold">Sent Successfully</h3>
  	<p>Application materials are sent. You should hear from the company in due course. Good luck!</p>
  </div>
</template>

<script>
export default {
  name: 'opportunityApplicationSuccess',
  props: {
  	messaging: Object
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.avatar-icon-border {
  width: 150px;
  height: 150px;
}

.avatar-icon-border i {
	font-size: 70px;
}
</style>
