<template>
    <div>
        <v-card
            :class="`mx-auto compressMeetingWrapper ${!expanded ? 'transitionOut' : ''}`"
            :style="meetingEnvironmentStyle()"
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
        <div justify="center" class="extendedMeeting"  @click.stop="expanded = !expanded">
            <div class="meetingInfo">
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
            <div v-if="isOwner()" class="btn-spacing">
            <!-- <div v-if="!meetingData.processCanceled && !meetingData.offerCompleted"> -->
                <!-- btn is not working yet. Make it cancell the meeting, send email to client, show warning, disable room -->
                <v-btn 
                    style="margin: 0px 5px 0 0" 
                    small 
                    rounded
                    color="error"
                    :disabled="(meetingData.ownerCheckedInMeeting && meetingData.clientCheckedInMeeting) || (meetingData.processCanceledByClient ||  meetingData.processCanceledByOwner)  || meetingData.didMeetingPassed || meetingData.offerCompleted"
                    @click.stop="openCancelMeetingWarning = true"
                >
                    Cancel Meeting
                </v-btn> 
                <v-btn 
                    style="margin: 0px 0px 0px 5px;" 
                    small 
                    rounded 
                    color="success"
                    :disabled="(meetingData.ownerCheckedInMeeting || isItToEarlyForMeeting() || meetingData.didMeetingPassed)"
                    @click.stop="openCheckIn = true"
                >
                    {{(meetingData.ownerCheckedInMeeting) ?
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
            </div>
            <div v-if="!isOwner() && meetingData.meetingScheduled" class="btn-spacing">
            <!-- <div v-if="!meetingData.processCanceled && !meetingData.offerCompleted"> -->
                <!-- btn is not working yet. Make it cancell the meeting, send email to client, show warning, disable room -->
                <v-btn 
                    style="margin: 0px 5px 0 0" 
                    small 
                    rounded
                    color="error"
                    :disabled="(meetingData.ownerCheckedInMeeting && meetingData.clientCheckedInMeeting) || (meetingData.processCanceledByClient ||  meetingData.processCanceledByOwner)  || meetingData.didMeetingPassed || meetingData.offerCompleted"
                    @click.stop="openCancelMeetingWarning = true"
                >
                    Cancel Meeting
                </v-btn> 
                <v-btn 
                    style="margin: 0px 0px 0px 5px;" 
                    small 
                    rounded 
                    color="success"
                    :disabled="(meetingData.clientCheckedInMeeting || isItToEarlyForMeeting() || meetingData.didMeetingPassed)"
                    @click.stop="openCheckIn = true"
                >
                    {{(meetingData.clientCheckedInMeeting) ?
                        'Already Checked-in' : 'Check-in Meeting'
                    }}
                </v-btn> 
            </div>
            <!-- will only show if is not meeting time, is early -->
            <p v-if="isItToEarlyForMeeting() && meetingData.meetingScheduled" class="font earlyMeetingDate">{{daysRemainingBeforeMeeting()}}</p>
            <!-- check if the meeting was canceled -->
            <div v-if="meetingData.processCanceledByClient || meetingData.processCanceledByOwner">
                <div v-if="isOwner()">
                    <p v-if="meetingData.processCanceledByClient" class="font meetingCanceled">Unfortunately, this meeting was canceled by {{meetingData.clientName}}!</p>
                    <p v-if="meetingData.processCanceledByOwner" class="font meetingCanceled">You canceled this meeting!</p>
                </div>
                <div v-else>
                    <p v-if="meetingData.processCanceledByClient" class="font meetingCanceled">You canceled this meeting!</p>
                    <p v-if="meetingData.processCanceledByOwner" class="font meetingCanceled">Unfortunately, this meeting was canceled by {{meetingData.ownerName}}!</p>
                </div>
                <v-btn 
                    style="margin: 0px 0px 10px 0px;" 
                    small 
                    rounded 
                    color="warning"
                    @click.stop="showCancelationDetails = !showCancelationDetails"
                >
                   See Cancelation Details
                </v-btn> 
                <p v-if="showCancelationDetails" style="color: #6c2598;"> 
                    {{meetingData.processCanceledByClient ? 
                        `${meetingData.clientName}`
                     : `${meetingData.clientName}`
                    }}
                    canceled this meeting on {{new Date(`${meetingData.cancelationDate}`).toLocaleString('en-US', {
                        timeZone: 'America/New_York'
                    })}}.
                </p>
            </div>
            <!-- different options depening on the check in  -->
            <div v-if="meetingData.ownerCheckedInMeeting && meetingData.clientCheckedInMeeting && this.meetingData.didMeetingPassed">
                <p style="color: #2334A6" class="font">We hope that your meeting was pleasant. We cannot wait to know how it went!</p>
                <v-btn 
                    style="margin: 0px 0px 10px 0px;" 
                    small 
                    rounded 
                    light
                    color="primary"
                    @click.stop="showFollowUp = true"
                >
                  Submit Follow-up
                </v-btn> 
            </div>
            <div v-else-if="!meetingData.ownerCheckedInMeeting && meetingData.clientCheckedInMeeting && this.meetingData.didMeetingPassed">
                <p class="font checkInMeetingProblem">
                    {{isOwner() ? 
                        'You did not checked-in into the meeting. We are investigating the process. We will reach you out to make sure everyting is fine.' : 
                        `${meetingData.ownerName} did not checked-in into the meeting. We are investigating the process. 
                        We will reach ${meetingData.ownerName} to make sure everyting is fine.`
                    }} 
                </p>
                <div v-if="meetingData.clientCheckedInMeeting && !isOwner()">
                    <p style="color: #2334A6" class="font">Meanwhile, we hope that the meeting was pleasant. We cannot wait to know how it went!</p>
                    <v-btn 
                        style="margin: 0px 0px 10px 0px;" 
                        small 
                        rounded 
                        light
                        color="primary"
                        @click.stop="showFollowUp = true"
                    >
                        Submit Follow-up
                    </v-btn> 
                </div>
            </div>
            <div v-else-if="meetingData.ownerCheckedInMeeting && !meetingData.clientCheckedInMeeting && this.meetingData.didMeetingPassed">
                <p class="font checkInMeetingProblem">
                    {{!isOwner() ? 
                        'You did not checked-in into the meeting. We are investigating the process. We will reach you out to make sure everyting is fine.' : 
                        `${meetingData.clientName} did not checked-in into the meeting. We are investigating the process. 
                        We will reach ${meetingData.clientName} to make sure everyting is fine.`
                    }} 
                </p>
                <div v-if="meetingData.ownerCheckedInMeeting && isOwner()">
                    <p style="color: #2334A6" class="font">Meanwhile, we hope that the meeting was pleasant. We cannot wait to know how it went!</p>
                    <v-btn 
                        style="margin: 0px 0px 10px 0px;" 
                        small 
                        rounded 
                        light
                        color="primary"
                        @click.stop="showFollowUp = true"
                    >
                        Submit Follow-up
                    </v-btn> 
                </div>
                
            </div>
            <div v-else-if="!meetingData.ownerCheckedInMeeting && !meetingData.clientCheckedInMeeting && this.meetingData.didMeetingPassed">
                <p class="font checkInMeetingProblem">
                    You did not checked-in into the meeting. We are investigating the process. We will reach you out to make sure everyting is fine.
                </p>               
            </div>
            <!-- if meeting is completed -->
            <div v-if="meetingData.offerCompleted">
                <p class="font meetingCompleted">
                    This meeting was completed on 
                    {{new Date(`${meetingData.offerCompletedDate}`).toLocaleString('en-US', {
                            timeZone: 'America/New_York'
                        })
                    }}.
                </p>      
            </div>
        </div>
        <div>
            <CancelMeetingWarningOwner 
                v-model="openCancelMeetingWarning"
                :data="{
                    meetingId: meetingData.meetingId,
                    ownerId: meetingData.ownerId
                }"
            />
            <MeetingCheckInOwner 
                v-model="openCheckIn" 
                :data="{
                    meetingId: meetingData.meetingId,
                    ownerId: meetingData.ownerId
                }"
            />
        </div>
        </v-card>
    </div>
