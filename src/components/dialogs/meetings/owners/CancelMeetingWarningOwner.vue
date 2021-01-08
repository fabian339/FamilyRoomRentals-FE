<template>
    <v-dialog
        v-model="show"
        max-width="450"
    >
        <v-card>
            <v-card-title class="headline">Are you sure you want to cancel the meeting process?</v-card-title>
                <v-card-text>
                    IMPORTANT:
                </v-card-text>
                <v-card-text>
                    At FamilyRoomRentals, we depend on clients making offers. Cancelling a pending meeting could
                    result in losing revenue and potentially losing the client. 
                    <strong v-if="meeting.meetingScheduled">
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
                @click.stop="show = false"
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
</template>


<script>
import {mapActions, mapGetters } from 'vuex'
import { 
    SendEmailToClientOnMeetingCanceledByOwner,
    SendEmailToOwnerOnMeetingCanceledByOwner 
} from '../../../../emailTemplates/emails'
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'
// import MeetingCheckIn from '@/components/notification/MeetingCheckIn.vue'

export default {
    name: "CancelMeetingWarning",
    props: {
        value: Boolean,
        meetingId: String    
    },
    components: { },
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
            'currentUserOffers',
        ]),
    },
    data(){
        return{
            meething: {}
        }
    },
    beforeMount(){
        this.meeting = this.currentUserOffers.filter(offer => offer.objectId === this.meetingId)[0]
    },
    methods: {
        ...mapActions([
            'deleteOffer',
            'updateOffer',
            'sendEmail',
            'updateRoom',
            'updateUser'
        ]),
        //will remove the offer
        async cancelMeeting(){
            // let meeting = this.currentUserOffers.filter(offer => offer.objectId === this.data.meetingId)[0]
            //if this.currentOffer.meetingScheduled apply penalty, send email to both parties
            //else send email to both parties cancelling meeting
            let clientEmailData = SendEmailToClientOnMeetingCanceledByOwner({
                email: this.meeting.email,
                name: this.meeting.full_name,
                ownerName: this.meeting.ownerName,
                meetingScheduled: this.meeting.meetingScheduled,
                status: this.meeting.status,
                offer: this.meeting.offer,
                roomId: this.meeting.roomId,
            });

            let ownerEmailData = SendEmailToOwnerOnMeetingCanceledByOwner({
                email: this.meeting.ownerEmail,
                name: this.meeting.full_name,
                ownerName: this.meeting.ownerName,
                meetingScheduled: this.meeting.this.meetingScheduled,
                status: this.meeting.status,
                offer: this.meeting.offer,
                roomId: this.meeting.roomId,
            });
            // console.log(clientEmailData)
            // await this.sendEmail(clientEmailData);
            // await this.sendEmail(ownerEmailData);
            console.log(clientEmailData,  ownerEmailData )
            // this.updateOffer({
            //     objectId: this.meeting.objectId,
            //     cancellationDate: new Date(),
            //     processCanceled: true,
            //     issueFullRefundToClient: this.meeting.meetingScheduled ? true : false,
            //     readByReceiver: false,
            //     status: `You canceled the meeting proccess on ${new Date().toLocaleDateString()}!`
            // })
            //if there was a meeting scheduled, disable the property. Moduficable by admin on admin page
            if(this.meeting.meetingScheduled){
                // this.updateRoom({
                //     objectId: this.$store.getters.contentRoom.objectId,
                //     lockedByAdmin: true,
                //     lockedByAdminUntil: new Date(new Date().setDate(new Date().getDate() + 7)),
                //     meetingsPending: this.$store.getters.contentRoom.meetingsPending > 0 ? this.$store.getters.contentRoom.meetingsPending - 1 : 0
                // })
            }

            this.openCancelMeetingWarning = false
        }
        
    }
}
</script>
