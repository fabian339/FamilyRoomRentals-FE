<template>
  <v-app>
    <Nav />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Nav from '@/components/layout/Nav';
import axios from 'axios'

import { mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    Nav,
  },  
  created(){
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
  },
  methods: {                                   // Add this:
    ...mapActions([                  // Add this
      'fetchRooms',
      'getCurrentUser',
      'logout'
    ]),
    fetchData: function() {    // Add this
      this.fetchRooms();
    },
    fetchCurrentUser: function(token) {    // Add this
      this.getCurrentUser(token);
    },
    tokenExpired: function() {
      this.logout()
    }
  }
};
</script>
