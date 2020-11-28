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
                        <p>From: {{currentOffer.full_name}}</p>
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
                                    please accept <strong>{{currentOffer.full_name}}'s offer</strong> and schedule a meeting 
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
                        <div v-if="currentOffer.offerAcceptedByOwner && !currentOffer.processCancelled">
                            <div v-if="!currentOffer.meetingScheduled">
                                <p style="margin-bottom: 5px;">Dates submitted: </p>
                                <div v-for="date in currentOffer.meetingDates" :key="date.date">
                                    <span> - {{date.date}} at {{date.time}}</span>
                                </div>
                            </div>
                            <!-- btn is not working yet. Make it cancell the meeting, send email to client, show warning, disable room -->
                            <v-btn 
                                style="margin-top: 5px;" 
                                small 
                                color="error"
                                @click.stop="openCancelMeetingWarning = true"
                            >
                                Cancel Meeting
                            </v-btn> 
                        </div>


                        <div v-if="currentOffer.followupSent && !currentOffer.submittedFollowUpData">
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
                        </div>
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
                        @click.stop="showDeleteWarning = true"
                        :disabled="currentOffer.offerAcceptedByOwner && !currentOffer.offerRemoveable && !currentOffer.processCancelled"
                    >
                        Delete Offer
                    </v-btn>
                </div>                
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="openCancelMeetingWarning"
            max-width="450"
        >
            <v-card>
                <v-card-title class="headline">Are you sure you want to cancel the meeting process?</v-card-title>
                    <v-card-text>
                        CONCEQUENCES:
                    </v-card-text>
                    <v-card-text>
                        At FamilyRoomRentals, we depend on clients making offers. Cancelling a pending meeting could
                        result in losing revenue and potentially losing the client. 
                        <strong v-if="currentOffer.meetingScheduled">
                            As a concequence of cancelling a pending meeting, we could disable this property for a period
                            of one week, or more. If you have rented this property, please mark it as rented instead.
                            Please read our propery's Terms & Conditions for more details.
                        </strong>
                    </v-card-text>
                <v-card-text>
                    Once this is done, we cannot undo this action. Do you want to continue?
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    text
                    @click.stop="openCancelMeetingWarning = false"
                >
                    Cancel
                </v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    @click.stop="cancelMeeting"
                >
                    Continue
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="showDeleteWarning"
            max-width="350"
        >
            <v-card>
                <v-card-title class="headline">Are you sure you want to delete this offer?</v-card-title>
                <v-card-text>
                    Once this is done, we cannot recover this data. Do you want to continue?
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    text
                    @click="showDeleteWarning = false"
                >
                    Cancel
                </v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    @click.stop="deleteMessage"
                >
                    Continue
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

        <v-dialog
            v-model="openSurvey"
            max-width="650"
            :persistent="!surveySubmitted"
        >
            <SuccessAlert v-if="surveySubmitted" :msg="`Your followup has been submitterd, ${surveyData.answer5 === 'Yes' ? 'we are reviewing the information in order to process the payment.' : 'we thank you for using FamilyRoomRentals.'}`" />
            <v-card v-else>
                <v-card-title class="headline">Followup Survey</v-card-title>
                <v-card-text>
                    This is just a survey to know how things went between you and {{currentOffer.full_name}}.
                </v-card-text>
                <v-col cols="12">        
                    <form>
                        <v-select
                            :items="['Excellent', 'Good', 'Ok', 'Bad', 'Terrible']"
                            label="How was the meeting overall?"
                            v-model="surveyData.answer1"
                            outlined
                            :error-messages="errors.answer1"   
                        ></v-select>
                        <v-select
                            :items="['Yes', 'No']"
                            :label="`Did you and ${currentOffer.full_name} came to an agreement?`"
                            v-model="surveyData.answer2"
                            :error-messages="errors.answer2"   
                            outlined
                        ></v-select>
                        <v-select
                            v-if="surveyData.answer2 === 'Yes'"
                            :items="['Yes', 'No', 'Not Sure']"
                            :label="`Will ${currentOffer.full_name} be moving into the property soon?`"
                            v-model="surveyData.answer3"
                            outlined
                        ></v-select>
                        <v-select
                            v-if="surveyData.answer2 === 'No'"
                            :items="['I did not like the visitor', 'Visitor was unable to follow property rules', 'Meeting never happened', 'The visitor never showed up', 'I was unavailable', 'Other']"
                            :label="`What went wrong?`"
                            v-model="surveyData.answer4"
                            outlined
                        ></v-select>
                        <div
                            v-if="surveyData.answer3 === 'Yes'"
                        >
                            <p style="color: teal;">That is good too know!</p>
                            <v-select
                                :items="['Yes', 'No']"
                                :label="`Would you like to request your payment?`"
                                v-model="surveyData.answer5"
                                outlined
                            ></v-select>
                        </div>
                        <p 
                            v-if="surveyData.answer3 === 'No'"
                            style="color: saddlebrown;"
                        >
                            A payment can only be requested if {{currentOffer.full_name}} agrees to move in.
                        </p>
                        <p 
                            v-if="surveyData.answer3 === 'Not Sure'"
                            style="color: darkblue;"
                        >
                            Not a problem, please feel free contact us if {{currentOffer.full_name}} agrees 
                            to move in. Please do not delete this offer yet. If this offer gets deleted and 
                            then {{currentOffer.full_name}} decides to move in, there will not be enough evidence 
                            to process your payment. 
                        </p>
                        <div
                            v-if="surveyData.answer5 === 'Yes'" 
                        >
                            <p><strong>To receive your $10 payment, please enter card information:</strong> </p>
                            <p>Please make sure that the information is correct!</p>
                            <v-row justify="center" style="border: 2px solid darkgray;border-radius: 45px;margin-bottom: 15px;">
                                <v-col cols="5">
                                    <v-text-field
                                    label="1234 1234 1234 123"
                                    v-model="surveyData.cardData.cardN"
                                    :append-icon="cardType(surveyData.cardData.cardN)"
                                    :error-messages="errors.cardN"   
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2.3">
                                    <v-text-field
                                    label="MM/YY"
                                    v-model="surveyData.cardData.cardExp"
                                    :error-messages="errors.cardExp"   
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                    label="CVC"
                                    v-model="surveyData.cardData.cardCvc"
                                    :error-messages="errors.cardCvc"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2.3">
                                    <v-text-field
                                    label="Zipcode"
                                    v-model="surveyData.cardData.cardZip"
                                    :error-messages="errors.cardZip"
                                    ></v-text-field>
                                </v-col>
                                <p>Allow us two business days to review the information and process the payment.</p>
                            </v-row>
                        </div>
                        <v-textarea
                            name="input-7-1"
                            filled
                            label="Comment: (optional)"
                            v-model="surveyData.comments"
                        ></v-textarea> 
                    </form>
                </v-col>
                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    text
                    @click="openSurvey = false"
                >
                    Cancel
                </v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    @click.stop="submitSurvey"
                >
                    Submit
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import {mapActions, mapGetters } from 'vuex'
import { 
    SendEmailToClientOnOfferRejected, 
    SendEmailToAdminOnPaymentRequested, 
    SendEmailToClientOnMeetingCancelled,
    SendEmailToOwnerOnMeetingCancelled 
} from '../../globals/emails'
import SuccessAlert from '@/components/notification/SuccessAlert.vue'

