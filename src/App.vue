<template>
  <v-app>
    <Nav />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Nav from '@/components/layout/Nav';
import { mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    Nav,
  },  
  created(){
    this.fetchData();
  },
  methods: {                                   // Add this:
    ...mapActions([                  // Add this
      'fetchRooms'
    ]),
    fetchData: function() {    // Add this
      this.fetchRooms()
    }
  }
};
</script>
