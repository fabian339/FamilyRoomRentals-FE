import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import About from '../views/About.vue'
// import HandlingMeetings from '../views/HandlingMeetings.vue'
// import Career from '../views/Career.vue'
// import Contact from '../views/Contact.vue'
// import Qas from '../views/Qas.vue'
// import PostRoom from '@/components/Room/PostRoom.vue'
// import ViewAllRooms from '@/components/Room/ViewAllRooms.vue'
// import ViewRoom from '@/components/Room/ViewRoom.vue'
// import LoginForm from '@/components/User/LoginForm.vue'
// import RegistrationForm from '@/components/User/RegistrationForm.vue'
// import EmailVerification from '@/components/User/EmailVerification.vue'
// import UserProfile from '@/components/User/UserProfile.vue'
// import PasswordReset from '@/components/User/PasswordReset.vue'
// import Schedule from '@/components/notification/Schedule.vue'
// import SelectMeetingDate from '@/components/Meeting/Client/SelectMeetingDate.vue'
// import SuccessPayment from '@/components/Meeting/Client/SuccessPayment.vue'
// import UnsuccessfulPayment from '@/components/Meeting/Client/UnsuccessfulPayment.vue'

// import clientRefund from '@/components/payments/clientRefund.vue'
// import TermsAndConditions from '@/components/terms/TermsAndConditions.vue'
let jwt = require('jsonwebtoken');

Vue.use(VueRouter)

// decoding user-authorization token set on local storage to identify user access
const ifAuthorized = async (to: any, from: any, next: any) => {
  const store = await import('@/store');
  const { user } = store.default.state.userState;
  // console.log(user)

  // console.log("this is my store", store.state)
  // store.commit("SET_USER_LOGGING_IN", false)

  // const secretKey = localStorage.getItem('user-token');
  // const authToken = localStorage.getItem('AUTHORIZATION')
  // let valid = false;
  // try {
  //   var decoded = jwt.verify(authToken, secretKey);
  // } catch(err) {
  //   valid = false;
  // }
  // if(decoded){
  //   // console.log(decoded)
  //   if(decoded.data.userToken === secretKey && decoded.data.emailVerified === true) valid = true;
  // }

  if (user.isAdmin) {
    next()
    return
  }
  next('/login')
}


  const routes = [
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
    // component: About
  },
  {
    path: '/create-room',
    name: 'postRoom',
    component: () => import(/* webpackChunkName: "PostRoom" */ '@/components/Room/PostRoom.vue'),
    // component: PostRoom,
    beforeEnter: ifAuthorized,
    // meta: {
    //   requiresAuth: true,
    // }
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import(/* webpackChunkName: "UserProfile" */ '@/components/User/UserProfile.vue'),
    // meta: {
    //   requiresAuth: true,
    // }
    beforeEnter: ifAuthorized,
  },
  {
    path: '/room/:roomId/offer/:offerId/schedule',
    name: 'Schedule',
    component: () => import(/* webpackChunkName: "Schedule" */ '@/components/notification/Schedule.vue'),
    beforeEnter: ifAuthorized,
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
    path: '/email-verification',
    name: 'emailVerification',
    component: () => import(/* webpackChunkName: "EmailVerification" */ '@/components/User/EmailVerification.vue'),
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


const router = new VueRouter({
  routes
})

export default router
