// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { store } from './store/store'
import vueMoment from 'vue-moment'
import VueMediaEmbed from 'vue-media-embed'
import Vuex from 'vuex'
import VueChatScroll from 'vue-chat-scroll';
import firebaseApp from '@/firebase/init';
import router from '@/router';

Vue.use(VueMediaEmbed, { store });
Vue.use(require('vue-moment'));
Vue.use(firebaseApp);
Vue.use(VueChatScroll);
Vue.config.productionTip = false

Vue.filter('to-uppercase', function(value) {
	if (value !== null && value !== undefined) {
    return value.toUpperCase()
  } else {
    return ''
  }
})

Vue.filter('imageProcess', function(value, type) {
  let imageURLs = {
    'avatar': require("@/assets/images/avatar-holder.png"),
    'season': require("@/assets/images/seasonicon.png")
  }
  if (value !== null && value !== undefined) {
    return value
  } else {
    return imageURLs[type]
  }
})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('kabab-to-space', function (value) {
  if (value !== null && value !== undefined) {
    value = value.split("-").join(" ");
    return value.charAt(0).toUpperCase() + value.slice(1)
  } else {
    return ''
  }
})

Vue.filter('camel-to-space', function (value) {
  if (value !== null && value !== undefined) {
    value = value.replace(/([A-Z])/g, " $1");
    return value.charAt(0).toUpperCase() + value.slice(1)
  } else {
    return ''
  }
})

Vue.filter('truncate', function (value, length) {
  length = length || 15
  if( !value || typeof value !== 'string') return ''
    if( value.length <= length) return value
      return value.substring(0, length) + '...'
})

export const bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  template: '<App/>',
  components: { App },
  created() {

  }
})
