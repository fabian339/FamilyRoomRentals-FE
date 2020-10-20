<template>
  <v-app>
    <Nav />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import axios from 'axios';
import {SendReminderToClient, SendReminderToUser, SendFollowupToClient, SendFollowupToUser} from './globals/emails'
import './styles.css'
import { mapActions } from 'vuex'
let jwt = require('jsonwebtoken');

export default {
  name: 'App',

  components: {
    Nav,
    Footer
  },  
  created(){
    axios.defaults.baseURL = "https://parseapi.back4app.com";
    axios.defaults.headers.common['X-Parse-Application-Id'] = 'kUx57AUuSOjGF36AotqV2lzjzjREM3mDQfc2a9gn'
    axios.defaults.headers.common['X-Parse-REST-API-Key'] = '1B647vsxlJr1SCJ732paCCmXB57dKEqxRL3MFE4w'
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    this.fetchData();
    
    const token = localStorage.getItem('user-token');
    if(token){
      let shouldGetUser = true;
      axios.interceptors.response.use(undefined, function (err) {
      // eslint-disable-next-line no-unused-vars
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) { 
            console.log('Token expired');
            this.tokenExpired() 
            shouldGetUser = false;
          }
          throw err;
        });
      });
      if (shouldGetUser) this.fetchCurrentUser(token);
    }

    this.sendRemindersAndFollowUps();
  },
  methods: {                                   // Add this:
    ...mapActions([                  // Add this
      'fetchRooms',
      'getCurrentUser',
      'logout',
      'sendEmail',
      'updateOffer'
    ]),
    fetchData: function() {    // Add this
      this.fetchRooms();
    },
    fetchCurrentUser: function(token) {    // Add this
      this.getCurrentUser(token);
    },
    tokenExpired: function() {
      this.logout()
    },
    sendRemindersAndFollowUps(){
      // console.log('reminders here')
      axios.get(`/classes/Offers`)
      .then((res) => {
        // context.commit('DELETE_NOTIFICATION', id);
        // context.commit('SET_LOADING_CONTENT', false);
        // console.log(res)
        res.data.results.forEach(offer => {
          if(offer.meetingScheduled){
            // console.log(offer)
            if(!offer.reminderSent){
              // if(new Date(new Date().setDate(26)).toDateString() === new Date(offer.officialMeetingDate.date).toDateString()){
              if(new Date(new Date().setHours(0,0,0,0)).toDateString() === new Date(offer.officialMeetingDate.date).toDateString()){
                this.sendReminders(offer)
              }
            }
            if(!offer.followupSent){
              if(new Date().toDateString() === new Date(new Date(offer.officialMeetingDate.date).setDate(new Date(offer.officialMeetingDate.date).getDate() + 2)).toDateString()){
                this.sendFollowUps(offer)
              }
            }
          }
        })
      })
      .catch(() => {
        // context.commit('SET_OFFER_ERROR', err);
      });
    },
    sendReminders(offer){
      const clientEmailData = SendReminderToClient({
        email: offer.email,
        // email: 'pke51925@eoopy.com',
        name: offer.full_name,
        ownerName: offer.ownerName,
        ownerEmail: offer.ownerEmail, 
        ownerPhone: offer.ownerPhone,
        meetingLocation: offer.roomAddress,
        roomId: offer.roomId,
        meetingDate: `${offer.officialMeetingDate.date}, at ${offer.officialMeetingDate.time}`,
        offer: offer.offer,
      })

      const userEmailData = SendReminderToUser({
        // ownerEmail: 'pke51925@eoopy.com',
        ownerEmail: offer.ownerEmail,
        name: offer.full_name,
        ownerName: offer.ownerName,
        email: offer.email, 
        phone: offer.phone,
        meetingLocation: offer.roomAddress,
        roomId: offer.roomId,
        meetingDate: `${offer.officialMeetingDate.date}, at ${offer.officialMeetingDate.time}`,
        offer: offer.offer,
      })
      this.sendEmail(clientEmailData)
      this.sendEmail(userEmailData)
      this.updateOffer({reminderSent: true, objectId: offer.objectId})
      // console.log(clientEmailData, userEmailData)
    },
    sendFollowUps(offer){
          // console.log("send followUp")
      let clientRefundToken = jwt.sign({
        iat: Math.floor(new Date()),
        exp: new Date().setDate(new Date().getDate() + 30),
        data: { 
            name: offer.full_name,
          }
        }, offer.roomId);

      const clientEmailData = SendFollowupToClient({
        email: offer.email,
        // email: 'lcj91867@eoopy.com',
        name: offer.full_name,
        ownerName: offer.ownerName,
        roomId: offer.roomId,
        token: clientRefundToken,
        verificationId: offer.objectId
      })

      const userEmailData = SendFollowupToUser({
        ownerEmail: offer.ownerEmail,
        // ownerEmail: 'lcj91867@eoopy.com',
        name: offer.full_name,
        ownerName: offer.ownerName,
      })
      console.log(clientRefundToken)
      this.sendEmail(clientEmailData)
      this.sendEmail(userEmailData)
      this.updateOffer({
        followupSent: true, 
        objectId: offer.objectId,
        clientRefundToken: clientRefundToken,
      })
    }
  }
};
</script>
