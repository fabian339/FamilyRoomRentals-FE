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
                        <p>Message: </p>
                        <div id="message">
                            <p> 
                                I will like to offer the ammount of <strong>${{currentOffer.offer}}</strong> for this room. 
                                Please consider my offer as I will really appreciate it.
                            </p>
                        </div>
                        <div style="margin: 15px 0px;">
                            <h3>What would you like to do?</h3>
                            <p>
                                If you feel like this is a good match and price for the property,
                                please accept <strong>{{currentOffer.full_name}}'s offer</strong> and schedule a meeting 
                                to show him/her the room. Otherwise, deny such offer.
                            </p>
                        </div>
                        <p>  
                            <strong>
                                Status:
                            </strong>
                            <strong style="color: teal">
                                {{currentOffer.status}}
                            </strong>
                        </p>
                </v-card-text>
                <v-card-actions style="margin-top: -25px;">
                <!-- <v-spacer></v-spacer> -->
                <div class="my-2">
                    <v-btn 
                        style="margin: 0px 5px;" 
                        small 
                        outlined 
                        color="#556B2F"
                        :disabled="currentOffer.offerAcceptedByOwner || currentOffer.offerRejectedByOwner"  
                        @click.stop="redirectToSchedule">
                        Accept offer
                    </v-btn> 
                    <v-btn 
                        style="margin: 0px 5px;" 
                        small 
                        outlined 
                        color="#FF69B4" 
                        @click.stop="showRejectionDialog = true"
                        :disabled="currentOffer.offerAcceptedByOwner || currentOffer.offerRejectedByOwner"
                    >
                        Deny Offer
                    </v-btn>
                    <v-btn 
                        style="margin: 0px 5px;" 
                        small color="error" 
                        @click.stop="showDeleteWarning = true"
                        :disabled="currentOffer.offerAcceptedByOwner"
                    >
                        Delete Offer
                    </v-btn>
                </div>                
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
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: "ViewNotification",
    props: {
        value: Boolean,
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
        ]),
    },
    data(){
        return{
            showDeleteWarning: false,
            showRejectionDialog: false,
        }
    },
    methods: {
        ...mapActions([
            'deleteOffer',
            'updateOffer'
        ]),
        // ...mapMutations([
        //     'SET_OFFER'
        // ]),
        deleteMessage(){
            this.deleteOffer(this.currentOffer.objectId)
            this.showDeleteWarning = false;
            this.$emit('input', false)
            // console.log("Deleting Notification", id)
        },
        redirectToSchedule(){
            if(this.$router.history.current.path !== `/offer/${this.currentOffer.objectId}/schedule`){
                // console.log('current path', this.$router.history.current.path)
                // appRouter.push(`/profile`)
                // this.SET_OFFER(this.currentOffer)
                this.$router.push(`/offer/${this.currentOffer.objectId}/schedule`)
                this.show = false
            } else this.show = false
        },
        markOfferRejected(){
            this.updateOffer({
                objectId: this.currentOffer.objectId,
                offerRejectedByOwner: true,
                status: "Offer was rejected!",
            })
            this.showRejectionDialog = false
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