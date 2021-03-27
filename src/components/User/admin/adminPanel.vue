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
          md="12"
        > 
          <h1 style="margin: 30px; color: #44716f;">Current Meetings</h1>
          <v-data-table
              :headers="meetingHeaders()"
              :items="meetings"
              :items-per-page="5"
              class="elevation-1"
              dark
          >
            <!-- <template v-slot:top>
              <v-switch
                label="Single select"
                class="pa-3"
              ></v-switch>
            </template> -->
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="openMeeting(item)"
              >
                mdi-eye
              </v-icon>
            </template>
            <template v-slot:item.objectId="{ item }">
              <v-chip
                :color="getMeetingColor(item)"
              >
                {{ item.objectId }}
              </v-chip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row class="text-center" justify="center" style="margin-top: -20px;">
        <v-col
          md="12"
        > 
          <h1 style="margin: 30px; color: #44716f;">Offers</h1>
          <v-data-table
              :headers="offerHeaders()"
              :items="currentUserOffers"
              :items-per-page="5"
              class="elevation-1"
              dark
          >
            <template v-slot:item.objectId="{ item }">
              <v-chip
                :color="getOfferColor(item)"
              >
                {{ item.objectId }}
              </v-chip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PageLoading from '@/components/Loading/PageLoading.vue';

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'UserProfile',
  components: {
    PageLoading
  },
  computed: {
      ...mapGetters([
        'meetings',
        'currentUserOffers'
      ])
  },
  data(){
    return {
      viewMeeting: false,
      meetingExpanded: false,
      filterBy: 'All Rooms',
      filteredUserRooms: [],
      isPageLoading: false
    }
  },
  created(){
    this.isPageLoading = true;
      // this.headers = [{text: 'Actions', value: 'actions'}, {text: 'objectId', value: 'objectId'}]

  },
  methods:{
    ...mapMutations([
      "SET_OFFER"
    ]),
    getOfferColor(item){
      if(item.offerAcceptedByOwner) return 'green'
      if(item.offerRejectedByOwner) return 'red'
    },
    getMeetingColor(item) {
      var color = ''
      if(!item.offerCompleted){
        if(!item.processCanceledByClient && !item.processCanceledByOwner){
          if(item.didMeetingPassed){
            // if meeting passed and both parties checked-in
            if(item.ownerCheckedInMeeting && item.clientCheckedInMeeting){
              color = 'green'
            } else {
              color = 'orange'
            }
          }
        } else {
          color = 'red'
        }
      } else {
        color = 'blue'
      }
      return color
    },
    openMeeting(item){
      this.SET_OFFER(item)
      this.viewMeeting = true;
    },
    deleteItem (item) {
        console.log("deliting: ", item)
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      // this.dialogDelete = true
    },
    meetingHeaders(){
      return [
        {text: 'View', value: 'actions', align: 'center'}, 
        {text: 'ID', value: 'objectId', align: 'center'}, 
        {text: 'Meeting Passed', value: 'didMeetingPassed', align: 'center'},
        {text: 'Client C-I', value: 'clientCheckedInMeeting', align: 'center'},
        {text: 'Owner C-I', value: 'ownerCheckedInMeeting', align: 'center'},
        {text: 'Client Cancel', value: 'processCanceledByClient', align: 'center'},
        {text: 'Owner Cancel', value: 'processCanceledByOwner', align: 'center'},
        {text: 'Meeting Completed', value: 'offerCompleted', align: 'center'},
      ]
    },
    offerHeaders(){
      return [
        {text: 'ID', value: 'objectId', align: 'center'}, 
        {text: 'Owner Accepted', value: 'offerAcceptedByOwner', align: 'center'},
        {text: 'Owner Rejected', value: 'offerRejectedByOwner', align: 'center'},
        {text: 'Owner C-I', value: 'ownerCheckedInMeeting', align: 'center'},
        {text: 'Date Accepted', value: 'offerAcceptedDate', align: 'center'},

      ]
    },
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