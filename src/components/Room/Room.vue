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
      <div>Whitsunday Island, Whitsunday Islands...</div>
    </v-card-text>

    <v-card-actions class="justify-center">
      <v-btn
        color="#556B2F"
        text
      >
        View Room
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
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
