<template>
  <div id="header">
    <div class="header-inner">
      <ul class="non-list header-items header-items-left">
        <li class="logo" v-if="!landingLogo">
          <router-link to="/">
            <img :src="require('@/assets/images/ac-logo-mobile-beta.svg')" alt="artistcenter logo" class="logo-mobile" />
            <img :src="require('@/assets/images/ac-logo-horizontal-beta.svg')" alt="artistcenter logo" class="logo-desktop" />
          </router-link>
        </li>
        

      </ul>

      <ul class="non-list header-items header-items-right">
        <li class="search header-item-space" id="search-element">
          <input v-on:keyup.enter="searchResults($event.target.value)" v-model="profileSearch" type="search" id="search" placeholder="search profiles" />
        </li>
        <li v-if="signedIn" class="notification-icon" v-on:click="getNotifications">
          <app-notification-bubble v-if="notificationAlert" class="notification-bubble"></app-notification-bubble>
          <i class="fa fa-bell-o" aria-hidden="true"></i>
        </li>
        <li v-if="signedIn" class="header-avatar header-item-space">
          <router-link :to="'/profiles/' + this.currentUserId">
              <avatar :image-source="currentUserAvatar" :border="true" :size="'small'" :name="$store.getters.profile.details.name"></avatar>
          </router-link>
        </li>
        <li v-if="!signedIn" class='header-item-space sign-in-item' id="show-modal" v-on:click="showSignIn()">Sign in</li>

        <li :class="['menu-button', {open: isActive}]">
            <i v-on:click="toggleMenu()" class="fa fa-bars fa-2x is-darkgray" aria-hidden="true"></i>
        </li>
      </ul>
    </div>
    <div class="home-logo" v-if="landingLogo">
      <router-link to="/">
        <img :src="require('@/assets/images/ac-logo-vertical.svg')" alt="artist center logo" class="home-mobile-logo" />
        <img :src="require('@/assets/images/ac-logo-horizontal-beta.svg')" alt="artist center logo" class="home-desktop-logo" /></router-link>

    </div>
    <div class="xs-search">
        <input type="search" v-on:keyup.enter="searchResults($event.target.value)" id="xs-search-input" class="small" placeholder="search profiles" />
    </div>
    <app-notifications v-if="showNotificatons" :profile-id="currentUserId" class="app-notification" :notification-list="notificationList" v-on-clickaway="away"></app-notifications>
  </div>
</template>

<script>
import menuMixin from '@/mixins/menuMixin'
import notifications from '@/components/notifications'
import notificationBubble from '@/components/notificationBubble'
import avatar from '@/components/avatar';
import { mixin as clickaway } from 'vue-clickaway'
import currentUser from '@/mixins/currentUserMixin';
import firebaseApp from '@/firebase/init';
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  components: {
    'app-notifications': notifications,
    'app-notification-bubble': notificationBubble,
    'avatar': avatar
  },
  props: {
    isActive: Boolean
  },
  mixins: [menuMixin, clickaway, currentUser],
  data() {
    return {
      notificationAlert: false,
      showNotificatons: false,
      notificationList: [],
      profileSearch: "",
      lastKey: ""
    }
  },
  computed: {
    ...mapGetters(['currentUserId']),
    landingLogo: function() {
      return this.$route.name === 'home'
    }
  },
  methods: {
    getNotifications: function() {
      this.showNotificatons = !this.showNotifications;

      
         var notificationRef = firebaseApp.database().ref('notifications/' + this.currentUserId)
         notificationRef.once('value', snapshot => {
          // console.log(snapshot.val())
            var keys = Object.keys(snapshot.val() || {})
            this.lastKey = keys[keys.length-1]

            firebaseApp.database().ref('notificationViews/' + this.currentUserId).set(this.lastKey)

            this.notificationList = _.orderBy(Object.values(snapshot.val()), ['created'], ['desc']);
            this.notificationAlert = false;  
        })
      
    },
    away: function() {
      this.showNotificatons = false;
      // console.log('clicked')
    },
    searchResults: function(searchTerm) {
      // console.log('entereds')
      this.$router.push({ path: '/search', query: {profiles: searchTerm}})
    },
    showSignIn: function() {
      this.$emit('signInModalShow', true)
    }    
  },
  created() {
    if(this.signedIn) {
      var notificationRef = firebaseApp.database().ref('notifications/' + this.currentUserId)
      
      if(this.lastKey) {
        notificationRef.orderByKey().startAt(this.lastKey).on('child_added', snapshot => {
          this.notificationAlert = true
        })
      } else {
        firebaseApp.database().ref('notificationViews').child(this.currentUserId).once("value", snapshot => {
          this.lastKey = snapshot.val()
          // console.log(this.lastKey)
          if(!snapshot.val()) {
            notificationRef.orderByChild('created').startAt(Date.now()).on('child_added', snapshot => {
             this.notificationAlert = true
            })
          } else {
            notificationRef.orderByKey().startAt(this.lastKey).on('child_added', snapshot => {
              this.notificationAlert = true
            })
          }
          
        })
      }
    }
  

    
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/style-variables';

#header {
  position: fixed;
  background-color: #FFFFFF;
  top: 0;
  z-index: 998;
  grid-area: header;
  width: 100%;
  max-width: $app-max-width;
  min-width: $app-min-width;
  transition: top 0.5s ease-in-out, left 1s ease-in-out;
  -webkit-transition: top 0.5s ease-in-out, left 1s ease-in-out;
}

