<template>
	<div class="profile-account">
		<div v-if="loading">
			<div class="profile-banner">
				<div class="profile-banner-inner">
					<div class="profile-cover" :style="{'background-image': 'url('+ coverCurrentURL +')'}">
					</div>
					<div class="profile-avatar-container" >
						<div class="profile-avatar" :style="{'background-image': 'url('+ avatarCurrentURL +')'}">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="profile">	
			<div class="profile-banner">
				<div class="profile-banner-inner">

					<div class="profile-cover" :style="{'background-image': 'url('+ coverCurrentURL +')'}">
						<div v-if="authorizedUser" class="cover-edit" v-on:click="onPickFile('coverInput')">
					 		<i class="fa fa-camera" aria-hidden="true"></i><small>Update Cover Photo</small>
						</div>
						<input v-if="authorizedUser" type="file" ref="coverInput" style="display: none" accept="image/*" @change="onFilePicked($event, 'cover')" />
					</div>

					<div class="profile-avatar-container" >
						<div class="profile-avatar" :style="{'background-image': 'url('+ avatarCurrentURL +')'}">

							<svg height="316px" width="316px">
								<circle cx="158px" cy="158px" r="150px" transform="rotate(268 158 158)" />
							</svg>
							
							<div v-if="authorizedUser" class="avatar-edit" v-on:click="onPickFile('avatarInput')"><i class="fa fa-camera fa-3x" aria-hidden="true"></i><br /><div class="small">Update Photo</div></div>
							<input v-if="authorizedUser" type="file" ref="avatarInput" style="display: none" accept="image/*" @change="onFilePicked($event, 'avatar')" />
						</div>
						
	<!-- 					<i class="fa fa-ellipsis-h fa-2x is-darkgray profile-options"></i> -->
					</div><!-- 
					<div class="xs-visible sm-hide profile-options-xs"><i class="fa fa-ellipsis-h fa-3x is-darkgray opions-icon-xs"></i></div> -->

				</div>
				
				<div class="profile-name"><h1>{{ profile.details.name }}</h1></div>

				<profile-details v-if="profile" v-bind:profile-type="profile.type" class="profile-banner-text" v-bind:profile-details="profile.details" :connection-level="connectionLevel"></profile-details>
			</div>

			<profile-seasons v-if="profile.type === 'company'" class="profile-section" v-bind:profile-id="profile.id" :profile-seasons="profile.seasons"></profile-seasons>
			
			<profile-tools v-bind:profile-type="profile.type" v-bind:profile-id="profile.id" class="section-margins"></profile-tools>

<!-- 			<company-auditions v-if="profile.type === 'company'" class="profile-section" v-bind:profile-id="profile.id"></company-auditions> -->
				
			<profile-posts :profileId="profileId" :name="profile.details.name"></profile-posts>
		</div>
	</div>
</template>

<script>
import profileDetails from './profileDetails';
// import profileTools from './profileTools';
// import auditions from '@/audition/auditions';
import profilePosts from './profilePosts';
// import profileConnections from './profileConnections';
import profileSeasons from './profileSeasons'
import { mapGetters } from 'vuex';
// import * as firebase from 'firebase';
import profileImagesMixin from '../mixins/profileImagesMixin';
import currentUser from '../mixins/currentUserMixin';
import firebaseAxios from '@/axios/axios-firebase.js';

