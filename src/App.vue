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


export default {
  name: 'App',

  components: {
    Nav,
  },  
  data: () => ({
    // rooms: []
  }),
  created() {
    // console.log(fakeData)
  },

};
</script>
