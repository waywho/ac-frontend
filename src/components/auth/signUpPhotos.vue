<template>
  <div class="">
  	<h3>Profile & Cover Photo</h3>
  	<p>Please upload a profile image and cover photo image for your account. All image must be in .jpeg .png or .gif format. File size must not exceed 5MB.</p>

  	<div class="image-uploader">
  		<div class="uploadbox" v-on:click="onPickFile('avatarInput')">
          <div class="upload-avatar" v-if="avatarCurrentURL !== null" >
          <img  :src="avatarCurrentURL" alt="uploaded cover" />
          </div>
          <div class="upload-avatar" v-if="avatarCurrentURL === null">
  				  <i class="fa fa-user-o fa-4x is-white" aria-hidden="true"></i>        
  			 </div>
  			<div class="image-type is-lightgray">Profile Image</div>

        <input type="file" ref="avatarInput" style="display: none" accept="image/*" @change="onFilePicked($event, 'avatar')" />
  		</div>

   		<div class="uploadbox" v-on:click="onPickFile('coverInput')">
        <div class="upload-cover" v-if="coverCurrentURL !== null">
          <img :src="coverCurrentURL" alt="uploaded cover" />
        </div>
  			<div v-if="coverCurrentURL === null" class="upload-avatar avatar-with-padding">
          <img :src="require('@/assets/images/cover-icon.png')" alt="cover icon" />
  				
  			</div>
  			<div class="image-type is-lightgray">Cover Image</div>

        <input type="file" ref="coverInput" style="display: none" accept="image/*" @change="onFilePicked($event, 'cover')" />
  		</div>
          
  	</div>
  </div>
</template>

<script>
import profileImagesMixin from '@/mixins/profileImagesMixin'

export default {
  name: 'signUpPhotos',
  props: {
    avatarURL: String,
    coverURL: String
  },
  data () {
    return {
      avatar: null,
      avatarCurrentURL: null,
      cover: null,
      coverCurrentURL: null
    }
  },
  mixins: [profileImagesMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.image-uploader {
	margin: 65px 0px 100px;
	display: flex;
  flex-direction: column;
	justify-content: center;
	width: 100%;
}

.uploadbox {
	flex-basis: 50%;
	cursor: pointer;
	text-align: center;
  width: 100%;
  margin-bottom: 30px;
}

.upload-avatar {
  background-color: $color-lightgray;
	color: $color-darkgray;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 25px auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-with-padding {
  padding: 10px 10px;
}

.upload-cover {
  width: 100%;
  height: 434px;
  overflow: hidden;
}

.uploadbox:hover .upload-avatar {
	background-color: $color-gold;
}

.uploadbox:hover .image-type {
  color: $color-gold;
}

.step-container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 65px auto 0px;
}
</style>
