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
      <v-card-title>${{this.roomData.price}}/month</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">Location: {{this.roomData.location.city}}</v-card-subtitle>

    <v-card-text class="text--primary">
      <p> Publisher: Mark Smith</p>
      <div>Description: {{this.roomData.description.substring(0, 50)}}...</div>
    </v-card-text>

    <v-card-actions class="justify-center">

    <v-btn class="ma-2" tile color="#556B2F" dark @click="viewRoom">View Room</v-btn>

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
  methods: {
    viewRoom() {
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

</style>