.header-height {
  height: $header-height-mobile;
}

.header-home-height {
  height: $header-height-home-mobile;
}

.header-inner {
  padding: 0px $body-padding-small;
  display: flex;
  width: 100%;
  height: $header-height;
  justify-content: space-between;
  align-items: center;
}

#header ul {
  list-style-type: none;
  margin-bottom: 0px;
}

// regular logo

.logo {
  // height: 57px;
  display: inline-block;
  flex-basis: auto;
}

.logo img {
  width: auto;
  height: 50px;
}

.logo-mobile {
  display: block;
}

.logo-desktop {
  display: none;
}


// logos on home/landing and static pages

.home-logo {
  height: $header-home-logo-mobile-height;
  max-height: $header-home-logo-mobile-height;
  margin: 0px auto $header-home-logo-margin-bottom;
}

.home-mobile-logo {
  display: block;
  height: 100%;
  width: auto;
  margin: 0 auto;
}

.home-desktop-logo {
  display: none;
}

.header-items {
  display: inline-flex;
  width: auto;
  flex-basis: auto;
  align-items: center;
}

.header-items-left {
  width: 50%;
  max-width: 550px;
  justify-content: flex-start;
}

.header-items-right {
  width: 50%;
  justify-content: flex-end;
}

#search-element {
   display: none;
}

.header-avatar {
  cursor: pointer;
}

.notification-icon {
  width: 30px;
  height: 30px;
  min0width: 30px;
  min-height: 30px;
  border-radius: 50%;
  background-color: $color-gold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.notification-bubble {
  position: absolute;
  z-index: 9990;
  top: -8px;
  right: 15px;
}

.header-item-space {
  margin: 0px 20px 0px 20px;
}


.avatar img {
  width: 100%;
  border-radius: 50%;
}

.sign-in-item {
  width: 50px;
  cursor: pointer;
}

.box {
  margin: 0 auto;
}

.menu-button {
  cursor: pointer;
  transition: all 0.5s ease;
}

.menu-button:hover i {
  color: $color-gold;
}

.open {
  visibility: hidden;
  opacity: 0;
}

.app-notification {
  height: auto;
  max-height: 500px;
  z-index: 999;
  background-color: $color-tile;
  width: 100%;
  position: absolute;
  right: 0px;
  top: $header-height-mobile;
  padding: 30px $body-padding-small;
}

.app-notification:after {
  display: none;
}

.xs-search {
  display: block;
  width: 100%;
  background-color: $color-silver;
  padding: 11px $body-padding-small 12px;
  height: $header-search-height-mobile;
}

#xs-search-input {
  margin-bottom: 0px;
  background-color: white;
}


.home-page-logo img {
  width: auto;
  height: 100%;
  margin: 0px auto;
}

@media all and (min-width: $bp-med) {
  .header-height {
    height: $header-height;
  }

  .header-home-height {
    height: $header-height-home;
  }

  .header-inner {
    padding: 0px $body-padding-large;
  }

  .header-items-left {
    width: 40%;
    justify-content: flex-start;
  }

  .header-items-right {
    width: 60%;
    justify-content: flex-end;
  }

  // regular logo

  .logo-mobile {
    display: none;
  }

  .logo-desktop {
    display: block;
  }


  // logos on home/landing and static pages

  .home-logo {
    height: $header-home-logo-height;
    max-height: $header-home-logo-height;
    margin: $header-home-logo-margin-top 0px $header-home-logo-margin-bottom;
  }

  .home-mobile-logo {
    display: none;
  }

  .home-desktop-logo {
    display: block;
    width: 70%;
    height: auto;
    max-height: 78px;
    margin: 0px auto;
  }
  
  .xs-search {
    display: none;
  }


  #search-element {
    display: block;
    width: 50%;
  }

  .header-item-space {
      margin: 0px 30px 0px 30px;
  }


  .notification-bubble {
    right: -8px;
  }

  .app-notification {
    width: 237px;
    max-height: 300px;
    top: 90px;
    right: 225px;
    padding: 15px 15px;
  }

  .app-notification:after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 94%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-bottom-color: $color-tile;
    border-top: 0;
    margin-left: -15px;
    margin-top: -15px;
  }
}

</style>
