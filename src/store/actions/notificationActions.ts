
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
      let myNotifications:any = [];  

      res.data.results.forEach((offer: any)=> {
          if(appRouter.history.current.path === `/offer/${offer.objectId}/schedule`) context.commit('SET_OFFER', offer);
          if(offer.receiverId === id) myNotifications.push(offer)
      })
      context.commit('SET_USER_NOTIFICATIONS', myNotifications);
      // console.log(appRouter.history)
    })
    .catch((err) => {
      context.commit('SET_CONTENT_ERROR', err);
    });
  },

  getOffer: (context: any, data: any) => {
    // console.log('this is a Data22', id)
    context.commit('SET_LOADING_CONTENT', true);
    axios.get(`/classes/Offers/${data.id}`)
    .then((res) => {
      if(res.data.offerToken === data.token){
        context.commit('SET_OFFER', res.data)
        context.commit('SET_OFFER_TOKEN_VERIFIED', true)
        context.commit('CLEAR_NOTIFICATIONS_ERROR')
      } else {
        context.commit('SET_OFFER_ERROR', {
          error: 'Invalid Verification ID!'
        })
      }
      context.commit('SET_LOADING_CONTENT', false);
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

  SendEmail: (context: any, emailData: any) => {
    const path = ['/functions/sendEmailOne', '/functions/sendEmailThree'];
    let index = Math.random();
    if(index < 0.5) index = Math.floor(index)
    else index = Math.ceil(index)
    
    axios.post(path[index], emailData)
    .then((res) => {
      // context.commit('SET_OFFER_SENT_BY_CLIENT', true);
      console.log("Sending Email",res)
    })
    .catch((err) => {
      context.commit('SET_USER_ERROR', err);
    });
  }

}