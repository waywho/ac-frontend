<template>
	<div class="profile-account">
		<div class="profile-banner">
			<div class="profile-banner-assets">

				<div class="profile-cover" :style="{'background-image': 'url('+ profile.coverImage +')'}">
					<div class="cover-edit">
				 		<i class="fa fa-camera" aria-hidden="true"></i>Update Cover Photo
					</div>
				</div>

				<div class="profile-avatar-wrap" >
					<div class="profile-avatar" :style="{'background-image': 'url('+ profile.image +')'}">
	
						<svg height="100%" width="100%">
							<circle cx="158px" cy="158px" r="150px" transform="rotate(268 158 158)" />
						</svg>
						

						<div class="avatar-edit"><i class="fa fa-camera fa-3x" aria-hidden="true"></i><span>Update Photo</span></div>
					</div>
					
<!-- 					<i class="fa fa-ellipsis-h fa-2x is-darkgray profile-options"></i> -->
				</div><!-- 
				<div class="xs-visible sm-hide profile-options-xs"><i class="fa fa-ellipsis-h fa-3x is-darkgray opions-icon-xs"></i></div> -->
			</div>
			<div class="profile-name"><h1>{{ profile.name }}</h1></div>

			<company-details v-if="profile.type === 'company'" class="profile-banner-text" v-bind:profile-details="profile.details"></company-details>
			<artist-details v-if="profile.type === 'artist'" class="profile-banner-text" v-bind:profile-details="profile.details"></artist-details>
		</div>

		<profile-tools v-bind:profile-type="profile.type" v-bind:profile-id="profile.id" class="section-margins"></profile-tools>

		<profile-connections class="profile-section" :connections="profile.connections" v-bind:profile-id="profile.id"></profile-connections>

		<company-auditions v-if="profile.type === 'company'" class="profile-section" v-bind:profile-id="profile.id"></company-auditions>
			
		<profile-posts :name="profile.name" :posts="profile.posts" v-bind:profile-id="profile.id"></profile-posts>
	</div>
</template>

<script>
import companyDetails from './companyDetails';
import artistDetails from './artistDetails';
import profileTools from './profileTools';
import auditions from './auditions';
import profilePosts from './profilePosts';
import profileConnections from './profileConnections';

export default {
	components: {
		'company-details': companyDetails,
		'profile-tools': profileTools,
		'company-auditions': auditions,
		'artist-details': artistDetails,
		'profile-posts': profilePosts,
		'profile-connections': profileConnections
	},
	data() {
		return {
			id: this.$route.params.id,
			profile: {}
		}
	},
	computed: {
	},
	created () {
		this.profile = this.$store.state.profiles[this.id]
		console.log(this.id)
		console.log(this.profile)
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
    background-size: 95%;
	cursor: pointer;
	position: relative;
}

.profile-avatar svg {
	position: absolute;
	z-index: 16;
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
