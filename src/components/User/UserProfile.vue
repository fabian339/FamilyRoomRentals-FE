<template>
    <v-row class="text-center">
      <v-col
        md="4"
      >
        <Profile style="margin: 60px auto;"/>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <SuccessAlert v-if="isNotificationDeleted" msg="Notification Successfully Deleted!" />
        <SuccessAlert v-if="isUserUpdated" msg="User data successfully updated!" />
        <SuccessAlert v-if="isPasswordResetEmailSent" msg="Email sent successfully!" />
        <h2>{{currentUserRooms.length > 0 ? 'Your Rooms:' : 'No Rooms Yet!'}}</h2>
        <v-progress-circular
          v-if="isContentLoading"
          color="green"
          :size="100"
          :width="15"
          indeterminate
        ></v-progress-circular>
        <v-container style="background-color: white !important;" v-if="!isContentLoading" class="grey lighten-5">
          <v-row no-gutters>
            <v-col
              style="margin: 10px auto"  
              md="6"
              v-for="item in currentUserRooms" :key="item.street1"
            >
              <Room :roomData="item" />
          </v-col>
        </v-row>
      </v-container>
      </v-col>
    </v-row>

</template>

<script>
// @ is an alias to /src
// import store from '@/actions/store'
import Room from '@/components/Room/Room.vue'
import Profile from '@/components/User/Profile.vue'
import SuccessAlert from '@/components/notification/SuccessAlert.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'UserProfile',
    components: {
    Room,
    SuccessAlert,
    Profile
  },
  computed: {
      ...mapGetters([
        'currentUser',
        'isContentLoading',
        'currentUserRooms',
        'isNotificationDeleted',
        'isUserUpdated',
        'isPasswordResetEmailSent'
      ])
  },
  data(){
    return {
    }
  },
  created(){
  },
  methods:{


  }
}
</script>