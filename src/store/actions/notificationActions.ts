
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

  SendClientEmail: (context: any, email: string) => {
    const mailjet = require ('node-mailjet')
    .connect('da0fae2865dd1cc58ba371d9f6f2b9d2', '6890ee35b2dd961b4c57a9e9cddfa91f')
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "mrfabian.cs@gmail.com",
            "Name": "Marcos"
          },
          "To": [
            {
              "Email": `${email}`,
              "Name": "Marcos"
            }
          ],
          "Subject": "Greetings from Mailjet.",
          "TextPart": "My first Mailjet email",
          "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })
    request
      .then((result: any) => {
        console.log(result.body)
      })
      .catch((err: any) => {
        console.log(err.statusCode)
      })
  }

}