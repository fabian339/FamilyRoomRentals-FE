<template>
    <v-container>
        <v-progress-circular
            v-if="isContentLoading"
            color="green"
            :size="100"
            :width="15"
            indeterminate
        ></v-progress-circular>
        <v-row class="text-center" v-if="!isContentLoading">
            <v-col
                class="mb-5"
                cols="12"
                style="marginTop: -30px"
            >
                <v-carousel class="RoomImages">
                    <v-carousel-item
                        v-for="(image,i) in contentRoom.images"
                        :key="i"
                        :src="image"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                    ></v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col
                class="mb-5"
                cols="12"
                style="marginTop: -30px"
            >
            <div v-if="this.contentRoom.ownerId === this.currentUser.objectId">
                <v-btn class="ma-2" color="#008080" dark @click.stop="updateDialog = true" >
                    Edit Room
                    <v-icon dark>mdi-pencil</v-icon>
                </v-btn>  
                <v-dialog
                    v-model="updateDialog"
                    max-width="600px"
                    >
                    <v-card>
                        <v-card-title>
                            <span class="headline">User Profile</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Legal first name*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                        label="Legal last name*"
                                        hint="example of persistent helper text"
                                        persistent-hint
                                        required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Email*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Password*" type="password" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select
                                        :items="['0-17', '18-29', '30-54', '54+']"
                                        label="Age*"
                                        required
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-autocomplete
                                        :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                        label="Interests"
                                        multiple
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*indicates required field</small>
                            </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="updateDialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="updateDialog = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>


                <v-btn class="ma-2" color="red" dark @click.stop="deleteDialog = true">
                    Delete Room
                    <v-icon dark right>mdi-delete</v-icon>
                </v-btn>

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
            <h2 style="margin-bottom: 20px;">{{contentRoom.title}} - ${{contentRoom.price}}/month</h2>
            <v-card
                class="mx-auto"
                max-width="800"
                color="#8fbc8f"
            >
                <h4 id="description">Description:</h4>
                <p> {{contentRoom.description}} </p>
                <div v-if="contentRoom.propertyRules">
                    <h4>Rules:</h4>
                    <div v-for="(rule, index) in contentRoom.propertyRules" :key="index + 10/3">
                        <span>{{index+1}}) {{rule}}</span>
                    </div>
                </div>
            </v-card>
            <div style="margin: 25px;">
                <div>
                    <v-icon style="font-size: 100px;" large color="green darken-2">mdi-map-marker</v-icon>
                </div>
                <p style="margin: 5px 35%;">
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
                    
            <NotificationForm />
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NotificationForm from '@/components/notification/NotificationForm.vue'

  export default {
    name: 'viewRoom',
    components: {
        NotificationForm
    },
    computed: {
        ...mapGetters([
            'contentRoom',
            'isContentLoading',
            'currentUser',
            'contentRoom'
        ]),
    },
    data(){
        return {
            deleteDialog: false,
            updateDialog: false,
            roomAddress: ''
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
        }
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