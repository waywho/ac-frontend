<template>
  <div class="artist-tools">
    <keep-alive>
      <component :is="component" :profile-id="profileId" class="tool-panel"></component>
    </keep-alive>

    <div class="toolbox">
      <div @click="component = 'artist-message'" class="toolbox-tile is-lightgray"><i class="fa fa-comments-o fa-3x is-lightgray tool-icon" aria-hidden="true"></i>Messages</div>
      <div @click="component = 'artist-calendar'" class="toolbox-tile is-lightgray"><i class="fa fa-calendar fa-3x is-lightgray tool-icon" aria-hidden="true"></i>Schedule</div>
      <div @click="component = 'artist-settings'" class="toolbox-tile is-lightgray"><i class="fa fa-cogs fa-3x is-lightgray tool-icon" aria-hidden="true"></i>Settings</div>
      <div @click="component = 'artist-media'" class="toolbox-tile is-lightgray"><i class="fa fa-play-circle fa-3x is-lightgray tool-icon" aria-hidden="true"></i>Media</div>
      <div @click="component = 'artist-cv'" class="toolbox-tile is-lightgray"><i class="fa fa-file-text-o fa-3x is-lightgray tool-icon" aria-hidden="true"></i>CV/Resume</div>
      <div @click="component = 'artist-settings'" class="toolbox-tile is-lightgray"></div>
     </div>
  </div>
</template>

<script>
import calendar from './calendar';
import settingsTool from './settingsTool';
import messageTool from './messageTool';
import mediaTool from './mediaTool';
import cvTool from './cvTool';

export default {
  name: 'tools',
  components: {
    'artist-calendar': calendar,
    'artist-settings': settingsTool,
    'artist-message': messageTool,
    'artist-media': mediaTool,
    'artist-cv': cvTool
  },
  props: {
    profileId: String
  },
  data() { 
    return {
      component: 'artist-calendar'
    }

  },
  method: {

  }
}
</script>

<style lang="scss" scoped>
@import '../styles/style-variables';

.artist-tools {
  padding: 0px;
  display: flex;
  align-items: stretch;
  background-color: $color-body;
  height: 582px;
  max-height: 582px;
}

.tool-panel {
  display: inline-block;
  flex-basis: 69%;
  min-height: 100%;
  background-color: #fff;
  float: left;
}

.toolbox {
  display: inline-grid;
  flex-basis: 30%;
  background: $color-body;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-gap: 15px 15px;
  padding-left: 15px;
  height: 100%;
  float: right;
}

.toolbox-tile {
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  cursor: pointer;
}

.bottom-space {
  margin-bottom: 15px;
}

.toolbox-tile:hover, .toolbox-tile:hover .tool-icon, .tool-icon:hover  {
  background-color: #ecddba;
  color: white;
}


@media screen and (max-width: 46rem) {
  .company-tools {
    flex-direction: column;
  }

  .tool-panel {
    width: 100%;
    order: 2;
  }

  .toolbox {
    margin: 0px 0px 20px;
    width: 100%;
    order: 1;
  }

  .toolbox-inner {
    width: 100%;
  }
}
</style>
