<template>
  <div class="profile-tools" v-if="showComponent">
    <keep-alive>
      <component :is="component" :profile-id="profileId" :class="[authorizedUser ? 'tool-panel-auth' : 'tool-panel-public']" v-bind="toolData"></component>
    </keep-alive>
    <div :class="[authorizedUser ? 'toolbox-auth' : 'toolbox-public']" :style="gridSpec">
      <div v-for="tool in profileTools" @click="component = tool.component" :class="['is-lightgray', {'active-tool': component === tool.component}, [tool.component !== null ? 'toolbox-tile' : 'toolbox-tile-not-active']]">
        <img v-if="!tool.name" :src="tool.icon" />
        <i v-else :class="['fa', tool.icon, 'fa-3x', 'is-lightgray', 'tool-icon']" aria-hidden="true"></i><div>{{tool.name}}</div>
      </div>
     </div>
  </div>
</template>

<script>
import calendar from '@/components/calendars/toolCalendar';
import opportunityTool from '@/components/opportunities/toolOpportunity'
import settingsTool from '@/components/toolSettings';
import messageTool from '@/components/messages/toolMessage';
import mediaTool from '@/components/medias/toolMedia';
import ticketTool from '@/components/toolTicket';
import portfolioTool from '@/components/portfolios/toolPortfolio';
import currentUser from '@/mixins/currentUserMixin';
import firebaseApp from '@/firebase/init';
import { mapGetters} from 'vuex';

