<template>
  <div>
    <PageLoading  
      v-model="isPageLoading" 
      :component="{
          seconds: 2000,
          type: 'admin',
          color: ''
      }"
    />
    <v-container v-if="!isPageLoading">
      <v-row class="text-center" justify="center" style="margin-top: -20px;">
        <v-col
          md="8"
        > 
          <h1>Meetings</h1>
          <table v-for="meeting in meetings" :key="meeting.createdAt">
            <thead>
                <tr>
                    <th colspan="2" v-for="propName in Object.getOwnPropertyNames(meeting)" :key="propName">{{propName}}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-for="value in Object.values(meeting)" :key="value">{{value}}</td>
                </tr>
            </tbody>
        </table>
        <!-- <div v-for="meeting in meetings" :key="meeting.createdAt"> -->
            <!-- <v-data-table
                v-if="meetings && meetings.length > 0"
                :headers="Object.getOwnPropertyNames(meetings)"
                :items="meetings"
                :items-per-page="5"
                class="elevation-1"
            ></v-data-table> -->
        <!-- </div> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import store from '@/actions/store'
// import Room from '@/components/Room/Room.vue'
// import Profile from '@/components/User/Profile.vue'
// import Alert from '@/components/Alert/Alert.vue'
// import Meeting from '@/components/Meeting/Meeting.vue'
// import SampleMeeting from '@/components/Samples/SampleMeeting.vue'
// import SampleRoom from '@/components/Samples/SampleRoom.vue'
import PageLoading from '@/components/Loading/PageLoading.vue';

import { mapGetters } from 'vuex'

export default {
  name: 'UserProfile',
  components: {
    // Room,
    // Alert,
    // Profile,
    // Meeting,
    // SampleMeeting,
    // SampleRoom,
    PageLoading
  },
  computed: {
      ...mapGetters([
        'currentUserRooms',
        'isPasswordResetEmailSent',
        'isRoomDeleted',
        'meetings',
        'isRoomDeleted',
        'wasOfferCanceled'
      ])
  },
  data(){
    return {
      data: [],
      heater: [],
      filter: false,
      meetingExpanded: false,
      filterBy: 'All Rooms',
      filteredUserRooms: [],
      isPageLoading: false
    }
  },

  created(){
    this.isPageLoading = true
  },
  methods:{
    radioClick(index){
      if(index === 0) this.filter = false
      else {
        if(index === 1) this.filteredUserRooms = this.currentUserRooms.filter(room => !room.rented && !room.disabled && !room.lockedByAdmin)
        if(index === 2) this.filteredUserRooms = this.currentUserRooms.filter(room => room.rented)
        if(index === 3) this.filteredUserRooms = this.currentUserRooms.filter(room => room.disabled || room.lockedByAdmin)
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
    margin-top: 5px;
    color: slategrey;
  }

  #roomsContainer{
    background-color: white !important;
    overflow: auto;
    height: 400px;
    margin-top: 10px;
    padding: 0;
  }
</style>