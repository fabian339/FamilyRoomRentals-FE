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
          terms. These terms apply to all visitors, users, and others who access or use the service.  
        </v-card-text>
        <v-card-text>
          By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part
          of the terms, then you may not access the Service.
        </v-card-text>
        <v-card-text>
          <p><strong>Conditions:</strong></p>    
          By accepting to the terms and conditions, you agree to provide a one time payment per offer which will 
          which will be procceced once the offer has been accepted and a meeting has been schedule. Such meeting 
          will take action when the person renting the property and the client agree to the same terms.
        </v-card-text>
        <v-card-text>
          <p><strong>Price:</strong></p>  
          <ol>  
            <li> As a consideration for the provision of the service by the Service provider, the price for the provision
              of the Services is <strong> $20 ("price"). </strong>
            </li>
            <li> The Buyer shall/shall not (delete as appropriate) pay for the Service Provider's using an online transaction
                where the payment shall be made.  
            </li>
          </ol>
        </v-card-text>
        <v-card-text>
          <p><strong>Payment:</strong></p>   
          <ol> 
            <li> They Buyer agrees to pay the Price to the Service Provider once the offer is accepted and a meeting has been
              made between the two parties.
            </li>
            <li> Any charges payable under this Agreement are exclusive of any applicable taxes, tariff surcharges or ther like 
              amounts assessed by any govermental entity arising as a result of the provision of the Service by the Service 
              Provider to the Buyer under this Agreement and such shall be payable by the Buyer to the Service Provider in 
              addition to all other charges payable herenuder.
            </li>
          </ol>
        </v-card-text>
        <v-card-text>
          <p><strong>Refund:</strong></p> 
          <ol>
            <li> FamilyRoomRentals guarantee a refund only if the property offer was accepted and a meeting was scheduled, but 
              as a result both parties decided not to move forward. A refund will be schedule with only <strong> half </strong> 
              of what was originally paid. For example, the Provision of the Services is <strong> $20 ("price") </strong>, then 
              the refund will be half of it which is <strong> $10 ("price"). </strong> The refund will be made to the originally
              payment method used.
            </li>
            <li> There will be  <strong> no refund </strong> if the deal is closed in a successfull standard. Meaning, if the 
              offer was accepted and the deal was successfully closed by both parties, then a refund is not needed.
            </li>
          </ol>
        </v-card-text>
        <v-card-text style="color: red; margin: 0px 0px -25px 0px;">{{agreementError}} </v-card-text>
        <v-card-actions>
            <v-row>
              <v-checkbox
                style="margin: 0px 0px -15px 30px;"
                v-model="checkbox"
              >
                <template slot="label">
                  <label >I agree to the <a @click.stop href="/#/terms-and-conditions/agreements" target="_blank">Terms & Conditions.</a></label>
                </template>
              </v-checkbox>
            </v-row>
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
            @click.stop="addOfferToThisRoom"
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
import {SendEmailToClientOnOffer, SendEmailToUserOnOffer} from '../../emailTemplates/emails'
export default {
    name: "ClientOffertAgreement",
    props: {
        value: Boolean,
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
            agreementError: '',
            logo: ''
        }
    },
    created(){
      this.getDataUri(require('../../assets/logo.png'), (dataUri) => {
         this.logo = dataUri
      });
    },
    methods: {
      ...mapActions([
          'sendOffer',
          'sendEmail',
          'updateRoom'
      ]),
      addOfferToThisRoom(){
          if(!this.checkbox) this.agreementError = "Must accept agreement, otherwise, cancel the offer."
          else {
              this.$store.getters.currentOffer.isOfferAgreementByClientAccepted = this.checkbox;
              const clientEmailData = SendEmailToClientOnOffer({
                email: this.$store.getters.currentOffer.email,
                name: this.$store.getters.currentOffer.full_name,
                offer: this.$store.getters.currentOffer.offer,
                roomId: this.$store.getters.contentRoom.objectId,
              })

              const userEmailData = SendEmailToUserOnOffer({
                email:this.$store.getters.currentOffer.ownerEmail,
                name: this.$store.getters.currentOffer.ownerName,
                offer: this.$store.getters.currentOffer.offer,
                roomId: this.$store.getters.contentRoom.objectId,
              })
              //sending emails
              this.sendEmail(userEmailData);
              this.sendEmail(clientEmailData);
              // adding offer to db
              this.sendOffer(this.$store.getters.currentOffer)
              this.updateRoom({
                numberOfOffers: this.$store.getters.contentRoom.numberOfOffers + 1,
                objectId: this.$store.getters.contentRoom.objectId
              });
              this.agreementError = ''
              this.show = false;
          }
      },
     getDataUri(url, callback) {
      var image = new Image();
      image.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
      canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
      canvas.getContext('2d').drawImage(this, 0, 0);
      // Get raw image data
      // callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
      // ... or get as Data URI
      callback(canvas.toDataURL('image/png'));
      };

      image.src = url;
      }
    }
}
</script>
<style scoped>

</style>