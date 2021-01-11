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
    SendEmailToAdminOnClientMeetingCancelation,
    SendEmailToAdminOnOwnerMeetingCancelation
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
    //will be called when canceling offer, as the component is already mounted by the nav component
    beforeUpdate() {
        if(this.isOwner()) this.meeting = this.currentUserOffers.filter(offer => offer.objectId === this.data.meetingId)[0]
        else this.meeting = this.$store.getters.currentOffer
        // console.log(this.isOwner(), this.data, this.meeting, "on before update")
    },
    //will be called when canceling meeting, as the component is not mounted until meeting is expanded
    beforeMount() {
        if(this.isOwner()) this.meeting = this.currentUserOffers.filter(offer => offer.objectId === this.data.meetingId)[0]
        else this.meeting = this.$store.getters.currentOffer
        // console.log(this.isOwner(), this.data, this.meeting, "on before mount")
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
            //update offer
            await this.updateOffer({
                objectId: this.meeting.objectId,
                processCanceledByOwner: true,
                cancelationDate: new Date(),
                status: `Meeting proccess canceled by ${this.meeting.ownerName}!`,
                readByReceiver: false,
                issueFullRefundToClient: this.meeting.meetingScheduled ? true : false,  
            })

            //if there was a meeting scheduled, disable the property. Moduficable by admin on admin page
            if(this.meeting.meetingScheduled){
                //if a meeting was scheduled, disable room for 7 days
                let unlockDate = new Date()
                unlockDate.setDate(unlockDate.getDate() + 7)
                let disabledUntil = {
                    date: unlockDate.toDateString(),
                    time: unlockDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                }
                await this.updateRoom({  
                    objectId: this.meeting.roomId,                  
                    lockedByAdmin: true,
                    lockedByAdminUntil: disabledUntil,
                    meetingsPending: this.$store.getters.contentRoom.meetingsPending > 0 ? this.$store.getters.contentRoom.meetingsPending - 1 : 0,
                })

                let adminEmailData = SendEmailToAdminOnOwnerMeetingCancelation({
                    adminEmail: 'familyroomrentals@dr.com',
                    ownerName: this.meeting.ownerName,
                    offerId: this.meeting.objectId
                });
                
                await this.sendEmail(adminEmailData);
            } 

            //if this.currentOffer.meetingScheduled apply penalty, send email to both parties
            //else send email to both parties cancelling meeting
            let commonEmailData = {
                clientName: this.meeting.clientName,
                ownerName: this.meeting.ownerName,
                meetingScheduled: this.meeting.meetingScheduled,
                offer: this.meeting.offer,
                roomId: this.meeting.roomId
            }
            let clientEmailData = SendEmailToClientOnMeetingCanceledByOwner({
                ...commonEmailData,
                clientEmail: this.meeting.clientEmail,
            });

            let ownerEmailData = SendEmailToOwnerOnMeetingCanceledByOwner({
                ...commonEmailData,
                ownerEmail: this.meeting.ownerEmail,
            });

            // console.log(clientEmailData, ownerEmailData)
            await this.sendEmail(clientEmailData);
            await this.sendEmail(ownerEmailData);

            //add loading when cancelling
            this.show = false
        },
        async cancelMeetingByClient(){
            await this.updateOffer({
                objectId: this.meeting.objectId,
                cancelationDate: new Date(),
                processCanceledByClient: true,
                chargeCancelationFeeToClient: true,
                readByReceiver: false,
                status: `Meeting proccess canceled by ${this.meeting.clientName}!`
            })
            let room = this.$store.getters.contentRooms.filter(room => room.objectId === this.meeting.roomId)[0];
            console.log(room)
            await this.updateRoom({
                objectId: this.meeting.roomId,
                meetingsPending: room.meetingsPending > 0 ? room.meetingsPending - 1 : 0
            })

            let commonEmailData = {
                clientName: this.meeting.clientName,
                ownerName: this.meeting.ownerName,
                meetingScheduled: this.meeting.meetingScheduled,
                offer: this.meeting.offer,
                roomId: this.meeting.roomId
            }

            let clientEmailData = SendEmailToClientOnMeetingCanceledByClient({
                ...commonEmailData,
                clientEmail: this.meeting.clientEmail,
            });

            let ownerEmailData = SendEmailToOwnerOnMeetingCanceledByClient({
                ...commonEmailData,
                ownerEmail: this.meeting.ownerEmail,
            });

            let adminEmailData = SendEmailToAdminOnClientMeetingCancelation({
                adminEmail: 'familyroomrentals@dr.com',
                clientName: this.meeting.clientName,
                offerId: this.meeting.objectId
            });
            console.log(clientEmailData,ownerEmailData, adminEmailData)
            await this.sendEmail(clientEmailData);
            await this.sendEmail(ownerEmailData);
            //send email to admin to proccess cancelation feed
            await this.sendEmail(adminEmailData);

            // add loading when cancelling
            this.show = false
        }
    }
}
</script>
