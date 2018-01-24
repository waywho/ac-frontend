<template>
	<div class="profile-account">
		<div v-if="loading">
			<div class="profile-banner">
				<div class="profile-banner-assets">
					<div class="profile-cover" :style="{'background-image': 'url('+ coverHolder +')'}">
					</div>
					<div class="profile-avatar-wrap" >
						<div class="profile-avatar" :style="{'background-image': 'url('+ avatarHolder +')'}">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="profile">	
			<div class="profile-banner">
				<div class="profile-banner-assets">

					<div class="profile-cover" :style="{'background-image': 'url('+ profileCover +')'}">
						<div v-if="authorizedUser" class="cover-edit" v-on:click="onPickFile('coverInput')">
					 		<i class="fa fa-camera" aria-hidden="true"></i>Update Cover Photo
						</div>
						<input v-if="authorizedUser" type="file" ref="coverInput" style="display: none" accept="image/*" @change="onFilePicked($event, 'cover')" />
					</div>

					<div class="profile-avatar-wrap" >
						<div class="profile-avatar" :style="{'background-image': 'url('+ profileImage +')'}">

							<svg height="100%" width="100%">
								<circle cx="158px" cy="158px" r="150px" transform="rotate(268 158 158)" />
							</svg>
							
							<div v-if="authorizedUser" class="avatar-edit" v-on:click="onPickFile('avatarInput')"><i class="fa fa-camera fa-3x" aria-hidden="true"></i><span>Update Photo</span></div>
							<input v-if="authorizedUser" type="file" ref="avatarInput" style="display: none" accept="image/*" @change="onFilePicked($event, 'avatar')" />
						</div>
						
	<!-- 					<i class="fa fa-ellipsis-h fa-2x is-darkgray profile-options"></i> -->
					</div><!-- 
					<div class="xs-visible sm-hide profile-options-xs"><i class="fa fa-ellipsis-h fa-3x is-darkgray opions-icon-xs"></i></div> -->

				</div>
				
				<div class="profile-name"><h1>{{ profile.name }}</h1></div>

				<profile-details v-if="profile" v-bind:profile-type="profile.type" class="profile-banner-text" v-bind:profile-details="profile.details" :connection-level="connectionLevel"></profile-details>
			</div>

			<profile-tools v-bind:profile-type="profile.type" v-bind:profile-id="profile.id" v-bind:profile-tool-data="profile.tools" class="section-margins"></profile-tools>

			<profile-connections class="profile-section" :connections="profile.connections" v-bind:profile-id="profile.id"></profile-connections>

			<company-auditions v-if="profile.type === 'company'" class="profile-section" v-bind:profile-id="profile.id"></company-auditions>
				
			<profile-posts :name="profile.name" :posts="profile.posts" v-bind:profile-id="profile.id"></profile-posts>
		</div>
	</div>
</template>

<script>
import profileDetails from './profileDetails';
import profileTools from './profileTools';
import auditions from './auditions';
import profilePosts from './profilePosts';
import profileConnections from './profileConnections';
import { mapGetters } from 'vuex';
import * as firebase from 'firebase';
import profileImagesMixin from '../mixins/profileImagesMixin';
import currentUser from '../mixins/currentUserMixin';
import axios from 'axios';

export default {
	name: 'profile',
	components: {
		'profile-details': profileDetails,
		'profile-tools': profileTools,
		'company-auditions': auditions,
		'profile-posts': profilePosts,
		'profile-connections': profileConnections
	},
  	mixins: [profileImagesMixin, currentUser],
	data() {
		return {
			id: this.$route.params.id,
			profile: null,
			avatarURL: null,
			coverURL: null,
			avatar: null,
			cover: null,
			loading: false,
			error: null,
			avatarHolder: require("../assets/images/avatar-holder.png"),
			coverHolder: require("../assets/images/cover-holder.jpg")
		}
	},
	methods: {
		getProfile: function() {
			this.error = this.post = null;
			this.loading = true;
			axios.get("https://artist-center.firebaseio.com/profiles/" + this.id + ".json")
				.then(res => {
					console.log(res)
					this.profile = res.data
					if (res.data !== null && res.data !== undefined) {
						this.loading = false;
					} else {
						this.loading = true
					}
				})
				.catch(error => console.log(error))

				// TODO: add message if data is not found somwehere

			// firebase.database().ref('profiles/' + this.id).once('value')
			// 	.then(snapshot => {
			// 		// console.log(snapshot.val());
			// 		return snapshot.val();
			// 	}).then(data => {
					
			// 		this.profile = data;
			// 		if (this.profile !== null && this.profile !== undefined) {
			// 			this.loading = false;
			// 		} else {
			// 			this.loading = true;
			// 		}
			// 	})
		}
	},
	watch: {
		'$route': 'getProfile'
	},
	computed: {
		profileImage () {
			if (this.profile.avatarURL !== null && this.profile.avatarURL !== undefined) {
				return this.profile.avatarURL
			} else if (this.avatarURL !== null && this.avatarURL !== undefined) {
				return this.avatarURL
			} else {
				return require("../assets/images/avatar-holder.png")
			}
		},
		profileCover () {
			if (this.profile.coverURL !== null && this.profile.coverURL !== undefined) {
				return this.profile.coverURL
			} else if (this.coverURL !== null && this.coverURL !== undefined) {
				return this.coverURL
			} else {
				return require("../assets/images/cover-holder.jpg")
			}
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
	created () {
		this.getProfile();

		// console.log(this.id)
		// console.log(this.profile)
		// find out all voice types
		// const voices = []
		// for (var i=0; 1< this.profile.auditionCandidates.length; i++) {
		// 		voices.push(this.profile.auditionCandidates[i].voice_type);
		// 		console.log(voices);
		// };
	}
}
</script>

<style lang="scss" scoped>
@import '../styles/style-variables.scss';

// .profile-account {
// 	grid-area: main;
// }

circle {
  fill: transparent;
  stroke: $color-gold;
  stroke-width: 16;
  stroke-dasharray: 841.946;
  stroke-dashoffset: 210.487;
  animation: dash 2s linear reverse;
}

@keyframes dash {
	to {
		stroke-dashoffset: 841.946;
	}
}

.profile-banner {
	display: block;
	margin-bottom: 24px;
	background-color: white;
	height: 100%;
}

.profile-banner-assets {
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
	width: 100%;
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

.profile-avatar-wrap {
	height: 316px;
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

.profile-options {
	display: inline-block;
	transform: translateX(-130px);
}

.profile-banner-text {
	text-align: center;
	margin-bottom: 55px;
}

.profile-section {
	background-color: white;
	padding: 40px 30px 40px 100px;
	margin: 0px 0px 24px 0px;
}

.section-margins {
	margin: 0px 0px 24px 0px;
}

/*for phone-only*/

@media screen and (max-width: 46rem) {
	.profile-account {
		width: 100%;
	}

	.profile-section {
		width: 100%;
		padding: 50px 28px 28px 28px;
		margin: 0px 0px 24px 0px;
	}

	.profile-options-xs {
	    margin: 125px;
	    display: block;
	    text-align: center;
  	}

	.slide {
		overflow-x: auto;
		flex-wrap: nowrap;
		-webkit-overflow-scrolling: touch;
	  	-ms-overflow-style: -ms-autohiding-scrollbar;
	}

}

</style>
