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
import { mapActions, mapGetters } from 'vuex'
// let jwt = require('jsonwebtoken');

export default {
  name: 'App',

  components: {
    Nav,
    Footer
  },  
    computed: {
      ...mapGetters([
          'currentUser'
      ]),
  },

  beforeCreate(){
    axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
    axios.defaults.headers.common['X-Parse-Application-Id'] = process.env.VUE_APP_APPLICATION_ID
    axios.defaults.headers.common['X-Parse-REST-API-Key'] = process.env.VUE_APP_REST_API_Key
    axios.defaults.headers.common['Content-Type'] = process.env.VUE_APP_Content_Type
  },
  beforeMount(){
    this.fetchData();
    console.log(this.whatIsTheUserMode)
  },
  methods: {                             
    ...mapActions([                  // Add this
      'fetchRooms',
      'getCurrentUser',
      'logout',
    ]),
    fetchData: function() {    // Add this
      this.fetchRooms();
    },
    // fetchCurrentUser: function(token) {    // Add this
    //   this.getCurrentUser(token);
    // },
    // tokenExpired: function() {
    //   this.logout()
    // },
  }
};
</script>
