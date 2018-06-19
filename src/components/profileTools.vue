<template>
  <div class="profile-tools" v-if="show">
    <keep-alive>
      <component :is="component" :profile-id="profileId" :class="[authorizedUser ? 'tool-panel-auth' : 'tool-panel-public']" v-bind="profileToolData"></component>
    </keep-alive>
    <div :class="[authorizedUser ? 'toolbox-auth' : 'toolbox-public']">
      <div v-for="tool in profileTools" @click="component = tool.component" :class="['toolbox-tile', 'is-lightgray', {'active-tool': component === tool.component}]">
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
        { name: 'Messages', component: 'message', icon: 'fa-comments-o' },
        { name: null, component: '', icon: '', icon: require('@/assets/images/artistcenter-logo.png')},
        { name: 'calendar', component: 'calendar', icon: 'fa-calendar' },
        { name: 'Media', component: 'medias', icon: 'fa-play-circle' },
        { name: 'Portfolio', component: 'portfolio', icon: 'fa-file-text-o' },
        { name: null, component: '', icon: '', icon: ''}
      ],
      companyAuthTools: [
        { name: 'Messages', component: 'message', icon: 'fa-comments-o' },
        
        { name: null, component: '', icon: '', icon: require('@/assets/images/artistcenter-logo.png')},
        { name: 'calendar', component: 'calendar', icon: 'fa-calendar' },
        { name: 'Opportunity', component: 'opportunity', icon: 'fa-address-book-o'},
        { name: 'Media', component: 'medias', icon: 'fa-play-circle' },        
        { name: null, component: '', icon: '', icon: ''}
      ],
      tools: {
        'calendar': { name: 'calendar', component: 'calendar', icon: 'fa-calendar' },
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
        this.component = 'message'
        return this[this.profileType + 'AuthTools']
      } else {
        if(this.profileToolData !== null && this.profileToolData !== undefined) {
          let ToolNames = Object.keys(this.profileToolData)
          let toolSet = []
          ToolNames.forEach(toolName => {
            toolSet.push(this.tools[toolName])
          })
          this.component = toolSet[0].component
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
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  flex-wrap: wrap;
}

.toolbox-inner {
  width: 100%;
}

.tool-panel-public, .tool-panel-auth {
  width: 100%;
  height: 582px;
  flex-basis: auto;
  min-height: 100%;
  background-color: white;
  float: left;
  order: 2;
}

.toolbox-public, .toolbox-auth {
  display: inline-grid;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  flex-basis: auto;
  background: $color-body;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 100%;
  order: 1;
}

.toolbox-public {
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-gap: 1rem 1rem;
}

.toolbox-auth {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-gap: 1rem 1rem;
}

.toolbox-tile {
  height: 100%;
  padding: 50px 25px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  cursor: pointer;
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

.active-tool i {
  color: white;
}

@media all and (min-width: $bp-med) {
  .profile-tools {
    height: 582px;
    max-height: 582px;
  }

  .tool-panel-public {
     width: 80%;
     order: 1;
  }

  .tool-panel-auth {
    width: 67%;
    order: 2;
  }

  .toolbox-auth {
    width: 30%;
    padding-right: 0rem;
    order: 2;
  }

  .toolbox-public {
    width: 20%;
    padding-right: 0rem;
     order: 2;
  }
}

</style>
