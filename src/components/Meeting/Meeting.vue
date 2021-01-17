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
                    <p
                        v-if="isItToEarlyForMeeting() && !meetingData.processCanceledByClient && !meetingData.processCanceledByOwner"
                        class="font text-center" 
                        style="font-size: 20px; margin: 25px"
                    >
                        <strong>
                            Comming up on {{meetingData.meetingDate.date}} at {{meetingData.meetingDate.time}}.
                        </strong>
                    </p>
                    <p
                        v-if="meetingData.didMeetingPassed && !meetingData.processCanceledByClient && !meetingData.processCanceledByOwner"
                        class="font text-center" 
                        style="font-size: 20px; margin: 25px"
                    >
                        <strong>
                            The meeting with {{isOwner() ? `${meetingData.clientName}` : `${meetingData.ownerName}`}} has passed.
                        </strong>
                    </p>
                    <p
                        v-if="meetingData.processCanceledByClient || meetingData.processCanceledByOwner"
                        class="font text-center" 
                        style="font-size: 20px; margin: 25px"
                    >
                        <strong>
                            The meeting with {{isOwner() ? `${meetingData.clientName}` : `${meetingData.ownerName}`}} was updated.
                        </strong>
                    </p>
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
                    <p class="font">
                        {{meetingData.didMeetingPassed ? 'You met with' : 'You will meet' }}
                        {{isOwner() ? `${meetingData.clientName}` : `${meetingData.ownerName}`}} to see this property.
                    </p>
                </div>
                <div style="width: 275px;">
                    <h3>When: </h3>
                    <p class="font"> 
                            {{meetingData.didMeetingPassed ? 'The meeting was scheduled for' : 'Meeting Scheduled for' }}
                            {{meetingData.meetingDate.date}} at {{meetingData.meetingDate.time}}. 
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
            <div v-if="isOwner() && !meetingData.ownerCheckedInMeeting && !meetingData.clientCheckedInMeeting" class="btn-spacing">
            <!-- <div v-if="!meetingData.processCanceled && !meetingData.offerCompleted"> -->
                <!-- btn is not working yet. Make it cancell the meeting, send email to client, show warning, disable room -->
                <v-btn 
                    style="margin: 0px 5px 0 0; color: #ffffff" 
                    small 
                    rounded
                    :disabled="(meetingData.ownerCheckedInMeeting && meetingData.clientCheckedInMeeting) || (meetingData.processCanceledByClient ||  meetingData.processCanceledByOwner)  || meetingData.didMeetingPassed || meetingData.offerCompleted"
                    color="#d44d25"
                    @click.stop="openMeetingCancelation = true"
                >
                    Cancel Meeting
                </v-btn> 
                <v-btn 
                    style="margin: 0px 5px;" 
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
                    style="margin: 0px 5px;" 
                    small 
                    rounded 
                    color="error" 
                    @click.stop="showDeleteWarning = true"
                    :disabled="!meetingData.offerCompleted"
                >
                    Delete Meeting
                </v-btn>
            </div>
            <div v-if="!isOwner() && meetingData.meetingScheduled && !meetingData.ownerCheckedInMeeting && !meetingData.clientCheckedInMeeting" class="btn-spacing">
            <!-- <div v-if="!meetingData.processCanceled && !meetingData.offerCompleted"> -->
                <!-- btn is not working yet. Make it cancell the meeting, send email to client, show warning, disable room -->
                <v-btn 
                    style="margin: 0px 5px 0 0; color: #ffffff" 
                    small 
                    rounded
                    :disabled="(meetingData.ownerCheckedInMeeting && meetingData.clientCheckedInMeeting) || (meetingData.processCanceledByClient ||  meetingData.processCanceledByOwner)  || meetingData.didMeetingPassed || meetingData.offerCompleted"
                    color="#d44d25"
                    @click.stop="openMeetingCancelation = true"
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
            <p v-if="isItToEarlyForMeeting() && meetingData.meetingScheduled && !meetingData.processCanceledByClient && !meetingData.processCanceledByOwner" class="font earlyMeetingDate">{{daysRemainingBeforeMeeting()}}</p>
            <!-- loading component to show that the meeting is in progress -->
            <div v-if="meetingData.ownerCheckedInMeeting && meetingData.clientCheckedInMeeting && !meetingData.didMeetingPassed" class="meetingStatus"> 
                <img style="border-radius: 20px" src="https://media.giphy.com/media/H88dPcYfTecWK3FdEO/giphy.gif" alt="logo" width="150">
                <p class="font" style="color: #1c1a8c">Meeting In Progress!</p>
            </div>
            <p style="color: #0f770f; margin: 10px 0" v-if="isOwner() && meetingData.ownerCheckedInMeeting && !meetingData.clientCheckedInMeeting && !meetingData.didMeetingPassed" class="meetingStatus"> 
                Waiting for {{meetingData.clientName}} to check-in to start the meeting. Reload page to check if status changed!
            </p>
            <p style="color: #0f770f; margin: 10px 0" v-if="!isOwner() && meetingData.clientCheckedInMeeting && !meetingData.ownerCheckedInMeeting && !meetingData.didMeetingPassed" class="meetingStatus"> 
                Waiting for {{meetingData.ownerName}} to check-in to start the meeting. Reload page to check if status changed!
            </p>
            
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
                <p v-if="showCancelationDetails" style="color: #6c2598; margin: 5px 20px"> 
                    {{meetingData.processCanceledByClient ? 
                        `${meetingData.clientName}`
                     : `${meetingData.ownerName}`
                    }}
                    canceled this meeting on {{new Date(`${meetingData.cancelationDate}`).toLocaleString('en-US', {
                        timeZone: 'America/New_York'
                    })}}.  
                    <strong>{{isOwner() ? 
                        `${meetingData.processCanceledByOwner ? 'As a concequence of cancelling a pending meeting, we could disable this property for a period of one week, or more.' 
                            : 'We are sorry for the inconvenience.'}` : 
                        `${meetingData.processCanceledByOwner ? 'We are sorry for the inconvenience. You will not be charged!' 
                            : `As a concequence of canceling a pending meeting, we could charge a fee of $5 as ${meetingData.ownerName} dedicated his/her time looking foward for this meeting.`}`
                    }}</strong>
                </p>
                <p>
                    <small>
                        If you have any questions, please read our <router-link to="/qas">QA</router-link>,
                        our <router-link to="/terms-and-conditions">Terms and Conditions</router-link>,
                        or feel free to <router-link to="/contact-us">contact us</router-link>.
                    </small>
                </p>
            </div>
            <!-- different options depening on the check in for owner -->
            <div v-if="isOwner() && !meetingData.ownerCompletedFollowup">
                <div v-if="meetingData.ownerCheckedInMeeting && meetingData.didMeetingPassed">
                    <p style="color: #2334A6" class="font">
                        We hope that your meeting was pleasant. We cannot wait to know how it went!
                    </p>
                    <v-btn 
                        style="margin: 0px 0px 10px 0px; color: #ffffff" 
                        small 
                        rounded 
                        light
                        color="#187f8a"
                        @click.stop="openFollowUp = true"
                    >
                    Submit Follow-up
                    </v-btn> 
                </div>
                <div v-else-if="!meetingData.ownerCheckedInMeeting && meetingData.didMeetingPassed">
                    <p class="font checkInMeetingProblem">
                        You did not checked-in into the meeting. We are investigating the process. We will reach you out to make sure everyting is fine.' : 
                    </p>
                </div>
            </div>
            <!-- different options depening on the check in for client -->
            <div v-if="!isOwner() && !meetingData.clientCompletedFollowup">
                <div v-if="meetingData.clientCheckedInMeeting && meetingData.didMeetingPassed">
                    <p style="color: #2334A6" class="font">
                        We hope that your meeting was pleasant. We cannot wait to know how it went!
                    </p>
                    <v-btn 
                        style="margin: 0px 0px 10px 0px; color: #ffffff" 
                        small 
                        rounded 
                        light
                        color="#187f8a"
                        @click.stop="openFollowUp = true"
                    >
                        Submit Follow-up
                    </v-btn> 
                    
                </div>
                <div v-else-if="!meetingData.clientCheckedInMeeting && meetingData.didMeetingPassed">
                    <p class="font checkInMeetingProblem">
                        You did not checked-in into the meeting. We are investigating the process. We will reach you out to make sure everyting is fine.
                    </p>               
                </div>
            </div>

            <!-- ********************************************************************************* -->
            <!-- if owner completed followup -->
            <div v-if="isOwner() && meetingData.ownerCompletedFollowup">
                <!-- loading component if data is not reviewed  -->
                <div v-if="!meetingData.meetingResultsReviewed">
                    <img style="border-radius: 20px" src="https://media.giphy.com/media/GpB0GFpjVZra8ilOhn/giphy.gif" alt="logo" width="150" height="135">
                    <p style="color: #2334A6" class="font">Thank you for letting us know how it went. We are reviewing the results!</p>
                    <p style="color: #2334A6" class="font"><strong>We will notify you when a decision is make!</strong></p>
                </div>
                <!-- if meeting results are reviewed -->
                <div v-else> 
                    <!-- if owner should receive payment, enter credit card information -->
                    <div v-if="meetingData.ownerShouldGetPay">
                        <!-- btn -->
                        <v-btn 
                            style="margin: 15px 0;" 
                            small 
                            rounded 
                            color="success"
                            v-if="!meetingData.ownerPaymentInformationProvided"
                            @click.stop="openPaymentInformation = true"
                        >
                            Submit Payment Information
                        </v-btn>
                        <!-- if payment data submitted -->
                        <div v-else>
                            <p style="color: #5347ff"> Infomation received. Please allow 2-4 business days to be proccess. </p>
                            <p><small>This meeting will be deleted automatically on {{meetingWillBeDeletedOn()}}!</small></p>
                        </div>
                    </div>
                    <!-- if owner is not getting pay, just output message -->
                    <div v-else>
                        <p style="color: #5347ff"> Thank you for using FamilyRoomRents, we hope you get many more offers! </p>
                        <p><small>This meeting will be deleted automatically on {{meetingWillBeDeletedOn()}}!</small></p>
                    </div>
                </div>
            </div>
            <!-- if client completed followup -->
            <div v-if="!isOwner() && meetingData.clientCompletedFollowup">
                <!-- loading component if data is not reviewed  -->
                <div v-if="!meetingData.meetingResultsReviewed">
                    <img style="border-radius: 20px" src="https://media.giphy.com/media/GpB0GFpjVZra8ilOhn/giphy.gif" alt="logo" width="150" height="135">
                    <p style="color: #2334A6" class="font">Thank you for letting us know how it went. We are reviewing the results!</p>
                    <p style="color: #2334A6" class="font"><strong>We will notify you when a decision is make!</strong></p>
                </div>
                <div v-else>
                    <!-- if the client will move in no payment is needed -->
                    <div v-if="meetingData.clientWillMoveIn" style="padding: 0 50px; color: #5347ff">
                        <p>
                            Thank you for using FamilyRoomRents, we hope you enjoy your new place. Please fell free to
                            contact us at any moment.
                        </p>
                    </div>
                    <!-- if the client is not moving, issue a refund to the client -->
                    <div v-else style="padding: 0 50px; color: #5347ff">
                        <p>
                            We are really sorry to see that it did not work out. But keep sending offers, there is
                            a property for everyone. We issued a refund of $15 to your account. Allow 2-4 business
                            days for it to be proccess.
                        </p>
                    </div>
                    <p><small>Please keep in mind that this page will expire on {{meetingWillBeDeletedOn()}}!</small></p>
                </div>
            </div>
            <!-- ********************************************************************************* -->

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
            <MeetingCancelation 
                v-model="openMeetingCancelation"
                :data="{
                    meetingId: meetingData.meetingId,
                    ownerId: meetingData.ownerId
                }"
            />
            <MeetingCheckIn 
                v-model="openCheckIn" 
                :data="{
                    meetingId: meetingData.meetingId,
                    ownerId: meetingData.ownerId
                }"
            />
            <MeetingFollowUp 
                v-model="openFollowUp" 
                :data="{
                    meetingId: meetingData.meetingId,
                    ownerId: meetingData.ownerId
                }"
            />

            <OwnerPayment 
                v-model="openPaymentInformation" 
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
  import MeetingCancelation from '@/components/dialogs/meetings/MeetingCancelation.vue'
  import MeetingCheckIn from '@/components/dialogs/meetings/MeetingCheckIn.vue'
  import MeetingFollowUp from '@/components/dialogs/meetings/MeetingFollowUp.vue'
  import OwnerPayment from '@/components/dialogs/meetings/OwnerPayment.vue'

  import { mapGetters } from 'vuex'

  // import axios from 'axios'
  export default {
    name: 'Meeting',
    props: ['meetingData'],
    components: {
        MeetingCancelation,
        MeetingCheckIn,
        MeetingFollowUp,
        OwnerPayment
    },
    data: () => ({
        expanded: false,
        openMeetingCancelation: false,
        openCheckIn: false,
        showDeleteWarning: false,
        showCancelationDetails: false,
        openFollowUp: false,
        openPaymentInformation: false
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
    meetingWillBeDeletedOn(){
        return new Date(`${this.meetingData.meetingDeletionDate}`).toLocaleString('en-US', {
                            timeZone: 'America/New_York'
                        })
    },
    meetingEnvironmentStyle(){
        let style = ''
        if((this.meetingData.processCanceledByClient || this.meetingData.processCanceledByOwner) || (this.meetingData.didMeetingPassed && !this.meetingData.ownerCheckedInMeeting && !this.meetingData.clientCheckedInMeeting)){
           style = 'border: 3px solid #ff8c8c'
        } else if (this.meetingData.didMeetingPassed && !this.meetingData.processCanceledByClient && !this.meetingData.processCanceledByOwner) {
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
