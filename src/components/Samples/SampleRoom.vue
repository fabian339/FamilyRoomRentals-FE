<template>
  <v-card
    class="mx-auto"
    max-width="350"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      v-bind:src="this.roomData.image"
    >
      <v-spacer></v-spacer>
      <div id="price">
        <v-card-title>$700/month</v-card-title>
      </div>
    </v-img>
    <v-card-subtitle class="pb-0 font">Location: {{this.roomData.location}}</v-card-subtitle>

    <v-card-text class="text--primary font" style="margin-bottom: -30px;">
      <p> Publisher: Author Name</p>
      <p class="font text-center" style="font-size: 20px;"><strong>{{this.roomData.title.substring(0, 24).toUpperCase()}}...</strong></p>
    </v-card-text>

    <v-card-actions class="justify-center">

    <v-btn class="ma-2" tile color="#556B2F" dark>View Room</v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
  // import store from '../store.js'

  // import axios from 'axios'
  export default {
    name: 'Room',
    props: ['roomData'],
    data: () => ({
    }),
    created() {
  },  
}
</script>

<style scoped>
  #price{
    width: 45%;
    height: 55px;
    background-color: seagreen;
    border-top-right-radius: 15px;
    /* margin: 110px auto; */
  }
  #rented{
    margin: 0px 0px 90px 195px;
    background-color: goldenrod;
    width: 45%;
    height: 55px;
    border-bottom-left-radius: 15px;
    justify-content: center;
  }
</style>
