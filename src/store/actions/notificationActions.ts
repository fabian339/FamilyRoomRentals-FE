
import axios from 'axios';
// import { User } from '../validators'
import router from '../../router';
let appRouter: any = router;

export default {

  sendOffer: (context: any, notification: any) => {
    console.log(notification);
    axios.post(`/classes/Offers`, notification)
    .then((res) => {
      context.commit('SET_OFFER_SENT_BY_CLIENT', true);
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

  updateOffer: (context: any, offerData: any) => {
    axios.put(`/classes/Offers/${offerData.objectId}`, offerData)
    .then((res) => {
      context.commit('UPDATE_OFFER', offerData);
      if(offerData.offerAcceptedByOwner) {
        context.commit('SET_OFFER_ACCEPTED_BY_OWNER', true);
        if(appRouter.history.current.path !== '/profile'){
          appRouter.push(`/profile`)
        }
      }
      // context.commit('UPDATE_OFFER', offerData);
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
  },

  // SendClientEmail: async (context: any, email: string) => {
  //   const nodemailer = require("nodemailer");
  // }

}