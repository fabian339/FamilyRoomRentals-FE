<template>
    <v-container>
        <ContentLoading  v-if="isContentLoading"/>
        <v-row class="text-center" v-if="!isContentLoading">
            <v-col
                class="mb-5"
                cols="12"
                style="marginTop: -30px"
            >
                <SuccessAlert v-if="isRoomUpdated" msg="Room Updated Successfully!" />
                <v-carousel class="RoomImages">
                    <v-carousel-item
                        v-for="(image,i) in contentRoom.images"
                        :key="i"
                        :src="image"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                        height="50px"
                    ></v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col
                class="mb-5"
                cols="12"
                style="marginTop: -30px"
            >
            <small>Posted on {{new Date(this.contentRoom.createdAt).toLocaleString('en-US')}} by {{contentRoom.ownerFname}}, {{contentRoom.ownerLname}}</small>
            <div v-if="this.contentRoom.ownerId === this.currentUser.objectId">
                <v-btn class="ma-2" color="#008080" dark @click.stop="updateDialog = true" >
                    Edit Room
                    <v-icon dark>mdi-pencil</v-icon>
                </v-btn> 

                <EditRoomForm v-model="updateDialog"/>

                <v-btn class="ma-2" color="red" dark @click.stop="deleteDialog = true">
                    Delete Room
                    <v-icon dark right>mdi-delete</v-icon>
                </v-btn>
                <p v-if="this.contentRoom.rented" style="color: darkgoldenrod;">
                    This room cannot receive offers as it is marked as <strong>rented.</strong> 
                    To publish it back please unmark it in the edit section.
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
                <div v-if="contentRoom.propertyRules.length > 0">
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
        <v-row class="text-center" justify="center">
            <v-col cols="10" sm="8" md="8" lg="6" v-if="!isOfferSent">
                <OfferForm v-if="!contentRoom.rented" />    
            </v-col>
            <SuccessAlert v-if="isOfferSent" msg="Your offer was sent and received. Kindly wait for a response to the email or phone# you provided." />
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import OfferForm from '@/components/notification/OfferForm.vue';
import ContentLoading from '@/components/layout/ContentLoading.vue';
import SuccessAlert from '@/components/notification/SuccessAlert.vue';
import EditRoomForm from './EditRoomForm.vue'

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
            'contentRoom',
            'isRoomUpdated',
            'isOfferSent'
        ]),
    },
    data(){
        return {
            deleteDialog: false,
            updateDialog: false,
            roomAddress: '',
            updated: false
        }
    },
    methods:{
        ...mapActions([
            'setRoom',
            'deleteRoom',
        ]),
        deleteRoomData(){
            this.deleteRoom(this.$route.params.id);
        },
        openAddress(){
            const {location: {street1, street2, city, state, zipCode, country}} = this.contentRoom;
            this.roomAddress = `https://www.google.com/maps/place/${street1}+${street2}+${city}+${state}+${zipCode}+${country}`;
            window.open(this.roomAddress, '_blank');
        },
    },
    created() {
        if(Object.keys(this.contentRoom).length === 0) this.setRoom(this.$route.params.id);
    }
  }
</script>

<style scoped>
    .RoomImages{
        width: 80%;
        margin: auto 10%;
    }
    #description{
        align-items: center;
        font-size: 1.25rem;
        font-weight: 500;
        letter-spacing: 0.0125em;
        line-height: 2rem;
        margin: 10px;
    }
</style>