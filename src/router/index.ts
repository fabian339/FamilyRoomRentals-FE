import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import HandlingMeetings from '../views/HandlingMeetings.vue'
import Career from '../views/Career.vue'
import Contact from '../views/Contact.vue'
import Qas from '../views/Qas.vue'
import PostRoom from '@/components/Room/PostRoom.vue'
import ViewAllRooms from '@/components/Room/ViewAllRooms.vue'
import ViewRoom from '@/components/Room/ViewRoom.vue'
import LoginForm from '@/components/User/LoginForm.vue'
import RegistrationForm from '@/components/User/RegistrationForm.vue'
import EmailVerification from '@/components/User/EmailVerification.vue'
import UserProfile from '@/components/User/UserProfile.vue'
import PasswordReset from '@/components/User/PasswordReset.vue'
import Schedule from '@/components/notification/Schedule.vue'
import SelectMeetingDate from '@/components/Meeting/Client/SelectMeetingDate.vue'
import SuccessPayment from '@/components/Meeting/Client/SuccessPayment.vue'
import UnsuccessfulPayment from '@/components/Meeting/Client/UnsuccessfulPayment.vue'

// import clientRefund from '@/components/payments/clientRefund.vue'
import TermsAndConditions from '@/components/terms/TermsAndConditions.vue'
let jwt = require('jsonwebtoken');

Vue.use(VueRouter)

// decoding user-authorization token set on local storage to identify user access
const ifAuthorized = (to: any, from: any, next: any) => {
  const secretKey = localStorage.getItem('user-token');
  const authToken = localStorage.getItem('AUTHORIZATION')
  let valid = false;
  try {
    var decoded = jwt.verify(authToken, secretKey);
  } catch(err) {
    valid = false;
  }
  if(decoded){
    // console.log(decoded)
    if(decoded.data.userToken === secretKey && decoded.data.emailVerified === true) valid = true;
  }

  if (valid) {
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
    component: About
  },
  {
    path: '/create-room',
    name: 'postRoom',
    component: PostRoom,
    beforeEnter: ifAuthorized,
    // meta: {
    //   requiresAuth: true,
    // }
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    // meta: {
    //   requiresAuth: true,
    // }
    beforeEnter: ifAuthorized,
  },
  {
    path: '/room/:roomId/offer/:offerId/schedule',
    name: 'Schedule',
    component: Schedule,
    beforeEnter: ifAuthorized,
  },
  {
    path: '/rooms',
    name: 'ViewAllRooms',
    component: ViewAllRooms
  },
  {
    path: '/room/:id',
    name: 'ViewRoom',
    component: ViewRoom
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm
  },
  {
    path: '/signup',
    name: 'RegistrationForm',
    component: RegistrationForm
  },
  {
    path: '/password-reset',
    name: 'PasswordReset',
    component: PasswordReset
  },
  {
    path: '/careers',
    name: 'Career',
    component: Career
  },
  {
    path: '/contact-us',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/qas',
    name: 'Qas',
    component: Qas
  },
  {
    path: '/room/:secretId/meeting/:token',
    name: 'SelectDateAndPay',
    component: SelectMeetingDate
  },
  {
    path: '/payment/success/:session_id',
    name: 'clientRefund',
    component: SuccessPayment
  },
  {
    path: '/payment/unsuccessful-payment',
    name: 'UnsuccessfulPayment',
    component: UnsuccessfulPayment
  },
  {
    path: '/email-verification',
    name: 'emailVerification',
    component: EmailVerification
  },
  {
    path: '/terms-and-conditions',
    name: 'termsAndConditions',
    component: TermsAndConditions,
    meta: { reuse: false }
  },
  {
    path: '/terms-and-conditions/services',
    name: 'OurServices',
    component: TermsAndConditions
  },
  {
    path: '/terms-and-conditions/commitments',
    name: 'commitments',
    component: TermsAndConditions,
  },
  {
    path: '/terms-and-conditions/our-users',
    name: 'users',
    component: TermsAndConditions,
  },  
  {
    path: '/terms-and-conditions/agreements',
    name: 'agreements',
    component: TermsAndConditions,
  },  
  {
    path: '/terms-and-conditions/communications',
    name: 'communications',
    component: TermsAndConditions,
  },  
  {
    path: '/terms-and-conditions/privacy',
    name: 'privacy',
    component: TermsAndConditions,
  },  
  {
    path: '/terms-and-conditions/safety',
    name: 'Safety',
    component: TermsAndConditions,
  },
  {
    path: '/meetings/handling-meetings',
    name: 'HandlingMeetings',
    component: HandlingMeetings,
  },
]


const router = new VueRouter({
  routes
})

export default router
