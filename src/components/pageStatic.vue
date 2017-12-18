<template>
  <div class="">
	  	<div class="plain-hero-section">
	  		<div class="hero-banner">
			  	<div class="hero-image" :style="{'background-image': 'url('+ page.heroImage +')'}">
			  	</div>
			</div>
	  	</div>

	  	<div class="content">
	  		<div class="translate-button"><span v-on:click="language='EN'" class="selection-text-horizontal">en</span>.<span class="selection-text-horizontal" v-on:click="language='FR'">fr</span></div>
	  		<h1>{{page.title}}</h1>
	  		<div v-html="content"></div>
	  	</div>
  </div>
</template>

<script>
export default {
  name: 'pageStatic',
  data () {
    return {
    	page: {},
    	pageId: this.$route.params.page,
    	language: "EN"
    }
  },
  computed: {
  	content: function() {
  		var contentLang = 'content'+ this.language
  		return this.page[contentLang]
  	}
  },
  created() {
  	this.page = this.$store.state.staticPages[this.pageId]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';
@import '../styles/hero';

.plain-hero-section {
	background: #fff;
	color: $color-tile;
	position: relative;
	display: block;
	margin-bottom: 95px;
}

.hero-image {
	left: 0;
	width: 100%;
	height: 487px;
}

.hero-banner {
	height: 487px;
	margin-bottom: 0px;
}

.content {
	padding: 0px 148px 110px;
}

@media screen and (max-width: 46rem) {
	.plain-hero-section {
		margin-bottom: 54px;
	}

	.content {
		padding: 0px 25px 25px;
	}
}

</style>
