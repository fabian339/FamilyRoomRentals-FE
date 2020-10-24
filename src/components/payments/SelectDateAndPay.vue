<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <div class="logo" >
          <img :src="require('../../assets/logo.png')" alt="logo" width="400">
        </div>
        <h2 v-if="tokenError">You are unauthorized to view this page!</h2>
        <h2 v-else-if="tokenExpired"> Sorry, it looks like this page has expired.</h2>
        <h2 v-else-if="this.$store.getters.currentOffer.meetingScheduled && !this.$store.getters.isCountDownShowing">A meeting was already scheduled!</h2>
        <v-col lg="12" v-else> 
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
                <div v-if="!this.showDates" id="confirmation">
                    <h2>{{isPaymentSucceededOnOffer ? 'Its Done, Meeting Confirmed!!' : 'The Service:'}}</h2>
                    <v-row class="text-center" justify="center" style="align-items: center;">
                        <div style="width: 275px;">
                            <img 
                                :src="roomImages.length > 0 ? roomImages[0] : 'https://i.ibb.co/t85JhCP/no-Room-Img.png'" 
                                alt="roomPhoto" 
                                width="150" 
                                height="100"
                                style="border: 2px solid; margin: 30px;"
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
                
                <v-btn 
                    color="#9acd32"
                    v-if="!this.showDates && !confirmedDate" 
                    @click.stop="confirmedDate = true"
                > 
                    Confirm Information 
                </v-btn>
                    
                <div v-if="confirmedDate">
                    <div v-if="!this.$store.getters.isPaymentSucceededOnOffer" style="margin: 15px 20%">
                        <h4>
                                FamilyRoomRemtals charges a one time fee of $20 for the service provided. To learn more, 
                                please read our <a href="#"> Terms & Conditions. </a>
                        </h4>
                        <h2 style="margin-top: 25px; color: darkgreen;">{{data.name}}, You are one step away!</h2>
                    </div>
                    <!-- const {location: {street1, street2, city, state, zipCode, country}} = this.contentRoom; -->
                    <Checkout :offerData="{
                            roomAddress: {
                                street1: roomLocation.street1, 
                                street2: roomLocation.street2,
                                city: roomLocation.city,
                                state: roomLocation.state,
                                zipCode: roomLocation.zipCode,
                                country: roomLocation.country
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
            roomImages: [],
            roomLocation: {},
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