<template>
    <v-row class="text-center" style="margin-top: -20px;">
      <v-col
        md="4"
      >
        <Profile style="margin: 60px auto;"/>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <SuccessAlert v-if="isRoomDeleted" msg="Room Successfully Deleted!" />
        <!-- <h2>No Rooms Yet!</h2> -->
        <v-progress-circular
          v-if="isContentLoading"
          color="green"
          :size="100"
          :width="15"
          indeterminate
        ></v-progress-circular>

        <h2 style="margin: 10px;" v-if="currentUserRooms.length === 0">Welcome, Your Rooms will be here!</h2>
      
        <div v-else class="selector" >
          <v-select
            :items="['All Rooms', 'Active Rooms', 'Rented Rooms']"
            @change="onTabChange"
            solo
            item-color="green"
            color="green"
            value="All Rooms"
           ><span class="white--text">Lorem ipsum</span></v-select>
        </div>
        <v-container style="background-color: white !important; margin: 35px 0px;" v-if="!isContentLoading" class="grey lighten-5">
          <v-row no-gutters>
            <v-col
              style="margin: 10px auto"  
              md="6"
              v-for="item in !filter ? currentUserRooms : filteredUserRooms" :key="item.street1"
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
        'isContentLoading',
        'currentUserRooms',
        'isUserUpdated',
        'isPasswordResetEmailSent',
        'isRoomDeleted'
      ])
  },
  data(){
    return {
      active: false,
      filter: false,
      filteredUserRooms: []
    }
  },
  created(){
  },
  methods:{
    onTabChange(e){
      if(e === "All Rooms") this.filter = false; 
      else{
        if(e == "Active Rooms") this.filteredUserRooms = this.currentUserRooms.filter(room => room.rented === false)
        if(e == "Rented Rooms") this.filteredUserRooms = this.currentUserRooms.filter(room => room.rented === true)
        this.filter = true
      }
      // console.log(e)
    }

  }
}
</script>

<style scoped>
  .selector{
    width: 30%;
    margin: 10px 35% -30px 35%;  
    border: 5px solid seagreen;
    height: 58px;  
    border-radius: 10px;
  }
</style>