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
            <div v-if="isOwner()">
                <v-card v-if="!meeting.ownerCompletedFollowup">
                    <v-card-title class="headline">Tell us how it went:</v-card-title>
                    <v-card-text>
                        This is just a survey to know how things went between you and {{meeting.clientName}}.
                    </v-card-text>
                    <v-col cols="12">        
                        <form @submit="submitOwnerResults" ref="form">
                            <v-select
                                :items="['Excellent', 'Good', 'Ok', 'Bad', 'Terrible']"
                                label="How was the meeting overall?"
                                v-model="surveyData.answer1"
                                @change="thereAreErrors = false"
                                outlined
                                :rules="[() => !!surveyData.answer1 || 'This field is required']"
                            ></v-select>
                            <v-select
                                :items="['Yes', 'No']"
                                :label="`Did you and ${meeting.clientName} come to an agreement?`"
                                v-model="surveyData.answer2"
                                :rules="[() => !!surveyData.answer2 || 'This field is required']"
                                @change="thereAreErrors = false"
                                outlined
                            ></v-select>
                            <v-select
                                v-if="surveyData.answer2 === 'Yes'"
                                :items="['Yes', 'No', 'Not Sure']"
                                :rules="[() => (surveyData.answer2 === 'Yes' && !!surveyData.answer3) || 'This field is required']"
                                :label="`Will ${meeting.clientName} be moving into the property soon?`"
                                v-model="surveyData.answer3"
                                @change="thereAreErrors = false"
                                outlined
                            ></v-select>
                            <v-select
                                v-if="surveyData.answer2 === 'No'"
                                :items="['I did not like the visitor', 'Visitor was unable to follow property rules', 'Meeting never happened', 'We just disagree', 'I was unavailable', 'Other']"
                                :label="`What went wrong?`"
                                v-model="surveyData.answer4"
                                :rules="[() => (surveyData.answer2 === 'No' && !!surveyData.answer4) || 'This field is required']"
                                outlined
                                @change="thereAreErrors = false"
                            ></v-select>
                            <div
                                v-if="surveyData.answer3 === 'Yes' && surveyData.answer2 === 'Yes'"
                            >
                                <p style="color: teal;">
                                    That is good too know! We will review the results, and notify your
                                    when we verify this information.
                                </p>
                            </div>
                            <p 
                                v-if="(surveyData.answer2 === 'No' && surveyData.answer4.length > 0) || surveyData.answer3 === 'No'"
                                style="color: saddlebrown;"
                            >
                                We are sorry to know that it did not work out. Be optimistic, more offers will come.
                            </p>
                            <p 
                                v-if="surveyData.answer2 === 'Yes' && surveyData.answer3 === 'Not Sure'"
                                style="color: darkblue;"
                            >
                                Not a problem, please feel free contact us if {{meeting.clientName}} agrees 
                                to move in. This meeting status will remain pending until we determine the 
                                final decision between you  and {{meeting.clientName}}. Once a desicion is made,
                                you will receive a notification and an email.
                            </p>
                            <v-textarea
                                name="input-7-1"
                                filled
                                label="Additional Comments: (optional)"
                                v-model="surveyData.comments"
                            ></v-textarea> 

                            <p style="color: red; margin-left: 15px;" v-if="thereAreErrors">
                                Please respond required questions!
                            </p>

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
                        type="submit"
                    >
                        Submit
                    </v-btn>
                        </form>
                    </v-col>
                    <v-card-actions>
                    <v-spacer></v-spacer>

                    </v-card-actions>
                </v-card>
                <v-card v-else>
                <v-card-title 
                    class="headline justify-center font"
                    style="color: #4d4e1f; margin: 10px 0"
                >
                    The data is already on file!
                </v-card-title>
                <v-row justify="center" style="margin: 0">
                    <v-btn
                        color="green darken-1"
                        text
                        @click.stop="show = false"
                    >
                        close
                    </v-btn>
                </v-row>
                </v-card>
            </div>
            <div v-if="!isOwner()">
                <v-card v-if="!meeting.clientCompletedFollowup">
                    <v-card-title class="headline">Tell us how it went:</v-card-title>
                    <v-card-text>
                        This is just a survey to know how things went between you and {{meeting.clientName}}.
                    </v-card-text>
                    <v-col cols="12">        
                        <form @submit="submitClientResults" ref="form">
                            <v-select
                                :items="['Excellent', 'Good', 'Ok', 'Bad', 'Terrible']"
                                label="How was the meeting overall?"
                                v-model="surveyData.answer1"
                                @change="thereAreErrors = false"
                                outlined
                                :rules="[() => !!surveyData.answer1 || 'This field is required']"
                            ></v-select>
                            <v-select
                                :items="['Yes', 'No']"
                                :label="`Did you and ${meeting.ownerName} come to an agreement?`"
                                v-model="surveyData.answer2"
                                :rules="[() => !!surveyData.answer2 || 'This field is required']"
                                @change="thereAreErrors = false"
                                outlined
                            ></v-select>
                            <v-select
                                v-if="surveyData.answer2 === 'Yes'"
                                :items="['Yes', 'No', 'Not Sure']"
                                :rules="[() => (surveyData.answer2 === 'Yes' && !!surveyData.answer3) || 'This field is required']"
                                :label="`Will you be moving into the property soon?`"
                                v-model="surveyData.answer3"
                                @change="thereAreErrors = false"
                                outlined
                            ></v-select>
                            <v-select
                                v-if="surveyData.answer2 === 'No'"
                                :items="['I did not like the property', `I did not like ${meeting.ownerName}`, 'Meeting never happened', 'We just disagree', 'I was unavailable', 'Price was too hight', 'Other']"
                                :label="`What went wrong?`"
                                v-model="surveyData.answer4"
                                :rules="[() => (surveyData.answer2 === 'No' && !!surveyData.answer4) || 'This field is required']"
                                outlined
                                @change="thereAreErrors = false"
                            ></v-select>
                            <div
                                v-if="surveyData.answer3 === 'Yes' && surveyData.answer2 === 'Yes'"
                            >
                                <p style="color: teal;">
                                    That is good too know! We will review the results, and notify your
                                    when we verify this information.
                                </p>
                            </div>
                            <p 
                                v-if="(surveyData.answer2 === 'No' && surveyData.answer4.length > 0) || surveyData.answer3 === 'No'"
                                style="color: saddlebrown;"
                            >
                                We are sorry to know that it did not work out. Be optimistic, there is a property for everyone.
                                Keep sending offers, you will get it next time.
                            </p>
                            <p 
                                v-if="surveyData.answer2 === 'Yes' && surveyData.answer3 === 'Not Sure'"
                                style="color: darkblue;"
                            >
                                Not a problem, please feel free contact us if {{meeting.clientName}} agrees 
                                to move in. This meeting status will remain pending until we determine the 
                                final decision between you  and {{meeting.clientName}}. Once a desicion is made,
                                you will receive a notification and an email.
                            </p>
                            <v-textarea
                                name="input-7-1"
                                filled
                                label="Additional Comments: (optional)"
                                v-model="surveyData.comments"
                            ></v-textarea> 

                            <p style="color: red; margin-left: 15px;" v-if="thereAreErrors">
                                Please respond required questions!
                            </p>

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
                        type="submit"
                    >
                        Submit
                    </v-btn>
                        </form>
                    </v-col>
                    <v-card-actions>
                    <v-spacer></v-spacer>

                    </v-card-actions>
                </v-card>
                <v-card v-else>
                <v-card-title 
                    class="headline justify-center font"
                    style="color: #4d4e1f; margin: 10px 0"
                >
                    The data is already on file!
                </v-card-title>
                <v-row justify="center" style="margin: 0">
                    <v-btn
                        color="green darken-1"
                        text
                        @click.stop="show = false"
                    >
                        close
                    </v-btn>
                </v-row>
                </v-card>
            </div>
 

        </v-dialog>
