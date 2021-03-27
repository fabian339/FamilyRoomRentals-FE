
import axios from 'axios';
// import { User } from '../validators'
import router from '../../router';
let appRouter: any = router;

export default {

  sendOffer: async (context: any, notification: any) => {
    // console.log(notification);
    context.commit('SET_OFFER_SENDING', true);
    await axios.post(`/classes/Offers`, notification)
    .then((res) => {
      // console.log(res)
      let offerData = {
        ...notification,
        ...res.data
      }
      context.commit('ADD_NOTIFICATION', offerData);
      let offer = {loadingType: 'sending-offer'}
      context.dispatch('offerLoading', offer)

  })
  .catch((err) => {
      context.commit('SET_OFFER_SENDING', false);
      // const err = {
      //   responseError: "Invalid email/password.."
      // }
      context.commit('SET_OFFER_ERROR', err);
      // localStorage.removeItem('user-token')
    });
  },

  fetchNotifications: (context: any, userData: any) => {
    axios.get('/classes/Offers')
    .then((res) => {
      // let myNotifications:any = [];
      if(userData.isAdmin){
        let meetings = res.data.results.filter((offer: any) => offer.meetingScheduled);
        if(meetings.length > 0){
          context.commit('SET_USER_MEETINGS', meetings)
        }
        context.commit('SET_USER_NOTIFICATIONS', res.data.results.filter((offer: any) => !offer.meetingScheduled))
      } else {
        let userOffers = res.data.results.filter((offer: any) => offer.receiverId === userData.userId);
        let userMeetings = userOffers.filter((offer: any) => offer.meetingScheduled);
        context.commit('SET_USER_NOTIFICATIONS', userOffers)
        if(userMeetings.length > 0){
          context.commit('SET_USER_MEETINGS', userMeetings)
        }
      }
      console.log("user data: ", userData)
      res.data.results.forEach((offer: any)=> {
          if(appRouter.history.current.path.includes(`/offer/${offer.objectId}`)) context.commit('SET_OFFER', offer);
          // if(offer.receiverId === id) myNotifications.push(offer)
      })

      // context.commit('SET_NOTIFICATIONS', res.data.results)
      // context.commit('SET_USER_NOTIFICATIONS', myNotifications);
      // console.log(appRouter.history)
    })
    .catch((err) => {
      context.commit('SET_OFFER_ERROR', err);
    });
  },

  getOfferOnClientUI: (context: any, data: any) => {
    // console.log('this is a Data22', id)
    context.commit('SET_GEETING_CLIENT_OFFER', true);
    axios.get(`/classes/Offers/${data.id}`)
    .then((res) => {
      if(res.data.offerToken === data.token){
        let offer = res.data;
        offer.loadingType = 'getting-client-offer';
        context.dispatch('offerLoading', offer)
      } else {
        context.commit('SET_OFFER_ERROR', {
          error: 'Invalid Verification, check parameters!'
        })
      }
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
      }
      if(appRouter.history.current.path !== '/profile'){
        appRouter.push(`/profile`)
      }
      // context.commit('UPDATE_OFFER', offerData);
    })
    .catch((err) => {
      // console.log(err)
      context.commit('SET_OFFER_ERROR', err);
    });
  },

  deleteOffer: async (context: any, id: string) => {
    context.commit('SET_DELETING_OFFER', true);
    await axios.delete(`/classes/Offers/${id}`)
    .then((res) => {
      context.commit('DELETE_NOTIFICATION', id);
      // context.commit('SET_LOADING_CONTENT', false);
      // console.log(appRouter)

      let offer = {loadingType: 'deleting-offer'}
      context.dispatch('offerLoading', offer)
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
    // axios.post("https://familyroomrentals-be.herokuapp.com/sendEmail", emailData)
    //new heroku url
    axios.post("https://my-first-heroku-app-api.herokuapp.com/sendEmail", emailData)
    .then((res) => {
      // context.commit('SET_OFFER_SENT_BY_CLIENT', true);
      // console.log("Sending Email",res)
    })
    .catch((err) => {
      context.commit('SET_OFFER_ERROR', err);
    });
  },

  offerLoading: async (context: any, offer: any) => {
    switch (offer.loadingType) {
      case 'sending-offer':
        setTimeout(() => {
          context.commit('SET_OFFER_SENDING', false);
          context.commit('SET_OFFER_SENT_BY_CLIENT', true);
        }, 2000);
        break;
      case 'getting-client-offer':
        setTimeout(() => {
          context.commit('ADD_NOTIFICATION', offer)
          context.commit('SET_OFFER', offer)
          context.commit('SET_OFFER_TOKEN_VERIFIED', true)
          context.commit('CLEAR_NOTIFICATIONS_ERROR')
          context.commit('SET_GEETING_CLIENT_OFFER', false);
        }, 1500);
        break;
      case 'deleting-offer':
        setTimeout(() => {
          context.commit('SET_DELETING_OFFER', false);
          context.commit('SHOW_OFFER_DELETING_DIALOG', false);
          context.commit('SET_OFFER_DELETED', true);
          if(appRouter.history.current.path !== '/profile'){
            appRouter.push(`/profile`)
          }
        }, 2000);
        break;
      default:
        console.log(`Sorry, we are out of.`);
    }
    // window.clearTimeout(timerId);

  },
}