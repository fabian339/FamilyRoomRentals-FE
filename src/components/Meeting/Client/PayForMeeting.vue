<template>
    <v-row class="text-center" justify="center">
        <div v-if="paymentSucceeded" style="margin: 0px 15%">
            <SuccessAlert 
                :msg="`Congratulations, your payment is processing and you are now ready to meet 
                with ${this.$store.getters.currentOffer.ownerName}. Please pay attention to you email for confirmation and updates!`" 
            />
            <p style="color: seagreen; font-size: 20px;">
                Redirecting to homepage in: <strong>{{ countDown }}</strong>
            </p>
        </div>
        <div v-else >
            <h4 style="margin: 0 10%;">
                    FamilyRoomRemtals charges a one time fee of $20 for the service provided. To learn more, 
                    please read our  <router-link to="/terms-and-conditions">Terms and Conditions</router-link>.
            </h4>
            <h2 style="margin-top: 25px; color: darkgreen;">{{this.$store.getters.currentOffer.clientName}}, You are one step away!</h2>
                <v-btn 
                    color="#1f4e41" 
                    width="30%" 
                    style="margin-top: 10px; color:silver"
                    @click.stop="redirectToCheckout"
                > 
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
        </div>
    </v-row>
</template>

<script>
// import {stripe} from '@stripe/stripe-js';
// const {loadStripe} = require('@stripe/stripe-js')
var stripe = window.Stripe('pk_test_51HapnKJSKBXxCn1NhtSdWf20xtfcBHhY4vdpfsGbcLjEYpYlc7EhPoyZcZtJHUSieWnVnaBPTgtHHRE3neumb8SP00FqpVZSGn')
    // elements = stripe.elements();
// let stripe;
import axios from 'axios';
import SuccessAlert from '@/components/Offer/SuccessAlert.vue'
import { mapActions, mapGetters } from 'vuex'
// import {SendEmailToClientOnMeetingScheduled, SendEmailToUserOnMeetingScheduled} from '../../../emailTemplates/emails'
let jwt = require('jsonwebtoken');


export default {
    props: ['offerData'],
    components: {SuccessAlert},
    name: 'Checkout',
    computed: {
        ...mapGetters([
            'content'
        ]),
    },
    data(){
        return {
            loadingPayment: false,
            paymentSucceeded: false,
            cardName: '',
            clientSecret: '',
            cardNameError: '',
            countDown: 15,
        }
    },
    async mounted() {
        // this.clientSecret = paymentIntent.data.clientSecret;
    },
       
    methods: {
        ...mapActions([
            'updateOffer',
            'updateRoom',
            'sendEmail',
            'scheduleEmail'
        ]),
        // onClickButton (event) {
        //     this.$emit('clicked', 'someValue')
        // },
        handleChange(event) {
            var displayError = document.getElementById('card-errors');
            displayError.textContent = (event.error ? event.error.message : '')
        }, 
        
        //             //updates the room
        //             const {secretId} = this.$router.history.current.params;
        //             this.updateRoom({
        //                 objectId: secretId,
        //                 countOfOffersScheduled: this.$store.getters.contentRoom.countOfOffersScheduled + 1,
        //                 meetingsPending: this.$store.getters.contentRoom.meetingsPending + 1,
        //             })

        //             //object of dates to send reminder and follow up 
        //             let datesToSendRemindersAndFollowUps = this.remindersAndFollowUpDates(this.offerData.officialMeetingDate.date, this.offerData.officialMeetingDate.time)
        //                 console.log('The dates are:', datesToSendRemindersAndFollowUps)
        //             // updates the offer
        //             this.updateOffer({
        //                 ...this.offerData,
        //                 whenWasMeetingScheduled: new Date(),
        //                 meetingScheduled: true,
        //                 readByReceiver: false,
        //                 objectId: this.$store.getters.currentOffer.objectId,
        //                 remindersAndFollowUpDates: datesToSendRemindersAndFollowUps
        //             });
        //             this.$emit('paymentSucceeded', this.paymentSucceeded)
        //             // send emails right after completing payment
        //             await this.sendEmailsOnPaymentCompleted()
        //             // this.startCountDownTimer();
        //         }
        //     }
        // },
        async redirectToCheckout(e){
            e.preventDefault()
            this.loadingPayment = true
            const {secretId} = this.$router.history.current.params;

            let token = jwt.sign({
                iat: Math.floor(new Date()),
                exp: new Date().setDate(new Date().getDate() + 60),
                data: { 
                    name: this.$store.getters.currentOffer.clientName,
                    type: 'meeting'
                }
            }, secretId);

            let data = {
                metadata: {
                    sprite_client_customerId: this.$store.getters.currentOffer.sprite_client_customerId,
                    meetingToken: token,
                    meetingDate: this.offerData.officialMeetingDate.date,
                    meetingTime: this.offerData.officialMeetingDate.time,
                    meetingDeletionDate: this.offerData.officialMeetingDate.meetingDeletionDate,
                    roomId: secretId,
                    countOfOffersScheduled: this.$store.getters.contentRoom.countOfOffersScheduled + 1,
                    meetingsPending: this.$store.getters.contentRoom.meetingsPending + 1,
                    roomImage: this.$store.getters.currentOffer.roomImage,
                    status: this.offerData.status,
                    offerId: this.$store.getters.currentOffer.objectId,
                    offerAmount: this.$store.getters.currentOffer.offer,
                    clientName: this.$store.getters.currentOffer.clientName,
                    clientEmail: this.$store.getters.currentOffer.clientEmail,
                    clientPhone: this.$store.getters.currentOffer.clientPhone,
                    ownerPhone: this.$store.getters.currentOffer.ownerPhone,
                    ownerName: this.$store.getters.currentOffer.ownerName,
                    ownerEmail: this.$store.getters.currentOffer.ownerEmail,
                    ownerId: this.$store.getters.currentOffer.receiverId,
                    meetingLocation: `${this.$store.getters.contentRoom.location.street1}, ${this.$store.getters.contentRoom.location.street2}, ${this.$store.getters.contentRoom.location.city}, ${this.$store.getters.contentRoom.location.state}, ${this.$store.getters.contentRoom.location.zipCode}, ${this.$store.getters.contentRoom.location.country}`,
                },
                itemName: `Service: Meeting with ${this.$store.getters.currentOffer.ownerName} on ${`${this.offerData.officialMeetingDate.date} at ${this.offerData.officialMeetingDate.time}.`}`,
                account: process.env.VUE_APP_STRIPE_CONNECTED_ACCOUNT,
                cancel_url: "https://www.yahoo.com/",
            }
            console.log("Data to send", data)
            // await axios.post('https://familyroomrentals-be.herokuapp.com/checkout', data)
            // new heroku url
            await axios.post('https://my-first-heroku-app-api.herokuapp.com/checkout', data)
            // await axios.post('http://localhost:3005/checkout', data)

                .then(res => {
                    // console.log(res.data)
                    stripe.redirectToCheckout({
                        // Make the id field from the Checkout Session creation API response
                        // available to this file, so you can provide it as argument here
                        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                        sessionId: res.data.session.id
                        // sessionId: ",kgkgkug"
                    });
                    this.loadingPayment = false
                })
                .catch(err => {
                    console.log("Error: ", err)
                    this.loadingPayment = false
                })
            // console.log("payingg")
        },
        //send emails after completing payment
        // async sendEmailsOnPaymentCompleted(){
        //     let commonData = {
        //         clientEmail: this.$store.getters.currentOffer.clientEmail,
        //         clientName: this.$store.getters.currentOffer.clientName,
        //         ownerName: this.$store.getters.currentOffer.ownerName,
        //         ownerEmail: this.$store.getters.currentOffer.ownerEmail,
        //         offer: this.$store.getters.currentOffer.offer,
        //         roomId: this.$store.getters.currentOffer.roomId,
        //         meetingDate: `${this.offerData.officialMeetingDate.date} at ${this.offerData.officialMeetingDate.time}`,
        //         meetingLocation: this.$store.getters.contentRoom.location,
        //     }
        //     const clientEmailData = SendEmailToClientOnMeetingScheduled({
        //         ...commonData,
        //         ownerPhone: this.$store.getters.currentOffer.ownerPhone,
        //         token: this.$store.getters.currentOffer.offerToken,
        //         verificationId: this.$store.getters.currentOffer.objectId
        //     })

        //     const userEmailData = SendEmailToUserOnMeetingScheduled({
        //         ...commonData,
        //         clientPhone: this.$store.getters.currentOffer.clientPhone,
        //     })

        //     console.log(userEmailData, clientEmailData);
        //     this.loadingPayment = false
        //     this.paymentSucceeded = true
        //     await this.sendEmail(userEmailData);
        //     await this.sendEmail(clientEmailData)

        // },
        // startCountDownTimer() {
        //     if(this.countDown === 0){
        //         this.$router.push('/')
        //     }
        //     if(this.countDown > 0) {
        //         setTimeout(() => {
        //             this.countDown -= 1
        //             this.startCountDownTimer()
        //         }, 1000)
        //     }
        // },
        async PaymentIntent(){
            let data = {
                name: "Service: Meetin with Montero Jose on 2/2/2020 at 3:00pm",
                account: "acct_1IAg9fR60Ak0zuqu",
                image: "https://i.ibb.co/2PNy7yB/guitar.png",
                success_url: "https://www.google.com/",
                cancel_url: "https://www.yahoo.com/"
            }
            return (await axios.post('https://familyroomrentals.b4a.app/checkout', data) );
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
        width: 60%;
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
