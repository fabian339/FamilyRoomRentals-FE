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
// import {SendReminderToClient, SendReminderToUser, SendFollowupToClient, SendFollowupToUser} from './globals/emails'
import './styles.css'
import { mapActions } from 'vuex'
// let jwt = require('jsonwebtoken');

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

    // this.sendRemindersAndFollowUps();
  },
  methods: {                                   // Add this:
    ...mapActions([                  // Add this
      'fetchRooms',
      'getCurrentUser',
      'logout',
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
  }
};
</script>
