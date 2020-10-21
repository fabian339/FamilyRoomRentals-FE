<template>
  <v-container>
    <v-row class="text-center" style="margin-top: -20px;">
      <v-col
        md="4"
      > 
        <h2 id="userName">{{this.$store.getters.currentUser.fName}} {{this.$store.getters.currentUser.lName}}</h2>
        <Profile style="margin-top: 15px;"/>
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

        <h2 v-if="currentUserRooms.length === 0" style="margin-top: 15px; margin-bottom: 20px;" >Welcome, Your Rooms will be here!</h2>
      <!-- v-if="currentUserRooms.length === 0" -->
        <v-row v-else class="text-center" justify="center" style="margin-bottom: -5px;">
          <v-radio-group v-model="filterBy" row>
              <div style="display: flex;">
                <v-radio 
                  v-for="(item, index) in ['All Rooms', 'Active Rooms', 'Rented Rooms']" :key="index - 20"
                  color="pink" 
                  style="margin: auto 10px;" 
                  :label="item" 
                  @click.stop="radioClick(index)" 
                  :value="item">
                </v-radio> 
              </div>
          </v-radio-group>
        </v-row>
        <v-container id="roomsContainer" v-if="!isContentLoading">
          <v-row no-gutters>
            <v-col
              class="mb-8"
              cols="16"
              v-for="item in !filter ? currentUserRooms : filteredUserRooms" :key="item.street1"
            >
              <Room :roomData="item" />
          </v-col>
        </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
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
      filter: false,
      filterBy: 'All Rooms',
      filteredUserRooms: []
    }
  },
  created(){
  },
  methods:{
    radioClick(index){
      if(index === 0) this.filter = false
      else {
        if(index === 1) this.filteredUserRooms = this.currentUserRooms.filter(room => room.rented === false)
        if(index === 2) this.filteredUserRooms = this.currentUserRooms.filter(room => room.rented === true)
        this.filter = true
      }
    },

  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
  .selector{
    width: 30%;
    margin: 10px 35% -30px 35%;  
    border: 5px solid seagreen;
    height: 58px;  
    border-radius: 10px;
  }
  #userName{
    font-family: 'DM Serif Display', cursive;
    font-size: 30px;
    /* margin: 7.5px 0px; */
    color: slategrey;
  }

  #roomsContainer{
    background-color: white !important;
    overflow: auto;
    height: 750px;
    margin-top: 10px;
    padding: 0;
  }
</style>