export default {
    name: "ViewNotification",
    props: {
        value: Boolean,
    },
    components: {SuccessAlert},
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
        ]),
    },
    data(){
        return{
            showDeleteWarning: false,
            openCancelMeetingWarning: false,
            showRejectionDialog: false,
            openSurvey: false,
            surveySubmitted: false,
            surveyData: {
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answer5: '',
                comments: '',
                cardData: {
                    cardN: '',
                    cardCvc: '',
                    cardExp: '',
                    cardZip: ''
                }
            },
            errors: {}
        }
    },
    methods: {
        ...mapActions([
            'deleteOffer',
            'updateOffer',
            'sendEmail',
            'updateRoom',
            'updateUser'
        ]),
        deleteMessage(){
            this.deleteOffer(this.currentOffer.objectId)
            this.showDeleteWarning = false;
            this.$emit('input', false)
            // console.log("Deleting Notification", id)
        },
        redirectToSchedule(){
            if(this.$router.history.current.path !== `/room/${this.currentOffer.roomId}/offer/${this.currentOffer.objectId}/schedule`){
                this.$router.push(`/room/${this.currentOffer.roomId}/offer/${this.currentOffer.objectId}/schedule`)
                this.show = false
            } else this.show = false
        },
        markOfferRejected(){
            //send email to client on offer rejected!!
            this.updateOffer({
                objectId: this.currentOffer.objectId,
                offerRejectedByOwner: true,
                status: "Offer was rejected!",
            });
            let clientEmailData = SendEmailToClientOnOfferRejected({
                email: this.$store.getters.currentOffer.email,
                name: this.$store.getters.currentOffer.full_name,
                offer: this.$store.getters.currentOffer.offer,
                roomId: this.$store.getters.currentOffer.roomId,
            });
            this.sendEmail(clientEmailData);
            this.showRejectionDialog = false
        },
        submitSurvey(){
            let errors = {};
            if(this.surveyData.answer1 === '') errors.answer1 = 'Must not be empty'
            else if(this.surveyData.answer2 === '') errors.answer2 = 'Must not be empty'
            else if(this.surveyData.answer5 === 'Yes') {
                if(!this.validateCreditCardNumber(this.surveyData.cardData.cardN)) errors.cardN = 'Invalid card'
                if(this.surveyData.cardData.cardCvc === '') errors.cardCvc = 'Must not be empty'
                if(this.surveyData.cardData.cardExp === '') errors.cardExp = 'Must not be empty'
                if(this.surveyData.cardData.cardZip === '') errors.cardZip = 'Must not be empty'
            }
            if(Object.keys(errors).length !== 0) this.errors = errors;
            else {
                this.updateOffer({
                    objectId: this.currentOffer.objectId,
                    followUpData: this.surveyData,
                    submittedFollowUpData: true,
                    userRequestedPayment: this.surveyData.answer5 === 'Yes' ? true : false,
                    paymentRequestedCaseOpen: this.surveyData.answer5 === 'Yes' ? true : false,
                    offerRemoveable: this.surveyData.answer5 === 'Yes' ? false : true,
                    status: this.surveyData.answer5 === 'Yes' ? 'Requested Payment.' : 'Nothing else to do!'
                })
                if(this.surveyData.answer5 === 'Yes'){
                    const emailToAdmin = SendEmailToAdminOnPaymentRequested({
                        email: 'familyroomrentals@dr.com'
                    })
                    this.sendEmail(emailToAdmin);
                }
                this.surveySubmitted = true;
                // console.log('submitting')
            }
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
        cancelMeeting(){
            //if this.currentOffer.meetingScheduled apply penalty, send email to both parties
            //else send email to both parties cancelling meeting
            let clientEmailData = SendEmailToClientOnMeetingCancelled({
                email: this.$store.getters.currentOffer.email,
                name: this.$store.getters.currentOffer.full_name,
                ownerName: this.$store.getters.currentOffer.ownerName,
                meetingScheduled: this.$store.getters.currentOffer.meetingScheduled,
                status: this.$store.getters.currentOffer.status,
                offer: this.$store.getters.currentOffer.offer,
                roomId: this.$store.getters.currentOffer.roomId,
            });

            let ownerEmailData = SendEmailToOwnerOnMeetingCancelled({
                email: this.$store.getters.currentOffer.ownerEmail,
                name: this.$store.getters.currentOffer.full_name,
                ownerName: this.$store.getters.currentOffer.ownerName,
                meetingScheduled: this.$store.getters.currentOffer.meetingScheduled,
                status: this.$store.getters.currentOffer.status,
                offer: this.$store.getters.currentOffer.offer,
                roomId: this.$store.getters.currentOffer.roomId,
            });
            // console.log(clientEmailData)
            this.sendEmail(clientEmailData);
            this.sendEmail(ownerEmailData);

            this.updateOffer({
                objectId: this.$store.getters.currentOffer.objectId,
                cancellationDate: new Date(),
                processCancelled: true,
                status: 'Meeting proccess cancelled!'
            })

            if(this.$store.getters.currentOffer.meetingScheduled){
                this.updateRoom({
                    objectId: this.$store.getters.currentOffer.roomId,
                    lockedByAdmin: true,
                    lockedByAdminUntil: new Date(new Date().setDate(new Date().getDate() + 7)),
                    meetingsPending: this.$store.getters.currentOffer.meetingsPending !== 0 ? this.$store.getters.currentOffer.meetingsPending - 1 : 0
                })

                // give full refund to client
                // console.log(new Date(new Date().setDate(new Date().getDate() + 7)))
            }

            this.openCancelMeetingWarning = false
        }
        
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
</style>