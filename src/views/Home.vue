<template>
  <v-container>
    <v-row class="text-center">
      <div class="logo" >
        <img style="margin: 10px;" :src="require('./../assets/logo.png')" alt="logo" width="400">
      </div>
      <v-row no-gutters class="text-center">
        <SuccessAlert v-if="isUserDeleted" msg="User successfully deleted, we are sorry to see you go. Please come back soon!" />
        <v-col class="element1">
          <div style="width: 365px;margin: 25px auto;">
            <h1 style="font-size: 60px">Focus on what you can afford</h1>
            <p class="font"> We service those who are in the need of moving but cannot afford big bills. 
              Renting an appartment or house is not cheap and could result in big debts.
              FamilyRoomRents allows you to find an accomodate place to stay that best fit your budget,
              will not make the situation harder, and will not bring more stress and debt. 
            </p>
          </div>
        </v-col>
        <v-col class="element2">
            <img style="margin: 10px" :src="require('./../assets/conversation.png')" alt="conversation" width="325" height="490">
        </v-col>
      </v-row>
      <v-col
        class="mb-5"
        cols="12"
      >
      <h2 class="headline font-weight-bold mb-3">
        Recent Rooms
      </h2>
      <v-progress-circular
        v-if="isContentLoading"
        color="green"
        :size="100"
        :width="15"
        indeterminate
      ></v-progress-circular>
      <v-container v-if="!isContentLoading">
        <v-row no-gutters>
          <v-col
            class="mb-8"
            cols="16"
            v-for="item in contentRooms.slice(0,3)" :key="item.street1"
            >
              <Room :roomData=item />
          </v-col>
        </v-row>
      </v-container>

        <v-row justify="center">
          <a class="subheading mx-3" href="/#/rooms">
            View More...
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Room from '@/components/Room/Room.vue'
// import store from '@/actions/store'
import { mapGetters } from 'vuex'
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

  @keyframes mymove1 {
    from {left: -50%;}
    to {left: -1.5%;}
  }

  .element2 {
    width: 365px;
    height: 500px;
    position: relative;
    margin: 20px 0px;
    border-left: 10px solid #3CB371;
    animation: mymove2 3s normal forwards ease-in-out;
  }

  @keyframes mymove2 {
    from {left: 50%;}
    to {left: -1.5%;}
  }
</style>
