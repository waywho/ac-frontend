<template>
  <div class="">
  	<h3>Profile & Cover Photo</h3>
  	<p>Please upload a profile image and cover photo image for your account. All image must be in .jpeg .png or .gif format. File size must not exceed 5MB.</p>

  	<div class="image-uploader">
  		<div class="uploadbox">
  			<div class="avatar-medium-border upload-avatar">
  				<i class="fa fa-user fa-4x is-dargray" aria-hidden="true"></i>
  			</div>
  			<div>Profile Image</div>
  		</div>
   		<div class="uploadbox">
  			<div class="avatar-medium-border upload-avatar">
  				<i class="fa fa-picture-o fa-4x is-darkgray" aria-hidden="true"></i>
  			</div>
  			<div>Cover Image</div>
  		</div>
  	</div>

  	<next-last-step v-on:click.native="takeStep(1, {})" :step="'next'" class="step-container"></next-last-step>
  </div>
</template>

<script>
import nextLastStep from './nextLastStep'
import stepMixin from '../mixins/stepMixin';

export default {
  name: 'signUpStepSix',
  components: {
  	'next-last-step': nextLastStep
  },
  data () {
    return {
      
    }
  },
  mixins: [stepMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.image-uploader {
	margin: 65px 0px 100px;
	display: flex;
	justify-content: center;
	width: 100%;
}

.uploadbox {
	flex-basis: 50%;
	cursor: pointer;
	text-align: center;
}

.upload-avatar {
	color: $color-darkgray;
	display: flex;
	justify-content: center;
	align-item: center;
	margin: 25px auto;
	border: solid 9px $color-darkgray;

}

.uploadbox:hover, .uploadbox:hover .upload-avatar, .uploadbox:hover .fa {
	color: $color-gold;
	font-color: $color-gold;
	border-color: $color-gold;
}

.step-container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 65px auto 0px;
}
</style>
