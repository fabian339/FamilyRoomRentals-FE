<template>
    <v-container>
        <PageLoading  
            v-model="isPageLoading" 
            :component="{
                seconds: 1500,
                type: 'content',
                color: ''
            }"
        />
        <v-row v-if="!isPageLoading" class="text-center" justify="center">
            <div class="logo" >
            <img :src="require('../../../assets/logo.png')" alt="logo" width="400">
            </div>
            <h2 v-if="tokenError || !userAuthorized">You are unauthorized to view this page!</h2>
            <h2 v-else-if="tokenExpired"> Sorry, it looks like this page has expired.</h2>
            <v-col v-else lg="12" > 
                <h2 class="headline font-weight-bold mb-3">
                    {{(showDates && !currentOffer.meetingScheduled) ? `${data.name}, you are a few steps away!` : `${(showTicket || processCanceledByClient) ? '' : `Welcome ${data.name}!`}`}}
                </h2> 
                <v-progress-circular
                    v-if="clientLoading.gettingOffer || clientLoading.gettingMeeting"
                    color="green"
                    :size="100"
                    :width="15"
                    indeterminate
                >
                </v-progress-circular>
                <v-row class="text-center" justify="center" v-if="(!clientLoading.gettingOffer && !clientLoading.gettingMeeting) && showForm && !isOfferTokenVerified">
                    <v-col cols="10" sm="6" md="5" lg="4">        
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
                <div v-if="!clientLoading.gettingOffer && isOfferTokenVerified && showDates && !currentOffer.meetingScheduled">
                    <h3 style="margin: 10px 0px;">Please select an available date: </h3>
                    <v-radio-group 
                        v-model="dateSelectedIndex" 
                        style="display: inline-block;"
                        :rules="[() => isSelectedDateAcceptable() || 'This date is no longer available, please select another date!']"
                    >
                            <div v-for="(date, index) in currentOffer.meetingDates" :key="index + 60">
                                <v-radio
                                    style="margin-bottom: 10px"
                                    :label="`
                                        ${new Date(new Date(date.date).setDate(new Date(date.date).getDate()+1)).toDateString()} at ${date.time}
                                        ${new Date(new Date(date.date).setDate(new Date(date.date).getDate()+1)) <= new Date() ? '(Date has passed, unavailable.)': ''}
                                        `"
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
                    :disabled="!isSelectedDateAcceptable()"
                    @click.stop="onDateSelect">
                        {{!showDates ? 'PICK ANOTHER DATE' : 'NEXT'}}
                </v-btn>
                <div v-if="showTicket && (!clientLoading.gettingOffer && !clientLoading.gettingMeeting)">
                    <div class="confirmation">                   
                        <h2 style="margin-bottom: 10px">{{paymentCompleted ? ('Its Done, Meeting Confirmed!!') : (
                                `${data.type === 'meeting' ? `${data.name}, here is you meeting information:` : 'The Service:'}`
                            )}}
                        </h2>
                        <Meeting v-if="data.type === 'offer'" :meetingData="{
                                ownerName: currentOffer.ownerName,
                                ownerId: currentOffer.receiverId,
                                roomId: currentOffer.roomId,
                                clientName: currentOffer.clientName,
                                cancelationDate: currentOffer.cancelationDate,
                                meetingScheduled: false,
                                meetingDeletionDate: currentOffer.meetingDeletionDate,
                                roomImage: currentOffer.roomImage,
                                offerAmount: currentOffer.offer,
                                meetingDate: `${new Date(new Date(currentOffer.meetingDates[dateSelectedIndex].date).setDate(new Date(currentOffer.meetingDates[dateSelectedIndex].date).getDate()+1)).toDateString()} 
                                at ${currentOffer.meetingScheduled ? currentOffer.officialMeetingDate.time : currentOffer.meetingDates[dateSelectedIndex].time}`,
                                meetingLocation: `${currentOffer.meetingLocation.street1}, 
                                    ${currentOffer.meetingLocation.street2},
                                    ${currentOffer.meetingLocation.city},
                                    ${currentOffer.meetingLocation.state},
                                    ${currentOffer.meetingLocation.zipCode},
                                    ${currentOffer.meetingLocation.country}`,                              
                            }" 
                        />
                        <Meeting v-if="data.type === 'meeting'" :meetingData="clientMeeting" />
                    </div>
                    <v-btn 
                        color="#9acd32"
                        v-if="showTicket && !confirmedDate && data.type === 'offer'" 
                        @click.stop="confirmedDate = true"
                    > 
                        Confirm Information 
                    </v-btn>
                </div>
                <div v-if="confirmedDate">
                    <!-- const {location: {street1, street2, city, state, zipCode, country}} = this.contentRoom; -->
                    <PayForMeeting @paymentSucceeded="checkPayment" :offerData="{
                            officialMeetingDate: {
                                date: new Date(new Date(currentOffer.meetingDates[dateSelectedIndex].date).setDate(new Date(currentOffer.meetingDates[dateSelectedIndex].date).getDate()+1)).toDateString(),
                                time: currentOffer.meetingDates[dateSelectedIndex].time,
                                meetingDeletionDate: this.meetingDeletionDate,
                            },
                            status: `Meeting Scheduled for ${new Date(new Date(currentOffer.meetingDates[dateSelectedIndex].date).setDate(new Date(currentOffer.meetingDates[dateSelectedIndex].date).getDate()+1)).toDateString()}, at ${currentOffer.meetingDates[dateSelectedIndex].time}!`,
                        }"/>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
let jwt = require('jsonwebtoken');
import { mapGetters, mapActions } from 'vuex'
// import { SendEmailToClientOnMeetingCanceledByClient, SendEmailToOwnerOnMeetingCanceledByClient, SendEmailToAdminOnClientMeetingCancelation } from '../../../emailTemplates/emails'
// import MeetingCheckIn from '@/components/notification/MeetingCheckIn.vue'
import PayForMeeting from './PayForMeeting'
import PageLoading from '@/components/Loading/PageLoading.vue';
import Meeting from '../Meeting'
// import { delete } from 'vue/types/umd';
// :label="`${ new Date(new Date(date.date).setDate(new Date(date.date).getDate()+1)).toDateString()} at ${date.time}`"

  export default {
    name: 'SelectDateAndPay',
    components: { 
        PageLoading,
        PayForMeeting, 
        Meeting
    },
    computed: {
      ...mapGetters([
        'clientLoading',
        'currentOffer',
        'clientMeeting',
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
            userAuthorized: true,
            id: '',
            meetingDeletionDate: '',
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
            errors: {},
            isPageLoading: false
        }
    },
    created(){
        this.isPageLoading = true
    },
    beforeMount(){
        //first check if client is authorized, no users should have access to this page
        let userToken = localStorage.getItem('user-token') || '';
        if(userToken !== ''){
            this.userAuthorized = false;
        } 
        
        const {secretId, token} = this.$router.history.current.params;
        try {
            var decoded = jwt.verify(token, secretId);
        } catch(err) {
            this.tokenError = true;
        }
        if(decoded){
            // console.log(decoded)
            this.meetingDeletionDate = new Date(decoded.exp);
            if(new Date() > new Date(decoded.exp)) this.tokenExpired = true;
            else this.data = decoded.data
        }
        console.log(decoded.data)
    },
    methods:{
        ...mapActions([
            'getOfferOnClientUI',
            'getMeetingOnClientUI',
            'sendEmail',
            'updateOffer',
            'updateRoom'
        ]),
        async idVerification(){
            if(this.id === '') {
                const errors = {
                    id: 'Must not be empty, verification id was send to your email.'
                }
                this.errors = errors;
            }
            else {
                if(this.data.type === 'offer') {
                    await this.getOfferOnClientUI({
                        id :this.id,
                        token: this.$router.history.current.params.token
                    });
                    this.showDates = true;
                } else if (this.data.type === 'meeting') {
                    await this.getMeetingOnClientUI({
                        id :this.id,
                        token: this.$router.history.current.params.token
                    });
                    this.showForm = false;
                    this.showTicket = true;
                }
            }
        },
        checkPayment(value){
            if(value){
                this.paymentCompleted = value
            }
        },
        isSelectedDateAcceptable(){
            if(this.dateSelectedIndex !== ''){
                let date = {
                    date: new Date(new Date(this.currentOffer.meetingDates[this.dateSelectedIndex].date).setDate(new Date(this.currentOffer.meetingDates[this.dateSelectedIndex].date).getDate()+1)).toDateString(),
                    time: this.currentOffer.meetingDates[this.dateSelectedIndex].time
                }
                let withinTwoDays = new Date(`${date.date}, ${date.time}`)
                withinTwoDays.setDate(withinTwoDays.getDate() - 2);
                let currentDate = new Date();
                return (currentDate <= withinTwoDays)
            }
            return true;
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