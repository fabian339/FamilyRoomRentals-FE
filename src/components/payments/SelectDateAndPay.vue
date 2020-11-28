<template>
  <v-container>
    <v-row class="text-center" justify="center">
        <div class="logo" >
          <img :src="require('../../assets/logo.png')" alt="logo" width="400">
        </div>
        <h2 v-if="tokenError">You are unauthorized to view this page!</h2>
        <h2 v-else-if="tokenExpired"> Sorry, it looks like this page has expired.</h2>
        <div v-else-if="this.$store.getters.currentOffer.meetingScheduled">
            <!-- if the meeting is not cancelled add meething have not passed -->
            <div v-if="!currentOffer.processCancelled && !currentOffer.didMeetingPassed">
                <div class="meetingTicket">
                    <h2>{{data.name}}, here is you meeting information:</h2>
                    <v-row class="text-center" justify="center" style="align-items: center;">
                        <div style="width: 275px;">
                            <img 
                                :src="this.$store.getters.contentRoom.images.length > 0 ? this.$store.getters.contentRoom.images[0] : 'https://i.ibb.co/t85JhCP/no-Room-Img.png'" 
                                alt="roomPhoto" 
                                width="150" 
                                height="100"
                                style="border: 1px solid; margin: 30px;"
                            />
                            <p class="font">You will meet {{currentOffer.ownerName}} to see this propery</p>
                        </div>
                        <div style="width: 275px;">
                            <h3>When: </h3>
                            <p class="font"> 
                                Meeting Scheduled for {{currentOffer.officialMeetingDate.date}} 
                                at {{currentOffer.officialMeetingDate.time}}!
                            </p>
                        </div>
                        <div style="width: 275px;">
                            <h3>Where: </h3>
                            <div>
                                <v-icon style="font-size: 60px;" large color="green darken-2">mdi-map-marker</v-icon>
                            </div>
                            <p class="font" >
                                {{this.$store.getters.contentRoom.location.street1}}, 
                                {{this.$store.getters.contentRoom.location.street2}},
                                {{this.$store.getters.contentRoom.location.city}},
                                {{this.$store.getters.contentRoom.location.state}},
                                {{this.$store.getters.contentRoom.location.zipCode}},
                                {{this.$store.getters.contentRoom.location.country}}
                            </p>
                            <v-btn color="teal" small dark @click="openAddress">
                                Open Address
                            </v-btn>
                        </div>
                    </v-row>
                </div>
                <div>
                    <v-btn small style="margin: 30px 15px 0px 0px" color="error">Cancel Meeting</v-btn>
                    <v-btn small style="margin: 30px 0px 0px 15px" color="#66CDAA">Check In Meeting</v-btn>
                </div>
            </div>
            <div v-else>
                <div v-if="this.$store.getters.contentRoom.processCancelled">
                    <h1 style="color: brown; font-style: italic; text-align: center; margin:5px">
                        Unfortunatelly, the meeting on {{this.$store.getters.currentOffer.officialMeetingDate.date}} 
                        at {{this.$store.getters.currentOffer.officialMeetingDate.time}} has been cancelled.
                    </h1>
                    <p>
                        We are sorry for this inconvenience, <strong>but HEY</strong>, there is a property 
                        for everyone. Keep sending offers.
                    </p>
                </div>
                <h1 
                    v-if="currentOffer.didMeetingPassed"
                    style="color: brown; font-style: italic; text-align: center; margin:5px"
                >
                    The meeting on {{this.$store.getters.currentOffer.officialMeetingDate.date}} 
                    at {{this.$store.getters.currentOffer.officialMeetingDate.time}} has passed.
                </h1>
            </div>
        </div>
        <v-col v-else lg="12" > 
            <h2 v-if="!showPayment" class="headline font-weight-bold mb-3">
                {{data.name}}, you are a few steps away!
            </h2> 
            <v-progress-circular
                v-if="isContentLoading"
                color="green"
                :size="100"
                :width="15"
                indeterminate
            >
            </v-progress-circular>
            <v-row class="text-center" justify="center">
                <v-col lg="4" v-if="!isContentLoading && showForm && !isOfferTokenVerified">
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
            <div v-if="!isContentLoading && isOfferTokenVerified && showDates">
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
                v-if="isOfferTokenVerified && !isPaymentSucceededOnOffer" 
                color="#66CDAA"
                :disabled="confirmedDate"
                @click.stop="onDateSelect">
                    {{!showDates ? 'PICK ANOTHER DATE' : 'NEXT'}}
            </v-btn>
            <div v-if="showPayment">
                <div v-if="!this.showDates" class="confirmation">
                    <h2>{{isPaymentSucceededOnOffer ? 'Its Done, Meeting Confirmed!!' : 'The Service:'}}</h2>
                    <v-row class="text-center" justify="center" style="align-items: center;">
                        <div style="width: 275px;">
                            <img 
                                :src="this.$store.getters.contentRoom.images.length > 0 ? this.$store.getters.contentRoom.images[0] : 'https://i.ibb.co/t85JhCP/no-Room-Img.png'" 
                                alt="roomPhoto" 
                                width="150" 
                                height="100"
                                style="border: 1px solid; margin: 30px;"
                            />
                            <p class="font">You will meet {{currentOffer.ownerName}} to see this propery</p>
                        </div>
                        <div style="width: 275px;">
                            <h3>When: </h3>
                            <p class="font">
                                {{new Date(new Date(currentOffer.meetingDates[dateSelectedIndex].date).setDate(new Date(currentOffer.meetingDates[dateSelectedIndex].date).getDate()+1)).toDateString()}},
                                at {{currentOffer.meetingDates[dateSelectedIndex].time}}
                            </p>
                        </div>
                        <div style="width: 275px;">
                            <h3>Where: </h3>
                            <div>
                                <v-icon style="font-size: 60px;" large color="green darken-2">mdi-map-marker</v-icon>
                            </div>
                            <p class="font" >
                                {{this.$store.getters.contentRoom.location.street1}}, 
                                {{this.$store.getters.contentRoom.location.street2}},
                                {{this.$store.getters.contentRoom.location.city}},
                                {{this.$store.getters.contentRoom.location.state}},
                                {{this.$store.getters.contentRoom.location.zipCode}},
                                {{this.$store.getters.contentRoom.location.country}}
                            </p>
                            <v-btn color="teal" small dark @click="openAddress">
                                Open Address
                            </v-btn>
                        </div>
                    </v-row>
                </div>
                
                <v-btn 
                    color="#9acd32"
                    v-if="!this.showDates && !confirmedDate" 
                    @click.stop="confirmedDate = true"
                > 
                    Confirm Information 
                </v-btn>
                    
                <div v-if="confirmedDate">
                    <!-- const {location: {street1, street2, city, state, zipCode, country}} = this.contentRoom; -->
                    <Checkout :offerData="{
                            roomAddress: {
                                street1: this.$store.getters.contentRoom.location.street1, 
                                street2: this.$store.getters.contentRoom.location.street2,
                                city: this.$store.getters.contentRoom.location.city,
                                state: this.$store.getters.contentRoom.location.state,
                                zipCode: this.$store.getters.contentRoom.location.zipCode,
                                country: this.$store.getters.contentRoom.location.country
                            },
                            officialMeetingDate: {
                                date: new Date(new Date(currentOffer.meetingDates[dateSelectedIndex].date).setDate(new Date(currentOffer.meetingDates[dateSelectedIndex].date).getDate()+1)).toDateString(),
                                time: currentOffer.meetingDates[dateSelectedIndex].time
                            },
                            whenWasMeetingScheduled: new Date(),
                            meetingScheduled: true,
                            readByReceiver: false,
                            status: `Meeting Scheduled for ${new Date(new Date(currentOffer.meetingDates[dateSelectedIndex].date).setDate(new Date(currentOffer.meetingDates[dateSelectedIndex].date).getDate()+1)).toDateString()}, at ${currentOffer.meetingDates[dateSelectedIndex].time}!`,
                            objectId: this.$store.getters.currentOffer.objectId
                        }"/>
                </div>
            </div>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
