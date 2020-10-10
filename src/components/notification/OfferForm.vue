<template>
    <div>
        <div id="offerContainer">
            <ClientOfferAgreement v-model="openOfferAgreementDialog" :clientOffer="offerData" />
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
                <v-btn @click.stop="openAgreementDialog" color="#2e8b57" dark>
                    Send Offer
                </v-btn>
            </form>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {validateOffer} from '../../store/validators'
import ClientOfferAgreement from '@/components/agreements/ClientOfferAgreement.vue'

  export default {
    name: 'OfferForm',
    components: {
        ClientOfferAgreement
    },
    computed: {
        ...mapGetters([
            'contentRoom',
        ]),
    },
   data () {
      return {
        full_name: '',
        email: '',
        phone: '',
        offer: '',
        openOfferAgreementDialog: false,
        offerData: {},
        errors: {}
      }
    },
    created() {
    },
    methods:{
        openAgreementDialog() {
            const clientOffer = {
                    full_name: this.full_name,
                    email: this.email,
                    phone: this.phone,
                    offer: this.offer,
                    receiverId: this.contentRoom.ownerId,
                    roomId: this.contentRoom.objectId,
                    isOfferAgreementByClientAccepted: false,
                }
            const {valid, errors} = validateOffer(clientOffer);
            if(!valid) this.errors = errors;
            else {
                this.offerData = clientOffer;
                this.openOfferAgreementDialog = true;
            }
        }
    }
  }

</script>
<style scoped>
    #offerContainer {
        border: 2px solid rgb(143, 188, 143);
        border-radius: 10px;
        padding: 25px;
    }
    
</style>