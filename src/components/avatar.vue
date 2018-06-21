<template>
	<div :class="[border ? 'avatar-border' : '']">
		<div :class="['avatar', 'avatar-' + size]" :style="{'background-image': 'url('+ userAvatar(imageSource) +')'}" :title="name + ' avatar image'">
		</div>
	</div>
</template>

<script>
import avatarMixin from '@/mixins/avatarMixin'
export default {
	name: 'avatar',
	props: {
		imageSource: String,
		name: String,
		border: Boolean,
		size: String
	},
	mixins: [avatarMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.avatar-border {
	border-radius: 50%;
	border: solid 3px $color-gold;
}

.avatar-border-thicker {
	border-radius: 50%;
	border: solid 5px $color-gold;
	overflow: hidden;
	background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.avatar {
	border-radius: 50%;
	overflow: hidden;
	background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.avatar img, .avatar-border img {
	margin: 0 auto;
	border-radius: 50%;
	width: 100%;
	z-index: 1;
}

.avatar-larger {
	height: 119px;
	width: 119px;
	min-height: 119px;
	min-width: 119px;
}

.avatar-large {
	height: 98px;
	width: 98px;
	min-height: 98px;
	min-width: 98px;
}

.avatar-medium {
	height: 41px;
	width: 41px;
	min-height: 41px;
	min-width: 41px;
}

.avatar-small {
	height: 35px;
	width: 35px;
	min-height: 35px;
	min-width: 35px;
}


.avatar-smaller {
	height: 35px;
	width: 35px;
	min-height: 35px;
	min-width: 35px;
}

</style>
