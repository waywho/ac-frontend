<template>
  <div id="media-panel">
      <h3 class='text-center'>{{mediaHost}}</h3>
			<p class="small text-center">Zombies reversus ab inferno, nam malum cerebro. De carne animata corpora quaeritis. Summus sit​​, morbo vel maleficia?</p>
			<media-input :input-name="'Add Media URL'" v-model="mediaURL" v-on:addMedia="sendMedia($event)"></media-input>
			<div class="row media-window">
				<vue-media-embed v-for="(media, index) in medias" class="col-sm-6 col-xs-12 media-tile" :key="media.id" :source="media.source" :allow-fullscreen="1" :auto-play="0"></vue-media-embed>
			</div>
			
  </div>
</template>

<script>
import mediaInput from './mediaInput';

export default {
  name: 'mediaPanel',
  components: {
  	'media-input': mediaInput,
  },
  props: {
  	medias: Array,
  	mediaHost: String
  },
  data () {
    return {
    	mediaURL: ""
    }
  },
  methods: {
  	sendMedia: function(value) {
  		this.$emit('sendMedia', value)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.media-window {
	overflow-y: scroll;
	height: 420px;
}

.media-tile {
	margin-bottom: 10px;
}
</style>
