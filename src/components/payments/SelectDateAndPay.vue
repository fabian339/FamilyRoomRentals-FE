<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <div class="logo" >
          <img :src="require('../../assets/logo.png')" alt="logo" width="400">
        </div>
        <v-col lg="12"> 
            <h2 class="headline font-weight-bold mb-3">
                {{data.name}}, you are {{showPayment ? 'one step away!' : 'a few steps away!'}}
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
            <v-btn v-if="isOfferTokenVerified" color="#66CDAA" @click.stop="onDateSelect">
                    {{!showDates ? 'BACK' : 'NEXT'}}
            </v-btn>
            <div v-if="showPayment" transition="scroll-x-reverse-transition">
                <div id="confirmation">
                    <h2>Comfirmation:</h2>
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
                <div>
                    <Checkout />
                </div>
            </div>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
let jwt = require('jsonwebtoken');
import { mapGetters, mapActions } from 'vuex'
import Checkout from './Checkout'
// import { stripeKey, stripeOptions } from './stripeConfig.json'
// import StripeElement from './StripeElement'
// import { loadStripe } from "@stripe/stripe-js";
// const promise = loadStripe("pk_test_51HapnKJSKBXxCn1NhtSdWf20xtfcBHhY4vdpfsGbcLjEYpYlc7EhPoyZcZtJHUSieWnVnaBPTgtHHRE3neumb8SP00FqpVZSGn");

  export default {
    name: 'SelectDateAndPay',
    components: { Checkout },
    computed: {
      ...mapGetters([
        'isContentLoading',
        'currentOffer',
        'offerErrors',
        'isOfferTokenVerified'
      ])
    },
    data () {
        return {
            data: {},
            tokenExpired: false,
            tokenError: '',
            id: '',
            showForm: true,
            showDates: false,
            roomImages: [],
            roomLocation: {},
            selectDateError: '',
            dateSelectedIndex: '',
            showPayment: false,
            complete: false,
            stripeOptions: {
                required: true
                // see https://stripe.com/docs/stripe.js#element-options for details
            },
            errors: {}
        }
    },
    
    beforeMount(){
        const {secretId, token} = this.$router.history.current.params;

        try {
            var decoded = jwt.verify(token, secretId);
        } catch(err) {
            this.tokenError = err;
        }
        if(decoded){
            // console.log(new Date(decoded.iat) , new Date(decoded.exp))
            if(new Date(decoded.iat) > new Date(decoded.exp)) this.tokenExpired = true;
            else this.data = decoded.data
        }
    },
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