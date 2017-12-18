<template>
  <div class="media">
  	<div class="selection selection-panel">
      <h2>Media</h2>
  		<h4>Player</h4>
  		<div v-on:click="mediaHost = 'Youtube'" class="selection-text-vertical media-selection"><div class="media-icon"><i class="fa fa-youtube" aria-hdden="true"></i></div><span class="small">Youtube</span></div>
  		<div v-on:click="mediaHost = 'Vimeo'" class="selection-text-vertical media-selection"><div class="media-icon"><i class="fa fa-vimeo-square" aria-hdden="true"></i></div><span class="small">Vimeo</span></div>
  		<div v-on:click="mediaHost = 'SoundCloud'" class="selection-text-vertical media-selection"><div class="media-icon"><i class="fa fa-soundcloud" aria-hdden="true"></i></div><span class="small">SoundCloud</span></div>
  	</div>
  	<media-panel class="media-panel" :medias="filteredMedia" :currentMediaType="mediaType" :media-host="mediaHost" v-on:sendMedia="updateMedia($event)"></media-panel>
  </div>
</template>

<script>
import mediaPanel from './mediaPanel';

export default {
  name: 'mediaTool',
  components: {
  	'media-panel': mediaPanel
  },
  data () {
    return {
  	  mediaHost: "Youtube",
  	  currentMediaType: "video",
      medias: [
      	{
      		id: 'myopera5325',
      		type: "video",
      		source: 'https://www.youtube.com/watch?v=y7M-UgDd8As',
      		host: "Youtube"
      	},
      	{
      		id: 'myopera5321',
      		type: "video",
      		source: 'https://www.youtube.com/watch?v=P_Y-yJBa8FA',
      		host: "Youtube"
      	},
      	{
      		id: 'myopera5326',
      		type: "video",
      		source: 'https://www.youtube.com/watch?v=17xKA3U57Ho',
      		host: "Youtube"
      	},
      	{
      		id: 'myopera5323',
      		type: "video",
      		source: 'https://www.youtube.com/watch?v=obQkhZFM_Ik',
      		host: "Youtube"
      	},
      	{
      		id: 'myopera5328',
      		type: "video",
      		source: 'https://vimeo.com/118231742',
      		host: "Vimeo"
      	},
      	{
      		id: 'myopera5353',
      		type: "video",
      		source: 'https://vimeo.com/75917280',
      		host: "Vimeo"
      	},
      	{
      		id: 'myopera5387',
      		type: "video",
      		source: 'https://vimeo.com/53123153',
      		host: "Vimeo"
      	},
      	{
      		id: 'myopera5316',
      		type: "video",
      		source: 'https://vimeo.com/209267163',
      		host: "Vimeo"
      	},
      	{
      		id: 'myopera5306',
      		type: "audio",
      		source: 'soundcloud://327107064',
      		host: "SoundCloud"
      	},
      	{
      		type: "audio",
      		id: 'myopera5311',
      		source: 'soundcloud://349247750',
      		host: "SoundCloud"
      	},
      	{
      		id: 'myopera5302',
      		type: "audio",
      		source: 'soundcloud://306724376',
      		host: "SoundCloud"
      	},
      	{
      		id: 'myopera5389',
      		type: "audio",
      		source: 'soundcloud://353894825',
      		host: "SoundCloud"
      	},
      ]
    }
  },
  computed: {
  	filteredMedia: function() {
  		return this.medias.filter((media) => {
  			return media.host.match(this.mediaHost);
  		})
  	},
  	mediaType: function() {
  		if (this.mediaHost.toLowerCase() === 'youtube' || this.mediaHost.toLowerCase() === 'vimeo') {
  			return this.currentMediaType = 'video'
  		} else if (this.mediaHost.toLowerCase() === 'soundcloud') {
  			return this.currentMediaType = 'audio'
  		}
  	}
  },
  methods: {
  	updateMedia(value) {
  		this.medias.push(
  			{
  				id: 'myopera5325' + Date.now(),
  				type: this.currentMediaType,
  				source: value,
  				host: this.mediaHost
  			})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../styles/style-variables.scss';

.media {
  background-color: $color-body;
  width: 100%;
  height: 100%;
  display: flex;
}

.selection-panel {
  display: inline-block;
  height: 100%;
  background: #fff;
  margin-right: 7px;
  padding: 00px 30px 0px 100px;
  vertical-align: top;
}

.media-panel {
  display: inline-block;
  height: 100%;
  margin-left: 7px;
  background-color: #fff;
  padding: 0px 16px 16px 16px;
  vertical-align: top;
}

.media-icon {
	margin-right: 20px;
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background-color: #cd9d2b;
	color: white;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}

.media-selection {
	height: 35px;
}

.media-selection:hover > .media-icon {
	width: 35px;
	height: 35px;
	margin-right: 9px;
 }

@media screen and (max-width: 46rem) {
  .media {
  }

  .selection-panel {
    flex-basis: 100%;
    width: 100%;
    margin-right: 0px;
    margin-bottom: 31px;
  }

  .media-panel {
    flex-basis: 100%;
    width: 100%;
  }
}
</style>
