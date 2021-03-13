<template>
    <div>
        <v-dialog
            v-model="show"
            max-width="450px"
         >
            <v-card>
                <v-card-title>
                    <span class="headline">Message</span>
                </v-card-title>
                <v-card-text>
                        <p>From: {{currentOffer.clientName}}</p>
                        <p>Interested Room: <a :href="`/#/room/${currentOffer.roomId}`" target="_blank">Click Here</a></p>
                        <p>Offer: ${{currentOffer.offer}}</p>
                        <div v-if="!currentOffer.followupSent">
                            <p>Message: </p>
                            <div id="message">
                                <p> 
                                    I will like to offer the ammount of <strong>${{currentOffer.offer}}</strong> for this room. 
                                    Please consider my offer as I will really appreciate it.
                                </p>
                            </div>
                            <div v-if="!currentOffer.offerAcceptedByOwner" style="margin: 15px 0px;">
                                <h3>What would you like to do?</h3>
                                <p>
                                    If you feel like this is a good match and price for the property,
                                    please accept <strong>{{currentOffer.clientName}}'s offer</strong> and schedule a meeting 
                                    to show him/her the room. Otherwise, deny such offer.
                                </p>
                            </div>
                        </div>
                        
                        <p style="margin-top: 5px">  
                            <strong>
                                Status:
                            </strong>
                            <strong style="color: teal;">
                                {{currentOffer.status}}
                            </strong>
                        </p>

                        <div v-if="currentOffer.offerAcceptedByOwner && !currentOffer.meetingScheduled && !currentOffer.processCanceledByOwner">
                            <div v-if="!currentOffer.meetingScheduled">
                                <p style="margin-bottom: 5px;">Dates submitted: </p>
                                <div v-for="date in currentOffer.meetingDates" :key="date.date">
                                    <span> - {{date.date}} at {{date.time}}</span>
                                </div>
                            </div>
                            <!-- btn is not working yet. Make it cancell the meeting, send email to client, show warning, disable room -->
                            <v-btn 
                                style="margin: 10px 0 0 0" 
                                small 
                                rounded
                                color="error"
                                v-if="!currentOffer.meetingScheduled"
                                @click.stop="openCancelMeetingWarning = true"
                            >
                                Cancel Process
                            </v-btn> 
                        </div>


                        <!-- <div v-if="currentOffer.followupSent && !currentOffer.submittedFollowUpData">
                            <p>Tell us how it went, request payment, and submit feedback.</p>
                            <v-btn 
                                style="margin: 0px -10px;" 
                                small 
                                dark
                                color="#ADD8E6"
                                @click.stop="openSurvey = true"
                            >
                                Answer Survey
                            </v-btn> 
                        </div> -->
                </v-card-text>
                <v-card-actions style="margin-top: -25px; margin-left: 10px;">
                <!-- <v-spacer></v-spacer> -->
                <div class="my-2">
                    <v-btn 
                        style="margin: 5px 5px;" 
                        small 
                        outlined 
                        color="#556B2F"
                        :disabled="currentOffer.offerAcceptedByOwner || currentOffer.offerRejectedByOwner"  
                        @click.stop="redirectToSchedule">
                        Accept offer
                    </v-btn> 
                    <v-btn 
                        style="margin: 5px 5px;" 
                        small 
                        outlined 
                        color="#FF69B4" 
                        @click.stop="showRejectionDialog = true"
                        :disabled="currentOffer.offerAcceptedByOwner || currentOffer.offerRejectedByOwner"
                    >
                        Deny Offer
                    </v-btn>
                    <v-btn 
                        style="margin: 5px 5px;" 
                        small 
                        color="error" 
                        @click.stop="openDeletingOfferDialog"
                        :disabled="currentOffer.offerAcceptedByOwner && !currentOffer.processCanceledByOwner && !currentOffer.offerCompleted"
                    >
                        Delete Offer
                    </v-btn>
                </div>                
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="shouldDeletingOfferDialogBeOpen"
            max-width="435"
            persistent
        >
            <v-card>
                <v-card-title class="headline">Are you sure you want to delete this offer?</v-card-title>
                <v-card-text>
                    Once this is done, we cannot recover this data. 
                    <span style="color: red">Do you want to continue?</span>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    text
                    @click="closeDeleteOfferDialog"
                >
                    Cancel
                </v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    @click.stop="removeOffer"
                >
                    <span v-if="!userLoading.userOffer.deletingOffer">Continue</span>
                    <v-progress-circular
                        v-else
                        color="#692b2b"
                        :size="30"
                        :width="5"
                        indeterminate
                    ></v-progress-circular>
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="showRejectionDialog"
            max-width="320"
        >
            <v-card>
                <v-card-title class="headline">Are you sure you want to reject this offer?</v-card-title>
                <v-card-text>
                    Once this is done, we cannot undo this action. Do you want to continue?
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    text
                    @click="showRejectionDialog = false"
                >
                    Cancel
                </v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    @click.stop="markOfferRejected"
                >
                    Continue
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <div>
            <MeetingCancelation 
                v-model="openCancelMeetingWarning"
                :data="{
                    meetingId: currentOffer.objectId,
                    ownerId: currentOffer.receiverId
                }"
            />        
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import { SendEmailToClientOnOfferRejected } from '../../emailTemplates/emails'
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'
// import MeetingCheckIn from '@/components/notification/MeetingCheckIn.vue'
  import MeetingCancelation from '@/components/dialogs/meetings/MeetingCancelation.vue'

