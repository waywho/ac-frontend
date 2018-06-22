<template>
	<div class="not-found">
		<div class="not-found-inner">
			<h1 class="title">Oops!</h1>
			<div class="info">
				<div class="strong is-golden error-code">Error Code: 404</div>
				<span class="large medium is-midgray">Our apologies, we can't find the page you are looking for.</span><br />
				<br />
				<span class="medium is-midgray">Try these links instead</span>
				<br />
				<br />
				<ul class="non-list">
					<router-link tag="li" to="/"><span class="text-link medium is-midgray">Home</span></router-link>
					<router-link tag="li" :to="'/profiles/'+$store.getters.currentUser.id"><span class="text-link medium is-midgray">Account</span></router-link>
					<router-link tag="li" to="/signin"><span class="text-link medium is-midgray">Sign in</span></router-link>
				</ul>
			</div>
			<div class="sad-cloud">
				<img :src="require('@/assets/images/sad-cloud.png')" />
			</div> 
		</div>

	</div>
</template>

<script>
export default {
	name: 'notFound',
	data () {
		return {

		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.not-found {
	height: 100%;
	min-height: 350px;
	width: 100%;
	padding: $body-padding-small;
	background-image: url("../assets/images/cover-holder.jpg");
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: right bottom;
}

.error-code {
	margin-bottom: 1rem;
}

.not-found-inner {
	margin: 0px auto;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-end;
}

.info {
	display: inline-block;
	width: 100%;
	flex-basis: auto;
	max-width: 500px;
	margin-top: 25px;
	margin-right: 25px;	
	order: 3;
}

.sad-cloud {
	width: 30%;
	flex-basis: auto;
	max-width: 200px;
	display: inline-block;
	order: 2;
}

.title {
	color: $color-midgray;
	width: 70%;
	order: 1;
}

.text-link {
	cursor: pointer;
}

.text-link:hover {
	color: $color-gold;
}

@media all and (min-width: $bp-med) {
	.not-found {
		height: 400px;
	}
	.not-found-inner {
		width: 80%;
		max-width: 700px;
	}

	.info {
		width: 60%;
		order: 2;
	}

	.sad-cloud {
		width: 40%;
		max-width: 200px;
		order: 3;
	}

	.title {
		width: 100%;
	}
}

</style>
