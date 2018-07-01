<template>
  <div id="app">
    <app-menu :class="['app-menu', {'menu-open': isActive}]" :style="menuStyle" v-on:toggleMenu="menuToggle($event)"></app-menu>
    <div id="app-inner" :class="[homeHeader ? 'app-inner-row-home' : 'app-inner-row']">
      <app-header :class="[navPosition, {'nav-up-home': homeHeader}]" v-on:toggleMenu="menuToggle($event)" v-on:signInModalShow="showSignInModal = true" :isActive="isActive" :profile-id="currentUser.id" ></app-header>
      <router-view class="main-body"></router-view>
      <app-footer></app-footer>
      <app-sign-in v-if="showSignInModal" @close="showSignInModal = false"></app-sign-in>
    </div>
  </div>
</template>

<script>
import menu from '@/components/layouts/menu'
import header from '@/components/layouts/header'
import footer from '@/components/layouts/footer'
import showProfile from '@/components/showProfile'
import signUp from '@/components/auth/signUp'
import searchResults from '@/components/searchResults'
import landing from '@/components/static_pages/landing'
import signIn from '@/components/auth/signInModal'
import pageStatic from '@/components/static_pages/pageStatic'
import currentUser from '@/mixins/currentUserMixin';

export default {
  name: 'app',
  components: {
    'app-menu': menu,
    'app-header': header,
    'app-footer': footer,
    'show-profile': showProfile,
    'sign-Up': signUp,
    'app-search-results': searchResults,
    'app-sign-in': signIn,
    'app-page-static': pageStatic
  },
  data() {
    return {
      scrolled: false,
      lastScrollTop: 0,
      navbarHeight: 100,
      scrollPosition: 0,
      navPosition: '',
      isActive: false,
      showSignInModal: false,
      windowWidth: 500,
    }
  },
  mixins: [currentUser],
  computed: {
    homeHeader: function() {
      return this.$route.name === 'home'
    },
    menuStyle: function() {
      if(this.windowWidth >= 500) {
        return {
          width: '400px',
          'max-width': '400px',
          right: '-400px'
        }
      } else if (this.windowWidth <= 499) {
        return {
          width: this.windowWidth + 'px',
          'min-width': '320px',
          right: '-' + this.windowWidth + 'px'
        }
      } else {
        return {
          width: this.windowWidth + 'px',
          'min-width': '320px',
          right: '-' + this.windowWidth + 'px'
        }
      }
    }
  },
  methods: {
    logScroll: function(e) {
      console.log("scrool", e)
    },
    handleScroll: function(e) {
      // this.navPosition = 'nav-up'
      // setTimeout(() => {
      //   this.navPosition = ''
      // }, 1000)

      // setTimeout(() => {
      //   this.navPosition = 'nav-up'
      // }, 7000)
       var currentScrollPosition = e.target.scrollTop;
       // console.log('currentScrollPosition', currentScrollPosition)
       if (currentScrollPosition > this.scrollPosition && currentScrollPosition > 50) {
         // console.log('scrolling')
        if(this.homeHeader) {
          this.navPosition = '';
        } else {
          this.navPosition = 'nav-up';
        }
         
       } else {
         this.navPosition = '';
       }
      this.scrollPosition = currentScrollPosition;
    },
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    },
    getBrowser() {
      var browser = window.navigator
      // console.log("browser", browser)
    },
    menuToggle: function(msg) {
      this.isActive = !this.isActive;
      // document.body.classList.toggle('push-left')
    }
  },
  created() {
    this.$store.dispatch('clearingMessage')
    this.$store.dispatch('tryAutoSignIn');
    this.getBrowser()
    // console.log(document.documentElement)
    document.body.addEventListener('scroll', this.handleScroll);
    // var doc = window
    // console.log(doc)
    // .addEventListener('scroll', this.handleScroll);
    // document.body.addEventListener('scroll', console.log('listenToScroll'));
   
  },
  destroyed() {
    document.body.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.getWindowWidth);
  },
  mounted() {
      this.$nextTick(function() {
        window.addEventListener('resize', this.getWindowWidth);

        //Init
        this.getWindowWidth()
    })
  }
}
</script>

<style lang="scss">
@import './styles/global';

#app-inner {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-columns: 100%;
  grid-template-areas:
    "header"
    "main"
    "footer";
  grid-gap: 0px 0px;
  width: 100% !important;
  min-width: $app-min-width;
  max-width: $app-max-width;
  margin: 0 auto;
  // padding-bottom: 180px;
  z-index: 1;
}

.app-inner-row-home {
  grid-template-rows: $header-height-home-mobile auto $footer-height;
}

.app-inner-row {
  grid-template-rows: $header-height-mobile auto $footer-height;
}

#app {
  transition: left 0.8s ease-in-out;
  -webkit-transition: left 0.8s ease-in-out;
  width: 100vw !important;
}


.main-body {
  grid-area: main;
  height: 100%;
  min-height: 100%;
}

.nav-up {
  top: -$header-height-mobile !important;
}

.nav-up-home {
  position: relative !important;
}

.app-menu {
  position: fixed;
  height: 100%;
  background-color: #9c515a; //#20201f;
  color: white;
  z-index: 999;
  transition: right 0.8s ease-in-out;
  -webkit-transition: right 0.8s ease-in-out;
  padding: 0px 23px;
}

.menu-open {
  right: 0px !important;
}

@media all and (min-width: $bp-med) {

  .nav-up {
    top: -$header-height !important;
  }

  .app-inner-row-home {
    grid-template-rows: $header-height-home auto $footer-height;
  }

  .app-inner-row {
    grid-template-rows: $header-height auto $footer-height;
  }

  .nav-up-home {
    position: relative;
  }
}

</style>
