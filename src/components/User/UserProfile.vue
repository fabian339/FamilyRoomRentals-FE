<template>
  <div>
    <PageLoading  
      v-model="isPageLoading" 
      :component="{
          seconds: 2000,
          type: 'user',
          color: ''
      }"
    />
    <v-container v-if="!isPageLoading">
      <v-row class="text-center" style="margin-top: -20px;">
        <v-col
          md="4"
        > 
          <h2 id="userName">{{this.$store.getters.currentUser.fName}} {{this.$store.getters.currentUser.lName}}</h2>
          <Profile style="margin-top: 10px;"/>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <Alert 
            v-model="isRoomDeleted"
            :component="{
              type: 'success',
              message: 'Property removed Successfully!',
              mutation: 'roomDeleted'
            }" 
          />

          <Alert 
            v-model="wasOfferCanceled"
            :component="{
              type: 'success',
              message: 'Offer canceled Successfully!',
              mutation: 'offerCanceled'
            }" 
          />
          <!-- viewing user meetings -->
          <div  v-if="meetings.length === 0">
            <h2 style="margin-bottom: 20px; margin-top: 10px" >Welcome, Your Meetings will be here:</h2>   
            <v-container>
            <div style="padding: 10px 95px">
              <p class="font" style="color: #50542d">
                  <strong>
                    These meetings are samples, once you have real meetings this section will 
                    disappear and show your actual meetings.
                  </strong>
              </p>
            </div>
              <v-row no-gutters class="text-center" justify="center">
                  <SampleMeeting :meetingData="{
                          mainText: 'This is an example meeting, CLICK HERE for details.',
                          image: 'https://res.cloudinary.com/dr4l6xat9/image/upload/v1615680635/FamilyRoomRentalsGlobal/sample-room-images/image-1.jpg',
                        }" 
                  />

                  <SampleMeeting :meetingData="{
                          mainText: 'This is another example meeting, CLICK HERE for details.',
                          image: 'https://res.cloudinary.com/dr4l6xat9/image/upload/v1615680632/FamilyRoomRentalsGlobal/sample-room-images/image-2.jpg',
                        }" 
                  />
              </v-row>
            </v-container>
          </div>
          <div v-else>
            <h2 style="margin-bottom: 20px; margin-top: 10px" >Your Meetings:</h2>   
            <v-row >
              <v-col v-for="meeting in meetings" :key="meeting.createdAt">
                <div v-if="!meeting.offerCompleted">
                  <Meeting :meetingData="{
                      ownerName: meeting.ownerName,
                      ownerId: meeting.receiverId,
                      clientName: meeting.clientName,
                      roomId: meeting.roomId,
                      meetingId: meeting.objectId,
                      cancelationDate: meeting.cancelationDate,
                      meetingScheduled: meeting.meetingScheduled,
                      offerCompletedDate: meeting.offerCompletedDate,
                      processCanceledByClient: meeting.processCanceledByClient,
                      processCanceledByOwner: meeting.processCanceledByOwner,
                      didClientSubmittedResults: meeting.didClientSubmittedResults,
                      didOwnerSubmittedResults: meeting.didOwnerSubmittedResults,
                      offerCompleted: meeting.offerCompleted,
                      ownerCompletedFollowup: meeting.ownerCompletedFollowup,
                      clientCompletedFollowup: meeting.clientCompletedFollowup,
                      meetingResultsReviewed: meeting.meetingResultsReviewed,
                      ownerShouldReceiveReward: meeting.ownerShouldReceiveReward,
                      ownerRewarded: meeting.ownerRewarded,
                      ownerReward: meeting.ownerReward,
                      rewardSentToOwner: meeting.rewardSentToOwner,
                      ownerRewardExpirationDate: meeting.ownerRewardExpirationDate,
                      clientWillMoveIn: meeting.clientWillMoveIn,
                      ownerPaymentInformationProvided: meeting.ownerPaymentInformationProvided,
                      meetingDeletionDate: meeting.meetingDeletionDate,
                      didMeetingPassed: meeting.didMeetingPassed,
                      ownerCheckedInMeeting: meeting.ownerCheckedInMeeting,
                      clientCheckedInMeeting: meeting.clientCheckedInMeeting,
                      image: meeting.roomImage,
                      meetingDate: meeting.officialMeetingDate,
                      meetingLocation: meeting.meetingLocation
                    }" 
                  />
                </div>
              </v-col>
            </v-row>
          </div>
          <!-- viewing user rooms -->
          <div v-if="currentUserRooms.length === 0">
            <h2 style="margin-top: 15px; margin-bottom: 20px;" >Welcome, Your Rooms will be here!</h2>       
            <v-container>
              <div style="padding: 10px 95px">
                <p class="font" style="color: #50542d">
                    <strong>
                      These Properties are samples, once you share real properties, this section will 
                      disappear and show the actual data.
                    </strong>
                </p>
              </div>
              <v-row no-gutters>
                <v-col
                  class="mb-8"
                  cols="16"
                >
                  <SampleRoom :roomData="{
                      image: 'https://res.cloudinary.com/dr4l6xat9/image/upload/v1615680635/FamilyRoomRentalsGlobal/sample-room-images/image-1.jpg',
                      title: 'Excellent Property in the area of Raleigh, North Carolina',
                      location: 'Raleigh, North Carolina'
                    }" 
                  />
                </v-col>
                <v-col
                  class="mb-8"
                  cols="16"
                >
                  <SampleRoom :roomData="{
                      image: 'https://res.cloudinary.com/dr4l6xat9/image/upload/v1615680632/FamilyRoomRentalsGlobal/sample-room-images/image-2.jpg',
                      title: 'Brand New Room in the area of Wayne, New Jersey',
                      location: 'Wayne, New Jersey'
                    }" 
                  />
              </v-col>
              </v-row>
            </v-container>
          </div>
          <div v-else>
            <h2 style="margin-top: 15px;" >Your Properties:</h2>       
            <v-row class="text-center" justify="center" style="margin-bottom: -5px;">
              <v-radio-group v-model="filterBy" row>
                  <div style="display: flex;">
                    <v-radio 
                      v-for="(item, index) in ['All Rooms', 'Active Rooms', 'Rented Rooms', 'Disabled Rooms']" :key="index - 20"
                      color="pink" 
                      style="margin: auto 10px;" 
                      :label="item" 
                      @click.stop="radioClick(index)" 
                      :value="item">
                    </v-radio> 
                  </div>
              </v-radio-group>
            </v-row>
            <v-container id="roomsContainer">
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
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import store from '@/actions/store'
import Room from '@/components/Room/Room.vue'
import Profile from '@/components/User/Profile.vue'
import Alert from '@/components/Alert/Alert.vue'
import Meeting from '@/components/Meeting/Meeting.vue'
import SampleMeeting from '@/components/Samples/SampleMeeting.vue'
import SampleRoom from '@/components/Samples/SampleRoom.vue'
import PageLoading from '@/components/Loading/PageLoading.vue';

import { mapGetters } from 'vuex'

export default {
  name: 'UserProfile',
  components: {
    Room,
    Alert,
    Profile,
    Meeting,
    SampleMeeting,
    SampleRoom,
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