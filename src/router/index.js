import Vue from 'vue'
import Router from 'vue-router'
import showProfile from '@/components/showProfile'
import searchResults from '@/components/searchResults'
import landing from '@/components/landing'
import membershipDetails from '@/components/membershipDetails'
import pageStatic from '@/components/pageStatic'
import store from '@/store/store'

Vue.use(Router)

//lazy loading signUp
const signUp = resolve => {
	require.ensure(['@/components/signUp'], () => {
		resolve(require('@/components/signUp'));
	})
};

export default new Router({
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}
		if (to.hash) {
			return {selector: to.hash};
		}
		return {x: 0, y: 0};
	},
  routes: [
    { path: '/', name: 'landing', component: landing },
    { path: '/memberships', name: 'membershipDetails', component: membershipDetails},
    { path: '/about/:page', name: 'terms', component: pageStatic},
    { path: '/profile/:id', name: 'profile', component: showProfile, props: true },
    { path: '/signup', name: 'signUp', component: signUp, 
    	beforeEnter:(to, from, next) => {
    		console.log('checking');
    		next();
    	} 
	},
    { path: '/search', name: 'searchResults', component: searchResults},
    { path: '*', reidrect: '/'}
  ]
})

