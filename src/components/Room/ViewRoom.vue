<template>
    <v-container>
        <ContentLoading  v-if="isContentLoading"/>
        <div class="text-center">
            <SuccessAlert v-if="isRoomUpdated && !isOfferSent" msg="Room Updated Successfully!" />
        </div>
        <v-row class="text-center" v-if="!isContentLoading" justify="center">
            <div 
                class="imageContainer"
                :style="fullScreen ? 'height: 90vh; width: 100%' : 'height: 500px; width: 70%'"
                 v-if="contentRoom.images"
                 @click.stop="fullScreen = !fullScreen"
            >
                <v-btn
                    icon
                    dark
                    class="previousPic"
                    @click.stop="changePhoto('previous')"
                >
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-btn
                    icon
                    dark
                    class="nextPic"
                    @click.stop="changePhoto('next')"
                >
                    <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
                <img :src="contentRoom.images[imgToDisplayIndex]" alt="img" width="100%" height="100%">
            </div>
            <div                 
                class="imageContainer"
                style="border: 1px solid; width: 70%; border-radius: 5px"
                v-else
            >   
                <img src="https://i.ibb.co/t85JhCP/no-Room-Img.png" alt="img" width="70%" height="500">
                
            </div>
            <v-row 
                justify="center" 
                style="margin: 0px 15%;" 
                v-if="contentRoom.images"
            >                   
                <div v-for="(image, index) in contentRoom.images" :key="image.street1">
                    <div @click.stop="imgToDisplayIndex = index" >
                        <img 
                            :src="image" 
                            alt="img" 
                            width="100" 
                            height="50"
                            :style="imgToDisplayIndex === index ? ('border: 2px solid #ffe668; margin: 5px;') : ('margin: 5px;')"
                        >
                    </div>
                </div>
            </v-row>
            <!-- </v-col> -->
            <v-col
                class="mb-5"
                cols="12"
            >
            <small>Posted on {{new Date(this.contentRoom.createdAt).toLocaleString('en-US')}} by {{contentRoom.ownerFname}}, {{contentRoom.ownerLname}}</small>
            <div v-if="this.contentRoom.ownerId === this.currentUser.objectId">
                <div v-if="!this.contentRoom.lockedByAdmin">
                    <v-btn 
                        class="ma-2" 
                        color="#008080"  
                        dark
                        @click.stop="updateDialog = true" 
                    >
                        Edit Room
                        <v-icon dark>mdi-pencil</v-icon>
                    </v-btn> 

                    <EditRoomForm v-model="updateDialog"/>

                    <v-btn 
                        class="ma-2" 
                        color="red" 
                        dark 
                        @click.stop="deleteDialog = true"
                    >
                        Delete Room
                        <v-icon dark right>mdi-delete</v-icon>
                    </v-btn>
                </div>
                <p v-if="this.contentRoom.rented" style="color: darkgoldenrod;">
                    This room cannot receive offers as it is marked as <strong>rented.</strong> 
                    To publish it back please unmark it in the edit section.
                </p>
 
                <p v-if="this.contentRoom.disabled && !this.contentRoom.lockedByAdmin" style="color: darkgoldenrod;">
                    This room is not public and cannot receive offers as it is marked as <strong>disabled.</strong> 
                    To publish it back please unmark it in the edit section.
                </p>
                <p v-if="this.contentRoom.lockedByAdmin" style="color: red;">
                    This property has been temporary disabled/blocked by <strong>FamilyRoomRentalts.</strong> This is because you either 
                    violated FamilyRoomRentalts's Terms and Conditions, cancelled a pending meeting for no reason,
                    or pusblished something inappropriate. Please review our Terms & Conditions for more details. 
                </p>

                <v-dialog
                    v-model="deleteDialog"
                    max-width="290"
                    >
                    <v-card>
                        <v-card-title class="headline">Are you sure you want to delete this room?</v-card-title>
                        <v-card-text>
                            Once this is done, we cannot recover this data. Do you want to continue?
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            color="green darken-1"
                            text
                            @click="deleteDialog = false"
                        >
                            Cancel
                        </v-btn>

                        <v-btn
                            color="green darken-1"
                            text
                            @click="deleteRoomData"
                        >
                            Continue
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                 </v-dialog>

            </div>
            <h2 style="margin-bottom: 20px;">{{contentRoom.title.toUpperCase()}} - ${{contentRoom.price}}/month</h2>
            <v-card
                class="mx-auto"
                max-width="800"
                color="#8fbc8f"
            >
            <div style="padding: 15px;">
                <h3>Description:</h3>
                <p class="font" style="margin: 20px;"> {{contentRoom.description}} </p>
                <div v-if="contentRoom.propertyRules">
                    <h3>Rules:</h3>
                    <div v-for="(rule, index) in contentRoom.propertyRules" :key="index + 10/3">
                        <span class="font">{{index+1}}) {{rule}}</span>
                    </div>
                </div>
            </div>
            </v-card>
            <div style="margin: 25px;">
                <div>
                    <v-icon style="font-size: 100px;" large color="green darken-2">mdi-map-marker</v-icon>
                </div>
                <p class="font" style="margin: 5px 35%;">
                    {{contentRoom.location.street1}}, 
                    {{contentRoom.location.street2}},
                    {{contentRoom.location.city}},
                    {{contentRoom.location.state}},
                    {{contentRoom.location.zipCode}},
                    {{contentRoom.location.country}}
                </p>
                <v-btn color="teal" dark @click="openAddress">
                    Open Address
                </v-btn>
            </div>
            </v-col>
        </v-row>

        <v-row class="text-center" justify="center" v-if="!isContentLoading">
            <v-col cols="10" sm="8" md="8" lg="6" v-if="!isOfferSent">
                <OfferForm v-if="!contentRoom.rented && !contentRoom.lockedByAdmin && !contentRoom.disabled" />   
                <p v-if="contentRoom.rented" style="color: #de1254">No offer can be made as this Room is already rented!</p> 
                <p v-if="contentRoom.lockedByAdmin" style="color: #de1254">No offer can be made as this Room is temporary disabled!</p> 
            </v-col>
            <SuccessAlert v-if="isOfferSent" msg="Your offer was sent and received. Kindly wait for a response to the email or phone# you provided." />
        </v-row>
        <v-row class="text-center" justify="center" v-if="!isContentLoading && !contentRoom.rented">
            <p style="color: darkblue;"><strong>Offers made: {{contentRoom.numberOfOffers}}</strong></p>
        </v-row>
        <v-row class="text-center" justify="center" v-if="!isContentLoading && !contentRoom.rented">
            <v-btn 
                small 
                color="#8dbade" 
                @click.stop="saveRoom" 
                style="margin-right: 5px"
                :disabled="saveBtnDiasabled || contentRoom.lockedByAdmin || contentRoom.disabled"
            >
                {{saveBtnDiasabled ? alreadySaved ? 'Already Saved' : 'Saved' : 'Save Property'}}
            </v-btn>
            <v-btn 
                small 
                color="#b58985" 
                @click.stop="reportRoom" 
                style="margin-left: 5px"
                :disabled="reportBtnDiasabled || contentRoom.lockedByAdmin || contentRoom.disabled"
            >
                <!-- Report Property -->
                {{reportBtnDiasabled ? 'Reported' : 'Report Property'}}
            </v-btn>
        </v-row>
        <v-row class="text-center" justify="center" style="margin-top: 20px;" v-if="!isContentLoading && !contentRoom.rented">
            <v-expand-transition>
                <v-card
                    v-show="showSaveBtnWarning"
                    height="100"
                    width="230"
                >
                    <v-card-text style="color: blue">Please log in to save property!</v-card-text>
                    <v-btn small color="#ffa826" to="/login">Log In</v-btn>
                </v-card>
            </v-expand-transition>
            <v-expand-transition>
                <v-card
                    v-show="showReportBtnWarning"
                    height="100"
                    width="240"
                >
                    <v-card-text style="color: blue">Please log in to report property!</v-card-text>
                    <v-btn small color="#ffa826" to="/login">Log In</v-btn>
                </v-card>
            </v-expand-transition>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import OfferForm from '@/components/notification/OfferForm.vue';
