<template>
  <div class="media">
  	<div class="selection selection-panel">
      <h2>Media</h2>
  		<h4>Player</h4>
  		<div v-on:click="mediaHost = 'Youtube'" class="selection-text-vertical media-selection"><div class="media-icon"><i class="fa fa-youtube" aria-hdden="true"></i></div><span class="small">Youtube</span></div>
  		<div v-on:click="mediaHost = 'Vimeo'" class="selection-text-vertical media-selection"><div class="media-icon"><i class="fa fa-vimeo-square" aria-hdden="true"></i></div><span class="small">Vimeo</span></div>
  		<div v-on:click="mediaHost = 'SoundCloud'" class="selection-text-vertical media-selection"><div class="media-icon"><i class="fa fa-soundcloud" aria-hdden="true"></i></div><span class="small">SoundCloud</span></div>
  	</div>

    <div id="media-panel">
      <h3 class='text-center'>{{mediaHost}}</h3>
      <p class="small text-center">Zombies reversus ab inferno, nam malum cerebro. De carne animata corpora quaeritis. Summus sit​​, morbo vel maleficia?</p>

      <div class="media-input">
        <input class="small input-item item-input" type="text" name="mediaUrl" :placeholder="'Add ' + mediaHost + ' URL Here'" v-model="mediaURL" v-on:keyup.enter="addMedia($event.target.value)"/>
      </div>
      
      <div class="row media-window">
        <vue-media-embed v-for="(media, index) in filteredMedia" class="col-sm-6 col-xs-12 media-tile" :key="`media-${index}`" :source="media.source" :allow-fullscreen="1"></vue-media-embed>
      </div>
      
  </div>

  </div>
</template>

<script>
import profileToolsMixin from '../mixins/profileToolsMixin'
export default {
  name: 'mediaTool',
  components: {
  },
  mixins: [profileToolsMixin],
  props: {
    profileId: String,
    medias: Array
  },
  data () {
    return {
      mediaTypes: { 'Youtube': 'video', 'Vimeo': 'video', 'SoundCloud': 'audio'},
  	  mediaHost: "Youtube",
      mediaURL: null,
  	  currentMediaType: "video",
      currentMedias: [],
      prototypeMedias: []
    }
  },
  computed: {
  	filteredMedia: function() {
  		return this.currentMedias.filter((media) => {
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
    addMedia: function(value) {
      let mediaObject = {
          type: this.mediaTypes[this.mediaHost],
          source: value,
          host: this.mediaHost
        }

      this.currentMedias.unshift(mediaObject);
      this.mediaURL = null

      this.$store.dispatch('updateUserTools', {userId: this.$store.getters.currentUser.id, toolName: 'medias', data: this.currentMedias})
          .then((response) => {
            
        }, error => {console.log(error)});
    }
  },
  created() {
    if(this.medias !== null && this.medias !== undefined) {
        this.currentMedias = this.medias

    } else {
      this.currentMedias = new Array()
    }
    console.log(this.currentMedias)
    this.prototypeMedias = [
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

#media-panel {
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


.media-window {
  overflow-y: scroll;
  height: 420px;
}

.media-tile {
  margin-bottom: 10px;
}

.media-input {
  display: block;
  width: 100%;
  height: 40px;
  margin: 10px auto 10px;
  position: relative;
}

.input-item {
  margin: auto;
  width: 218px;
  text-align: center;
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
