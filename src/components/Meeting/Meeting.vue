<template>
    <v-container>
        <v-card
            :class="`mx-auto compressMeetingWrapper ${!expanded ? 'transitionOut' : ''}`"
            color="#daf1a2"
            max-width="350"
            v-if="!expanded"
        >
            <div class="circle_holder" @click.stop="expanded = !expanded">
                <div class="top_circle"
                    :style="`
                        background-image: url(${meetingData.image ? meetingData.image : 'https://i.ibb.co/t85JhCP/no-Room-Img.png'});
                        background-size: cover`"
                >
                </div>
                <div>
                    <p class="font text-center" style="font-size: 20px; margin: 25px"><strong>Comming up on {{meetingData.meetingDate.date}} at {{meetingData.meetingDate.time}}.</strong></p>
                </div>
            </div>
        </v-card>
        <v-card
            :class="`mx-auto ${expanded ? 'transitionOut' : ''}`"
            color="#daf1a2"
            v-else
        >
            <div justify="center" class="extendedMeeting" @click.stop="expanded = !expanded">
                <div style="width: 275px;">
                    <img 
                        :src="meetingData.image ? meetingData.image : 'https://i.ibb.co/t85JhCP/no-Room-Img.pngs'" 
                        alt="roomPhoto" 
                        width="150" 
                        height="100"
                        @click.stop="openRoom"
                        class="roomPhoto"
                    />
                    <p class="font">You will meet {{meetingData.ownerName}} to see this propery.</p>
                </div>
                <div style="width: 275px;">
                    <h3>When: </h3>
                    <p class="font"> 
                            Meeting Scheduled for {{meetingData.meetingDate.date}} at
                            {{meetingData.meetingDate.time}}. 
                    </p>
                </div>
                <div style="width: 275px;">
                    <h3>Where: </h3>
                    <div>
                        <v-icon style="font-size: 60px;" large color="green darken-2">mdi-map-marker</v-icon>
                    </div>
                    <p class="font" >
                        {{meetingData.meetingLocation.street1}}, 
                        {{meetingData.meetingLocation.street2}},
                        {{meetingData.meetingLocation.city}},
                        {{meetingData.meetingLocation.state}},
                        {{meetingData.meetingLocation.zipCode}},
                        {{meetingData.meetingLocation.country}}
                    </p>
                    <v-btn color="teal" small dark @click.stop="openAddress">
                        Open Address
                    </v-btn>
                </div>
            </div>
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
        expanded: false
    }),
    created() {
  },
  methods: {
    ...mapGetters([
      'meetings',
      'currentUserRooms'
    ]),
    openAddress(){
        const {street1, street2, city, state, zipCode, country} = this.meetingData.meetingLocation;
        this.roomAddress = `https://www.google.com/maps/place/${street1}+${street2}+${city}+${state}+${zipCode}+${country}`;
        window.open(this.roomAddress, '_blank');
    },
    openRoom(){
        window.open(`https://familyroomrentals.com/#/room/${this.meetingData.roomId}`, '_blank');
    }
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
        /* position:relative; */
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
        height:350px;
    }

    .compressMeetingWrapper{
        border-top-right-radius: 50%;
        border-top-left-radius: 50%;  
    }

    .circle_holder:hover, .extendedMeeting:hover {
        border: 5px solid;
        border-color: #faffd0 !important;
        cursor: pointer;
    }

    .extendedMeeting{
        align-items: center; 
        display: flex;
        padding: 10px;
        justify-content: center;
    }

    .transitionOut{
        transition: all 0.5s;
    }

</style>
