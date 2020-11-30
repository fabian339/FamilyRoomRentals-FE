<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      persistent
      width="600px"
    >
      <v-card>
        <v-card-title>
          <span style="font-size: 30px;"><strong> Terms & Conditions ("Terms") </strong></span>
        </v-card-title>
        <hr style="margin: 15px 25px;">
        <v-card-text>    
          <p><strong>Last updated (10/7/2020)</strong></p>    
          Please read these Terms and Conditions ("Terms") carefully before proceding to make an 
          offer using the of FamilyRoomRentals.com website (the "service") operated by FamilyRoomRentals, Inc.
        </v-card-text>
        <v-card-text>
          Your access to and use of the Service is conditioned on your acceptance of and compliance with these 
          terms. These terms applies to all users using this service to promote a property or find candidates 
          for occupancy.  
        </v-card-text>
        <v-card-text>
          By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part
          of the terms, then you may not access the Service.
        </v-card-text>
        <v-card-text>
          <p><strong>Conditions:</strong></p>    
          By accepting to the terms and conditions, you agree that you will be available on one of these days:
          <div v-for="(item, index) in offerData.meetingDates" :key="index + 20">
              <li> {{item.date}} at {{item.time}} </li>
          </div>  
          which will be determined once the client accept the date of preference. By accepting to the terms and 
          conditions, you also agree to maintain all interactions with the client to appropiate and in business manner.
        </v-card-text>
        <v-card-text>
          <p><strong>Payment:</strong></p>   
          <ol> 
            <li> 
                They Buyer agrees to pay the Price to the Service Provider once the offer is accepted and a meeting has been
                made between the two parties.
            </li>
            <li>
                As FamilyRoomRentals is promoting and offering a property that you provided, you will be granted the ammount
                of <strong> $10 ("price") </strong> if the deal is closed in good manners. Meaning the two parties have decided
                to move forward with the agreement. Such ammount will be deposited in an account provided by you onces the deal 
                is closed.
            </li>
            <li>
                FamilyRoomRentals does not grant any money if the deal is not closed. That is if after the meeting, both parties 
                decided not to move forward, there will be no money granted.
            </li>
            <li> Any charges payable under this Agreement are exclusive of any applicable taxes, tariff surcharges or ther like 
              amounts assessed by any govermental entity arising as a result of the provision of the Service by the Service 
              Provider to the Buyer under this Agreement and such shall be payable by the Buyer to the Service Provider in 
              addition to all other charges payable herenuder.
            </li>
          </ol>
        </v-card-text>
        <v-card-text style="color: red; margin: 0px 0px -25px 0px;">{{agreementError}} </v-card-text>
        <v-card-actions>
            <v-checkbox
              style="margin: 0px 0px 0px 15px;"
              v-model="checkbox"
              :label="`I agree to the terms and conditions.`"
            ></v-checkbox>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click.stop="show = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click.stop="addScheduleDates"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapActions} from 'vuex'
import { SendEmailToClientOnOfferAccepted} from '../../globals/emails'
let jwt = require('jsonwebtoken');

export default {
    name: "UserAgreementWithClient",
    props: {
        value: Boolean,
        offerData: {}
    },
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
        }
    },
    data(){
        return {
            checkbox: false,
            agreementError: ''
        }
    },
    methods: {
        ...mapActions([
            'updateOffer',
            'updateUser',
            'sendEmail'
        ]),
        addScheduleDates(){
            if(!this.checkbox) this.agreementError = "Must accept agreement, otherwise, cancel the offer."
            else {
                let scheduleDates = [];
                this.offerData.meetingDates.forEach(element => {
                    scheduleDates.push({
                        date: element.date,
                        time: element.time
                    })
                });

                let token = jwt.sign({
                  iat: Math.floor(new Date()),
                  exp: new Date().setDate(new Date().getDate() + 60),
                  data: { 
                      name: this.$store.getters.currentOffer.full_name 
                    }
                  }, this.$store.getters.currentOffer.roomId);
              
                let offerData = {
                  meetingDates: scheduleDates,
                  objectId: this.offerData.objectId,
                  isOfferAgreementByOwnerAccepted: this.checkbox,
                  offerAcceptedByOwner: this.offerData.offerAcceptedByOwner,
                  offerToken: token,
                  status: 'Offer accepted, submitted available dates!'
                };
              const clientEmailData = SendEmailToClientOnOfferAccepted({
                email: this.$store.getters.currentOffer.email,
                name: this.$store.getters.currentOffer.full_name,
                ownerName: this.$store.getters.currentOffer.ownerName,
                offer: this.$store.getters.currentOffer.offer,
                roomId: this.$store.getters.currentOffer.roomId,
                verificationId: this.$store.getters.currentOffer.objectId,
                token: token
              })
                this.updateOffer(offerData)
                this.updateUser({
                  objectId: this.$store.getters.currentUser.objectId,
                  acceptedOffers: this.$store.getters.currentUser.acceptedOffers + 1
                })
                // console.log(offerData, clientEmailData, token)
                this.sendEmail(clientEmailData);
                this.agreementError = ''
                this.show = false;
            }
        }
    }
}
</script>
<style scoped>

</style>