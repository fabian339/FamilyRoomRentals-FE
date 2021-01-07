<template>
    <v-container>
        <h2 style="margin-bottom: 20px;" >Upcoming Meetings:</h2>       
        <v-card
            class="mx-auto meetingWrapper"
            max-width="350"
            color="#ccc249"
        >
        <div v-if="!meetingData.expanded" class="circle_holder">

            <div class="top_circle"
                :style="`
                    background-image: url(${meetingData.image ? meetingData.image : 'https://i.ibb.co/t85JhCP/no-Room-Img.png'});
                    background-size: cover
                `"
            >
            </div>
            <div>
                <p class="font text-center" style="font-size: 20px; margin: 25px"><strong>Comming up on {{meetingData.meetingDate.date}} at {{meetingData.meetingDate.time}}.</strong></p>
            </div>
            <!-- <div style="width: 50%">
            <v-img
                style="border-radius: 100%"
                v-bind:src="meetingData.image ? meetingData.image : 'https://i.ibb.co/t85JhCP/no-Room-Img.png'"
            ></v-img>
            </div>
            <v-spacer></v-spacer>

            <p class="font text-center" style="font-size: 20px; margin: 10px"><strong>Comming up on {{meetingData.meetingDate.date}} at {{meetingData.meetingDate.time}}.</strong></p> -->
        </div>
        <!-- <div id="rented" v-if="this.roomData.rented && new Date() < new Date(new Date(this.roomData.rentedDate).setDate(new Date(this.roomData.rentedDate).getDate() + 2))">
            <v-card-title style="justify-content: center;"> Just Rented </v-card-title>
            </div>
            <div id="rented" v-if="this.roomData.rented && new Date() > new Date(new Date(this.roomData.rentedDate).setDate(new Date(this.roomData.rentedDate).getDate() + 2))">
            <v-card-title style="justify-content: center;"> Rented </v-card-title>
            </div>
            <v-spacer></v-spacer>
            <div id="price">
            <v-card-title>${{this.roomData.price}}/month</v-card-title>
            </div>
            </v-img>
            <v-card-subtitle class="pb-0 font">Location: {{this.roomData.location.city}}, {{this.roomData.location.state}}</v-card-subtitle>

            <v-card-text class="text--primary font" style="margin-bottom: -30px;">
            <p> Publisher: {{this.roomData.ownerFname}} {{this.roomData.ownerLname}}</p>
            <p class="font text-center" style="font-size: 20px;"><strong>{{this.roomData.title.substring(0, 24).toUpperCase()}}...</strong></p>
            </v-card-text>

            <v-card-actions class="justify-center">

            <v-btn class="ma-2" tile color="#556B2F" dark @click="viewRoom">View Room</v-btn>

            </v-card-actions> -->
        </v-card>
    </v-container>
</template>

<script>
  // import store from '../store.js'
  import { mapGetters } from 'vuex'

  // import axios from 'axios'
  export default {
    name: 'Meeting',
    props: ['meetingData'],
    data: () => ({
    }),
    created() {
  },
  methods: {
    ...mapGetters([
      'meetings',
      'currentUserRooms'
    ]),
  }   
}
</script>

<style scoped>
    .top_circle {
        border-top-left-radius: 10000px;
        border-top-right-radius: 10000px;
        border-top:1px solid gray;
        border-left:1px solid gray;
        border-right:1px solid gray;
        height:70%;
        position:relative;
    }

    .top_circle div {
        text-align:center;
        vertical-align:bottom;
        position:absolute;
        bottom:-7.5px;
        width:100%;
    }

    .bottom_circle {
        border-bottom-left-radius: 10000px;
        border-bottom-right-radius: 10000px;
        border-bottom:1px solid gray;
        border-left:1px solid gray;
        border-right:1px solid gray;
        height:30%;
    }

    .circle_holder {
        position:relative;
        width:350px;
        height:350px;
    }


    .meetingWrapper{
        border-top-right-radius: 50%;
        border-top-left-radius: 50%;
    }
  /* #price{
    width: 45%;
    height: 55px;
    background-color: seagreen;
    border-top-right-radius: 15px;
  } */
  /* #rented{
    margin: 0px 0px 90px 195px;
    background-color: goldenrod;
    width: 45%;
    height: 55px;
    border-bottom-left-radius: 15px;
    justify-content: center;
  } */
</style>
