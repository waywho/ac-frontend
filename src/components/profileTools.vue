<template>
  <div class="profile-tools">
    <keep-alive>
      <component :is="component" :profile-id="profileId" class="tool-panel" v-bind="toolData"></component>
    </keep-alive>
    <div class="toolbox">
      <div v-for="tool in profileTools" @click="component = tool.component" class="toolbox-tile is-lightgray"><i :class="['fa', tool.icon, 'fa-3x', 'is-lightgray', 'tool-icon']" aria-hidden="true"></i><br />{{tool.name}}</div>
     </div>
  </div>
</template>

<script>
import calendar from './calendar';
import settingsTool from './settingsTool';
import messageTool from './messageTool';
import budgetTool from './budgetTool';
import mediaTool from './mediaTool';
import ticketTool from './ticektTool';
import portfolioTool from './portfolioTool';
import currentUser from '../mixins/currentUserMixin';
import firebaseAxios from '../axios-firebase.js';

export default {
  name: 'tools',
  components: {
    'calendar': calendar,
    'settings': settingsTool,
    'message': messageTool,
    'budget': budgetTool,
    'media': mediaTool,
    'ticket': ticketTool,
    'portfolio': portfolioTool
  },
  props: {
    profileId: String,
    profileType: String
  },
  mixins: [currentUser],
  data () { 
    return {
      profileToolData: {},
      component: 'calendar',
      artistTools: [
        { name: 'Schedule', component: 'calendar', icon: 'fa-calendar' },
        { name: 'Settings', component: 'settings', icon: 'fa-cogs' },
        { name: 'Messages', component: 'message', icon: 'fa-comments-o' },
        { name: 'Media', component: 'media', icon: 'fa-play-circle' },
        { name: 'Portfolio', component: 'portfolio', icon: 'fa-file-text-o' }
      ],
      companyTools: [
        { name: 'Schedule', component: 'calendar', icon: 'fa-calendar' },
        { name: 'Settings', component: 'settings', icon: 'fa-cogs' },
        { name: 'Messages', component: 'message', icon: 'fa-comments-o' },
        { name: 'Budget', component: 'budget', icon: 'fa-bar-chart' },
        { name: 'Media', component: 'media', icon: 'fa-play-circle' },
        { name: 'Ticket', component: 'ticket', icon: 'fa-ticket' }
      ]
    }
  },
  computed: {
    profileTools() {
        if (this.profileType === 'artist') {
          return this.artistTools
        } else if (this.profileType === 'company') {
          return this.companyTools
        }
    },
    toolData() {
      return {[this.component]: this.profileToolData[this.component]}
    }
  },
  created() {
      // if(this.authorizedUser) {
        firebaseAxios.get("/tools/" + this.profileId + ".json" + '?auth=' + this.currentUser.idToken)
        .then(res => {
          // console.log('tools', res)
          this.profileToolData = res.data
        }).catch(error => {
          console.log(error)
        })

        // return this.profileToolData = this.$store.getters.userTools
      // }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/style-variables';

.profile-tools {
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
  .profile-tools {
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
