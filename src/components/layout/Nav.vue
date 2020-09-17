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

    <div v-if="isAuthenticated" class="text-center">
        <v-menu open-on-hover top offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div
                v-bind="attrs"
                v-on="on"
                >
                    <v-badge
                        :content="currentUserNotifications.filter((item) => item.readByReceiver === false).length"
                        color="green"  
                        overlap 
                    >
                        <v-icon large>mdi-email</v-icon>
                    </v-badge>
              </div>
            </template>

            <v-list>
                <v-list-item
                    v-for="(item, index) in currentUserNotifications"
                    :key="index"
                    @click="openNotificationDialog"
                >
                    <v-list-item-avatar>
                        <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>Recent Messages</v-list-item-title>
                        <v-list-item-subtitle v-html="item.message.substring(0, 20) + '...'"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                
            </v-list>
             <v-divider inset></v-divider>
        </v-menu>
    </div>

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
        'currentUserNotifications',
      ])
  },
  data: () => ({
    }),
    methods:{
        ...mapActions([
            'logout'
        ]),
        logoutUser(e){
            e.preventDefault();
            this.logout()
        },
        openNotificationDialog(){
            
        }
    },
}
</script>
<style scoped>
    #title {
        font-family: 'Rochester', cursive;
        font-size: 35px;
    }
</style>