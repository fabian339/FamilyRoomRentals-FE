<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <div class="logo" >
        <img src="https://i.ibb.co/DrcHFyW/logo.png" alt="logo" width="400">
      </div>
    </v-row>
      <SuccessAlert v-if="isUserDeleted" msg="User successfully deleted, we are sorry to see you go. Please come back soon!" />
      <v-row no-gutters class="text-center">
        <v-col class="element1">
          <div style="width: 365px;margin: 25px auto;">
            <h1 style="font-size: 60px">Focus on what you can afford</h1>
            <p class="font"> We service those who are in the need of moving but cannot afford big bills. 
              Renting an appartment or house is not cheap and could result in big debts.
              FamilyRoomRents allows you to find an accomodate place by placing an offer that 
              best fit your budget, will not make the situation harder, and will not bring more stress. 
            </p>
          </div>
        </v-col>
        <v-col class="element2">
            <img style="margin: 10px" :src="require('./../assets/conversation.png')" alt="conversation" width="325" height="490">
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col class="element3">
          <div style="width: 365px;margin: 25px auto;">
            <h1 style="font-size: 60px">How it Works?</h1>
            <p class="font"> Simply look for a property of your interest, make an affordable offer, 
              then wait for a meeting date to see the property. And just like that you could be finding
              your new home!
            </p>
          </div>
        </v-col>
        <v-col class="element4">
          <div style="margin: 60px; width:400px; height: 200px; border: 2px solid">
            <!-- <video width="400" controls>
                <source type="video/mp4" :src="require('./../assets/test.mp4')" />
            </video> -->
          </div>
       </v-col>
      </v-row>
      <v-col
        class="mb-5"
        cols="12"
      >
        <h1 class="text-center font-weight-bold mb-3">
          Recent Rooms
        </h1>
        <!-- <v-progress-circular
          v-if="isContentLoading"
          color="green"
          :size="100"
          :width="15"
          indeterminate
        ></v-progress-circular> -->
        <v-container id="roomsContainer" v-if="!isContentLoading">
          <v-row no-gutters>
            <v-col
              class="mb-8"
              cols="16"
              v-for="item in contentRooms.slice(0,3)" :key="item.street1"
              >
                <Room :roomData=item v-if="!item.rented || new Date() < new Date(new Date(item.rentedDate).setDate(new Date(item.rentedDate).getDate() + 2))"/>
            </v-col>
          </v-row>
        </v-container>

          <v-row justify="center">
            <a class="subheading mx-3" href="/#/rooms">
              View More...
            </a>
          </v-row>
        </v-col>
      <v-row class="text-center">
        <v-card class="mx-auto" width="450" height="200px" color="#d5efe6">
          <v-row class="text-center" justify="center">
            <v-card-text>Looking for a tenant? Register and share your room now!!</v-card-text>
            <v-btn color="#fd9bf5ba" to="/signup">register</v-btn>
            <v-card-text>Looking for a room? Start sending offers now!!</v-card-text>
            <v-btn color="#ffbc00" @click.stop="selectRandomRoom">view ramdom room</v-btn>
          </v-row>
        </v-card>
      </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Room from '@/components/Room/Room.vue'
// import store from '@/actions/store'
import { mapGetters, mapMutations } from 'vuex'
import SuccessAlert from '@/components/notification/SuccessAlert.vue'

export default {
  name: 'Home',
  components: {
    Room,
    SuccessAlert
  },
  computed: {
      ...mapGetters([
        'isContentLoading',
        'contentRooms',
        'isUserDeleted'
      ])
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
    width: 365px;
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
    margin: 10px -3px;
    /* padding: 15px; */
    /* border-right: 10px solid darkslateblue; */
    /* animation: mymove1 3s normal forwards ease-in-out; */
  }

  @keyframes mymove1 {
    from {left: -50%;}
    to {left: -1.5%;}
  }

 .element4 {
    width: 365px;
    height: 370px;
    position: relative;
    margin: 10px 3px;
    /* border-left: 10px solid darkslateblue; */
    /* animation: mymove2 3s normal forwards ease-in-out; */
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
