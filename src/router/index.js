import Vue from 'vue'
import Router from 'vue-router'
import showProfile from '@/components/showProfile'
import searchResults from '@/components/searchResults'
import landing from '@/components/static_pages/landing'
import membershipDetails from '@/components/static_pages/membershipDetails'
import pageStatic from '@/components/static_pages/pageStatic'
import { store } from '@/store/store/'
import opportunityBoard from '@/components/opportunities/opportunityBoard'
import notFound from '@/components/notFound'
import firebaseApp from '@/firebase/init'

//lazy loading signUp
const signUp = resolve => {
	require.ensure(['@/components/auth/signUp'], () => {
		resolve(require('@/components/auth/signUp'));
	})
};

const router = new Router({
	mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        // if (savedPosition) {
        //  return savedPosition;
        // }
        // if (to.hash) {
        //  return {selector: to.hash};
        // }
        return {x: 0, y: 0};
    },
    routes: [
        { path: '/', redirect: '/signup' },
        { path: '/memberships', name: 'membershipDetails', component: membershipDetails},
        { path: '/about/:page', name: 'terms', component: pageStatic},
        { path: '/profiles/:id', name: 'profiles', component: showProfile, props: true},
        { path: '/opportunities', name: 'opportunitiesBoard', component: opportunityBoard, meta: {requiresAuth: true}},
        { path: '/signup', name: 'signUp', component: signUp
        	// beforeEnter:(to, from, next) => {
         //        firebaseApp.auth().onAuthStateChanged((user) => {
        	// 	  console.log('checking', user);
        	// 	  if(user) {
        	// 	      next({name: 'profiles', params: { id: store.state.userId }})
        	// 	  } else {
         //            next();
         //            }
        	//    })
         //    } 
    	},
        { path: '/search', name: 'searchResults', component: searchResults},
        { path: '*', name: 'notFound', component: notFound}
    ]
})

// router.beforeEach((to, from, next) => {
//     // check if route requires quth
//     if(to.matched.some(rec => rec.meta.requiresAuth)) {
//         // check authstate
//         let user = firebaseApp.auth().currentUser
//         if(user) {
//             console.log('user')
//             // user signed in proceed
//             next()

//         } else {
//             console.log('no user')
//             //no user signed in redirect to signin
//             next("/")
//         }
//     } else {
//         next()
//     }
// })

router.afterEach((to, from) => {
  document.getElementById('app').scrollIntoView()
})


Vue.use(Router)
export default router

