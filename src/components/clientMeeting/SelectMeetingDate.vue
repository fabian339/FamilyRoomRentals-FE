<template>
  <v-container>
    <v-row class="text-center" justify="center">
        <div class="logo" >
          <img :src="require('../../assets/logo.png')" alt="logo" width="400">
        </div>
        <h2 v-if="tokenError">You are unauthorized to view this page!</h2>
        <h2 v-else-if="tokenExpired"> Sorry, it looks like this page has expired.</h2>
        <v-col v-else lg="12" > 
            <h2 class="headline font-weight-bold mb-3">
                {{(showDates && !currentOffer.meetingScheduled) ? `${data.name}, you are a few steps away!` : `${(showTicket || processCanceledByClient) ? '' : `Welcome ${data.name}!`}`}}
            </h2> 
            <v-progress-circular
                v-if="isContentLoading"
                color="green"
                :size="100"
                :width="15"
                indeterminate
            >
            </v-progress-circular>
            <v-row class="text-center" justify="center" v-if="!isContentLoading && showForm && !isOfferTokenVerified">
                <v-col lg="4">
                    <h3 style="margin: -10px 0px 15px 0px;">Please enter your verification ID: </h3>
                    <form>
                        <v-text-field
                            label="Verification ID"
                            v-model="id"
                            append-icon="mdi-account"
                            type="text"
                            outlined
                            :error-messages="errors.id"
                        ></v-text-field>

                        <v-spacer></v-spacer>
                        
                        <v-btn color="#66CDAA" @click.stop="idVerification">Verify</v-btn>
                        <p style="color: red; margin: 15px 0px -30px 0px">{{offerErrors.error}}</p>
                    </form>
                </v-col>
            </v-row>
            <div v-if="!isContentLoading && isOfferTokenVerified && showDates && !currentOffer.meetingScheduled">
                <h3 style="margin: 10px 0px;">Please select an available date: </h3>
                <v-radio-group v-model="dateSelectedIndex" style="display: inline-block;">
                        <div v-for="(date, index) in currentOffer.meetingDates" :key="index + 60">
                            <v-radio
                                style="margin-bottom: 10px"
                                :label="`
                                    ${new Date(new Date(date.date).setDate(new Date(date.date).getDate()+1)).toDateString()} at ${date.time}
                                    ${new Date(new Date(date.date).setDate(new Date(date.date).getDate()+1)) <= new Date() ? '(Date has passed, unavailable.)': ''}
                                    `"
                                :disabled="new Date(new Date(date.date).setDate(new Date(date.date).getDate()+1)) <= new Date()"
                            ></v-radio>
                        </div>
                </v-radio-group>

                <h4>You will be meeting with {{currentOffer.ownerName}} on this date.</h4>
                <p class="font" style="margin: 10px 0px; color: darkblue">He/she will show you the property, and you will have the time to ask for details.</p>
                <p style="color: red">{{selectDateError}}</p>
            </div>
            <v-btn 
                v-if="isOfferTokenVerified && !paymentCompleted && !confirmedDate && !currentOffer.meetingScheduled" 
                color="#66CDAA"
                @click.stop="onDateSelect">
                    {{!showDates ? 'PICK ANOTHER DATE' : 'NEXT'}}
            </v-btn>
            <div v-if="currentOffer.meetingScheduled || showTicket">
                <div v-if="!currentOffer.processCanceled && !currentOffer.didMeetingPassed">
                    <div class="confirmation">
                        <h2>{{paymentCompleted ? ('Its Done, Meeting Confirmed!!') : (
                                `${currentOffer.meetingScheduled ? `${data.name}, here is you meeting information:` : 'The Service:'}`
                            )}}
                        </h2>

                        <v-row class="text-center" justify="center" style="align-items: center;">
                            <div style="width: 275px;">
                                <img 
                                    :src="(contentRoom.images && contentRoom.images.length > 0) ? contentRoom.images[0] : 'https://i.ibb.co/t85JhCP/no-Room-Img.png'" 
                                    alt="roomPhoto" 
                                    width="150" 
                                    height="100"
                                    @click.stop="openRoom"
                                    class="roomPhoto"
                                />
                                <p class="font">You will meet {{currentOffer.ownerName}} to see this propery</p>
                            </div>
                            <div style="width: 275px;">
                                <h3>When: </h3>
                                <p class="font"> 
                                    {{currentOffer.meetingScheduled ? (
                                        `Meeting Scheduled for ${currentOffer.officialMeetingDate.date} 
                                    at ${currentOffer.officialMeetingDate.time}`) : (
                                        `${new Date(new Date(currentOffer.meetingDates[dateSelectedIndex].date).setDate(new Date(currentOffer.meetingDates[dateSelectedIndex].date).getDate()+1)).toDateString()},
                                    at ${currentOffer.meetingDates[dateSelectedIndex].time}`
                                    )}}
                                </p>
                            </div>
                            <div style="width: 275px;">
                                <h3>Where: </h3>
                                <div>
                                    <v-icon style="font-size: 60px;" large color="green darken-2">mdi-map-marker</v-icon>
                                </div>
                                <p class="font" >
                                    {{contentRoom.location.street1}}, 
                                    {{contentRoom.location.street2}},
                                    {{contentRoom.location.city}},
                                    {{contentRoom.location.state}},
                                    {{contentRoom.location.zipCode}},
                                    {{contentRoom.location.country}}
                                </p>
                                <v-btn color="teal" small dark @click.stop="openAddress">
                                    Open Address
                                </v-btn>
                            </div>
                        </v-row>
                    </div>
                    <div v-if="currentOffer.meetingScheduled && !showTicket">
                        <p v-if="currentOffer.ownerCheckedInMeeting && currentOffer.clientCheckedInMeeting" class="status"> 
                            Meeting In Progress!
                        </p>
                        <p v-if="!currentOffer.ownerCheckedInMeeting && currentOffer.clientCheckedInMeeting" class="status"> 
                            Wait for {{currentOffer.ownerName}} to check-in to start the meeting!
                        </p>
                        <p v-if="currentOffer.ownerCheckedInMeeting && !currentOffer.clientCheckedInMeeting" class="status"> 
                            Please Check-In, {{currentOffer.ownerName}} already checked-in!
                        </p>
                        <v-btn 
                            style="margin: 15px" 
                            rounded 
                            color="error" 
                            @click.stop="showCancelationWarning = true"
                            :disabled="currentOffer.ownerCheckedInMeeting && currentOffer.clientCheckedInMeeting"
                        >
                            Cancel Meeting
                        </v-btn>

                        <v-btn 
                            style="margin: 15px" 
                            rounded color="success" 
                            @click.stop="openCheckIn = true"
                            :disabled="currentOffer.clientCheckedInMeeting"
                        >
                            Check-In Meeting
                        </v-btn>
                    </div>
                </div>
                <div v-else>
                    <div v-if="currentOffer.processCanceled">
                        <h1 style="color: brown; font-style: italic; text-align: center; margin:5px">
                            {{processCanceledByClient ? ('Meeting canceled succesfully!') : (
                                `Unfortunatelly, the meeting on ${currentOffer.officialMeetingDate.date} 
                                at ${currentOffer.officialMeetingDate.time} was canceled.`
                            )}}
                        </h1>
                        <p v-if="!processCanceledByClient">
                            We are sorry for this inconvenience, <strong>but HEY</strong>, there is a property 
                            for everyone. Keep sending offers at <router-link to="/" target="_blank">FamilyRoomRentals</router-link>.
                        </p>
                    </div>
                    <h1 
                        v-if="currentOffer.didMeetingPassed"
                        style="color: brown; font-style: italic; text-align: center; margin:5px"
                    >
                        The meeting on {{currentOffer.officialMeetingDate.date}} 
                        at {{currentOffer.officialMeetingDate.time}} has passed.
                    </h1>
                </div>
                <v-btn 
                    color="#9acd32"
                    v-if="showTicket && !confirmedDate" 
                    @click.stop="confirmedDate = true"
                > 
                    Confirm Information 
                </v-btn>
                <v-dialog
                    v-model="showCancelationWarning"
                    max-width="450px"
                >
                    <v-card>
                        <v-card-title class="headline">Are you sure you want to cancel the meeting process?</v-card-title>
                            <v-card-text>
                                IMPORTANT:
                            </v-card-text>
                            <v-card-text>
                                At FamilyRoomRentals, we depend on users posting and sharing their properties. 
                                Canceling a pending meeting could result in the lost of revenue and potentially losing the user. 
                                <strong>
                                    As a concequence of canceling a pending meeting, we will charge a fee of $5 as the user 
                                    dedicated his/her time to look foward for this meeting. Please read FamilyRoomRentals properyy's 
                                    Terms & Conditions for more details.
                                </strong>
                            </v-card-text>
                        <v-card-text>
                            Once this is done, we cannot undo this action. Do you want to continue?
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            color="green darken-1"
                            text
                            @click.stop="showCancelationWarning = false"
                        >
                            Cancel
                        </v-btn>

                        <v-btn
                            color="green darken-1"
                            text
                            @click.stop="cancelMeeting"
                        >
                            Continue
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            <div v-if="confirmedDate">
                <!-- const {location: {street1, street2, city, state, zipCode, country}} = this.contentRoom; -->
                <PayForMeeting @paymentSucceeded="checkPayment" :offerData="{
                        officialMeetingDate: {
                            date: new Date(new Date(currentOffer.meetingDates[dateSelectedIndex].date).setDate(new Date(currentOffer.meetingDates[dateSelectedIndex].date).getDate()+1)).toDateString(),
                            time: currentOffer.meetingDates[dateSelectedIndex].time
                        },
                        status: `Meeting Scheduled for ${new Date(new Date(currentOffer.meetingDates[dateSelectedIndex].date).setDate(new Date(currentOffer.meetingDates[dateSelectedIndex].date).getDate()+1)).toDateString()}, at ${currentOffer.meetingDates[dateSelectedIndex].time}!`,
                    }"/>
            </div>
        </v-col>
        <MeetingCheckIn v-model="openCheckIn" user="client"/>
    </v-row>
  </v-container>
</template>

<script>
let jwt = require('jsonwebtoken');
import { mapGetters, mapActions } from 'vuex'
import { SendEmailToClientOnMeetingCanceledByClient, SendEmailToOwnerOnMeetingCanceledByClient, SendEmailToAdminOnClientMeetingCancelation } from '../../emailTemplates/emails'
import MeetingCheckIn from '@/components/notification/MeetingCheckIn.vue'
import PayForMeeting from './PayForMeeting'
// :label="`${ new Date(new Date(date.date).setDate(new Date(date.date).getDate()+1)).toDateString()} at ${date.time}`"

  export default {
    name: 'SelectDateAndPay',
    components: { PayForMeeting,  MeetingCheckIn},
    computed: {
      ...mapGetters([
        'isContentLoading',
        'currentOffer',
        'contentRoom',
        'offerErrors',
        'isOfferTokenVerified',
      ])
    },
    data () {
        return {
            data: {},
            showTicket: false,
            paymentCompleted: false,
            openCheckIn: false,
            showCancelationWarning: false,
            tokenExpired: false,
            tokenError: false,
            id: '',
            showForm: true,
            showDates: false,
            processCanceledByClient: false,
            // roomLocation: {},
            selectDateError: '',
            dateSelectedIndex: '',
            showPayment: false,
            complete: false,
            confirmedDate: false,
            timerCount : 10,
            // showCountDown: this.$refs.checkoutRef.$data,
            errors: {}
        }
    },
    
    beforeMount(){
        const {secretId, token} = this.$router.history.current.params;

        try {
            var decoded = jwt.verify(token, secretId);
        } catch(err) {
            this.tokenError = true;
        }
        if(decoded){
            // console.log(new Date() , new Date(decoded.exp))
            if(new Date() > new Date(decoded.exp)) this.tokenExpired = true;
            else this.data = decoded.data
        }
    },
    methods:{
        ...mapActions([
            'getOffer',
            'sendEmail',
            'updateOffer',
            'updateRoom'
        ]),
        idVerification(){
            if(this.id === '') {
                const errors = {
                    id: 'Must not be empty, verification id was send to your email.'
                }
                this.errors = errors;
            }
            else {
                this.getOffer({
                    id :this.id,
                    token: this.$router.history.current.params.token
                });
                this.showDates = true;
            }
        },
        checkPayment(value){
            if(value){
                this.paymentCompleted = value
            }
        },
        onDateSelect(){
            if(this.dateSelectedIndex === '') this.selectDateError = 'You must select a date!'
            else {
                this.showTicket = !this.showTicket; 
                this.showDates = !this.showDates
                this.selectDateError = ''
            }
        },
        openAddress(){
            const {street1, street2, city, state, zipCode, country} = this.roomLocation;
            this.roomAddress = `https://www.google.com/maps/place/${street1}+${street2}+${city}+${state}+${zipCode}+${country}`;
            window.open(this.roomAddress, '_blank');
        },
       async cancelMeeting(){
            //if this.currentOffer.meetingScheduled apply penalty, send email to both parties
            //else send email to both parties canceling meeting
            let clientEmailData = SendEmailToClientOnMeetingCanceledByClient({
                email: this.currentOffer.email,
                name: this.currentOffer.full_name,
                ownerName: this.currentOffer.ownerName,
                meetingScheduled: this.currentOffer.meetingScheduled,
                status: this.currentOffer.status,
                offer: this.currentOffer.offer,
                roomId: this.currentOffer.roomId,
            });

            let ownerEmailData = SendEmailToOwnerOnMeetingCanceledByClient({
                email: this.currentOffer.ownerEmail,
                name: this.currentOffer.full_name,
                ownerName: this.currentOffer.ownerName,
                meetingScheduled: this.currentOffer.meetingScheduled,
                status: this.currentOffer.status,
                offer: this.currentOffer.offer,
                roomId: this.currentOffer.roomId,
            });

            let adminEmailData = SendEmailToAdminOnClientMeetingCancelation({
                email: 'familyroomrentals@dr.com',
                name: this.currentOffer.full_name,
                offerId: this.currentOffer.objectId
            });
            console.log(clientEmailData,ownerEmailData)
            await this.sendEmail(clientEmailData);
            await this.sendEmail(ownerEmailData);
            //send email to admin to proccess cancelation feed
            await this.sendEmail(adminEmailData);

            await this.updateOffer({
                objectId: this.currentOffer.objectId,
                cancellationDate: new Date(),
                processCanceled: true,
                processCanceledByClient: true,
                chargeCancelationFeeToClient: true,
                readByReceiver: false,
                status: `Meeting proccess canceled by ${this.currentOffer.full_name}!`
            })

            await this.updateRoom({
                objectId: this.contentRoom.objectId,
                meetingsPending: this.contentRoom.meetingsPending > 0 ? this.contentRoom.meetingsPending - 1 : 0
            })
            this.processCanceledByClient = true
            this.showCancelationWarning = false
        },
        openRoom(){
            window.open(`https://familyroomrentals.com/#/room/${this.contentRoom.objectId}`, '_blank');
        }
    }
  }
</script>

<style>
    .stripe-card {
        width: 300px;
        border: 1px solid grey;
    }
    .stripe-card.complete {
        border-color: green;
    }
    .confirmation{
        border: 2px dashed powderblue;
        padding: 15px;
        width: 85%;
        border-radius: 5px;
        margin: 20px 7.5%;
    }
    .meetingTicket{
        border: 2px dashed powderblue;
        padding: 15px;
        border-radius: 5px;
    }
    .roomPhoto{
        border: 1px solid; 
        margin: 30px;
    }
    .roomPhoto:hover{
        border: 5px solid; 
        cursor: pointer;
    }
    .status{
        margin-top: 5px;
        color: darkblue;
    }
</style>