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
    </div>
</template>

<script>
import {mapActions, mapGetters } from 'vuex'
// import { } from '../../globals/emails'
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'

export default {
    name: "MeetingCheckIN",
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
        return{}

    },
    methods: {
        ...mapActions([
        ]),
        
    }
}
</script>
<style scoped>

</style>