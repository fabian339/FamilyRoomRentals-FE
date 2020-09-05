<template>
    <v-container>
        <v-row class="text-center">
            <v-col
                class="mb-5"
                cols="12"
                style="marginTop: -30px"
            >
                <v-progress-circular
                    v-if="isContentLoading"
                    color="green"
                    :size="100"
                    :width="15"
                    indeterminate
                ></v-progress-circular>
                <v-carousel v-if="!isContentLoading" class="RoomImages">
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
            <h2>{{contentRoom.title}} - ${{contentRoom.price}}/month</h2>
            <div style="width: 80%; margin: auto">{{contentRoom.description}}</div>
            </v-col>
            <NotificationForm />
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NotificationForm from '@/components/notification/NotificationForm.vue'

// import contentActions from '/.././store/actions/contentActions'
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
            updateDialog: false
        }
    },
    methods:{
        ...mapActions([                  // Add this
            'setRoom',
            'deleteRoom',
        ]),
        deleteRoomData(){
            this.deleteRoom(this.$route.params.id);
        }

    },
    created(){
        // contentActions.setRoom(this.$route.params.id);
        this.setRoom(this.$route.params.id)

    }

  }
</script>

<style>
.RoomImages{
    width: 80%;
    margin: auto 10%;
}
</style>v-row>