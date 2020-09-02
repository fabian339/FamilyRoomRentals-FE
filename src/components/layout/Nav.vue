<template>
    <v-app-bar
      app
      color="#556B2F"
      dark
    >
      <v-toolbar-title id="title">FamilyRoomRentals</v-toolbar-title>

      <v-spacer></v-spacer>

    <v-btn to="/" text>
        <span>Home</span>
    </v-btn>

    <v-btn to="/rooms" text>
        <span>View Rooms</span>
    </v-btn>

    <v-btn v-if="isAuthenticated" to="/create-room" text>
        <span>Post Your Room</span>
    </v-btn>

    <v-btn v-if="isAuthenticated" to="/profile" text>
        <span>My Profile</span>
    </v-btn>

    <v-btn v-if="isAuthenticated" to="/" text>
        <v-avatar style="border: 2px solid">
            <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
    </v-btn>

    <v-btn v-if="isAuthenticated" @click="logoutUser" text>
        <span>Log out</span>
    </v-btn>

    <v-btn v-if="!isAuthenticated" to="/signup" text>
        <span>Signup</span>
    </v-btn>

    <v-btn v-if="!isAuthenticated" to="/login" text>
        <span>Login</span>
    </v-btn>
    
    <v-btn to="/about" text>
        <span>About US</span>
    </v-btn>
      
    </v-app-bar>
</template>
<script>
// @ is an alias to /src
// import store from '@/actions/store'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Nav',
  computed: {
      ...mapGetters([
        'isAuthenticated',
      ])
  },
  methods:{
      ...mapActions([
          'logout'
      ]),
      logoutUser(e){
        e.preventDefault();
        this.logout()
      }
  }
}
</script>
<style scoped>
    #title {
        font-family: 'Rochester', cursive;
        font-size: 35px;
    }
</style>