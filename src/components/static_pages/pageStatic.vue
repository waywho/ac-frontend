<template>
	<div class="content">
  		<h1 class="is-lightgray">{{page.title}}</h1>
  		<div class="translate-button"><span v-on:click="language='EN'" :class="['selection-text', 'is-lightgray', {'selection-text-active': language === 'EN'}]">EN</span>.<span :class="['selection-text', 'is-lightgray', {'selection-text-active': language === 'FR'}]" v-on:click="language='FR'">FR</span></div>
  		<div v-html="content"></div>
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
@import '../../styles/style-variables';

.content {
	padding: 84px $body-padding-small 75px;
	background-color: $color-eggwhite;
}

.selection-text:first-child {
	margin-left: 0px;
}

.translate-button {
	display: flex;
	align-items: center;
	height: 2rem;
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

@media all and (min-width: $bp-med) {
	.plain-hero-section {
		margin-bottom: 54px;
	}

	.content {
		padding-left: $body-padding-large;
		padding-right: $body-padding-large;
	}
}

</style>
