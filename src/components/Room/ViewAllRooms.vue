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
          <v-radio-group v-model="filterBy" row style="margin: 10px 0px -36px 90px;">
          <div v-for="(item, index) in filters" :key="index - 20">
              <v-radio color="pink" style="margin: auto 10px;" :label="item" @click.stop="radioClick(index)" :value="item"></v-radio> 
          </div>
           </v-radio-group>
      <v-row>
      <v-col cols="4">
        <v-text-field
          label="City"
           @input="onCityChange"
           clearable
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          label="State"
          @input="onStateChange"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          label="Zipcode"
          @input="onZipcodeChange"
          clearable
        ></v-text-field>
      </v-col>
      </v-row>
      </div>
      <h2 class="headline font-weight-bold mb-3">
        All Rooms {{filterBy !== "Most Recent" ? `(filter by: ${filterBy})`: ""}}
      </h2>
      <v-progress-circular
        v-if="isContentLoading"
        color="green"
        :size="100"
        :width="15"
        indeterminate
      ></v-progress-circular>
      <v-container v-if="!isContentLoading">
        <v-row no-gutters v-if="filterBy === 'Most Recent'">
          <v-col
            class="mb-8"
            cols="16"
            v-for="(item) in contentRooms" :key="item.street1"
            >
              <Room :roomData=item />
          </v-col>
        </v-row>
        <v-row no-gutters v-else>
          <v-col
            class="mb-8"
            cols="16"
            v-for="(item) in filteredRooms" :key="item.street1"
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
  name: 'ViewAllRooms',
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
    return{ 
      filteredRooms: [],
      filters: ["Most Recent", "Price Low to High", "Price High to Low"],
      filterBy: "Most Recent",
    }
  },
  methods:{
    radioClick(index){
      if(index === 1) this.filteredRooms = this.contentRooms.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      else if(index === 2) this.filteredRooms = this.contentRooms.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    },
    onCityChange(city){
      this.filterBy = 'City'
      this.filteredRooms = this.contentRooms.filter((room) => room.location.city.toLowerCase().includes(city.toLowerCase()));
      if(city === '' || city === null) this.filterBy = "Most Recent"
      console.log(city)
    },
    onStateChange(state){
      this.filterBy = 'State'
      this.filteredRooms = this.contentRooms.filter((room) => room.location.statetoLowerCase().includes(state.toLowerCase()));
      if(state === '' || state === null) this.filterBy = "Most Recent"
    },   
    onZipcodeChange(zipcode){
      this.filterBy = 'Zipcode'
      this.filteredRooms = this.contentRooms.filter((room) => room.location.zipCode.includes(zipcode));
      if(zipcode === '' || zipcode === null) this.filterBy = "Most Recent"
    },
  }
}
</script>

<style scoped>
  #logo {
    width: 100%;
    height: 190px;
    margin-top: -25px;
  }

  #filterContainer{
    margin: 30px 20%;
    width: 60%;
    background-color: darkkhaki;
    border-radius: 15px;
    padding: 10px;
  }
</style>
