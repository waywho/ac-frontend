<template>
  <div class="media">
    <div class="player-panel">
      <h2>Media</h2>
      <div class="media-selection slide">
        <div v-for="host in mediaHosts" v-on:click="mediaHost = host" :class="['selection', 'selection-text', {'selection-text-active': mediaHost === host }]">
          <span class="strong">{{host}}</span>
      </div>
  	</div>
    </div>

    <div id="media-panel">
      <h3>{{mediaHost}}</h3>
      <p class="smaller">Enter your {{sourceInputSuggestion}} below to display what you would like to showcase on your profile.</p>
        <div v-if="mediaHost === 'Image Gallery'">
          <input type="file" name="image" id="image-upload" accept="image/*"  @change="onMediaFilePicked($event)"/>
          <label for="image-upload" class="file-upload-input media-button">Upload image</label>
        </div>
        
        <input v-else class="small media-input" type="text" name="mediaUrl" :placeholder="'Add ' + sourceInputSuggestion + 'Here'" v-model="mediaURL" v-on:keyup.enter="addMedia($event.target.value)"/>
             
      <div class="media-window">
        <div v-if="mediaHost === 'Image Gallery'" v-for="(media, index) in filteredMedia" class="media-tile" :key="`media-${index}`">
          <img :src="media.source" alt="gallery image" />
        </div>
          <vue-media-embed v-if="mediaHost !== 'Image Gallery'" v-for="(media, index) in filteredMedia" :key="index" class="media-tile" :source="media.source" :allow-fullscreen="1"></vue-media-embed>
        
      </div>
      
    </div>

  </div>
</template>

<script>
import profileToolsMixin from '@/mixins/profileToolsMixin'
import profileImagesMixin from '@/mixins/profileImagesMixin'

export default {
  name: 'mediaTool',
  components: {
  },
  mixins: [profileToolsMixin, profileImagesMixin],
  props: {
    profileId: String,
    medias: Object
  },
  data () {
    return {
      mediaTypes: { 'Youtube': 'video', 'Vimeo': 'video', 'SoundCloud': 'audio', 'Image Gallery': 'image'},
      mediaHosts: ['Youtube', 'Vimeo', 'SoundCloud', 'Image Gallery'],
  	  mediaHost: "Youtube",
      mediaURL: null,
      currentMedias: [],
      prototypeMedias: [],
      image: null,
      imageFile: null
    }
  },
  computed: {
  	filteredMedia: function() {
  		return this.currentMedias.filter((media) => {
  			return media.host.match(this.mediaHost);
  		})
  	},
  	mediaType: function() {
      return this.mediaTypes[this.mediaHost]
  	},
    sourceInputSuggestion: function() {
      if(this.mediaHost === "SoundCloud") {
        return "SoundCloud media ID"
      } else {
        return this.mediaHost + ' URL'
      }
    }
  },
  methods: {
    addMedia: function(value) {
      let mediaSource
      if (this.mediaHost === 'SoundCloud') {
        mediaSource = "soundcloud://" + this.mediaURL
      } else {
        mediaSource = this.mediaURL
      }
      let mediaObject = {
          type: this.mediaType,
          source: mediaSource,
          host: this.mediaHost
        }
      console.log(mediaObject)

      this.$store.dispatch('updateUserMedia', {userId: this.$store.getters.currentUser.id, toolName: 'medias', data: mediaObject})
          .then((response) => {
            this.currentMedias.push(mediaObject)
             this.mediaURL = null
        }, error => {console.log(error)});
    }
  },
  created() {
    var mediaArray = []
    if(this.medias !== null && this.medias !== undefined) {
      for(var key in this.medias) {
        this.medias[key].id = key
        mediaArray.push(this.medias[key])
      }
      this.currentMedias = mediaArray
    } else {
      this.currentMedias = new Array()
    }
    console.log(this.currentMedias)
    this.prototypeMedias = null
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../styles/style-variables.scss';

.media {
  background-color: $color-body;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.player-panel {
  height: 100%;
  background: #fff;
  margin-bottom: 1rem;
  padding: 0px $body-padding-small;
}

.media-selection {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-item: flex-end;
}

#media-panel {
  height: 100%;
  width: auto;
  margin-left: 7px;
  background-color: #fff;
  padding: 0px $body-padding-small 16px;
  vertical-align: top;
}

.media-window {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 460px;
}

.media-tile {
  width: 100%;
  flex-basis: auto;
  margin: 5px 5px;
}

.media-input  {
  display: block;
  width: 100%;
  height: 40px;
  margin: 25px auto 10px;
  min-width: 218px;
}

.media-button {
  margin: 9px auto 10px;
}

@media all and (min-width: $bp-small) {
  .media {
    display: flex;
    flex-direction: column;
  }

  .player-panel {
    padding-left: $body-padding-small;
    margin-right: 0px;
  }

  .media-window {
    flex-wrap: wrap;
    height: 300px;
  }

  .media-tile {
    width: 100%;
  }

  #media-panel {
    flex-basis: auto;
    width: 100%;
  }
}

@media all and (min-width: $bp-med) {
  .media {
    display: flex;
    flex-direction: column;
  }

  .media-selection {
    flex-direction: row;
    min-width: 140px;
    flex-basis: 100%;
    width: 100%;
    margin-right:  7px;
  }

  .media-window {
    flex-direction: row;
    height: 400px;
  }

  .media-tile {
    width: 48%;
  }

  #media-panel {
    flex-basis: auto;
    width: 100%;
  }
}

@media all and (min-width: $bp-large-3) {
  .media {
    display: flex;
    flex-direction: row;
  }

  .player-panel {
    padding-left: $body-padding-large;
    margin-right: 15px;
  }

  .media-selection {
    flex-direction: column;
  }

  .media-window {
    flex-direction: row;
    height: 400px;
  }

  .media-tile {
    width: 100%;
  }
    #media-panel {
    flex-basis: auto;
    width: 100%;
  }
}

@media all and (min-width: $bp-xl) {
  .media-tile {
    width: 48%;
  }
}
</style>