export default {
    name: "ViewNotification",
    props: {
        value: Boolean,
    },
    components: {
        MeetingCancelation,
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
        },
        ...mapGetters([
            'currentOffer',
            'userLoading',
            'shouldDeletingOfferDialogBeOpen'
        ]),
    },
    data(){
        return{
            showDeleteWarning: false,
            openCheckIn: false,
            openCancelMeetingWarning: false,
            showRejectionDialog: false,
            openSurvey: false,
            errors: {}
        }
    },
    methods: {
        ...mapMutations([
            'SHOW_OFFER_DELETING_DIALOG'
        ]),
        ...mapActions([
            'deleteOffer',
            'updateOffer',
            'sendEmail',
            'updateRoom',
            'updateUser'
        ]),
        openDeletingOfferDialog(){
            this.SHOW_OFFER_DELETING_DIALOG(true)
        },
        closeDeleteOfferDialog(){
            this.SHOW_OFFER_DELETING_DIALOG(false)
        },
        //will remove the offer
        async removeOffer(){
            await this.deleteOffer(this.currentOffer.objectId)
            // this.showDeleteWarning = false;
            this.$emit('input', false)
            // console.log("Deleting Notification", id)
        },
        // will redirect to a scheduler page
        redirectToSchedule(){
            if(this.$router.history.current.path !== `/room/${this.currentOffer.roomId}/offer/${this.currentOffer.objectId}/schedule`){
                this.$router.push(`/room/${this.currentOffer.roomId}/offer/${this.currentOffer.objectId}/schedule`)
                this.show = false
            } else this.show = false
        },
        // will mark offer as rejected, will inform client
        markOfferRejected(){
            this.updateOffer({
                objectId: this.currentOffer.objectId,
                offerRejectedByOwner: true,
                status: "Offer was rejected. Feel free to delete this offer!",
            });
            //send email to client on offer rejected!!
            let clientEmailData = SendEmailToClientOnOfferRejected({
                email: this.$store.getters.currentOffer.clientEmail,
                name: this.$store.getters.currentOffer.clientName,
                offer: this.$store.getters.currentOffer.offer,
                roomId: this.$store.getters.currentOffer.roomId,
            });
            this.sendEmail(clientEmailData);
            this.showRejectionDialog = false
        },
        // returns true or false
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
    #message {
        border: 2px solid aquamarine;
        padding: 15px;
        border-radius: 15px;
        padding-bottom: 0px;
    }
    .meetingStatus{
        margin-top: 5px;
        color: darkblue;
    }
</style>