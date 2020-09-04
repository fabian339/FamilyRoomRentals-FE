<template>
    <v-row class="text-center">
      <v-col
        cols="12"
        md="8"
      >
        <h1> Welcome {{currentUser.fName}} {{currentUser.lName}}</h1>
        <v-progress-circular
          v-if="isContentLoading"
          color="green"
          :size="100"
          :width="15"
          indeterminate
        ></v-progress-circular>
        <v-container v-if="!isContentLoading" class="grey lighten-5">
          <v-row no-gutters>
            <v-col
              style="margin: 10px auto"  
              md="6"
              v-for="item in myRooms" :key="item.street1"
            >
              <Room :roomData="item" />
          </v-col>
        </v-row>
      </v-container>
      </v-col>
      <v-col
        cols="6"
        md="4"
      >
      <div>My Profile</div>
      </v-col>
    </v-row>

</template>

<script>
// @ is an alias to /src
// import store from '@/actions/store'
import Room from '@/components/Room/Room.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
    components: {
    Room
  },
  computed: {
      ...mapGetters([
        'currentUser',
        'contentRooms',
        'isContentLoading'
      ])
  },
  data(){
    return {
      myRooms: []
    }
  },
  created(){
    const { objectId } = this.currentUser;
    const rooms = this.contentRooms.filter(room => room.ownerId === objectId);
    this.myRooms = rooms;
  },
  methods:{
    //   ...mapActions([
    //       'logout'
    //   ]),
    //   logoutUser(e){
    //     e.preventDefault();
    //     this.logout()
    //     this.$router.push("/")
    //   }

  }
}
</script>