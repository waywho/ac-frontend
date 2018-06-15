<template>
  <div class="profile-tools" v-if="show">
    <keep-alive>
      <component :is="component" :profile-id="profileId" :class="[authorizedUser ? 'tool-panel-auth' : 'tool-panel-public']" v-bind="profileToolData"></component>
    </keep-alive>
    <div :class="[authorizedUser ? 'toolbox-auth' : 'toolbox-public']">
      <div v-for="tool in profileTools" @click="component = tool.component" :class="['toolbox-tile', 'is-lightgray', {'active-tool': component === tool.component}]">
        <img v-if="!tool.name" :src="tool.icon" />
        <i v-else :class="['fa', tool.icon, 'fa-3x', 'is-lightgray', 'tool-icon']" aria-hidden="true"></i><br />{{tool.name}}
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
import firebaseAxios from '@/axios/axios-firebase.js';

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
    profileId: String,
    profileType: String
  },
  mixins: [currentUser],
  data () { 
    return {
      profileToolData: null,
      show: true,
      component: 'calendar',
      artistAuthTools: [
        { name: 'Schedule', component: 'calendar', icon: 'fa-calendar' },
        { name: 'Messages', component: 'message', icon: 'fa-comments-o' },
        { name: 'Media', component: 'medias', icon: 'fa-play-circle' },
        { name: 'Portfolio', component: 'portfolio', icon: 'fa-file-text-o' },
        { name: '', component: '', icon: '', icon: require('@/assets/images/artistcenter-logo.png')},
        { name: '', component: '', icon: '', icon: ''}
      ],
      companyAuthTools: [
        { name: 'Schedule', component: 'calendar', icon: 'fa-calendar' },
        { name: 'Messages', component: 'message', icon: 'fa-comments-o' },
        { name: 'Media', component: 'medias', icon: 'fa-play-circle' },
        { name: 'Opportunity', component: 'opportunity', icon: 'fa-address-book-o'},
        { name: '', component: '', icon: '', icon: require('@/assets/images/artistcenter-logo.png')},
        { name: '', component: '', icon: '', icon: ''}
      ],
      tools: {
        'calendar': { name: 'Schedule', component: 'calendar', icon: 'fa-calendar' },
        'media': { name: 'Media', component: 'media', icon: 'fa-play-circle' },
        'portfolio': { name: 'Portfolio', component: 'portfolio', icon: 'fa-file-text-o' },
        'opportunity': { name: 'Opportunity', component: 'opportunity', icon: 'fa-address-book-o' },
        'ticket': { name: 'Ticket', component: 'ticket', icon: 'fa-ticket' }
      }
    }
  },
  computed: {
    profileTools() {
      // console.log('auth', this.authorizedUser, this.profileId)

      if(this.authorizedUser) {
        return this[this.profileType + 'AuthTools']
      } else {
        if(this.profileToolData !== null && this.profileToolData !== undefined) {
          let ToolNames = Object.keys(this.profileToolData)
          let toolSet = []
          ToolNames.forEach(toolName => {
            toolSet.push(this.tools[toolName])
          })
          return toolSet
        } else {
          return null
        }
       
      }
      
      
    },
    toolData() {
      if(this.profileToolData === null && this.profileToolData === undefined) {
        return
      }
      return {[this.component]: this.profileToolData[this.component]}
    }
  },
  created() {
      if(this.authorizedUser) {
        this.profileToolData = this.$store.getters.currentUserTools 
        
      } else {
        this.$store.dispatch('getProfileTools', {profileId: this.profileId})
              .then(res => {
                this.profileToolData = res.data
                console.log('profileTools', this.profileToolData)
                if (this.profileToolData !== null && this.profileToolData !== undefined) {
                  this.show = true
                } else {
                  this.show = false
                }
              }, error => {
                console.log(error)
        })
        
      }
      
    
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
  width: 100%;
  overflow-y: hidden;
}

.tool-panel-public {
  flex-basis: 81%;
  min-height: 100%;
  background-color: #fff;
  float: left;
}

.tool-panel-auth {
  flex-basis: 69%;
  min-height: 100%;
  background-color: #fff;
  float: left;
  order: 1;
}

.toolbox-public {
  display: inline-grid;
  flex-basis: 18%;
  background: $color-body;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-gap: 15px 15px;
  padding-left: 15px;
  height: 100%;
  float: right;
}

.toolbox-auth {
  display: inline-grid;
  flex-basis: 30%;
  background: $color-body;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-gap: 15px 15px;
  padding-left: 15px;
  height: 100%;
  float: right;
  order: 2;
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

.toolbox-tile:hover, .toolbox-tile:hover .tool-icon, .tool-icon:hover, .active-tool  {
  background-color: $color-lightgold;
  color: white;
}

.active-tool i {
  color: white;
}


@media screen and (max-width: 46rem) {
  .profile-tools {
    height: 100%;
    max-height: 100%;
    width: 100%;
    overflow-y: hidden;
    flex-wrap: wrap;
  }

  .tool-panel-auth {
    flex-basis: 100%;
    width: 100%;
    height: 100%;
    order: 2;
  }

  .toolbox-auth {
    margin: 0px 0px 20px;
    flex-basis: 100%;
    height: 582px;
    width: 100%;
    order: 1;
  }

  .toolbox-inner {
    width: 100%;
  }
}
</style>
