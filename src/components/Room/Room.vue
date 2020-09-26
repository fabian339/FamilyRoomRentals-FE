<template>
  <v-card
    class="mx-auto"
    max-width="350"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      v-bind:src="this.roomData.images[0]"
    >
    <div id="price">
      <v-card-title>${{this.roomData.price}}/month</v-card-title>
    </div>
    </v-img>

    <v-card-subtitle class="pb-0">Location: {{this.roomData.location.city}}, {{this.roomData.location.state}}</v-card-subtitle>

    <v-card-text class="text--primary">
      <p> Publisher: {{this.roomData.ownerFname}} {{this.roomData.ownerLname}}</p>
      <div><strong>{{this.roomData.title.substring(0, 35).toUpperCase()}}...</strong></div>
    </v-card-text>

    <v-card-actions class="justify-center">

    <v-btn class="ma-2" tile color="#556B2F" dark @click="viewRoom">View Room</v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
  // import store from '../store.js'
  import { mapActions } from 'vuex'

  // import axios from 'axios'
  export default {
    name: 'Room',
    props: ['roomData'],
    data: () => ({
    }),
    created() {
  },
  methods: {
    ...mapActions([
      'setRoom',
    ]),
    viewRoom() {
      this.setRoom(this.roomData.objectId)
      this.$router.push(`room/${this.roomData.objectId}`)
    }
    // getCountry(code, countryN){
    //   axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`)
    //     .then(res => {
    //       const { } = res.data;
         
    //     })
    //     .catch(err => console.log(err));
    //   }
    }   
  }
</script>

<style scoped>
  #price{
    width: 45%;
    height: 55px;
    background-color: seagreen;
    border-top-right-radius: 15px;
  }
</style>