export default {
  name: 'tools',
  components: {
    'calendar': calendar,
    'opportunity': opportunityTool,
    'settings': settingsTool,
    'message': messageTool,
    'medias': mediaTool,
    'ticket': ticketTool,
    'portfolio': portfolioTool
  },
  props: {
    profileType: String
  },
  mixins: [currentUser],
  data () { 
    return {
      profileId: this.$route.params.profileId,
      windowWidth: null,
      profileToolData: {
        medias: null,
        calendar: null,
        portfolio: null,
        message: null,
        opportunity: null
      },
      show: true,
      component: 'calendar',
      artistAuthTools: [
        { name: 'Messages', component: 'message', icon: 'fa-comments-o' },
        { name: null, component: null, icon: '', icon: require('@/assets/images/artistcenter-logo.png')},
        { name: 'calendar', component: 'calendar', icon: 'fa-calendar' },
        { name: 'Media', component: 'medias', icon: 'fa-play-circle' },
        { name: 'Portfolio', component: 'portfolio', icon: 'fa-file-text-o' },
        { name: null, component: null, icon: '', icon: ''}
      ],
      companyAuthTools: [
        { name: 'Messages', component: 'message', icon: 'fa-comments-o' },
        { name: null, component: null, icon: '', icon: require('@/assets/images/artistcenter-logo.png')},
        { name: 'calendar', component: 'calendar', icon: 'fa-calendar' },
        { name: 'Opportunity', component: 'opportunity', icon: 'fa-address-book-o'},
        { name: 'Media', component: 'medias', icon: 'fa-play-circle' },        
        { name: null, component: null, icon: '', icon: ''}
      ],
      tools: {
        'calendar': { name: 'calendar', component: 'calendar', icon: 'fa-calendar' },
        'medias': { name: 'Media', component: 'medias', icon: 'fa-play-circle' },
        'portfolio': { name: 'Portfolio', component: 'portfolio', icon: 'fa-file-text-o' },
        'opportunity': { name: 'Opportunity', component: 'opportunity', icon: 'fa-address-book-o' },
        'ticket': { name: 'Ticket', component: 'ticket', icon: 'fa-ticket' }
      }
    }
  },
  computed: {
    showComponent: function() {
      if(this.profileToolData !== null && this.profileToolData !== undefined) {
        return true
      } else {
        return false
      }
    },
    toolsEmpty() {
      var status
      for(var key in this.profileToolData) {
          if(this.profileToolData[key] !== null) {
            status = false
            break;
          } else {
            status = true
          }
      }
      return status
    },
    profileTools() {
      // console.log('auth', this.authorizedUser, this.profileId)
      if(this.authorizedUser) {
        this.component = 'message'
        return this[this.profileType + 'AuthTools']
      } else if (!this.toolsEmpty) {

          let ToolNames = Object.keys(this.profileToolData)
          console.log('tool names', ToolNames)
          let toolSet = []
          ToolNames.forEach(toolName => {

            toolSet.push(this.tools[toolName])
            
          })

          console.log('toolset first', toolSet)

          console.log('tool length', toolSet.length)
          if(this.windowWidth <= 768 && toolSet.length < 2) {
            var fill = 2 - toolSet.length
            toolSet = this.fillToolBox(fill, toolSet)
          } else if (this.windowWidth <= 768 && toolSet.length < 4) {
            var fill = 4 - toolSet.length
            toolSet = this.fillToolBox(fill, toolSet)  
          } else if(this.windowWidth <= 768 && toolSet.length < 6) {
            var fill = 6 - toolSet.length
            toolSet = this.fillToolBox(fill, toolSet)
          } else if(this.windowWidth > 768 && toolSet.length < 3) {
            var fill = 3 - toolSet.length
            toolSet = this.fillToolBox(fill, toolSet)
          } else if(this.windowWidth > 768) {
            var fill = 6 - toolSet.length
            toolSet = this.fillToolBox(fill, toolSet)
          }

          console.log('tool set length', toolSet.length)
          this.component = toolSet[0].component
          return toolSet
      } else {
          return null
      }
       
    },
    gridSpec: function() {
      // console.log('how many tiles', this.profileTools.length)
      if(this.authorizedUser) {
        return  "grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr 1fr;"
      } else if(this.profileTools !== null && this.profileTools.length <= 2 && this.windowWidth <= 768){
        return  "grid-template-columns: 1fr 1fr; grid-template-rows: 1fr;"
      } else if(this.profileTools !== null && this.profileTools.length <= 4 && this.windowWidth <= 768) {
        return  "grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;"
      } else if(this.profileTools !== null && this.profileTools.length > 4 && this.windowWidth <= 768) {
        return  "grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr 1fr;"
      } else if(this.profileTools !== null && this.profileTools.length <= 3 && this.windowWidth > 768) {
        return  "grid-template-columns: 1fr; grid-template-rows: 1fr 1fr 1fr;"
      } else if(this.profileTools !== null && this.profileTools.length > 3 && this.windowWidth > 768) {
        return  "grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr 1fr;"
      }
    },
    toolData() {
      var tools
      if(this.authorizedUser) {
          if(this.$store.getters.currentUserTools) {
            tools = this.$store.getters.currentUserTools
          } else {
            tools = this.profileToolData
          }
          // console.log('tools', tools)
        } else {
          tools = this.profileToolData
        }
      return {[this.component]: tools[this.component]}
    }
  },
  methods: {
    fillToolBox(fillNum, toolSet) {
      for(var i = 0; i < fillNum; i++) {
        if(i === 0) {
          toolSet.push({ name: null, component: null, icon: '', icon: require('@/assets/images/artistcenter-logo.png')})
        } else {
          toolSet.push({ name: null, component: null, icon: '', icon: ''})
        } 
      }
      return toolSet
    },
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    }
  },
  created() {
    if(!this.authorizedUser) {
      var toolsRef = firebaseApp.database().ref("toolsPublic")
      toolsRef.child(this.profileId).once("value", snapshot => {
        console.log('get profile tools', snapshot.val())
        // var keys = Object.keys

        var tools = snapshot.val()

        for(var key in tools) {
          this.profileToolData[key] = tools[key]
        }
        // console.log(this.profileToolData)
      }).catch(error => {
        if(error) {
          console.log(error)
        }
      })
    }
  },
  mounted() {
      this.$nextTick(function() {
        window.addEventListener('resize', this.getWindowWidth);

        //Init
        this.getWindowWidth()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
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
  max-width: 100%;
  width: 100%;
  width: 100vw;
  height: 100%;
  overflow-y: hidden;
  flex-wrap: wrap;
}

.toolbox-inner {
  width: 100%;
}

.tool-panel-public, .tool-panel-auth {
  width: 100%;
  max-width: 100%;
  height: 100%;
  min-height: 100%;
  flex-basis: auto;
  background-color: white;
  float: left;
  order: 2;
}

.toolbox-public, .toolbox-auth {
  display: inline-grid;
  width: 100%;
  height: 100%;
  grid-gap: 1rem 1rem;
  min-width: $app-min-width;
  margin-bottom: 20px;
  flex-basis: auto;
  background: $color-body;
  padding-left: 1rem;
  padding-right: 1rem;
  order: 1;
}

.toolbox-tile, .toolbox-tile-not-active  {
  height: 100%;
  padding: 50px 25px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
}

.toolbox-tile {
   cursor: pointer;
}

.toolbox-tile-not-active {
  pointer-events: none;
  cursor: default;
}

.toolbox-tile img {
  width: 75%;
}

.tool-icon {
  margin-bottom: 10px;
}

.toolbox-tile:hover, 
  .toolbox-tile:hover .tool-icon, 
    .tool-icon:hover, 
      .active-tool  {
  background-color: $color-lightgold;
  color: white;
}

.toolbox-tile-not-active:hover {
  background-color: white !important;
  color: $color-lightgray !important;
}

.active-tool i {
  color: white;
}

@media all and (min-width: $bp-med) {
  .profile-tools {
    height: $tool-panel-height;
    min-height: $tool-panel-height;
  }

  .tool-panel-public {
     width: 80%;
     order: 1;
  }
  .toolbox-public {
    grid-template-columns: 1fr; 
  }

  .toolbox-public {
    width: 20%;
    padding-right: 0rem;
    height:  $tool-panel-height;
    min-height: $tool-panel-height;
    min-width: auto;
    order: 2;
  }

  .tool-panel-auth {
    width: 70%;
    order: 2;
  }

  .toolbox-auth {
    width: 30%;
    padding-right: 0rem;
    height:  $tool-panel-height;
    min-height: $tool-panel-height;
    min-width: auto;
    order: 2;
  }

}

@media all and (min-width: $bp-small) {
  .tool-panel-public {
     width: 80%;
     order: 1;
  }
  .toolbox-public {
    grid-template-columns: 1fr; 
  }

  .toolbox-public {
    width: 20%;
    padding-right: 0rem;
    height:  $tool-panel-height;
    min-height: $tool-panel-height;
    min-width: auto;
    order: 2;
  }

  .tool-panel-auth {
    width: 62%;
    order: 2;
  }

  .toolbox-auth {
    width: 36%;
    padding-right: 0rem;
    height:  $tool-panel-height;
    min-height: $tool-panel-height;
    min-width: auto;
    order: 2;
  }
}

</style>
