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
                    {{user === "owner" ? (
                        `Hey ${currentOffer.ownerName}, are you ready to check-in your meeting with ${currentOffer.full_name}?`) : (
                        `Hey ${currentOffer.full_name}, are you ready to check-in your meeting with ${currentOffer.ownerName}? ` )}}
                </h2>
                <div v-if="loadingFinished" style="padding: 30px;">
                    <h2 v-if="user === 'owner'">
                        {{currentOffer.clientCheckedInMeeting ? (
                            `Thank you for checking-in, please start the meeting with ${currentOffer.full_name}!`
                        ) : (
                            `Thank you for checking-in, please wait for ${currentOffer.full_name} to check-in to start the meeting!`
                        )}}
                    </h2>
                    <h2 v-if="user === 'client'">
                        {{currentOffer.ownerCheckedInMeeting ? (
                            `Thank you for checking-in, please start the meeting with ${currentOffer.ownerName}!`
                        ) : (
                            `Thank you for checking-in, please wait for ${currentOffer.ownerName} to check-in to start the meeting!`
                        )}}
                    </h2>

                    <v-btn
                        style="margin: 5px 5px;"
                        color="#556B2F"
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
                        @click.stop="registerMeeting">
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
// import { } from '../../globals/emails'
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'

export default {
    name: "MeetingCheckIN",
    props: {
        value: Boolean,
        user: String
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
            'currentOffer',
        ]),
    },
    data(){
        return{
            showLoading: false,
            countUp: 0,
            loadingFinished: false
        }

    },
    methods: {
        ...mapActions([
            'updateOffer',
            'sendEmail'
        ]),
        registerMeeting(){
            // console.log(this.user)
            // check that time match before actually checking in
            if(this.user === 'owner'){
                //send email to client on check-in
                this.updateOffer({
                    objectId: this.currentOffer.objectId,
                    ownerCheckedInMeeting: true,
                    OwnerCheckedInDate: new Date(),
                    readByReceiver: false,
                })
            }
            if(this.user === 'client'){
                //send email to owner on check-in
                this.updateOffer({
                    objectId: this.currentOffer.objectId,
                    clientCheckedInMeeting: true,
                    clientCheckedInDate: new Date(),
                    readByReceiver: false,
                })
            }
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
                }, 1000)
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