</template>

<script>
import {mapActions, mapGetters } from 'vuex'
import { SendEmailToAdminOnFollowUpSubmitted } from '../../../emailTemplates/emails'
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'

export default {
    name: "MeetingFollowup",
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
                comments: '',
            },
            meeting: {},
            thereAreErrors: false
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
        async submitOwnerResults(e){
            e.stopPropagation();
            if(this.areThereErrorsForAdmin()) this.thereAreErrors = true
            else {            
                this.thereAreErrors = false
                await this.updateOffer({
                    objectId: this.meeting.objectId,
                    ownerCompletedFollowup: true,
                    ownerCompletedFollowupOn: new Date(),
                    ownerResults: this.surveyData,
                    status: `${this.meeting.ownerName} submitted meeting results.`
                })
                
                const emailToAdmin = SendEmailToAdminOnFollowUpSubmitted({
                    email: 'familyroomrentals@dr.com',
                    owner: true,
                    name: this.meeting.ownerName,
                    meetingId: this.meeting.objectId
                })
                await this.sendEmail(emailToAdmin);
                
                this.show = false;
            }
        },
        async submitClientResults(e){
            e.stopPropagation();
            if(this.areThereErrorsForAdmin()) this.thereAreErrors = true
            else {            
                this.thereAreErrors = false
                await this.updateOffer({
                    objectId: this.meeting.objectId,
                    clientCompletedFollowup: true,
                    clientCompletedFollowupOn: new Date(),
                    clientResults: this.surveyData,
                    status: `${this.meeting.ownerName} submitted meeting results.`
                })
                
                const emailToAdmin = SendEmailToAdminOnFollowUpSubmitted({
                    email: 'familyroomrentals@dr.com',
                    owner: false,
                    name: this.meeting.clientName,
                    meetingId: this.meeting.objectId
                })
                await this.sendEmail(emailToAdmin);
                
                this.show = false;
            }
        },
        areThereErrorsForAdmin(){
            if(this.surveyData.answer1 === '' || this.surveyData.answer2 === '') return true;
            else if(this.surveyData.answer3 === '' && this.surveyData.answer4 === '') return true
            else if(this.surveyData.answer2 === 'No' && this.surveyData.answer4 === '') return true
            else if(this.surveyData.answer2 === 'Yes' && this.surveyData.answer3 === '') return true
            else return false
        }
    }
}
</script>
<style scoped>

</style>