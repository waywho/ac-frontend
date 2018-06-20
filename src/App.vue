<template>
  <div id="main-app">
    <app-menu :class="['app-menu', {'menu-open': isActive}]" :style="menuStyle" v-on:toggleMenu="menuToggle($event)"></app-menu>
    <div id="app-inner">
      <app-header :class="navPosition" v-on:toggleMenu="menuToggle($event)" v-on:signInModalShow="showSignInModal = true" :isActive="isActive" :profile-id="currentUser.id"></app-header>
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
    menuStyle: function() {
      if(this.windowWidth >= 500) {
        return {
          width: '400px',
          right: '-400px'
        }
      } else if (this.windowWidth <= 499) {
        return {
          width: this.windowWidth + 'px',
          right: '-' + this.windowWidth + 'px'
        }
      } else {
        return {
          width: this.windowWidth + 'px',
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
       var currentScrollPosition = e.srcElement.scrollTop;
       // console.log(e)
       // console.log('where am i', currentScrollPosition)
       if (currentScrollPosition > this.scrollPosition && currentScrollPosition > 100) {
         // console.log('scrolling')
         this.navPosition = 'nav-up';
       } else {
         this.navPosition = '';
       }
      this.scrollPosition = currentScrollPosition;
    },
    getWindowWidth(event) {
          this.windowWidth = document.documentElement.clientWidth;
    },
    menuToggle: function(msg) {
      this.isActive = !this.isActive;
      // document.body.classList.toggle('push-left')
    }
  },
  created() {
    // console.log(document.documentElement)
    var scrollDoc = document.getElementById("app-inner")
    console.log(scrollDoc)
    // .addEventListener('scroll', this.handleScroll);


    // document.body.addEventListener('scroll', console.log('listenToScroll'));
    this.$store.dispatch('tryAutoSignIn');
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
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  height: auto !important;
  width: auto !important;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100px auto 460px;
  grid-template-areas:
    "header"
    "main"
    "footer";
  grid-gap: 0px 0px;
  width: 100%;
  min-width: 320px;
  max-width: 1680px;
  margin: auto;
  z-index: 1;
}

#main-app {
  transition: left 0.8s ease-in-out;
  -webkit-transition: left 0.8s ease-in-out;
}

.main-body {
  grid-area: main;
  -webkit-overflow-scrolling: touch;
}

.nav-up {
  top: -163px !important;
}

.app-menu {
  position: fixed;
  height: 100%;
  background-color: #20201f;
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
    top: -100px !important;
    
  }
}

</style>
