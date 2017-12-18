<template>
  <div>
    <app-menu :class="['app-menu', {'menu-open': isActive}]" v-on:toggleMenu="menuToggle($event)"></app-menu>
    <div id="app">
      <app-signIn v-if="showModal" @close="showModal = false"></app-signIn>
      <app-header :class="navPosition" v-on:toggleMenu="menuToggle($event)" v-on:modalShow="showModal = true" :isActive="isActive" :current-user="currentUser"></app-header>
      <router-view class="main-body" @scroll="handleScroll"/>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import menu from './components/menu'
import header from './components/header'
import footer from './components/footer'
import showProfile from './components/showProfile'
import signUp from './components/signUp'
import searchResults from './components/searchResults'
import landing from './components/landing'
import signIn from './components/signInModal'
import pageStatic from './components/pageStatic'

export default {
  name: 'app',
  components: {
    'app-menu': menu,
    'app-header': header,
    'app-footer': footer,
    'show-profile': showProfile,
    'sign-Up': signUp,
    'app-search-results': searchResults,
    'app-signIn': signIn,
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
      currentUser: false,
      showModal: false
    }
  },
  methods: {
    handleScroll: function(e) {
       var currentScrollPosition = e.srcElement.scrollTop;
       if (currentScrollPosition > this.scrollPosition && currentScrollPosition > 100) {
         this.navPosition = 'nav-up';
       } else {
         this.navPosition = '';
       }
      this.scrollPosition = currentScrollPosition;
    },
    menuToggle: function(msg) {
      this.isActive = !this.isActive;
      document.body.classList.toggle('push-left')
    }
  },
  created() {
    document.body.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    document.body.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss">
@import './styles/global';

#app {
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  height: auto !important;
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

.main-body {
  grid-area: main;
}

.nav-up {
  top: -100px !important;
}

.push-left {
  left: -503px;
}

.app-menu {
  position: fixed;
  width: 503px;
  height: 100%;
  right: -503px;
  background-color: #20201f;
  color: white;
  z-index: 999;
  transition: right 0.8s ease-in-out;
  padding: 0px 23px;
}

.menu-open {
  right: 0px !important;
}

@media screen and (max-width: 46rem) {
  .nav-up {
    top: -163px !important;
  }
}

</style>
