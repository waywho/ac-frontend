<template>
  <div class="row">
  	<div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 middle-xs">
	<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
		<div class="avatar-icon-border">
			<img :src="require('@/assets/images/artistcenter-logo.png')" alt="artistcenter logo" />
		</div>
	</div>
	<div class="col-xs-12 col-sm-10 col-md-10 col-lg-10 complete-text">
		<div class="is-golden large"><i class="fa fa-chevron-right" aria-hidden="true"></i>
		<b>Opportunity Posted Successfully</b></div>
		<span class="is-darkgray big"><b>{{postedOpp.company + " " + postedOpp.opportunity_type}}</b></span><br />
		<span class="is-golden">{{postedOpp.created_at | moment("MMM DD, YYYY")}}</span>
	</div>
	</div>
	<div class="col-xs-12 col-sm-11 col-md-11 col-lg-11">
		<div class="is-golden"><b>Information Update</b></div>
		<p class="is-darkgray small"><b>Our opportunity creator is currently free for a limited time.</b></p>
  	</div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
  	postedOpp: Object
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
	width: 100px;
	height: 100px;
	padding: 25px 25px;
}

.avatar-icon-border img {
	height: auto;
}

.complete-text {
	padding-left: 25px;
}

</style>
