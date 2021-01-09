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
                <v-card-text v-if="isOwner()">
                    At FamilyRoomRentals, we depend on clients making offers. Cancelling a pending meeting could
                    result in losing revenue and potentially losing the client. 
                    <strong v-if="meeting.meetingScheduled">
                        As a concequence of cancelling a pending meeting, we could disable this property for a period
                        of one week, or more. If you have rented this property, please mark it as rented instead.
                        Please read our propery's Terms & Conditions for more details.
                    </strong>
                </v-card-text>
                <v-card-text v-else>
                    At FamilyRoomRentals, we depend on users posting and sharing their properties. 
                    Canceling a pending meeting could result in the lost of revenue and potentially losing the user. 
                    <strong>
                        As a concequence of canceling a pending meeting, we will charge a fee of $5 as the user 
                        dedicated his/her time looking foward for this meeting. Please read FamilyRoomRentals properyy's 
                        Terms & Conditions for more details.
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
                @click.stop="isOwner() ? cancelMeetingByOwner() : cancelMeetingByClient()"
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
    SendEmailToOwnerOnMeetingCanceledByOwner,
    SendEmailToClientOnMeetingCanceledByClient,
    SendEmailToOwnerOnMeetingCanceledByClient,
    SendEmailToAdminOnClientMeetingCancelation
} from '../../../emailTemplates/emails'
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'
// import MeetingCheckIn from '@/components/notification/MeetingCheckIn.vue'

export default {
    name: "CancelMeetingWarning",
    props: {
        value: Boolean,
        data: Object 
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
            'isUserAuthenticated',
            'currentUser'
        ]),
    },
    data(){
        return{
            meething: {}
        }
    },
    beforeMount(){
        if(this.isOwner()) this.meeting = this.currentUserOffers.filter(offer => offer.objectId === this.data.meetingId)[0]
        else this.meeting = this.$store.getters.currentOffer
    },
    methods: {
        ...mapActions([
            'updateOffer',
            'sendEmail',
            'updateRoom',
        ]),
        isOwner() {
            return this.isUserAuthenticated && this.currentUser.objectId === this.data.ownerId
        },
        async cancelMeetingByOwner(){
            //if there was a meeting scheduled, disable the property. Moduficable by admin on admin page
            // if(this.meeting.meetingScheduled){
            //     await this.updateRoom({
            //         objectId: this.meeting.roomId,
            //         lockedByAdmin: true,
            //         processCanceled: true,
            //         lockedByAdminUntil: new Date(new Date().setDate(new Date().getDate() + 7)),
            //         meetingsPending: this.$store.getters.contentRoom.meetingsPending > 0 ? this.$store.getters.contentRoom.meetingsPending - 1 : 0
            //     })
            // } else {
            //     await this.updateOffer({
            //         objectId: this.meeting.roomId,
            //         cancellationDate: new Date(),
            //         processCanceled: true,
            //         issueFullRefundToClient: this.meeting.meetingScheduled ? true : false,
            //         readByReceiver: false,
            //         status: `You canceled the meeting proccess on ${new Date().toLocaleDateString()}!`
            //     })
            // }

            //if this.currentOffer.meetingScheduled apply penalty, send email to both parties
            //else send email to both parties cancelling meeting
            let clientEmailData = SendEmailToClientOnMeetingCanceledByOwner({
                clientEmail: this.meeting.clientEmail,
                clientName: this.meeting.clientName,
                ownerName: this.meeting.ownerName,
                meetingScheduled: this.meeting.meetingScheduled,
                status: this.meeting.status,
                offer: this.meeting.offer,
                roomId: this.meeting.roomId,
            });

            let ownerEmailData = SendEmailToOwnerOnMeetingCanceledByOwner({
                ownerEmail: this.meeting.ownerEmail,
                clientName: this.meeting.clientName,
                ownerName: this.meeting.ownerName,
                meetingScheduled: this.meeting.this.meetingScheduled,
                status: this.meeting.status,
                offer: this.meeting.offer,
                roomId: this.meeting.roomId,
            });
            console.log(clientEmailData, ownerEmailData)
            // await this.sendEmail(clientEmailData);
            // await this.sendEmail(ownerEmailData);
            
            //add loading when cancelling
            this.show = false
        },
        async cancelMeetingByClient(){
            // await this.updateOffer({
            //     objectId: this.meeting.objectId,
            //     cancellationDate: new Date(),
            //     processCanceled: true,
            //     processCanceledByClient: true,
            //     chargeCancelationFeeToClient: true,
            //     readByReceiver: false,
            //     status: `Meeting proccess canceled by ${this.meeting.clientName}!`
            // })

            // await this.updateRoom({
            //     objectId: this.meeting.roomId,
            //     meetingsPending: this.contentRoom.meetingsPending > 0 ? this.contentRoom.meetingsPending - 1 : 0
            // })

            let clientEmailData = SendEmailToClientOnMeetingCanceledByClient({
                clientEmail: this.meeting.clientEmail,
                clientName: this.meeting.clientName,
                ownerName: this.meeting.ownerName,
                meetingScheduled: this.meeting.meetingScheduled,
                status: this.meeting.status,
                offer: this.meeting.offer,
                roomId: this.meeting.roomId,
            });

            let ownerEmailData = SendEmailToOwnerOnMeetingCanceledByClient({
                ownerEmail: this.meeting.ownerEmail,
                clientName: this.meeting.clientName,
                ownerName: this.meeting.ownerName,
                meetingScheduled: this.meeting.meetingScheduled,
                status: this.meeting.status,
                offer: this.meeting.offer,
                roomId: this.meeting.roomId,
            });

            let adminEmailData = SendEmailToAdminOnClientMeetingCancelation({
                adminEmail: 'familyroomrentals@dr.com',
                clientName: this.meeting.clientName,
                offerId: this.meeting.objectId
            });
            console.log(clientEmailData,ownerEmailData, adminEmailData)
            // await this.sendEmail(clientEmailData);
            // await this.sendEmail(ownerEmailData);
            // //send email to admin to proccess cancelation feed
            // await this.sendEmail(adminEmailData);

            //add loading when cancelling
            this.show = false
        }
    }
}
</script>
