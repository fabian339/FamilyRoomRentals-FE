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
                    please read our <a href="#"> Terms & Conditions. </a>
            </h4>
            <h2 style="margin-top: 25px; color: darkgreen;">{{this.$store.getters.currentOffer.full_name}}, You are one step away!</h2>
            <v-card class="mx-auto" hover id="mycard" width="100%">
                <v-card-title class="justify-center" style="background-color: darkseagreen">
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
                    <v-card-actions v-if="!paymentSucceeded" class="justify-center">
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
        </div>
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
import { mapActions, mapGetters } from 'vuex'
import {SendEmailToClientOnMeetingScheduled, SendEmailToUserOnMeetingScheduled} from '../../emailTemplates/emails'
import {
    SendReminder1ToClient,
    SendReminder1ToUser,
    SendReminder2ToClient,
    SendReminder2ToUser,
    SendCheckInReminderToClient,
    SendCheckInReminderToUser,
    SendFollowup1ToClient,
    SendFollowup1ToUser,
    SendFollowup2ToClient,
    SendFollowup2ToUser,
    SendFollowup3ToClient,
    SendFollowup3ToUser
    } from '../../emailTemplates/scheduleEmails'


export default {
    props: ['offerData'],
    components: {SuccessAlert},
    name: 'Checkout',
    computed: {
        ...mapGetters([
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
        this.clientSecret = paymentIntent.data.clientSecret;
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
                // console.log(payload)
                if(this.offerData){
                    //send emails right after completing payment
                    await this.sendEmailsOnPaymentCompleted()
                    //schedule reminder and follow up emails after completing payment 
                    await this.scheduleEmailsOnPaymentCompleted(this.offerData.officialMeetingDate.date, this.offerData.officialMeetingDate.time)
                    //updates the room
                    // const {secretId} = this.$router.history.current.params;
                    // this.updateRoom({
                    //     objectId: secretId,
                    //     meetingsPending: this.$store.getters.contentRoom.meetingsPending + 1,
                    // })
                    // //updates the offer
                    // this.updateOffer(this.offerData);
                    // this.$emit('paymentSucceeded', this.paymentSucceeded)
                    // this.startCountDownTimer();
                }
            }
        },
        async sendEmailsOnPaymentCompleted(){
            const clientEmailData = SendEmailToClientOnMeetingScheduled({
                email: this.$store.getters.currentOffer.email,
                // email: 'rzw17825@bcaoo.com',
                name: this.$store.getters.currentOffer.full_name,
                ownerName: this.$store.getters.currentOffer.ownerName,
                ownerEmail: this.$store.getters.currentOffer.ownerEmail,
                ownerPhone: this.$store.getters.currentOffer.ownerPhone,
                offer: this.$store.getters.currentOffer.offer,
                meetingDate: `${this.offerData.officialMeetingDate.date} at ${this.offerData.officialMeetingDate.time}`,
                roomId: this.$store.getters.currentOffer.roomId,
                meetingLocation: this.offerData.roomAddress,
                token: this.offerData.token,
                verificationId: this.offerData.objectId
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

            console.log(userEmailData, clientEmailData);
            this.loadingPayment = false
            this.paymentSucceeded = true
            // await this.sendEmail(userEmailData);
            // await this.sendEmail(clientEmailData)

        },
        scheduleEmailsOnPaymentCompleted(meetingDate, meetingTime){
            const scheduledDates = this.remindersAndFollowUpDates(meetingDate, meetingTime);

            const clientEmailData = {
                clientEmail: this.$store.getters.currentOffer.email,
                // clientEmail: 'justmike347@gmail.com',
                clientName: this.$store.getters.currentOffer.full_name,
                ownerName: this.$store.getters.currentOffer.ownerName,
                ownerEmail: this.$store.getters.currentOffer.ownerEmail,
                ownerPhone: this.$store.getters.currentOffer.ownerPhone,
                offer: this.$store.getters.currentOffer.offer,
                meetingDate: `${meetingDate} at ${meetingTime}`,
                roomId: this.$store.getters.currentOffer.roomId,
                meetingLocation: this.offerData.roomAddress,
                token: this.offerData.token,
                verificationId: this.offerData.objectId
            }
            const userEmailData = {
                ownerEmail: this.$store.getters.currentOffer.ownerEmail,
                // ownerEmail: 'monterojose004@gmail.com',
                ownerName: this.$store.getters.currentOffer.ownerName,
                clientName: this.$store.getters.currentOffer.full_name,
                offer: this.$store.getters.currentOffer.offer,
                roomId: this.$store.getters.currentOffer.roomId,
                meetingDate: `${meetingDate} at ${meetingTime}`,
                meetingLocation: this.offerData.roomAddress,
                clientEmail: this.$store.getters.currentOffer.email,
                clientPhone: this.$store.getters.currentOffer.phone,
            }
            scheduledDates.forEach(date => {
                // console.log(date)
                if(date.reminder1){
                    let emailDataClient = SendReminder1ToClient({...clientEmailData, date: date.reminder1 });
                    let emailDataUser = SendReminder1ToUser({...userEmailData, date: date.reminder1 });
                    this.sendScheduledEmail(emailDataClient, emailDataUser)
                    // console.log({date: date.reminder1})
                }
                if(date.reminder2){
                    let emailDataClient = SendReminder2ToClient({...clientEmailData, date: date.reminder2});
                    let emailDataUser = SendReminder2ToUser({...userEmailData, date: date.reminder2});
                    this.sendScheduledEmail(emailDataClient, emailDataUser)
                }
                if(date.checkInReminder){
                    let emailDataClient = SendCheckInReminderToClient({...clientEmailData, date: date.checkInReminder});
                    let emailDataUser = SendCheckInReminderToUser({...userEmailData, date: date.checkInReminder});
                    this.sendScheduledEmail(emailDataClient, emailDataUser)
                }
                if(date.followUp1){
                    let emailDataClient = SendFollowup1ToClient({...clientEmailData, date: date.followUp1})
                    let emailDataUser = SendFollowup1ToUser({...userEmailData, date: date.followUp1});
                    this.sendScheduledEmail(emailDataClient, emailDataUser)
                }
                if(date.followup2){
                    let emailDataClient = SendFollowup2ToClient({...clientEmailData, date: date.followup2})
                    let emailDataUser = SendFollowup2ToUser({...userEmailData, date: date.followup2})
                    this.sendScheduledEmail(emailDataClient, emailDataUser)
                }
                if(date.followup3){
                    let emailDataClient = SendFollowup3ToClient({...clientEmailData, date: date.followup3})
                    let emailDataUser = SendFollowup3ToUser({...userEmailData, date: date.followup3})
                    this.sendScheduledEmail(emailDataClient, emailDataUser)
                }
            })
        },
        sendScheduledEmail(clientEmailData, ownerEmailData){
            console.log(clientEmailData, ownerEmailData)
            this.scheduleEmail(clientEmailData)
            this.scheduleEmail(ownerEmailData)
        },
        remindersAndFollowUpDates(meetingDate, meetingTime){
            let dates = [];
            //Reminder 1
            let tempDate1 = new Date(`${meetingDate}, ${meetingTime}`)
            tempDate1.setDate(tempDate1.getDate() - 2)
            dates.push({
                reminder1 : {
                    date: tempDate1.toDateString(),
                    time: tempDate1.toLocaleTimeString()
                }
            })

            //Reminder 2
            let tempDate2 = new Date(`${meetingDate}, ${meetingTime}`)
            // selectedDate.getDate()
            tempDate2.setDate(tempDate2.getDate() - 1)
            dates.push({
                reminder2: {
                    date: tempDate2.toDateString(),
                    time: tempDate2.toLocaleTimeString()
                }
            })

            //Check-In Reminder 
            dates.push({
                checkInReminder: {
                    date: meetingDate,
                    time: meetingTime
                }
            })

            //Follow-up 1
            let tempDate3 = new Date(`${meetingDate}, ${meetingTime}`)
            tempDate3.setHours(tempDate3.getHours() + 1)
            dates.push({
                followUp1: {
                    date: tempDate3.toDateString(),
                    time: tempDate3.toLocaleTimeString()
                }
            })

            //Follow-up 2
            let tempDate4 = new Date(`${meetingDate}, ${meetingTime}`)
            tempDate4.setDate(tempDate4.getDate() + 1)
            dates.push({
                followup2: {
                    date: tempDate4.toDateString(),
                    time: tempDate4.toLocaleTimeString()
                }
            })

            //Follow-up 3
            let tempDate5 = new Date(`${meetingDate}, ${meetingTime}`)
            tempDate5.setDate(tempDate5.getDate() + 2)
            dates.push({
                followup3: {
                    date: tempDate5.toDateString(),
                    time: tempDate5.toLocaleTimeString()
                }
            })

            return dates;
        },
        startCountDownTimer() {
            if(this.countDown === 0){
                this.$router.push('/')
            }
            if(this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.startCountDownTimer()
                }, 1000)
            }
        },
        async PaymentIntent(){
            return (await axios.post('https://familyroomrentals.b4a.app/paymentIntent') );
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
