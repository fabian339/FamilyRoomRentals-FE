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
                        <p>From: {{notificationData.full_name}}</p>
                        <p>Interested Room: <a :href="`/#/room/${notificationData.roomId}`" target="_blank">Click Here</a></p>
                        <p>Message: </p>
                        <div id="message">
                            <p>{{notificationData.message}}</p>
                        </div>
                        <h3>Response:</h3>
                        <p>
                            If you feel like this is a good match for the property,
                            please respond directly by either calling, texting or emailing {{notificationData.full_name}}.
                        </p>
                        <p><strong>{{notificationData.full_name}}'s email:</strong> <a :href="`mailto:${notificationData.email}`" target="_blank"> {{notificationData.email}}</a></p>
                        <p><strong>{{notificationData.full_name}}'s phone/text:</strong> {{notificationData.phone}}</p>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <div class="my-2">
                    <v-btn small color="error" @click.stop="showWarning = true">Delete Message</v-btn>
                </div>                
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="showWarning"
            max-width="350"
            >
            <v-card>
                <v-card-title class="headline">Are you sure you want to delete this message?</v-card-title>
                <v-card-text>
                    Once this is done, we cannot recover this data. Do you want to continue?
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    text
                    @click="showWarning = false"
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

    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: "ViewNotification",
    props: {
        value: Boolean,
        notificationData: {}
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
        }
    },
    data(){
        return{
            showWarning: false,
        }
    },
    methods: {
        ...mapActions([
            'deleteNotification'
        ]),
        deleteMessage(){
            this.deleteNotification(this.notificationData.objectId)
            this.showWarning = false;
            this.$emit('input', false)
            // console.log("Deleting Notification", id)
        }
    }
}
</script>
<style scoped>
    #message {
        border: 2px solid aquamarine;
        padding: 15px;
        border-radius: 15px;
    }
</style>