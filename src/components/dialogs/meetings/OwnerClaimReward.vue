<template>
    <v-row justify="center">
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
                <v-card-title 
                    class="headline justify-center font"
                    style="color: #1a7cab; margin: 10px 0"
                >
                {{!this.data.ownerRewarded ? 'Claim Secret Reward' : 'Your Reward is: '}}
                </v-card-title>
                <div v-if="isOwner()">
                    <div v-if="!this.data.ownerRewarded">
                        <div style="text-align: center;">
                            <v-card-text class="justify-center font" style="text-align: center">
                                Generate Reward
                            </v-card-text>
                            <v-btn
                                dark
                                color="#3c614e"
                                @click.stop="generateReward()"
                            >
                                Claim
                            </v-btn>
                        </div>
                    </div>
                    <div v-else>
                        <div style="text-align: center;">
                            <img :src="this.data.ownerReward.source" :alt="this.data.ownerReward.name" width="150">
                            <p style="margin: 0 30px; color: #3b926a">
                                YAYYYY, this {{this.data.ownerReward.name}} gift card will be send to your email.
                                Please allow us some time(24 hours) to send it. Thanks you once again for using FamilyRoomRentals.
                            </p>
                        </div>
                        <!-- <div v-if="this.data.ownerRewardSent">
                            <p>Your Reward:</p>
                        </div>
                        <div v-else>
                            <p>We are preparing your reward. Your reward will be sent to your email. </p>
                        </div> -->
                    </div>
                </div>
                <div v-else>
                    <p style="text-align: center; color: red">Sorry, you are not authorized to view this!</p>
                </div>
                <v-card-actions> 
                    <v-btn
                        color="green darken-1"
                        text
                        @click.stop="show = false"
                    >
                        close
                    </v-btn>             
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import {mapActions, mapGetters } from 'vuex'
import { SendEmailToAdminOnRewardRequested } from '../../../emailTemplates/emails'
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'

export default {
    name: "OwnerClaimReward",
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
            // rewardSelected: false,
            // ownerReward: {}
        }
    },
    beforeMount(){
        if(this.data.ownerRewarded){
            console.log("calling")

        }
    },
    methods: {
        ...mapActions([
            'updateOffer',
            'sendEmail',
        ]),
        isOwner(){
            return this.isUserAuthenticated && this.currentUser.objectId === this.data.ownerId
        },
        async generateReward(){
            let rewards = [
                    { 
                        name: 'Amazon',
                        source: 'https://res.cloudinary.com/dr4l6xat9/image/upload/v1614467667/FamilyRoomRentalsGlobal/rewards/Amazon.png'
                    },
                                        { 
                        name: 'Starbucks',
                        source: 'https://res.cloudinary.com/dr4l6xat9/image/upload/v1614466203/FamilyRoomRentalsGlobal/rewards/Starbucks.jpg'
                    },
                                        { 
                        name: 'Target',
                        source: 'https://res.cloudinary.com/dr4l6xat9/image/upload/v1614465947/FamilyRoomRentalsGlobal/rewards/Target.jpg'
                    },
                                        { 
                        name: 'Walmart',
                        source: 'https://res.cloudinary.com/dr4l6xat9/image/upload/v1614465846/FamilyRoomRentalsGlobal/rewards/walmart.svg'
                    }
                ]

            let randomIndex = Math.floor(Math.random() * 4) + 0;
            let reward = rewards[randomIndex];
            await this.updateOffer({
                objectId: this.data.meetingId,
                ownerRewarded: true,
                ownerReward: reward
            })

            let adminData = SendEmailToAdminOnRewardRequested({
                rewardName: reward.name,
                ownerName: this.data.ownerName,
                offerId: this.data.meetingId,
                email: 'familyroomrentals@dr.com'
            })
            await this.sendEmail(adminData)
            // this.rewardSelected = true;
            // this.ownerReward = rewards[randomIndex]

        }
    }
}
</script>
<style scoped>

</style>