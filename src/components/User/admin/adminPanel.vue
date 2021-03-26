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
              :headers="headers"
              :items="meetings"
              :items-per-page="5"
              class="elevation-1"
              dark
              expand-icon
          >
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
              <v-icon 
                small
                @click="deleteItem(item)"
              >
                mdi-email
              </v-icon>
            </template>
            <template v-slot:item.objectId="{ item }">
              <v-chip
                :color="getColor(item)"
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
      headers: [
        {text: 'Actions', value: 'actions', align: 'center'}, 
        {text: 'objectId', value: 'objectId', align: 'center'}, 
        {text: 'clientName', value: 'clientName', align: 'center'},
        {text: 'clientEmail', value: 'clientEmail', align: 'center'},
        {text: 'ownerEmail', value: 'ownerEmail', align: 'center'},
        {text: 'ownerName', value: 'ownerName', align: 'center'}
      ],
      filter: false,
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
      getColor() {
        return 'green'
      },
      editItem (item) {
           console.log("editing: ", item)
        // this.editedIndex = this.desserts.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        // this.dialog = true
      },

      deleteItem (item) {
          console.log("deliting: ", item)
        // this.editedIndex = this.desserts.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        // this.dialogDelete = true
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