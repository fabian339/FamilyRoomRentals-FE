<template>
    <v-row class="text-center" justify="center">
        <v-card class="mx-auto" hover id="mycard">
            <v-card-title class="justify-center">
                <h2>Payment Information</h2>
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
                    <v-btn color="rgb(61, 66, 78)" width="100%" style="margin-top: 10px; color:silver" type="submt"> 
                        <v-progress-circular
                            v-if="loadingPayment"
                            color="blue"
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

export default {
name: 'Checkout',
    data(){
        return {
            loadingPayment: false,
            paymentSucceeded: false,
            cardName: '',
            clientSecret: '',
            cardNameError: ''
        }
    },
    async mounted() {
    //   init()
        // stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

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
            style: {...elementStyles, width: '20%'},
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
                this.loadingPayment = false
                this.paymentSucceeded = true
                console.log(payload)
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
