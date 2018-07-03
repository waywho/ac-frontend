<template>
	<div class="artist-opportunity">
		<h2 class="is-darkgray">Opportunity</h2>
		<router-link to="/opportunities"><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Visit Opportunity Listing</router-link>
	</div>
</template>

<script>
export default {
	name: '',
	data () {
		return {

		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.artist-opportunity {
	padding-left: $body-padding-small;
}

@media all and (min-width: $bp-small) {
	.artist-opportunity {
		padding-left: $body-padding-large;
	}
}

</style>
