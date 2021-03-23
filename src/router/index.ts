import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios';

Vue.use(VueRouter)

const isUSer = async (to: any, from: any, next: any) => {
  const store = await import('@/store');
  const { currentUser, isUserAuthenticated } = store.default.getters;

  const token = localStorage.getItem('user-token');
    // if there is no user but there is a token, fetch user
    if(Object.keys(currentUser).length === 0 && token){
      // console.log("fetch user")
      let shouldGetUser = true;
      axios.interceptors.response.use(undefined, function (err) {
      // eslint-disable-next-line no-unused-vars
        return new Promise(function (resolve, reject) {
          // check if token expired
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) { 
            // console.log('Token expired');
            store.default.dispatch('logout');
            shouldGetUser = false;
          }
          throw err;
        });
      });
      if(shouldGetUser){
        console.log("getting current user")
        await store.default.dispatch('getCurrentUser', token)
        next()
        return;
      }
    } else if(isUserAuthenticated) {
      // console.log("user logged in")
      next()
      return;
    } else {
      next('/UNAUTHOTIZED')
      return;
    }
}

const isUserVerified = async (to: any, from: any, next: any) => {
  const store = await import('@/store');
  const { currentUser, isUserAuthenticated } = store.default.getters;
  const token = localStorage.getItem('user-token');
  if(Object.keys(currentUser).length === 0 && token){
      console.log("getting current user")
      await store.default.dispatch('getCurrentUser', token)
  } else if(Object.keys(currentUser).length === 0 && !token){
    //Send to unauthorize page, needs to be created
    console.log("unauthorized")
    next('/unauthorized')
    return
  }

    next()
    return
}

