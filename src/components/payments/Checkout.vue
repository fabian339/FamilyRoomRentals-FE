<template>
    <v-row class="text-center" justify="center">

<div id="mycard">
    <form @submit="this.handleSubmit">
        <div id="card-number" class="elementContainer"></div>
        <div id="card-expiry" class="elementContainer"></div>
        <div id="card-cvc" class="elementContainer"></div>
        <div id="card-postalCode" class="elementContainer"></div>
        <v-btn color="#66CDAA" type="submt">Next</v-btn>
        <p id="card-errors"></p>
    </form>
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

export default {
name: 'Checkout',
    data(){
        return {
            loadingPayment: false,
            paymentSucceeded = false,
        }
    },
    mounted() {
    //   init()
        // stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

        var elementStyles = {
            base: {
                color: '#32325D',
                fontWeight: 500,
                fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
                fontSize: '25px',
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
            placeholder: 'Card Number',
            classes: elementClasses,
        });
        cardNumber.mount('#card-number');
        cardNumber.on('change', this.handleChange);
        var cardExpiry = elements.create('cardExpiry', {
            style: {...elementStyles, 
            elementStyles: {
                base: {
                    textAlign: 'center'
                }
            }
            },
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
        // this.PaymentIntent();
    },
       
    methods: {
        handleChange(event) {
            var displayError = document.getElementById('card-errors');
            displayError.textContent = (event.error ? event.error.message : '')
        }, 
        async handleSubmit(ev) {
            // ev.preventDefault();
            // this.loadingPayment = true

            //              //  4242 4242 4242 4242  08 / 24  123  94107

            // const payload = await stripe.confirmCardPayment('pi_1Hba2SJSKBXxCn1NCWAZi9CC_secret_XkkOeDHUDZElzQogUPLX3vDQs', {
            // payment_method: {
            //     card: elements.getElement('cardNumber'),
            //         billing_details: {
            //             name: 'Brandom Smit',
            //         },
            //     }
            // });
            //  if (payload.error) {
            //     var displayError = document.getElementById('card-errors');
            //     displayError.textContent = `Payment failed ${payload.error.message}`;

            //     //  console.log("error",payload.error)
            //     // setError(`Payment failed ${payload.error.message}`);
            //     this.loadingPayment = true
            // } else {
            //     console.log(payload)
            //     // setError(null);
            //     setProcessing(false);
            //     // setSucceeded(true);
            //     this.paymentSucceeded = true
            // }
        },
        PaymentIntent(){
            axios.post("http://localhost:4248/create-payment-intent", {price: 25000})
            .then(res => {
                console.log('Data', res)
                // setClientSecret(data.clientSecret);
            })
            .catch(err => console.log(err))
        }

    }
}
</script>

<style scoped>
    #mycard{
        margin: 35px;
        width: 35%;
    }
    .elementContainer{
        /* height: 35px; */
        border: 2px solid rebeccapurple;
        margin: 20px;
        border-radius: 10px;
    }
</style>
