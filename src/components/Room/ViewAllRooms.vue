<template>
  <v-container>
    <PageLoading  
      v-model="isPageLoading" 
      :component="{
        seconds: 1500,
        type: 'content',
        color: ''
      }"
    />
    <v-row class="text-center" v-if="!isPageLoading">
      <div class="logo" >
        <img :src="require('../../../config.json').imgLinks.logo" alt="logo" width="400">
      </div>
      <div style="width: 100%; margin-bottom: 25px;" v-if="!showFilter && contentRooms.length !== 0">
        <v-btn class="ma-2" color="#355f57" @click.stop="showFilter = true" dark >Filter</v-btn>
      </div>
      <div id="filterContainer" v-if="showFilter && contentRooms.length !== 0">
        <v-btn id="closeBtn" small color="red" @click.stop="showFilter = false" dark >x</v-btn>
        <h3>Filter by: </h3>
        <v-row class="text-center" justify="center">
          <v-radio-group v-model="filterBy" row>
              <div style="display: flex;">
                <v-radio 
                  v-for="(item, index) in filters" :key="index - 20"
                  color="pink" 
                  style="margin: auto 10px;" 
                  :label="item" 
                  @click.stop="radioClick(index)" 
                  :value="item">
                </v-radio> 
              </div>
          </v-radio-group>
        </v-row>
        <v-row style="margin-top: -15px;">
          <v-col cols="4">
            <v-text-field
              label="City"
              @input="onCityChange"
              clearable
              color="#006400"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="State"
              @input="onStateChange"
              clearable
              color="#006400"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Zipcode"
              @input="onZipcodeChange"
              clearable
              color="#006400"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <v-col
        class="mb-5"
        cols="12"
        style="marginTop: -30px"
      >
        <h2 class="headline font-weight-bold mb-3" v-if="contentRooms.length !== 0">
          All Rooms {{filterBy !== "Most Recent" ? `(filtered by: ${filterBy})`: ""}}
        </h2>
        <h2 class="headline font-weight-bold mb-3" style="margin-top: 60px" v-if="contentRooms.length === 0">
          No Properties Available!
        </h2>
        <v-container id="roomsContainer" v-if="contentRooms.length !== 0">
          <v-row v-if="filterBy === 'Most Recent'">
            <v-col
              v-for="(item) in contentRooms" :key="item.street1"
            >
                <Room :roomData="item"/>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col
              v-for="(item) in filteredRooms" :key="item.street1"
            >
                <Room :roomData="item" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Room from '@/components/Room/Room.vue'
import PageLoading from '@/components/Loading/PageLoading.vue';

// import store from '@/actions/store'
import { mapGetters } from 'vuex'

export default {
  name: 'ViewAllRooms',
  components: {
    Room,
    PageLoading
  },
  computed: {
      ...mapGetters([
        'contentRooms',
      ])
  },
  data() {
    return{ 
      filteredRooms: [],
      filters: ["Most Recent", "Price Low to High", "Price High to Low"],
      filterBy: "Most Recent",
      showFilter: false,
      isPageLoading: false
    }
  },
  created(){
    console.log("Entering Route")
    this.isPageLoading = true
    // next()
  },
  methods:{
    radioClick(index){
      if(index === 1) this.filteredRooms = this.contentRooms.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      else if(index === 2) this.filteredRooms = this.contentRooms.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    },
    onCityChange(city){
      this.filterBy = 'City'
      this.filteredRooms = city ? this.contentRooms.filter((room) => room.location.city.toLowerCase().includes(city.toLowerCase())) : [];
      if(city === '' || city === null) this.filterBy = "Most Recent"
      // console.log(city)
    },
    onStateChange(state){
      this.filterBy = 'State'
      this.filteredRooms = state ? this.contentRooms.filter((room) => room.location.state.toLowerCase().includes(state.toLowerCase())) : [];
      if(state === '' || state === null) this.filterBy = "Most Recent"
    },   
    onZipcodeChange(zipcode){
      this.filterBy = 'Zipcode'
      this.filteredRooms = zipcode ? this.contentRooms.filter((room) => room.location.zipCode.includes(zipcode)) : [];
      if(zipcode === '' || zipcode === null) this.filterBy = "Most Recent"
    },
  }
}
</script>

<style scoped>
  #filterContainer{
    margin: 30px 10%;
    width: 80%;
    background-color: #d6d6d6;
    border-radius: 15px;
    padding: 10px;
    position: relative;
  }

  #roomsContainer{
    overflow: auto;
    height: 600px;
  }

  #closeBtn{
    position: absolute;
    top: 0px;
    right: 0;
  }

</style>
