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
import { mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    Nav,
  },  
  created(){
    this.fetchData();
    
    const token = localStorage.getItem('user-token');
    // if(token){
      console.log("this token", token)
      // const decodedtoken = jwtDecode(token);
      // console.log(decodedtoken.exp);
      // if(decodedtoken.exp * 1000 < Date.now()){
      //   store.dispatch(logoutUser());
      //   window.location.href = '/login';
      // } else {
      //     if(localStorage.role === "admin") {
      //       // console.log("settiong headers", window);
      //       store.dispatch({ type: SET_AUTHENTICATED_ADMIN });
      //       axios.defaults.headers.common['Authorization'] = token;
      //       // store.dispatch(getAdminData(localStorage.fullname));
      //     } else if(localStorage.accType === "regular-user") {
      //     store.dispatch({ type: SET_AUTHENTICATED_USER });
      //     axios.defaults.headers.common['Authorization'] = token;
          // store.dispatch(getUserData());
        // }
      // }
    // }
  },
  methods: {                                   // Add this:
    ...mapActions([                  // Add this
      'fetchRooms'
    ]),
    fetchData: function() {    // Add this
      this.fetchRooms();
    }
  }
};
</script>
