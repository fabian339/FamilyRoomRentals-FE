<template>
    <v-row justify="center">
        <v-dialog
            v-model="show"
            width="650px"
            persistent
        >
            <v-progress-linear
            v-if="showLoading && !loadingFinished"
                height="30"
                :value="countUp * 20"
                striped
                color="lime"
            ></v-progress-linear>
            <v-card v-else>
                <h2 v-if="!loadingFinished" style="padding: 30px; headline">
                    {{isOwner() ? (
                        `Hey ${meeting.ownerName}, are you ready to start your meeting with ${meeting.clientName}?`
                        ) : (
                        `Hey ${meeting.clientName}, are you ready to start your meeting with ${meeting.ownerName}? ` 
                    )}}
                </h2>
                <div v-if="loadingFinished" style="padding: 30px;">
                    <h2 v-if="isOwner()">
                        {{meeting.ownerCheckedInMeeting ? (
                            `Thank you for checking-in, please start the meeting with ${meeting.ownerName}!`
                        ) : (
                            `Thank you for checking-in, please wait for ${meeting.ownerName} to check-in to start the meeting!`
                        )}}
                    </h2>
                    <h2 v-else>
                        {{meeting.clientCheckedInMeeting ? (
                            `Thank you for checking-in, please start the meeting with ${meeting.ownerName}!`
                        ) : (
                            `Thank you for checking-in, please wait for ${meeting.clientName} to check-in to start the meeting!`
                        )}}
                    </h2>

                    <v-btn
                        style="margin: 10px 0;"
                        color="#a9a9a9"
                        @click.stop="show = false">
                        close
                    </v-btn> 
                </div>

                <v-card-actions v-if="!loadingFinished" style="margin-top: -25px; margin-left: 10px;">
                <!-- <v-spacer></v-spacer> -->
                <div class="my-2">
                    <v-btn
                        class="yesBtn"  
                        rounded
                        outlined 
                        color="#556B2F"
                        @click.stop="isOwner() ? ownerCheckIn() : clientCheckIn()"
                    >
                        Yes
                    </v-btn> 
                    <v-btn
                        class="noBtn"  
                        rounded
                        outlined 
                        color="#FF69B4" 
                        @click.stop="show = false"
                    >
                        No
                    </v-btn>
                </div>                
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import {mapActions, mapGetters } from 'vuex'
// import { SendEmailToClientOnOwnerCheckIn, SendEmailToOwnerOnClientCheckIn } from '../../../../emailTemplates/emails'
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
            showLoading: false,
            countUp: 0,
            loadingFinished: false,
            meeting: {}
        }

    },
    beforeMount(){
        if(this.isOwner()) this.meeting = this.currentUserOffers.filter(offer => offer.objectId === this.data.meetingId)[0]
        else this.meeting = this.$store.getters.currentOffer
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
        ownerCheckIn(){

            //send email to client on owner check-in
            // const clientEmailData = SendEmailToClientOnOwnerCheckIn({
            //     clientEmail: this.meeting.clientEmail,
            //     clientName: this.meeting.clientName,
            //     ownerName: this.meeting.ownerName,
            //     roomId: this.meeting.roomId,
            //     token: this.meeting.token,
            //     verificationId: this.meeting.objectId
            // })
            // this.sendEmail(clientEmailData)
            // this.updateOffer({
            //     objectId: this.meeting.objectId,
            //     ownerCheckedInMeeting: true,
            //     OwnerCheckedInDate: new Date(),
            //     readByReceiver: false,
            // })
            this.countUp = 0
            this.showLoading = true
            this.startCountUpTimer()
        },
        clientCheckIn(){
            //send email to owner on client check-in
            // const ownerEmailData = SendEmailToOwnerOnClientCheckIn({
            //     ownerEmail: this.meeting.ownerEmail,
            //     clientName: this.meeting.clientName,
            //     ownerName: this.meeting.ownerName,
            // })
            // this.sendEmail(ownerEmailData)
            // this.updateOffer({
            //     objectId: this.meeting.objectId,
            //     clientCheckedInMeeting: true,
            //     clientCheckedInDate: new Date(),
            //     readByReceiver: false,
            // })
            this.countUp = 0
            this.showLoading = true
            this.startCountUpTimer()
        },
        startCountUpTimer() {
            if(this.countUp === 5){
                this.loadingFinished = true
                // this.countUp = 0
            }
            if(this.countUp < 5) {
                setTimeout(() => {
                    this.countUp += 1
                    this.startCountUpTimer()
                }, 500)
            }
        },
        
    }
}
</script>
<style scoped>
    .yesBtn{
        margin: 5px 5px;
    }
    .yesBtn:hover{
        background-color: #f5f5dc;
    }
    .noBtn{
        margin: 5px 5px;
    }
    .noBtn:hover{
        background-color: #800000;
    }
</style>