</template>

<script>
  // import store from '../store.js'
  import CancelMeetingWarningOwner from '@/components/dialogs/meetings/CancelMeetingWarningOwner.vue'
  import MeetingCheckInOwner from '@/components/dialogs/meetings/MeetingCheckInOwner.vue'

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
        showDeleteWarning: false,
        showCancelationDetails: false,
        showFollowUp: false,
    }),
    computed: {
        ...mapGetters([
        'isUserAuthenticated',
        'currentUser'
        ]),
    },
    beforeMount() {
        // let userToken = localStorage.getItem('user-token');
        // if(typeof userToken === 'string') this.unauthorizedUser = true;
  },
  methods: {
    isOwner(){
        return this.isUserAuthenticated && this.currentUser.objectId === this.meetingData.ownerId
    },
    isItTimeToCheckIn(){
        //testing date
        // let tempDate = {
        //     date: 'Sat Jan 09 2021',
        //     time: '12:40 AM'
        // }
        let before15Min = new Date(`${this.meetingData.meetingDate.date}, ${this.meetingData.meetingDate.time}`)
        let after15Min = new Date(`${this.meetingData.meetingDate.date}, ${this.meetingData.meetingDate.time}`)

        let currentDate = new Date()
        // .toLocaleString('en-US', {
        //         timeZone: 'America/New_York'
        //     })
        before15Min.setMinutes(before15Min.getMinutes() - 15)
        after15Min.setMinutes(after15Min.getMinutes() + 15)
        // console.log(currentDate, before15Min, after15Min)
        return (currentDate >= before15Min && currentDate <= after15Min)
    },
    isItToEarlyForMeeting(){
        let before15Min = new Date(`${this.meetingData.meetingDate.date}, ${this.meetingData.meetingDate.time}`)
        before15Min.setMinutes(before15Min.getMinutes() - 15)
        let currentDate = new Date()
        return currentDate < before15Min;
    },
    daysRemainingBeforeMeeting(){
        let meetingDate = new Date(`${this.meetingData.meetingDate.date}, ${this.meetingData.meetingDate.time}`)
        let currentDate = new Date();
        var diff = meetingDate.valueOf() - currentDate.valueOf();
        var diffInHours = (diff/1000/60/60);
        let daysBeforeMeetingStart = diffInHours/24;
        let hoursDecimal = diffInHours - (Math.trunc(daysBeforeMeetingStart) * 24)
        //extracting hours and minutes
        let hour = Math.trunc(hoursDecimal)
        let hourFloat = Number((hoursDecimal - hour).toFixed(2)) * 60
        let minutes = Math.trunc(hourFloat)
        // console.log(diffInHours,  hoursDecimal, hourFloat)
        return (`Be ready, meeting starts in ${Math.trunc(daysBeforeMeetingStart)} days, ${hour} hours, and ${minutes} minutes!`)
    },
    meetingEnvironmentStyle(){
        let style = ''
        if((this.meetingData.processCanceledByClient || this.meetingData.processCanceledByOwner) || (this.meetingData.didMeetingPassed && !this.meetingData.ownerCheckedInMeeting && !this.meetingData.clientCheckedInMeeting)){
           style = 'border: 3px solid #ff8c8c'
        } else if (this.meetingData.didMeetingPassed) {
           style = 'border: 3px solid #98ffae'
        } else if(this.meetingData.offerCompleted){
           style = 'border: 2px solid #bad2ff'
        }
        // else {
        //     style = 'border: 3px solid #ff8c8c'
        // }
        return style
    },
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

    .btn-spacing{
        margin: 15px;
    }

    .earlyMeetingDate{
        color: #1e7a84;
        font-weight: 600;
    }

    .meetingCanceled{
        color: #6d2525;
        font-weight: 600;
    }

    .checkInMeetingProblem{
        color: #88562b;
        font-weight: 600;
        margin: 10px 20px
    }

    .meetingCompleted{
        color: olivedrab;
        font-weight: 600;
        margin: 10px 20px
    }

</style>