let jwt = require('jsonwebtoken');
import { mapGetters, mapActions } from 'vuex'
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'
import Checkout from './Checkout'
// :label="`${ new Date(new Date(date.date).setDate(new Date(date.date).getDate()+1)).toDateString()} at ${date.time}`"

  export default {
    name: 'SelectDateAndPay',
    components: { Checkout },
    computed: {
      ...mapGetters([
        'isContentLoading',
        'currentOffer',
        'offerErrors',
        'isOfferTokenVerified',
        'isPaymentSucceededOnOffer'
      ])
    },
    data () {
        return {
            data: {},
            tokenExpired: false,
            tokenError: false,
            id: '',
            showForm: true,
            showDates: false,
            // roomImages: [],
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
    // created() {
    //        this.countDownTimer()
    //     },
    methods:{
        ...mapActions([
            'getOffer',
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
        onDateSelect(){
            if(this.dateSelectedIndex === '') this.selectDateError = 'You must select a date!'
            else {
                this.showPayment = true; 
                this.showDates = !this.showDates
                this.selectDateError = ''
            }
        },
        openAddress(){
            const {street1, street2, city, state, zipCode, country} = this.roomLocation;
            this.roomAddress = `https://www.google.com/maps/place/${street1}+${street2}+${city}+${state}+${zipCode}+${country}`;
            window.open(this.roomAddress, '_blank');
        },
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
</style>