<template>
  <v-container>
    <v-row class="text-center">
      <div id="logo" >
        <img style="margin: 10px" :src="require('./../assets/logo.png')" alt="logo" width="400">
      </div>
      <v-row style="height: 450px">
        <!-- <v-col
          md="6"
          id="triangle-right"
        > -->
        <div class="element">
          <p>kjnfwekjlfnjk</p>
        </div>
        <!-- </v-col>
        <v-col
          cols="12"
          md="6"
        >
      </v-col> -->
      </v-row>
      <v-col
        class="mb-5"
        cols="12"
      >
      <SuccessAlert v-if="isUserDeleted" msg="User successfully deleted, we are sorry to see you go. Please come back soon!" />
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
      <v-container v-if="!isContentLoading" class="grey lighten-5">
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
  #logo {
    width: 100%;
    height: 190px;
    margin-top: -25px;
  }

.element {
  width: 100px;
  height: 100px;
  background: red;
  position: relative;
  margin: 20px;
  animation: mymove 5s infinite;
}

@keyframes mymove {
  from {left: 40%;}
  to {left: 80%;}
}
</style>
