<template>
    <v-row justify="center">
        <v-dialog
            v-model="show"
            width="650px"
            persistent
        >
            <!-- <v-progress-linear
            v-if="showLoading && !loadingFinished"
                height="30"
                :value="countUp * 20"
                striped
                color="lime"
            ></v-progress-linear> -->
            <v-card>
                <div>
                    <p><strong>To receive your $10 payment, please enter card information:</strong> </p>
                    <p>Please make sure that the information is correct!</p>
                    <v-row justify="center" style="border: 2px solid darkgray;border-radius: 45px;margin-bottom: 15px;">
                        <v-col cols="5">
                            <v-text-field
                            label="1234 1234 1234 123"
                            :append-icon="cardType('424242424242424') || ''"
                            v-model="cardData.cardN"
                            :error-messages="errors.cardN"   
                            ></v-text-field>
                        </v-col>
                        <v-col cols="2.3">
                            <v-text-field
                            label="MM/YY"
                            v-model="cardData.cardExp"
                            :error-messages="errors.cardExp"   
                            ></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field
                            label="CVC"
                            v-model="cardData.cardCvc"
                            :error-messages="errors.cardCvc"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="2.3">
                            <v-text-field
                            label="Zipcode"
                            v-model="cardData.cardZip"
                            :error-messages="errors.cardZip"
                            ></v-text-field>
                        </v-col>
                        <p>Allow us two business days to review the information and process the payment.</p>
                    </v-row>
                </div>

                <v-card-actions>              
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import {mapActions, mapGetters } from 'vuex'
// import { SendEmailToClientOnOwnerCheckIn, SendEmailToOwnerOnClientCheckIn } from '../../../emailTemplates/emails'
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'

export default {
    name: "MeetingCheckIn",
    props: {
        value: Boolean,
        data: Object 
    },
    components: {},
    computed: {
        show: {
            get () {
                return this.value
            },
            set (value) {
                if (!value) {
                    this.$emit('input', value)
                }
            }
        },
        ...mapGetters([
            'isUserAuthenticated',
            'currentUserOffers',
            'currentUser'
        ]),
    },
    data(){
        return{
            cardData: {
                cardN: '',
                cardCvc: '',
                cardExp: '',
                cardZip: ''
            },
            errors: {}
        }

    },
    beforeMount(){
        if(this.isOwner()) this.meeting = this.currentUserOffers.filter(offer => offer.objectId === this.data.meetingId)[0]
        else this.meeting = this.$store.getters.currentOffer
        // console.log(this.meeting)
    },
    methods: {
        ...mapActions([
            'updateOffer',
            'sendEmail',
        ]),
        isOwner(){
            return this.isUserAuthenticated && this.currentUser.objectId === this.data.ownerId
        },
        validateCreditCardNumber(cardNumber) {
        cardNumber = cardNumber.split(' ').join("");
            if (parseInt(cardNumber) <= 0 || (!/\d{15,16}(~\W[a-zA-Z])*$/.test(cardNumber)) || cardNumber.length > 16) {
                return false;
            }
            var carray = new Array();
            for (let i = 0; i < cardNumber.length; i++) {
                carray[carray.length] = cardNumber.charCodeAt(i) - 48;
            }
            carray.reverse();
            var sum = 0;
            for (let i = 0; i < carray.length; i++) {
                var tmp = carray[i];
                if ((i % 2) != 0) {
                    tmp *= 2;
                    if (tmp > 9) {
                        tmp -= 9;
                    }
                }
                sum += tmp;
            }
            return ((sum % 10) == 0);
        },
        cardType(cardNumber) { // returns card type; should not rely on this for checking if a card is valid
            console.log("being called")
            cardNumber = cardNumber.split(' ').join("");
            var o = {
                electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
                maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
                dank: /^(5019)\d+$/,
                interpayment: /^(636)\d+$/,
                unionpay: /^(62|88)\d+$/,
                visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
                mcard: /^5[1-5][0-9]{14}$/,
                amex: /^3[47][0-9]{13}$/,
                diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
                disc: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
                jcb: /^(?:2131|1800|35\d{3})\d{11}$/
            }
            for(var k in o) {
                if(o[k].test(cardNumber)) {
                    return k;
                }
            }
            return null;
        },
    }
}
</script>
<style scoped>

</style>