import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PostRoom from '@/components/Room/PostRoom.vue'
import ViewAllRooms from '@/components/Room/ViewAllRooms.vue'
import ViewRoom from '@/components/Room/ViewRoom.vue'
import LoginForm from '@/components/User/LoginForm.vue'
import RegistrationForm from '@/components/User/RegistrationForm.vue'
import UserProfile from '@/components/User/UserProfile.vue'

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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
]


const router = new VueRouter({
  routes
})


export default router
