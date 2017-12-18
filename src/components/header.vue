<template>
  <div id="header">
    <div class="header-inner">
    <div class="logo">
      <router-link to="/"><img src='../assets/images/logo-placeholder.png' alt="operaop logo" /></router-link>
    </div>

    <ul class="header-items">
      <li class="search" id="search-element">
        <input v-on:keyup.enter="searchResults($event.target.value)" type="search" id="search" class="small" placeholder="search profiles" />
      </li>
      <li v-if="currentUser" class="header-avatar" v-on:click="notificationActive = !notificationActive">
        <app-notificationBubble v-if="!notificationActive" class="notification-bubble"></app-notificationBubble>
          <div class="avatar-small-border avatar-space" >
          <img src="../assets/images/myopera-logo.png" />
        </div>
        
      </li>
      <li v-if="!currentUser" class='avatar-space sign-in-item' id="show-modal" v-on:click="showModal()">Sign in</li>
      <li :class="['menu-button', {open: isActive}]">
          <i v-on:click="toggleMenu()" class="fa fa-bars fa-2x is-darkgray" aria-hidden="true"></i>
      </li>
    </ul>
    </div>
    <div class="xs-search">
        <input type="search" v-on:keyup.enter="searchResults($event.target.value)" id="xs-search" class="small" placeholder="search profiles" />
    </div>
    <app-notifications v-if="notificationActive" class="app-notification" v-on-clickaway="away"></app-notifications>
  </div>
</template>

<script>
import menuMixin from '../mixins/menuMixin'
import notifications from './notifications'
import notificationBubble from './notificationBubble'
import { mixin as clickaway } from 'vue-clickaway'

export default {
  components: {
    'app-notifications': notifications,
    'app-notificationBubble': notificationBubble
  },
  props: {
    isActive: Boolean,
    currentUser: Boolean
  },
  data() {
    return {
      notificationActive: false
    }
  },
  methods: {
    away: function() {
      this.notificationActive = false;
      // console.log('clicked')
    },
    searchResults: function(term) {
      // console.log('entereds')
      this.$router.push({ path: '/search', query: {profiles: term}})
    },
    showModal: function() {
      this.$emit('modalShow', true)
    }
    
  },
  mixins: [menuMixin, clickaway]
}
</script>

<style lang="scss" scoped>
@import '../styles/style-variables';

#header {
  position: fixed !important;
  background-color: #FFFFFF;
  top: 0;
  z-index: 998;
  grid-area: header;
  width: 100%;
  height: $header-height;
  transition: top 0.2s ease-in-out, left 1s ease-in-out;
}

.header-inner {
  padding-left: 100px;
  padding-right: 100px;
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

.logo {
  // height: 57px;
  display: inline-block;
  flex-basis: 40%;
}

.header-items {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.header-avatar {
  position: relative;
  cursor: pointer;
}

.notification-bubble {
  position: absolute;
  z-index: 9990;
  top: -8px;
  right: 20px;
}

.logo img {
  width: 100%;
  max-height: 100%;
}

.avatar-space {
    margin: 0px 30px 0px 30px;
}

.avatar img {
  width: 100%;
}

.sign-in-item {
  width: 50px;
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
  z-index: 999;
  background-color: $color-tile;
  width: 237px;
  position: absolute;
  right: 160px;
  top: 90px;
  padding: 30px 0.5rem;
}

.app-notification:after {
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

.xs-search {
  display: none;
}



@media screen and (max-width: 46rem) {
  .logo {
    flex-basis: 65%;
  }

  #header {
    height: $header-height-mobile;
  }

  .header-inner {
    padding: 0px 28px;
  }

  .header-items {
    flex-basis: 25%;
  }

  .xs-search {
    display: block;
    width: 100%;
    padding: 13px 52px;
    height: 63px;
    background-color: $color-gold;
  }

  #search-element {
    display: none;
  }

  .avatar-space {
    margin: 0px 20px 0px 20px;
  }

  .notification-bubble {
    right: 15px;
  }
  .app-notification {
    width: 100%;
    top: $header-height-mobile;
    right: 0px;
    padding-left: 14px;
  }

  .app-notification:after {
    display: none;
  }
}

</style>
