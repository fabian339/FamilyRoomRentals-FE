<template>
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
                <v-card-title class="headline">Followup Survey</v-card-title>
                <v-card-text>
                    This is just a survey to know how things went between you and {{meeting.clientName}}.
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
                            :label="`Did you and ${meeting.clientName} came to an agreement?`"
                            v-model="surveyData.answer2"
                            :error-messages="errors.answer2"   
                            outlined
                        ></v-select>
                        <v-select
                            v-if="surveyData.answer2 === 'Yes'"
                            :items="['Yes', 'No', 'Not Sure']"
                            :label="`Will ${meeting.clientName} be moving into the property soon?`"
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
                            A payment can only be requested if {{meeting.clientName}} agrees to move in.
                        </p>
                        <p 
                            v-if="surveyData.answer3 === 'Not Sure'"
                            style="color: darkblue;"
                        >
                            Not a problem, please feel free contact us if {{meeting.clientName}} agrees 
                            to move in. Please do not delete this offer yet. If this offer gets deleted and 
                            then {{meeting.clientName}} decides to move in, there will not be enough evidence 
                            to process your payment. 
                        </p>
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
                    @click="show = false"
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
            surveySubmitted: false,
            surveyData: {
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answer5: '',
                comments: '',
            },
            meeting: {},
            errors: {}
        }

    },
    beforeMount(){
        if(this.isOwner()) this.meeting = this.currentUserOffers.filter(offer => offer.objectId === this.data.meetingId)[0]
        else this.meeting = this.$store.getters.meeting
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
                // const emailToAdmin = SendEmailToAdminOnPaymentRequested({
                //     email: 'familyroomrentals@dr.com'
                // })
                // this.sendEmail(emailToAdmin);
            }
            this.surveySubmitted = true;
            // console.log('submitting')
        }
    },
}
</script>
<style scoped>

</style>