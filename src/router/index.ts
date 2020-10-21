import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Career from '../views/Career.vue'
import Contact from '../views/Contact.vue'
import Stories from '../views/Stories.vue'
import PostRoom from '@/components/Room/PostRoom.vue'
import ViewAllRooms from '@/components/Room/ViewAllRooms.vue'
import ViewRoom from '@/components/Room/ViewRoom.vue'
import LoginForm from '@/components/User/LoginForm.vue'
import RegistrationForm from '@/components/User/RegistrationForm.vue'
import EmailVerification from '@/components/User/EmailVerification.vue'
import UserProfile from '@/components/User/UserProfile.vue'
import PasswordReset from '@/components/User/PasswordReset.vue'
import Schedule from '@/components/notification/Schedule.vue'
import SelectDateAndPay from '@/components/payments/SelectDateAndPay.vue'
import clientRefund from '@/components/payments/clientRefund.vue'


Vue.use(VueRouter)

const ifAuthenticated = (to: any, from: any, next: any) => {
  const token = localStorage.getItem('user-token');
  if (token) {
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
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    // meta: {
    //   requiresAuth: true,
    // }
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/offer/:id/schedule',
    name: 'Schedule',
    component: Schedule,
    beforeEnter: ifAuthenticated,
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
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/stories',
    name: 'Stories',
    component: Stories
  },
  {
    path: '/offer-for-room/:secretId/select-date-to-meet/:token',
    name: 'SelectDateAndPay',
    component: SelectDateAndPay
  },
  {
    path: '/request/:secretId/refund/:refundToken',
    name: 'clientRefund',
    component: clientRefund
  },
  {
    path: '/email-verification',
    name: 'emailVerification',
    component: EmailVerification
  }
]


const router = new VueRouter({
  routes
})


export default router
