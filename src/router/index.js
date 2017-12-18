import Vue from 'vue'
import Router from 'vue-router'
import showProfile from '@/components/showProfile'
import signUp from '@/components/signUp'
import searchResults from '@/components/searchResults'
import landing from '@/components/landing'
import membershipDetails from '@/components/membershipDetails'
import pageStatic from '@/components/pageStatic'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    { path: '/', name: 'landing', component: landing },
    { path: '/memberships', name: 'membershipDetails', component: membershipDetails},
    { path: '/about/:page', name: 'terms', component: pageStatic},
    { path: '/profile/:id', name: 'profile', component: showProfile },
    { path: '/signup', name: 'signUp', component: signUp },
    { path: '/search', name: 'searchResults', component: searchResults}
  ]
})
