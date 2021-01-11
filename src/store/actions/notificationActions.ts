
import axios from 'axios';
// import { User } from '../validators'
import router from '../../router';
let appRouter: any = router;

export default {

  sendOffer: (context: any, notification: any) => {
    console.log(notification);
    axios.post(`/classes/Offers`, notification)
    .then((res) => {
      console.log(res)
      let offerData = {
        ...notification,
        ...res.data
      }
      context.commit('ADD_NOTIFICATION', offerData);
  })
  .catch((err) => {
      // const err = {
      //   responseError: "Invalid email/password.."
      // }
      context.commit('SET_OFFER_ERROR', err);
      // localStorage.removeItem('user-token')
    });
  },

  fetchNotifications: (context: any, id: string) => {
    axios.get('/classes/Offers')
    .then((res) => {
      // let myNotifications:any = [];  

      res.data.results.forEach((offer: any)=> {
          if(appRouter.history.current.path.includes(`/offer/${offer.objectId}`)) context.commit('SET_OFFER', offer);
          // if(offer.receiverId === id) myNotifications.push(offer)
      })

      context.commit('SET_NOTIFICATIONS', res.data.results)
      // context.commit('SET_USER_NOTIFICATIONS', myNotifications);
      // console.log(appRouter.history)
    })
    .catch((err) => {
      context.commit('SET_OFFER_ERROR', err);
    });
  },

  getOfferOnClientUI: (context: any, data: any) => {
    // console.log('this is a Data22', id)
    context.commit('SET_LOADING_CONTENT', true);
    axios.get(`/classes/Offers/${data.id}`)
    .then((res) => {
      if(res.data.offerToken === data.token){
        context.commit('ADD_NOTIFICATION', res.data)
        context.commit('SET_OFFER', res.data)
        context.commit('SET_OFFER_TOKEN_VERIFIED', true)
        context.commit('CLEAR_NOTIFICATIONS_ERROR')
      } else {
        context.commit('SET_OFFER_ERROR', {
          error: 'Invalid Verification, check parameters!'
        })
      }
      context.commit('SET_LOADING_CONTENT', false);
    })
    .catch((err) => {
      context.commit('SET_OFFER_ERROR', {
        error: 'Invalid Verification ID!'
      })
      context.commit('SET_LOADING_CONTENT', false);
    })
  },

  getOfferOnClientRefund: (context: any, data: any) => {
    // console.log('this is a Data22', id)
    context.commit('SET_LOADING_CONTENT', true);
    axios.get(`/classes/Offers/${data.id}`)
    .then((res) => {
      if(res.data.clientRefundToken === data.token){
        context.commit('SET_OFFER', res.data)
        context.commit('SET_OFFER_TOKEN_VERIFIED', true)
        context.commit('CLEAR_NOTIFICATIONS_ERROR')
      } else {
        context.commit('SET_OFFER_ERROR', {
          error: 'Invalid Verification, check parameters!'
        })
      }
      context.commit('SET_LOADING_CONTENT', false);
    })
    .catch((err) => {
      context.commit('SET_OFFER_ERROR', {
        error: 'Invalid Verification ID!'
      })
      context.commit('SET_LOADING_CONTENT', false);

    })
  },

  updateOffer: (context: any, offerData: any) => {
    console.log("offerData:", offerData)
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
      // console.log(err)
      context.commit('SET_OFFER_ERROR', err);
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
      context.commit('SET_OFFER_ERROR', err);
    });
  },

  deleteUserOffers: (context: any, notificationIds: []) => {
    notificationIds.forEach(id => {
      axios.delete(`/classes/Offers/${id}`)
      .then((res) => {
        context.commit('DELETE_NOTIFICATION', id);
      })
      .catch((err) => {
        context.commit('SET_CONTENT_ERROR', err);
      });
    })
    // console.log(notificationIds)
  },

  sendEmail: (context: any, emailData: any) => {
    axios.post("https://familyroomrentals.b4a.app/sendEmail", emailData)
    .then((res) => {
      // context.commit('SET_OFFER_SENT_BY_CLIENT', true);
      console.log("Sending Email",res)
    })
    .catch((err) => {
      context.commit('SET_OFFER_ERROR', err);
    });
  },
}