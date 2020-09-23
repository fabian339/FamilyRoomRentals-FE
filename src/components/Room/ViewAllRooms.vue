<template>
  <v-container>
    <v-row class="text-center">
      <div id="logo" >
        <img style="margin: 10px" :src="require('../../assets/logo.png')" alt="logo" width="400">
      </div>
      <v-col
        class="mb-5"
        cols="12"
         style="marginTop: -30px"
      >
      <div id="filterContainer">
        <h3>Filter by: </h3>
        <v-radio-group v-model="radios" style="display: contents; margin: -10px 20px;">
          <v-radio style="margin: auto 10px;" label="Most Recent" value="radio-1"></v-radio>
          <v-radio style="margin: auto 10px;" label="Price" value="radio-2"></v-radio>
          <v-radio style="margin: auto 10px;" label="City" value="radio-1"></v-radio>
          <v-radio style="margin: auto 10px;" label="State" value="radio-1"></v-radio>
          <v-radio style="margin: auto 10px;" label="Zipcode" value="radio-1"></v-radio>
          <v-radio style="margin: auto 10px;" label="No Rules" value="radio-1"></v-radio>
      </v-radio-group>
      </div>
      <h2 class="headline font-weight-bold mb-3">
        All Rooms
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
            v-for="item in contentRooms" :key="item.street1"
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

export default {
  name: 'Home',
  components: {
    Room
  },
  computed: {
      ...mapGetters([
        'contentRooms',
        'isContentLoading'
      ])
  },
  data() {
    return{ radios: 'radio-1'}
  },
}
</script>

<style scoped>
  #logo {
    width: 100%;
    height: 190px;
    margin-top: -25px;
  }

  #filterContainer{
    height: 80px;
    margin: 30px 20%;
    width: 60%;
    background-color: yellowgreen;
    /* margin: 25px; */
    border-radius: 15px;
    padding: 10px;
  }
</style>