export default {
	name: 'profile',
	components: {
		'profile-details': profileDetails,
		'profile-tools': () => import('./profileTools'),
		'profile-posts': profilePosts,
		'profile-seasons': profileSeasons
	},
  	mixins: [profileImagesMixin, currentUser],
  	props: {
  		id: String
  	},
	data() {
		return {
			profileId: this.id,
			displayProfile: null,
			avatarCurrentURL: require("../assets/images/avatar-holder.png"),
			coverCurrentURL: require("../assets/images/cover-holder.jpg"),
			avatar: null,
			cover: null,
			loading: true,
			error: null
		}
	},
	computed: {
		showSeason: function() {

		},
		profile: function() {
			return this.displayProfile
			// console.log(currentProfile)
			// return currentProfile
		},
		connectionLevel () {
			let connectionLevels = [
					{name: "Connection ALLSTAR", levelFrom: 80, levelTo: 100},
					{name: "Connection ?", levelFrom: 60, levelTo: 79},
					{name: "Connection ?", levelFrom: 40, levelTo: 59},
					{name: "Connection ?", levelFrom: 20, levelTo: 39},
					{name: "Connection ?", levelFrom: 0, levelTo: 19}
				]

			if (this.profile.connections !== null && this.profile.connections !== undefined) {
				// var connectionNum = this.profile.connections.length
				var connectionNum = 55
				if (connectionNum >= 100) {
					return {strength: '100', name: 'Connection ALLSTAR'}
				} else {
					let level = connectionLevels.filter(function(object) {
						return connectionNum >= object.levelFrom && connectionNum <= object.levelTo
					})
					return {strength: connectionNum, name: level[0].name}
				}
			} else {
				return {strength: '0', name: 'Connection ?'}
			}

		}
	},
	methods: {
		getProfile: function() {
			firebaseAxios.get("/profiles/" + this.id + ".json")
			.then(res => {
				console.log('got the profile', res)
				this.displayProfile = res.data
				this.loading = false
			})
			// TODO: add message if data is not found somwehere
			.catch(error => {
				this.error = error.message
				console.log('cant get the profile', error)
			})
		}
	},
	watch: {
		'$route': 'getProfile'
	},
	created () {
		// console.log('do i have data yet?', this.$store.getters.profile)
		// console.log(this.authorizedUser)
		// console.log(this.signedIn)
		if (this.signedIn && this.authorizedUser) {
			console.log('I am signed in and authorized!', this.signedIn)

			this.displayProfile = this.$store.getters.profile
			// console.log('avatar', this.displayProfile.avatarURL)
			if (this.displayProfile.avatarURL !== null && this.displayProfile.avatarURL !== undefined && this.displayProfile.avatarURL.length > 0) {  
				this.avatarCurrentURL = this.displayProfile.avatarURL
			}
			
			if (this.displayProfile.coverURL !== null && this.displayProfile.coverURL !== undefined && this.displayProfile.coverURL.length > 0) { 
				this.coverCurrentURL = this.displayProfile.coverURL
			}

			this.loading = false;


		} else {
				this.getProfile();
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../styles/style-variables.scss';

// .profile-account {
// 	grid-area: main;
// }

.profile-account {
	width: auto;
	position: relative;
	max-width: $app-max-width;
  	min-width: $app-min-width;
}

circle {
  fill: transparent;
  stroke: $color-gold;
  stroke-width: 16;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 3s linear forwards;
  animation-delay: 1s;
}

@keyframes dash {
	to {
		stroke-dashoffset: 0;
	}
}

.profile-banner {
	display: block;
	margin-bottom: 24px;
	background-color: white;
	height: 100%;
}

.profile-banner-inner {
	box-sizing: border-box;
	display: block;
	height: 573px;
	margin-bottom: 47px;
	position: relative;
}

.profile-name {
	width: 100%;
	text-align: center;
}

.profile-cover {
	width: auto;
	background-color: white;
	height: 434px;
	overflow: hidden;    
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.cover-edit {
	color: #fff;
	border: 2px solid #fff;
	border-radius: 15px;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 10;
	position: absolute;
	top: 39px;
	left: 100px;
	padding: 6px 14px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	visibility: hidden;
	cursor: pointer;
}

.cover-edit .fa {
	margin-right: 21px;
}

.profile-cover:hover .cover-edit {
	visibility: visible;
}

.profile-avatar-container {
	height: 316px;
	display: block;
	position: absolute;
	top: 45%;
	left: 0;
	width: 100%;
	display: flex;
	align-items: center;
}

.profile-avatar {
	border-radius: 50%;
	height: 316px;
	width: 316px;
	min-height: 316px;
	min-width: 316px;
	margin: 0 auto;
	background-position: center;
    background-repeat: no-repeat;
    background-size: 99%;
	position: relative;
}

.profile-avatar svg {
	position: absolute;
	z-index: 5;
	top: 0;
	left: 0;
}

.avatar-edit {
	border-radius: 50%;
	height: 300px;
	width: 300px;
	background-color: rgba(0, 0, 0, 0.5);
	position: absolute;
	top: 8px;
	left: 8px;
	z-index: 10;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	visibility: hidden;
	cursor: pointer;
}

.profile-avatar:hover .avatar-edit {
	visibility: visible;
}


// .profile-options-xs {
//     margin: 125px;
//     display: block;
//     text-align: center;
// }

.profile-banner-text {
	text-align: center;
	margin-bottom: 55px;
}

.profile-section {
	position: relative;
	background-color: white;
	padding: 50px 30px 28px $body-padding-small;
	margin: 0px 0px 24px 0px;
}

.section-margins {
	margin: 0px 0px 24px 0px;
}


@media all and (min-width: $bp-med) {

	.profile-section {
		width: 100%;
		padding: 40px $body-padding-small 40px $body-padding-large;
	}

	// .profile-options {
	// 	display: inline-block;
	// 	transform: translateX(-130px);
	// }

}

</style>
