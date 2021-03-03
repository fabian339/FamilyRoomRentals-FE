<template>
  <div>
    <PageLoading  
      v-model="isPageLoading" 
      :component="{
        seconds: 1500,
        type: 'content',
        color: ''
      }"
    />

    <v-container v-if="!isPageLoading">
      <v-row class="text-center" justify="center">
        <div class="logo" >
          <img :src="require('../../config.json').imgLinks.logo" alt="logo" width="400">
        </div>
      </v-row>
        <SuccessAlert v-if="isUserDeleted" msg="User successfully deleted, we are sorry to see you go. Please come back soon!" />
        <v-row no-gutters class="text-center">
          <v-col class="element1">
            <div style="width: 340px;margin: auto;">
              <h1 style="font-size: 60px">Focus on what you can afford</h1>
              <p class="font"> 
                Why haven't you look at other options? Maybe all you need is a temporary place
                to stay until you get back on your feets.
                FamilyRoomRents allows you to find an affordable place by placing property offers that 
                best fit your budget, will not make the situation harder, and will not bring more stress. 
              </p>
            </div>
          </v-col>
          <v-col class="element2">
              <img style="margin: 10px" src="https://i.ibb.co/QFj0vhM/homepage-conv.jpg" alt="homepage-conv" width="360" height="480">
          </v-col>
        </v-row>
        <v-row no-gutters class="text-center">
          <v-col class="element3">
            <div style="width: 380px;margin: auto;">
              <h1 style="font-size: 60px">How it Works?</h1>
              <p class="font"> Simply look for a property of your interest, make an affordable offer, 
                then wait for a meeting date to see the property. And just like that you could be finding
                your new home!
              </p>
            </div>
          </v-col>
          <v-col class="element4">
            <div style="margin-top: 5%;">
              <h2> Sending Offers</h2>
              <!-- <iframe style="border: 2px solid;" src="https://streamable.com/e/geigaz" width="350" height="200" frameborder="0" allowfullscreen></iframe>             -->
            </div>
        </v-col>
        </v-row>
        <v-col
          class="mb-5"
          cols="12"
        >
          <h1 class="text-center font-weight-bold mb-3">
            Recently Shared
          </h1>
          <v-container id="roomsContainer" >
            <v-row>
              <v-col
                v-for="item in contentRooms.slice(0,3)" :key="item.street1"
              >
                  <Room :roomData="item"/>
              </v-col>
            </v-row>
          </v-container>

            <v-row justify="center">
              <a class="subheading mx-3" href="/#/rooms">
                View More...
              </a>
            </v-row>
          </v-col>
        <v-row no-gutters class="text-center">
          <v-col class="element5">
            <div style="width: 365px;margin: 25px auto;">
              <h1 style="font-size: 60px">Our Mission</h1>
                <p class="font"> 
                  FamilyRoomRents main's focus is to connect individuls with common needs at an affordable price.
                  We service people who are in the need of moving but cannot afford big bills as renting an appartment 
                  or house is not cheap and could result in big debts.. 
                </p>
            </div>
          </v-col>
          <v-col class="element6">
                <v-card class="mx-auto" width="450" height="215px" color="#d5efe6" style="margin-top: 50px;">
                  <v-row class="text-center" justify="center">
                    <v-card-text>Looking for a tenant? Register and share your room now!!</v-card-text>
                    <v-btn color="#fd9bf5ba" to="/signup">register</v-btn>
                    <v-card-text>Looking for a room? Start sending offers now!!</v-card-text>
                    <v-btn color="#ffbc00" @click.stop="selectRandomRoom">view ramdom room</v-btn>
                  </v-row>
                </v-card>
          </v-col>
        </v-row>
        <v-col
          class="mb-5"
          cols="12"
        >
          <!-- date -->
          <MeetingsCalendar />
        </v-col>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Room from '@/components/Room/Room.vue'
// import store from '@/actions/store'
import { mapGetters, mapMutations } from 'vuex'
import SuccessAlert from '@/components/notification/SuccessAlert.vue'
import PageLoading from '@/components/Loading/PageLoading.vue';
import MeetingsCalendar from '@/components/notification/MeetingsCalendar.vue';

// const config = require('./config.json')
export default {
  name: 'Home',
  components: {
    Room,
    SuccessAlert,
    PageLoading,
    MeetingsCalendar
  },
  data: () => ({
    isPageLoading: false,
  }),
  computed: {
      ...mapGetters([
        'contentRooms',
        'isUserDeleted'
      ])
  },
  created(){
    console.log("Entering Route")
    this.isPageLoading = true
    // next()
  },
  methods:{
    ...mapMutations([
      'SET_ROOM',
    ]),
    selectRandomRoom(){
      const index = Math.floor(Math.random() * Math.floor(this.contentRooms.length));
      this.SET_ROOM(this.contentRooms[index])
      this.$router.push(`room/${this.contentRooms[index].objectId}`)
    }
  }
}
</script>

<style scoped>
  .element1 {
    /* width: 365px; */
    height: 500px;
    position: relative;
    margin: 20px 0px;
    padding: 15px;
    border-right: 10px solid #3CB371;
    animation: mymove1 3s normal forwards ease-in-out;
  }

  .element3 {
    width: 365px;
    height: 370px;
    position: relative;
    margin: 0px -3px;
    /* padding: 15px; */
    /* border-right: 10px solid darkslateblue; */
    /* animation: mymove1 3s normal forwards ease-in-out; */
  }
    .element5 {
    /* width: 365px; */
    height: 300px;
    /* position: relative;
    margin: 10px -3px; */
    /* padding: 15px; */
    /* border-right: 10px solid darkslateblue; */
    /* animation: mymove1 3s normal forwards ease-in-out; */
  }

  @keyframes mymove1 {
    from {left: -50%;}
    to {left: -1.5%;}
  }

 .element6 {
    /* width: 365px; */
    height: 300px;
    /* position: relative;
    margin: 10px 3px; */
    /* border-left: 10px solid darkslateblue; */
    /* animation: mymove2 3s normal forwards ease-in-out; */
  }
 .element4 {
    margin: 0px -3px;
    /* border: 2px solid; */
    /* border-left: 10px solid darkslateblue; */
    /* animation: mymove2 3s normal forwards ease-in-out; */
    /* border: 2px solid; */
    width: 365px;
    height: 370px;
    position: relative;
  }

  .element2 {
    width: 365px;
    height: 500px;
    position: relative;
    margin: 20px 0px;
    border-left: 10px solid #3CB371;
    animation: mymove2 3s normal forwards ease-in-out;
  }

   #roomsContainer{
    /* overflow: auto; */
    /* height: 600px; */
  }

  @keyframes mymove2 {
    from {left: 50%;}
    to {left: -1.5%;}
  }
</style>