const isAdmin = async (to: any, from: any, next: any) => {
  const store = await import('@/store');
  const { currentUser, isAdminAuthenticated } = store.default.getters;

  const token = localStorage.getItem('user-token');
    // if there is no user but there is a token, fetch user
    if(Object.keys(currentUser).length === 0 && token){
      // console.log("fetch user")
      let shouldGetUser = true;
      axios.interceptors.response.use(undefined, function (err) {
      // eslint-disable-next-line no-unused-vars
        return new Promise(function (resolve, reject) {
          // check if token expired
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) { 
            // console.log('Token expired');
            store.default.dispatch('logout');
            shouldGetUser = false;
          }
          throw err;
        });
      });
      if(shouldGetUser){
        console.log("getting current admin")
        await store.default.dispatch('getCurrentUser', token)
        next()
        return;
      }
    } else if(isAdminAuthenticated) {
      console.log("user logged in")
      next()
      return;
    } else {
      next('/UNAUTHOTIZED')
      return;
    }
}


  const publicRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/UNAUTHOTIZED',
    name: 'UNAUTHOTIZED',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UNAUTHOTIZED.vue')
  },
  {
    path: '/rooms',
    name: 'ViewAllRooms',
    component: () => import(/* webpackChunkName: "ViewAllRooms" */ '@/components/Room/ViewAllRooms.vue'),
  },
  {
    path: '/room/:id',
    name: 'ViewRoom',
    component: () => import(/* webpackChunkName: "ViewRoom" */ '@/components/Room/ViewRoom.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "LoginForm" */ '@/components/User/LoginForm.vue'),
  },
  {
    path: '/signup',
    name: 'RegistrationForm',
    component: () => import(/* webpackChunkName: "RegistrationForm" */ '@/components/User/RegistrationForm.vue'),
  },
  {
    path: '/password-reset',
    name: 'PasswordReset',
    component: () => import(/* webpackChunkName: "PasswordReset" */ '@/components/User/PasswordReset.vue'),
  },
  {
    path: '/careers',
    name: 'Career',
    component: () => import(/* webpackChunkName: "Career" */ '../views/Career.vue'),
  },
  {
    path: '/contact-us',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "Contact" */ '../views/Contact.vue'),
  },
  {
    path: '/qas',
    name: 'Qas',
    component: () => import(/* webpackChunkName: "Qas" */ '../views/Qas.vue'),
  },
  {
    path: '/room/:secretId/meeting/:token',
    name: 'SelectDateAndPay',
    component: () => import(/* webpackChunkName: "SelectMeetingDate" */ '@/components/Meeting/Client/SelectMeetingDate.vue'),
  },
  {
    path: '/payment/success/:session_id',
    name: 'clientRefund',
    component: () => import(/* webpackChunkName: "SuccessPayment" */ '@/components/Meeting/Client/SuccessPayment.vue'),
  },
  {
    path: '/payment/unsuccessful-payment',
    name: 'UnsuccessfulPayment',
    component: () => import(/* webpackChunkName: "UnsuccessfulPayment" */ '@/components/Meeting/Client/UnsuccessfulPayment.vue'),
  },
  {
    path: '/terms-and-conditions',
    name: 'termsAndConditions',
    component: () => import(/* webpackChunkName: "TermsAndConditions" */ '@/components/terms/TermsAndConditions.vue'),
    meta: { reuse: false }
  },
  {
    path: '/terms-and-conditions/services',
    name: 'OurServices',
    component: () => import(/* webpackChunkName: "TermsAndConditions" */ '@/components/terms/TermsAndConditions.vue'),
  },
  {
    path: '/terms-and-conditions/commitments',
    name: 'commitments',
    component: () => import(/* webpackChunkName: "TermsAndConditions" */ '@/components/terms/TermsAndConditions.vue'),
  },
  {
    path: '/terms-and-conditions/our-users',
    name: 'users',
    component: () => import(/* webpackChunkName: "TermsAndConditions" */ '@/components/terms/TermsAndConditions.vue'),
  },  
  {
    path: '/terms-and-conditions/agreements',
    name: 'agreements',
    component: () => import(/* webpackChunkName: "TermsAndConditions" */ '@/components/terms/TermsAndConditions.vue'),
  },  
  {
    path: '/terms-and-conditions/communications',
    name: 'communications',
    component: () => import(/* webpackChunkName: "TermsAndConditions" */ '@/components/terms/TermsAndConditions.vue'),
  },  
  {
    path: '/terms-and-conditions/privacy',
    name: 'privacy',
    component: () => import(/* webpackChunkName: "TermsAndConditions" */ '@/components/terms/TermsAndConditions.vue'),
  },  
  {
    path: '/terms-and-conditions/safety',
    name: 'Safety',
    component: () => import(/* webpackChunkName: "TermsAndConditions" */ '@/components/terms/TermsAndConditions.vue'),
  },
  {
    path: '/meetings/handling-meetings',
    name: 'HandlingMeetings',
    component: () => import(/* webpackChunkName: "HandlingMeetings" */ '../views/HandlingMeetings.vue'),
  },
]

const userRoutes = [
  {
    path: '/create-room',
    name: 'postRoom',
    component: () => import(/* webpackChunkName: "PostRoom" */ '@/components/Room/PostRoom.vue'),
    // component: PostRoom,
    beforeEnter:  isUSer,
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import(/* webpackChunkName: "UserProfile" */ '@/components/User/UserProfile.vue'),
    beforeEnter: isUSer,
  },
  {
    path: '/room/:roomId/offer/:offerId/schedule',
    name: 'Schedule',
    component: () => import(/* webpackChunkName: "Schedule" */ '@/components/notification/Schedule.vue'),
    beforeEnter: isUSer,
  },
  {
    path: '/email-verification',
    name: 'emailVerification',
    component: () => import(/* webpackChunkName: "EmailVerification" */ '@/components/User/EmailVerification.vue'),
    beforeEnter: isUserVerified,
  },
]

const adminRoutes = [
  {
    path: '/admin-panel',
    name: 'AdminPanel',
    component: () => import(/* webpackChunkName: "UserProfile" */ '@/components/User/UserProfile.vue'),
    // component: PostRoom,
    beforeEnter:  isAdmin,
  },
]

const routes = [
  ...publicRoutes,
  ...userRoutes,
  ...adminRoutes
]

const router = new VueRouter({
  routes
})

export default router
