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
                <v-card-title 
                    class="headline justify-center font"
                    style="color: #1a7cab; margin: 10px 0"
                >
                    Submit Payment Information
                </v-card-title>
                <v-card-text class="justify-center font" style="text-align: center">
                    Please make sure that the information is correct!
                </v-card-text>
                    <v-row class="text-center" justify="center" style="margin: 0 12px;">
                        <v-checkbox
                            v-model="checkbox"
                        >
                            <template slot="label" :aria-disabled="!checkbox">
                                <label >Billing Address: {{billingAddress}}</label>
                            </template>
                        </v-checkbox>
                    </v-row>
                <v-row class="text-center" justify="center" style="margin: 0 12px;">
                    <v-col cols="10" sm="6" md="5" lg="8"> 
                        <div v-if="!checkbox">
                            <h2>Billing Address Information: </h2>
                            <v-text-field
                                ref="street1"
                                v-model="location.street1"
                                label="Street1"
                                placeholder="76 Columbus St"
                                :error-messages="errors.street1"
                            ></v-text-field>
                            <v-text-field
                                ref="street2"
                                v-model="location.street2"
                                label="Street2"
                                placeholder="Apt: 3b"
                                :error-messages="errors.street2"
                            ></v-text-field>
                            <v-text-field
                                ref="city"
                                v-model="location.city"
                                label="City"
                                placeholder="Brooklyn"
                                :error-messages="errors.city"
                            ></v-text-field>
                            <v-text-field
                                ref="state"
                                v-model="location.state"
                                label="State/Province/Region"
                                placeholder="NY"
                                :error-messages="errors.state"   
                            ></v-text-field>
                            <v-text-field
                                ref="zipCode"
                                v-model="location.zipCode"
                                label="ZIP / Postal Code"
                                type="number"
                                placeholder="75155"
                                :error-messages="errors.zipCode"
                            ></v-text-field>
                            <v-autocomplete
                                ref="country"
                                v-model="location.country"
                                :items="countries"
                                label="Country"
                                placeholder="Select..."
                                :error-messages="errors.country"   
                            ></v-autocomplete>
                        </div>
                        <div>
                            <h2>Credit Card Information: </h2>
                            <v-text-field
                            label="1234 1234 1234 123"
                            :append-icon="cardType('424242424242424') || ''"
                            v-model="cardData.cardN"
                            :rules="[() => cardData.cardN.length <= 15 || 'Invalid credit card number.']"
                            :error-messages="errors.cardN"   
                            ></v-text-field>
                       
                            <v-text-field
                            label="MM/YY"
                            v-model="cardData.cardExp"
                            :rules="[() => (cardData.cardExp.length <= 5) || 'Invalid expiration date.', cardData.cardExp[2] === '/' || 'Missing the / character.']"
                            :error-messages="errors.cardExp"   
                            ></v-text-field>
                       
                            <v-text-field
                            label="CVC"
                            v-model="cardData.cardCvc"
                            :rules="[() => cardData.cardCvc.length <= 3 || 'Invalid card verification code.']"
                            :error-messages="errors.cardCvc"
                            ></v-text-field>
                       
                            <v-text-field
                            label="Zipcode"
                            v-model="cardData.cardZip"
                            :rules="[() => cardData.cardZip.length <= 5 || 'Invalid card verification code.']"
                            :error-messages="errors.cardZip"
                            ></v-text-field>
                        </div>
                        <p>Allow us two business days to review the information and process the payment.</p>
                    </v-col>
                    </v-row>
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
    name: "OwnerPayment",
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
            location: {
                street1: '',
                street2: '',
                city: '',
                state: '',
                zipCode: '',
                country: ''
            },
            countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
            meeting: {},
            checkbox: true,
            billingAddress: '',
            errors: {}
        }

    },
    beforeMount(){
        if(this.isOwner()) this.meeting = this.currentUserOffers.filter(offer => offer.objectId === this.data.meetingId)[0]
        else this.meeting = this.$store.getters.currentOffer
        const {street1, street2, city, state, zipCode, country} = this.meeting.meetingLocation;
        this.billingAddress = `${street1}, ${street2}, ${city}, ${state}, ${zipCode}, ${country}`;

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