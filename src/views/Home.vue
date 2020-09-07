<template>
  <v-container>
    <v-row class="text-center">
      <div id="logo" >
        <img style="margin: 10px" :src="require('./../assets/logo.png')" alt="logo" width="400">
      </div>
      <v-col
        class="mb-5"
        cols="12"
      >
      <h2 class="headline font-weight-bold mb-3">
        Recent Rooms
      </h2>
      <v-progress-circular
        v-if="contentState.loadingContent"
        color="green"
        :size="100"
        :width="15"
        indeterminate
      ></v-progress-circular>
      <v-container v-if="!contentState.loadingContent" class="grey lighten-5">
        <v-row no-gutters>
          <v-col
            class="mb-8"
            cols="16"
            v-for="item in contentState.rooms.slice(0,3)" :key="item.street1"
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
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Room
  },
  computed: {
      ...mapState([
        'contentState',
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
