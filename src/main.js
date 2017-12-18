// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueEventCalendar from 'vue-event-calendar'
import 'vue-event-calendar/dist/style.css'
import { store } from './store/store'
import vueMoment from 'vue-moment'
import 'chart.js'
import VueMediaEmbed from 'vue-media-embed'
import 'hchs-vue-charts'
import Vuex from 'vuex'


Vue.use(VueMediaEmbed, { store })
Vue.use(VueCharts);
Vue.use(vueEventCalendar, { locale: 'en'});
Vue.use(require('vue-moment'));

Vue.config.productionTip = false

Vue.filter('to-uppercase', function(value) {
	return value.toUpperCase()
})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  template: '<App/>',
  components: { App }
})
