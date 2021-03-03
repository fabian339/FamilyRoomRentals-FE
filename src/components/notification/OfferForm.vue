<template>
    <div>
        <div id="offerContainer">
            <ClientOfferAgreement 
              v-model="openOfferAgreementDialog" 
              @offerSent="didOfferSent"
              :clientData="{
                clientName: full_name,
                clientEmail: email
              }" />

            <Alert 
              v-model="offerSent"
              :component="{
                type: 'success',
                message: 'Offer Sent Successfully!'
              }" />
            <h2 class="headline font-weight-bold mb-3">
                Interested? Don't wait!
            </h2>
            <h5 class="headline font-weight-bold mb-3">
                Send your offer to {{contentRoom.ownerFname}} {{contentRoom.ownerLname}}
            </h5>
            <form
            >
                <v-text-field
                    label="Full Name"
                    v-model="full_name"
                    type="text"
                    outlined
                    :error-messages="errors.clientName"   
                ></v-text-field>

                <v-text-field
                    v-model="email"
                    label="Email: example@email.com"
                    outlined
                    :error-messages="errors.clientEmail"   
                ></v-text-field>


            <label for="phoneNumber" style="color: #0000008c">Enter Phone # Ex: (222-222-2222)</label>
            <!-- phone number format -->
            <v-row class="text-center" justify="center" style="margin: 0 0 -20px 0;">
              <v-col
                cols="3"
              >
                <v-text-field
                  outlined
                  placeholder="917"
                  v-model="phone1"
                  :rules="[() => !isNaN(phone1) || 'Must be a number']"
                  maxlength="3"
                ></v-text-field>
              </v-col>
              <span style="margin: 30px 0;">-</span>
              <v-col
                cols="3"
              >
                <v-text-field
                  outlined
                  placeholder="450"
                  v-model="phone2"
                  :rules="[() => !isNaN(phone2) || 'Must be a number']"
                  maxlength="3"
                ></v-text-field>
              </v-col>
              <span style="margin: 30px 0;">-</span>
              <v-col
                cols="3"
              >
                <v-text-field
                  outlined
                  placeholder="1452"
                  v-model="phone3"
                  :rules="[() => !isNaN(phone3) || 'Must be a number']"
                  maxlength="4"
                ></v-text-field>
              </v-col>
            <!-- </v-row> -->
            </v-row>
                <p v-if="errors.clientPhone && errors.clientPhone.length !== 0" style="color: red">{{errors.clientPhone}}</p>

                <label>This room is listed for ${{contentRoom.price}}/month, enter your offer </label>
                <v-text-field
                    v-model="offer"
                    :label="contentRoom.price"
                    solo-inverted
                    type="number"
                    prefix="$"
                    height="100"
                    style="width: 50%; margin: 15px 25% -10px 25%; font-size: 40px;"
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
import {mapGetters, mapMutations} from 'vuex'
import {validateOffer} from '../../store/validators'
import ClientOfferAgreement from '@/components/terms/ClientOfferAgreement.vue'
import Alert from '@/components/Alert/Alert.vue'

  // outside of the component state
  function initialState (){
    return {        
        full_name: '',
        email: '',
        phone1: '',
        phone2: '',
        phone3: '',
        phone: '',
        offer: '',
        openOfferAgreementDialog: false,
        errors: {},
        offerSent: false
      }
  }
  export default {
    name: 'OfferForm',
    components: {
        ClientOfferAgreement,
        Alert
    },
    computed: {
        ...mapGetters([
            'contentRoom',
        ]),
    },
    data () {
      return initialState();
    },
    created() {
    },
    methods:{
        ...mapMutations([
            'SET_OFFER'
        ]),
        openAgreementDialog() {
            const clientOffer = {
                    clientName: this.full_name,
                    clientEmail: this.email,
                    clientPhone: `${this.phone1}-${this.phone2}-${this.phone3}`,
                    offer: this.offer,
                    receiverId: this.contentRoom.ownerId,
                    roomId: this.contentRoom.objectId,
                    ownerName: `${this.contentRoom.ownerFname} ${this.contentRoom.ownerLname}`,
                    ownerEmail: this.contentRoom.ownerEmail,
                    ownerPhone: this.contentRoom.ownerPhone,
                    meetingLocation: this.contentRoom.location,
                    didClientAgreeToSendOffer: true,
                }
            const {valid, errors} = validateOffer(clientOffer);
            if(!valid) this.errors = errors;
            else {
              console.log(clientOffer)
                this.SET_OFFER(clientOffer);
                this.openOfferAgreementDialog = true;
            }
        },
        didOfferSent(value){
          if(value){
            //clears the data from the form
            Object.assign(this.$data, initialState());
            this.offerSent = true;
          }
        },
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