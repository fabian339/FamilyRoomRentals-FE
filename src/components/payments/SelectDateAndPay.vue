<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <div class="logo" >
          <img :src="require('../../assets/logo.png')" alt="logo" width="400">
        </div>
        <h2 v-if="tokenError">You are unauthorized to view this page!</h2>
        <v-col lg="12" v-else> 
            <h2 v-if="!showPayment" class="headline font-weight-bold mb-3">
                {{data.name}}, you are a few steps away!'
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
                                :label="`${ new Date(date.date).toString().substr(0, 15)} at ${date.time}`"
                            ></v-radio>
                        </div>
                </v-radio-group>

                <h4>You will be meeting with {{currentOffer.ownerName}} on this date.</h4>
                <p style="margin: 10px 0px; color: darkblue">He/she will show you the property, and you will have the time to ask for details.</p>
                <p style="color: red">{{selectDateError}}</p>
            </div>
            <v-btn v-if="isOfferTokenVerified && !isPaymentSucceededOnOffer" color="#66CDAA" @click.stop="onDateSelect">
                    {{!showDates ? 'BACK' : 'NEXT'}}
            </v-btn>
            <div v-if="showPayment">
                <div id="confirmation">
                    <h2>{{isPaymentSucceededOnOffer ? 'Its Done, Meeting Confirmed!!' : 'The Service:'}}</h2>
                    <v-row class="text-center" justify="center" style="align-items: center;">
                        <div style="width: 275px;">
                            <img 
                                :src="roomImages[0]" 
                                alt="roomPhoto" 
                                width="150" 
                                height="100"
                                style="b
                                order: 2px solid; margin: 30px;"
                            />
                            <p>You will meet {{currentOffer.ownerName}} too see this propery</p>
                        </div>
                        <div style="width: 275px;">
                            <h3>When: </h3>
                            <p>
                                {{new Date(currentOffer.meetingDates[dateSelectedIndex].date).toString().substr(0, 15)}},
                                at {{currentOffer.meetingDates[dateSelectedIndex].time}}
                            </p>
                        </div>
                        <div style="width: 275px;">
                            <h3>Where: </h3>
                            <div>
                                <v-icon style="font-size: 60px;" large color="green darken-2">mdi-map-marker</v-icon>
                            </div>
                            <p class="font" >
                                {{roomLocation.street1}}, 
                                {{roomLocation.street2}},
                                {{roomLocation.city}},
                                {{roomLocation.state}},
                                {{roomLocation.zipCode}},
                                {{roomLocation.country}}
                            </p>
                            <v-btn color="teal" small dark @click="openAddress">
                                Open Address
                            </v-btn>
                        </div>
                    </v-row>
                </div>
                <div v-if="isPaymentSucceededOnOffer" style="margin: 0px 15%">
                    <SuccessAlert 
                        :msg="`Congratulations, your payment is processing and you are now ready to meet 
                        with ${currentOffer.ownerName}. Please pay attention to you email for confirmation and updates!`" 
                    />
                    <p>Redirecting on: {{ timerCount }}</p>
                </div>
                <div v-else>
                    <div style="margin: 0px 20%">
                        <h4>
                            FamilyRoomRemtals charges a one time fee of $20 for the service provided. To learn more, 
                            please read our <a href="#"> Terms & Conditions. </a>
                        </h4>
                        <h2 style="margin-top: 25px; color: darkgreen;">Nicol, You are one step away!</h2>
                    </div>
                    <div>
                        <Checkout :offerData="{
                                roomAddress: `${roomLocation.street1}, 
                                    ${roomLocation.street2},
                                    ${roomLocation.city},
                                    ${roomLocation.state},
                                    ${roomLocation.zipCode},
                                    ${roomLocation.country}`,
                                officialMeetingDate: `${new Date(currentOffer.meetingDates[dateSelectedIndex].date).toString().substr(0, 15)},
                                        at ${currentOffer.meetingDates[dateSelectedIndex].time}`,
                            }"/>
                    </div>
                </div>  
            </div>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
let jwt = require('jsonwebtoken');
import { mapGetters, mapActions } from 'vuex'
import SuccessAlert from '@/components/notification/SuccessAlert.vue'
import Checkout from './Checkout'

  export default {
    name: 'SelectDateAndPay',
    components: { Checkout, SuccessAlert },
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
            roomImages: [],
            roomLocation: {},
            selectDateError: '',
            dateSelectedIndex: '',
            showPayment: false,
            complete: false,
            timerCount : 10,
            stripeOptions: {
                required: true
                // see https://stripe.com/docs/stripe.js#element-options for details
            },
            errors: {}
        }
    },
    // watch: {

    //         timerCount: {
    //             handler(value) {

    //                 if (value > 0) {
    //                     setTimeout(() => {
    //                         this.timerCount--;
    //                     }, 1000);
    //                 }

    //             },
    //             immediate: true // This ensures the watcher is triggered upon creation
    //         }

    //     },
    
    beforeMount(){
        const {secretId, token} = this.$router.history.current.params;

        try {
            var decoded = jwt.verify(token, secretId);
        } catch(err) {
            this.tokenError = true;
        }
        if(decoded){
            // console.log(new Date(decoded.iat) , new Date(decoded.exp))
            if(new Date(decoded.iat) > new Date(decoded.exp)) this.tokenExpired = true;
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
                    id: 'Must nor be empty, Verification id was send to your email.'
                }
                this.errors = errors;
            }
            else {
                this.getOffer({
                    id :this.id,
                    token: this.$router.history.current.params.token
                });
                const {secretId} = this.$router.history.current.params;
                let roomIndex = this.$store.getters.contentRooms.findIndex(room => room.objectId === secretId);
                this.roomImages = this.$store.getters.contentRooms[roomIndex].images
                this.roomLocation = this.$store.getters.contentRooms[roomIndex].location
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
        // countDownTimer() {
        //     if(this.countDown > 0) {
        //         setTimeout(() => {
        //             this.countDown -= 1
        //             this.countDownTimer()
        //         }, 1000)
        //     }
        // },
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
    #confirmation{
        border: 2px dashed powderblue;
        padding: 15px;
        width: 85%;
        border-radius: 5px;
        margin: 20px 7.5%;
    }
</style>