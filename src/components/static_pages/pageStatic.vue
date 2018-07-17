<template>
	<div class="content">
  		<h1 class="is-lightgray">{{content.title}}</h1>
  		<div class="translate-button">
  			<span v-for="(lang, key) in content.translations" :key="key" :class="['selection-text', 'is-lightgray', {'selection-text-active': language === key}]" @click="language = key">{{key | to-uppercase}}</span>
  		</div>
  		<div v-html="content.translations[language]"></div>
	</div>
</template>

<script>
export default {
  name: 'pageStatic',
  data () {
    return {
    	page: {},
    	language: "en"
    }
  },
  computed: {
  	content: function() {
  		return this.$store.getters.static(this.$route.params.page)
  	}
  },
  created() {
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
