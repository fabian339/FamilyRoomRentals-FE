<template>
  <v-container>
    <ContentLoading v-if="isContentLoading"/>
    <v-row class="text-center" v-if="!isContentLoading">
      <div class="logo" >
        <img :src="require('../../assets/logo.png')" alt="logo" width="400">
      </div>
      <div id="filterContainer">
        <h3>Filter by: </h3>
        <div>
          <v-radio-group v-model="filterBy" row>
              <div id="group">
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
        </div>
      <v-row>
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
        <h2 class="headline font-weight-bold mb-3">
          All Rooms {{filterBy !== "Most Recent" ? `(filter by: ${filterBy})`: ""}}
        </h2>
        <v-container>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Room from '@/components/Room/Room.vue'
import ContentLoading from '@/components/layout/ContentLoading.vue'

// import store from '@/actions/store'
import { mapGetters } from 'vuex'

export default {
  name: 'ViewAllRooms',
  components: {
    Room,
    ContentLoading
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
    background-color: #c0e4c0;
    border-radius: 15px;
    padding: 10px;
  }

  #group{
    display: inline-flex;
    justify-content: center;
    width: 100%;
    margin: 0px 0px -25px 0px;
  }

</style>
