<template>
    <v-row class="text-center" justify="center">
        <div v-if="isPaymentSucceededOnOffer" style="margin: 0px 15%">
            <SuccessAlert 
                :msg="`Congratulations, your payment is processing and you are now ready to meet 
                with ${this.$store.getters.currentOffer.ownerName}. Please pay attention to you email for confirmation and updates!`" 
            />
            <p style="color: seagreen; font-size: 20px;">
                Redirecting to homepage in: <strong>{{ countDown }}</strong>
            </p>
        </div>
        <v-card v-else class="mx-auto" hover id="mycard">
            <v-card-title class="justify-center">
                <h2 style="color:rgb(10 60 28)">Payment Information</h2>
            </v-card-title>
            <form @submit="this.handleSubmit" class="formClass">
                <v-text-field
                    placeholder="Name on card"
                    style="margin: 10px;"
                    v-model="cardName"
                    :rules="[cardName.length > 0 || 'Please enter name on card!']"
                    required
                ></v-text-field>
                <div id="card-number" class="elementContainer"></div>
                <div id="expiry-cvc-postalCode-container">
                    <div id="card-expiry" class="elementContainer adjustWidth"></div>
                    <div id="card-cvc" class="elementContainer adjustWidth "></div>
                    <div id="card-postalCode" class="elementContainer adjustWidth"></div>
                </div>
                <v-card-actions class="justify-center">
                    <v-btn color="#1f4e41" width="100%" style="margin-top: 10px; color:silver" type="submt"> 
                        <v-progress-circular
                            v-if="loadingPayment"
                            color="silver"
                            :size="35"
                            :width="5"
                            indeterminate
                        >
                        </v-progress-circular>
                        <span v-else>Pay Service Fee</span>
                    </v-btn>
                </v-card-actions>
                <p id="card-errors"></p>
            </form>
        </v-card>
    </v-row>
</template>

<script>
// import {loadStripe} from '@stripe/stripe-js';
// const {loadStripe} = require('@stripe/stripe-js')
var stripe = window.Stripe('pk_test_51HapnKJSKBXxCn1NhtSdWf20xtfcBHhY4vdpfsGbcLjEYpYlc7EhPoyZcZtJHUSieWnVnaBPTgtHHRE3neumb8SP00FqpVZSGn'),
    elements = stripe.elements();
// let stripe;
import axios from 'axios';
import SuccessAlert from '@/components/notification/SuccessAlert.vue'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import {SendEmailToClientOnMeetingScheduled, SendEmailToUserOnMeetingScheduled} from '../../globals/emails'

export default {
    props: ['offerData'],
    components: {SuccessAlert},
    name: 'Checkout',
    computed: {
        ...mapGetters([
            'isPaymentSucceededOnOffer',
        ]),
    },
    data(){
        return {
            loadingPayment: false,
            // paymentSucceeded: false,
            cardName: '',
            clientSecret: '',
            cardNameError: '',
            countDown: 15,
        }
    },
    async mounted() {
        var elementStyles = {
            base: {
                color: '#32325D',
                fontWeight: 500,
                fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
                fontSize: '20px',
                fontSmoothing: 'antialiased',
                '::placeholder': {
                    color: '#CFD7DF',
                },
                ':-webkit-autofill': {
                    color: '#e39f48',
                },
            },
            invalid: {
                iconColor: '#FFC7EE',
                color: '#FFC7EE',
            },
        };

        var elementClasses = {
            focus: 'focused',
            empty: 'empty',
            invalid: 'invalid',
        };

        var cardNumber = elements.create('cardNumber', {
            style: elementStyles,
            showIcon: true,
            // placeholder: 'Card Number',
            classes: elementClasses,
        });
        cardNumber.mount('#card-number');
        cardNumber.on('change', this.handleChange);
        var cardExpiry = elements.create('cardExpiry', {
            style: elementStyles,
            classes: elementClasses,
        });
        cardExpiry.mount('#card-expiry');
        cardExpiry.on('change', this.handleChange);

        var cardCvc = elements.create('cardCvc', {
            style: elementStyles,
            classes: elementClasses,
        });
        cardCvc.mount('#card-cvc');
        cardCvc.on('change', this.handleChange);

        var cardpostalCode = elements.create('postalCode', {
            style: elementStyles,
            classes: elementClasses,
        });
        cardpostalCode.mount('#card-postalCode');
        cardpostalCode.on('change', this.handleChange);
        let paymentIntent = await this.PaymentIntent()
        this.clientSecret = paymentIntent.data.result.clientSecret;
    },
       
    methods: {
        ...mapActions([
            'updateOffer',
            'sendEmail'
        ]),
        ...mapMutations([
            'PAYMENT_SUCCEEDED_ON_OFFER',
            'SET_COUNTDOWN'
        ]),
        handleChange(event) {
            var displayError = document.getElementById('card-errors');
            displayError.textContent = (event.error ? event.error.message : '')
        }, 
        async handleSubmit(ev) {
            ev.preventDefault();
            this.loadingPayment = true

            //  4242 4242 4242 4242  08 / 24  123  94107
            // if(this.cardName === '') 
            const payload = await stripe.confirmCardPayment(this.clientSecret, {
            payment_method: {
                card: elements.getElement('cardNumber'),
                billing_details: {
                        name: this.cardName,
                        // email: 
                    },
                }
            });
             if (payload.error) {
                var displayError = document.getElementById('card-errors');
                displayError.textContent = `Payment failed, ${payload.error.message}`;
                this.loadingPayment = false
            } else {
                // this.loadingPayment = false
                // this.paymentSucceeded = true
                console.log(payload)
                if(this.offerData){
                    const clientEmailData = SendEmailToClientOnMeetingScheduled({
                        // email: this.$store.getters.currentOffer.email,
                        email: 'rzw17825@bcaoo.com',
                        name: this.$store.getters.currentOffer.full_name,
                        ownerName: this.$store.getters.currentOffer.ownerName,
                        ownerEmail: this.$store.getters.currentOffer.ownerEmail,
                        ownerPhone: this.$store.getters.currentOffer.ownerPhone,
                        offer: this.$store.getters.currentOffer.offer,
                        meetingDate: `${this.offerData.officialMeetingDate.date} at ${this.offerData.officialMeetingDate.time}`,
                        roomId: this.$store.getters.currentOffer.roomId,
                        meetingLocation: this.offerData.roomAddress,
                    })

                    const userEmailData = SendEmailToUserOnMeetingScheduled({
                        email: this.$store.getters.currentOffer.ownerEmail,
                        name: this.$store.getters.currentOffer.ownerName,
                        clientName: this.$store.getters.currentOffer.full_name,
                        offer: this.$store.getters.currentOffer.offer,
                        roomId: this.$store.getters.currentOffer.roomId,
                        meetingDate: `${this.offerData.officialMeetingDate.date} at ${this.offerData.officialMeetingDate.time}`,
                        meetingLocation: this.offerData.roomAddress,
                        clientEmail: this.$store.getters.currentOffer.email,
                        clientPhone: this.$store.getters.currentOffer.phone,
                    })

                    // console.log(this.offerData);
                    this.sendEmail(userEmailData);
                    this.sendEmail(clientEmailData);
                    this.updateOffer(this.offerData);
                    this.loadingPayment = false
                    this.PAYMENT_SUCCEEDED_ON_OFFER(true);
                    this.SET_COUNTDOWN(true);
                    this.countDownTimer();
                    // console.log("dataa", this.offerData)
                } else{
                    console.log("Donation Payment")
                } 
            }
        },
        countDownTimer() {
            if(this.countDown === 0){
                this.SET_COUNTDOWN(false);
                this.$router.push('/')
            }
            if(this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }
        },
        async PaymentIntent(){
            return (await  axios.post('/functions/paymentIntent') );
        }

    }
}
</script>

<style scoped>
    #mycard{
        margin: 35px;
        width: 60%;
        /* border-radius: 20px; */
    }
    .formClass{
        width: 55%;
        display: inline-block;
    }
    .elementContainer{
        /* background-color: #778899; */
        padding: 10px;
        border: .5px solid;
        margin: 10px;
        border-radius: 5px;
    }
    .adjustWidth{
        width: 35%
    }
    #expiry-cvc-postalCode-container{
        display: flex;
    }
    #input-94{
        color: white;
        font-size: 25px;
    }
    #card-errors{
        color: darkred;
        margin: 25px;
    }
</style>
