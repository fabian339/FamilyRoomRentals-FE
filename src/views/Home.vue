<template>
  <v-container>
    <v-row class="text-center">
      <div id="logo" >
        <img :src="require('../assets/logo.svg')" alt="logo" width="150">
      </div>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to FamilyRoomRentals
        </h1>

        <p class="subheading font-weight-regular">
          Money than 50,000 rooms available for occupacy...
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
         style="marginTop: -30px"
      >
        <h2 class="headline font-weight-bold mb-3">
          Latest Rooms:
        </h2>
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col v-for="item in rooms" :key="item.street1">
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

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          What if we know when is the right time to exchange?
        </h2>

        <v-row justify="center">
          <a class="subheading mx-3" >
            Explore More...
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
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Room
  },
  computed: {
      ...mapState([
        'rooms'
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
</style>
