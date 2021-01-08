<template>
    <div>
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
        <div justify="center" class="extendedMeeting">
            <div class="meetingInfo" @click.stop="expanded = !expanded">
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
                        <v-icon 
                            class="openAddress" 
                            style="font-size: 60px;" 
                            @click.stop="openAddress" 
                            large 
                            color="green darken-2"
                        >
                            mdi-map-marker
                        </v-icon>
                    </div>
                    <p class="font openAddress" @click.stop="openAddress">
                        {{meetingData.meetingLocation.street1}}, 
                        {{meetingData.meetingLocation.street2}},
                        {{meetingData.meetingLocation.city}},
                        {{meetingData.meetingLocation.state}},
                        {{meetingData.meetingLocation.zipCode}},
                        {{meetingData.meetingLocation.country}}
                    </p>
                </div>
            </div>
            <div v-if="isUserAuthenticated && currentUser.objectId === meetingData.ownerId">
            <!-- <div v-if="!meetingData.processCanceled && !meetingData.offerCompleted"> -->
                <!-- btn is not working yet. Make it cancell the meeting, send email to client, show warning, disable room -->
                <v-btn 
                    style="margin: 0px 5px 0 0" 
                    small 
                    rounded
                    color="error"
                    :disabled="(meetingData.ownerCheckedInMeeting && meetingData.clientCheckedInMeeting) || meetingData.didMeetingPassed"
                    @click.stop="openCancelMeetingWarning = true"
                >
                    Cancel Meeting
                </v-btn> 
                <v-btn 
                    style="margin: 0px 0px 0px 5px;" 
                    small 
                    rounded 
                    color="success"
                    :disabled="(isUserAuthenticated && currentUser.objectId && meetingData.ownerCheckedInMeeting)"
                    @click.stop="openCheckIn = true"
                >
                    {{(isUserAuthenticated && currentUser.objectId && meetingData.ownerCheckedInMeeting) ?
                        'Already Checked-in' : 'Check-in Meeting'
                    }}
                </v-btn> 
                <v-btn 
                    style="margin: 5px 5px;" 
                    small 
                    color="error" 
                    @click.stop="showDeleteWarning = true"
                    :disabled="!meetingData.offerCompleted"
                >
                    Delete Meeting
                </v-btn>

                <CancelMeetingWarningOwner v-model="openCancelMeetingWarning" :meetingId="meetingData.meetingId" />
                <MeetingCheckInOwner v-model="openCheckIn" :meetingId="meetingData.meetingId" />
            </div>
        </div>
        <!-- <div v-if="isUserAuthenticated && currentUser.objectId === meetingData.ownerId">
       
        </div> -->
        </v-card>
    </div>
</template>

<script>
  // import store from '../store.js'
  import CancelMeetingWarningOwner from '@/components/dialogs/meetings/owners/CancelMeetingWarningOwner.vue'
  import MeetingCheckInOwner from '@/components/dialogs/meetings/owners/MeetingCheckInOwner.vue'

  import { mapGetters } from 'vuex'

  // import axios from 'axios'
  export default {
    name: 'Meeting',
    props: ['meetingData'],
    components: {
        CancelMeetingWarningOwner,
        MeetingCheckInOwner
    },
    data: () => ({
        expanded: false,
        openCancelMeetingWarning: false,
        openCheckIn: false,
        showDeleteWarning: false
    }),
    computed: {
        ...mapGetters([
        'isUserAuthenticated',
        'currentUser'
        ]),
    },
    created() {
  },
  methods: {
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



    .meetingInfo{
        align-items: center; 
        display: flex;
        padding: 10px;
        justify-content: center;
    }

    .transitionOut{
        transition: all 0.5s;
    }

    .openAddress:hover{
        cursor: pointer;
        color: blue;
        transform: scale(1.1);
    }

</style>
