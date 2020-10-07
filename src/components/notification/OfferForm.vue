<template>
    <v-container>
        <ClientOfferAgreement v-model="openOfferAgreementDialog" :clientOffer="offerData" />
        <v-row class="text-center" justify="center" >
            <v-col lg="4" v-if="!isOfferSent" style="border: 2px solid #8fbc8f; border-radius: 10px">
            <h2 class="headline font-weight-bold mb-3">
                Interested?
            </h2>
            <h5 class="headline font-weight-bold mb-3">
                Don't wait, Send us an offer
            </h5>
                <form
                >
                    <v-text-field
                        label="Full Name"
                        v-model="full_name"
                        type="text"
                        outlined
                        :error-messages="errors.full_name"   
                    ></v-text-field>

                    <v-text-field
                        v-model="email"
                        label="Email: example@email.com"
                        outlined
                        :error-messages="errors.email"   
                    ></v-text-field>

                    <v-text-field
                        v-model="phone"
                        label="Phone #: (212-222-2222)"
                        outlined
                        :error-messages="errors.phone"   
                    ></v-text-field>
                    <label>This room is listed for ${{contentRoom.price}}/month, enter your offer </label>
                    <v-text-field
                        v-model="offer"
                        :label="contentRoom.price"
                        solo-inverted
                        type="number"
                        prefix="$"
                        height="80"
                        style="width: 50%; margin: 10px 25% -10px 25%; font-size: 40px;"
                        :error-messages="errors.offer"   
                    ></v-text-field>
                    <div>
                        <small style="color: darkcyan">(Tipically Respond within 24 hours)</small>
                    </div>
                    <v-btn type="submit" @click.stop="openAgreementDialog" color="#2e8b57" dark>
                        Send Offer
                    </v-btn>
                </form>
            </v-col>
            <SuccessAlert v-if="isOfferSent" msg="Your offer was sent and received. Kindly wait for a response to the email or phone# you provided." />
        </v-row>
    </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {validateOffer} from '../../store/validators'
import SuccessAlert from '@/components/notification/SuccessAlert.vue'
import ClientOfferAgreement from '@/components/agreements/ClientOfferAgreement.vue'

  export default {
    name: 'OfferForm',
    components: {
        SuccessAlert,
        ClientOfferAgreement
    },
    computed: {
        ...mapGetters([
            'contentRoom',
            'isOfferSent',
        ]),
    },
   data () {
      return {
        full_name: '',
        email: '',
        phone: '',
        offer: '',
        sent: false,
        openOfferAgreementDialog: false,
        offerData: {},
        errors: {}
      }
    },
    created() {
    },
    methods:{
        ...mapActions([                  // Add this
            'sendOffer'
        ]),
        openAgreementDialog() {
            const clientOffer = {
                    full_name: this.full_name,
                    email: this.email,
                    phone: this.phone,
                    offer: this.offer,
                    receiverId: this.contentRoom.ownerId,
                    roomId: this.contentRoom.objectId,
                    readByDev: false,
                    isOfferAgreementByClientAccepted: false,
                    readByReceiver: false
                }
            const {valid, errors} = validateOffer(clientOffer);
            if(!valid) this.errors = errors;
            else {
                this.offerData = clientOffer;
                this.openOfferAgreementDialog = true;
                // this.sendOffer(offerData);
            }
        }
    }
  }

</script>