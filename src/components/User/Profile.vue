<template>
  <v-card
    max-width="375"
    class="mx-auto"
  >
    <v-img
      :src="currentUser.userPhoto"
      height="300px"
      dark
    >
      <v-row class="fill-height">
        <v-card-title>
          <v-btn dark icon>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn dark icon class="mr-4">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn dark icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>

        <v-spacer></v-spacer>

        <v-card-title class="white--text pl-12 pt-12">
          <div class="display-1 pl-12 pt-12">{{currentUser.fName}} {{currentUser.lName}}</div>
        </v-card-title>
      </v-row>
    </v-img>

    <v-list two-line>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-phone</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{currentUser.phone ? currentUser.phone : 'no phone number'}}</v-list-item-title>
          <v-list-item-subtitle>Cell/Mobile</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-message-text</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-email</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{currentUser.email}}</v-list-item-title>
          <v-list-item-subtitle>Personal/Work</v-list-item-subtitle>
        </v-list-item-content>
        
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">?</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Yes</v-list-item-title>
          <v-list-item-subtitle>Receive messages about rooms to this email?</v-list-item-subtitle>
        </v-list-item-content>
        
      </v-list-item>

      <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{currentUser.username}}</v-list-item-title>
            <v-list-item-subtitle>Username</v-list-item-subtitle>
          </v-list-item-content>
      </v-list-item>


      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-lock</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>({{currentUserRooms.length}})</v-list-item-title>
          <v-list-item-subtitle>Active Rooms</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
// @ is an alias to /src
// import store from '@/actions/store'
// import Room from '@/components/Room/Room.vue'
// import Profile from '@/components/User/Profile.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'UserProfile',
  computed: {
      ...mapGetters([
        'currentUser',
        'currentUserRooms',
        'isUserLoading'
      ])
  },
  data(){
    return {
      // myRooms: []
    }
  },
  created(){
    // const { objectId } = this.currentUser;
    // this.myRooms = this.contentRooms.filter(room => room.ownerId === objectId);
  },
  methods:{
    //   ...mapActions([
    //       'logout'
    //   ]),
    //   logoutUser(e){
    //     e.preventDefault();
    //     this.logout()
    //     this.$router.push("/")
    //   }

  }
}
</script>