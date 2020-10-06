
import axios from 'axios';
// import { User } from '../validators'
import router from '../../router';
let appRouter: any = router;

export default {

  sendOffer: (context: any, notification: object) => {
    axios.post(`/classes/Offers`, notification)
    .then((res) => {
      context.commit('SET_OFFER_SENT', true);
      console.log('offer Sent', res)
  })
  .catch((err) => {
      // const err = {
      //   responseError: "Invalid email/password.."
      // }
      context.commit('SET_USER_ERROR', err);
      // localStorage.removeItem('user-token')
    });
  },

  fetchUserNotifications: (context: any, id: string) => {
    axios.get('/classes/Offers')
    .then((res) => {
      let myNotifications = res.data.results.filter((item: any) => item.receiverId === id);
      res.data.results
      context.commit('SET_USER_NOTIFICATIONS', myNotifications);
    })
    .catch((err) => {
      context.commit('SET_CONTENT_ERROR', err);
    });
  },

  markNotificationRead: (context: any, notificationId: {}) => {
    axios.put(`/classes/Offers/${notificationId}`, {readByReceiver: true})
    .then((res) => {
      // console.log("Updating Notifiction",res)
      context.commit('MARK_NOTIFICATION_READ', notificationId);
    })
    .catch((err) => {
      context.commit('SET_CONTENT_ERROR', err);
    });
  },

  deleteOffer: (context: any, id: string) => {
    // context.commit('SET_LOADING_CONTENT', true);
    axios.delete(`/classes/Offers/${id}`)
    .then((res) => {
      context.commit('DELETE_NOTIFICATION', id);
      // context.commit('SET_LOADING_CONTENT', false);
      // console.log(appRouter)
      if(appRouter.history.current.path !== '/profile'){
        appRouter.push(`/profile`)
      }
    })
    .catch((err) => {
      context.commit('SET_CONTENT_ERROR', err);
    });
  }
}