import ContentLoading from '@/components/layout/ContentLoading.vue';
import SuccessAlert from '@/components/notification/SuccessAlert.vue';
import EditRoomForm from './EditRoomForm.vue'
import {SendEmailToAdminOnRoomReported} from '../../globals/emails'

  export default {
    name: 'viewRoom',
    components: {
        OfferForm,
        EditRoomForm,
        SuccessAlert,
        ContentLoading
    },
    computed: {
        ...mapGetters([
            'contentRoom',
            'isContentLoading',
            'currentUser',
            'isRoomUpdated',
            'isOfferSent',
            'isAuthenticated'
        ]),
    },
    data(){
        return {
            deleteDialog: false,
            updateDialog: false,
            roomAddress: '',
            fullScreen: false,
            imgToDisplayIndex: 0,
            updated: false,
            showSaveBtnWarning: false,
            showReportBtnWarning: false,
            reportBtnDiasabled: false,
            alreadySaved: false,
            saveBtnDiasabled: false
        }
    },
    methods:{
        ...mapActions([
            'deleteRoom',
            'updateUser',
            'sendEmail'
        ]),
        deleteRoomData(){
            this.deleteRoom(this.$route.params.id);
        },
        openAddress(){
            const {location: {street1, street2, city, state, zipCode, country}} = this.contentRoom;
            this.roomAddress = `https://www.google.com/maps/place/${street1}+${street2}+${city}+${state}+${zipCode}+${country}`;
            window.open(this.roomAddress, '_blank');
        },
        changePhoto(direction){
            if(direction === 'next') {
                if(this.contentRoom.images.length - 1 > this.imgToDisplayIndex){
                    this.imgToDisplayIndex = this.imgToDisplayIndex + 1;
                } else {
                    this.imgToDisplayIndex = 0;
                    console.log(this.imgToDisplayIndex, direction)  
                }
            }
            if(direction === 'previous') {
                if(this.imgToDisplayIndex != 0){
                    this.imgToDisplayIndex = this.imgToDisplayIndex - 1;
                } else {
                    this.imgToDisplayIndex = this.contentRoom.images.length - 1
                }

                // console.log(this.imgToDisplayIndex, direction)
            }
        },
        saveRoom(){
            console.log("saving room")
            if(this.isAuthenticated){
                // console.log(this.isContentLoading ,this.contentRoom.objectId, this.currentUser.objectId)
                let roomIds = this.currentUser.savedRoomsIds ? this.currentUser.savedRoomsIds : [];
                if(!roomIds.includes(this.contentRoom.objectId)){
                    roomIds.push(this.contentRoom.objectId);
                    this.updateUser({
                        objectId: this.currentUser.objectId,
                        savedRoomsIds: roomIds
                    })
                } else {
                    this.alreadySaved = true;
                }
                this.saveBtnDiasabled = true;
            }
            else {
                this.showSaveBtnWarning = !this.showSaveBtnWarning;
            }
        },
        reportRoom(){
            console.log("reporting room")
            if(this.isAuthenticated){
                const adminEmailData = SendEmailToAdminOnRoomReported({
                    email: 'familyroomrentals@dr.com',
                    userId: this.$store.getters.currentUser.objectId,
                    propertyId: this.$store.getters.contentRoom.objectId,
                })
                this.sendEmail(adminEmailData);

                //send email to admin user
                this.reportBtnDiasabled = true;
            }
            else {
                this.showReportBtnWarning = !this.showReportBtnWarning;
            }
        }
    }
  }
</script>

<style scoped>
    .imageItem{
        border: 2px solid;
        width: 70%;
    }
    #description{
        align-items: center;
        font-size: 1.25rem;
        font-weight: 500;
        letter-spacing: 0.0125em;
        line-height: 2rem;
        margin: 10px;
    }
    .imageContainer{
        /* border: 2px solid; */
        /* width: 70%; */
        position:relative;
        margin-top: -12px;
        /* height: auto; */
    }
    .nextPic{
        position: absolute;
        /* margin: 28vh 0px; */
        bottom: 45%;
        background-color: #00000063 !important;
        right: 0;
    }
    .previousPic{
        position: absolute;
        left: 0;
        /* margin: 28vh 0px; */
        bottom: 45%;
        background-color: #00000063 !important;
    }
    .smaillImg{
        width: 70%;
        border: solid;
    }

</style>