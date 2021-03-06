<template>
  <v-row justify="center">
    <v-dialog 
        v-model="show" 
        fullscreen 
        hide-overlay 
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar dark color="#2F4F4F">
            <v-btn icon dark @click="show = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit User</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark text @click="submitUpdateUser">Save Changes</v-btn>
            </v-toolbar-items>
            </v-toolbar>
            <v-row class="text-center" justify="center">
                <v-col lg="4">
                    <div id="logo" >
                        <img style="margin: 10px" :src="require('../../assets/logo.png')" alt="logo" width="400">
                    </div>
                    <p class="errorMsg">{{formErrors.message}}</p>
                    <p class="errorMsg" v-if="Object.keys(userErrors).length !== 0">
                        <strong>Error:</strong>
                        {{userErrors.responseError}} Try using another username or password.</p>
                    <h2 class="headline font-weight-bold mb-3">
                        Update User
                    </h2>
                    <v-text-field
                        name="fName"
                        v-model="fName"
                        label="First Name"
                        @keydown="onKeyboardPressed"
                        :error-messages="formErrors.fName"   
                    ></v-text-field>

                    <v-text-field
                        name="lName"
                        v-model="lName"
                        label="Last Name"
                        @keydown="onKeyboardPressed"
                        :error-messages="formErrors.lName"   
                    ></v-text-field>

                    <v-text-field
                        name="username"
                        v-model="username"
                        label="Enter an username"
                        @keydown="onKeyboardPressed"
                        :error-messages="formErrors.username"
                    ></v-text-field>

                    <v-text-field
                        name="email"
                        v-model="email"
                        label="Email: example@email.com"
                        @keydown="onKeyboardPressed"
                        :error-messages="formErrors.email"
                    ></v-text-field>

                    <v-text-field
                        name="phone"
                        v-model="phone"
                        label="phone: (222-222-2222)"
                        @keydown="onKeyboardPressed"
                        :error-messages="formErrors.phone"
                    ></v-text-field>

                    <div id="profilePhotoContainer">
                        <p>Change profile picture</p>
                        <img :src="`${userPhoto ? userPhoto : 'https://i.ibb.co/bNrgM0Q/default-User-Photo.jpg'}`" alt="img" width="150" height="100">
                        <div style="width: 60%; margin: auto;">
                            <v-file-input
                                accept="image/*"
                                label="Choose Photo"
                                @change="uploadUserImage"
                                prepend-icon="mdi-camera"
                            ></v-file-input>
                        </div>
                        <p class="errorMsg">{{formErrors.invalidFile}}</p>
                    </div>

                    <v-btn style="margin: 15px auto" small color="#66CDAA" @click.stop="showPasswordDialog = true">
                        <v-icon color="black">mdi-lock</v-icon>
                        Change Current Password
                        <v-icon color="black">mdi-lock</v-icon>
                    </v-btn>
                </v-col>
                <!-- <v-dialog
                v-model="showPasswordDialog"
                max-width="350"
                >
                <v-card>
                    <v-card-title class="headline">Request Password Change:</v-card-title>
                    <v-card-text>
                        An email will be send with easy instructions on how to change password. 
                        Check the email address you use to login with us!
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        text
                        @click="showPasswordDialog = false"
                    >
                        Cancel
                    </v-btn>

                    <v-btn
                        color="green darken-1"
                        text
                        @click.stop="changePassword"
                    >
                        Send Email
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog> -->
            </v-row>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {validateUpdateUser} from '../../store/validators'

  export default {
    name: "EditUserForm",
    props: {
        value: Boolean
    },
    computed: {
        ...mapGetters([
            'userErrors',
            'currentUser'
        ]),
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
    },
    data () {
      return {
        fName: this.$store.getters.currentUser.fName,
        lName: this.$store.getters.currentUser.lName,
        username: this.$store.getters.currentUser.username,
        email: this.$store.getters.currentUser.email,
        phone: this.$store.getters.currentUser.phone,
        userPhoto: this.$store.getters.currentUser.userPhoto,
        formErrors: {},
        changes: [],
        showPasswordDialog: false
      }
    },
    methods:{
        ...mapActions([
            'updateUser',
            'changeUserPassword'
        ]),

        submitUpdateUser(e) {
            e.preventDefault();
            if(this.changes.length !== 0){
                const updatedUserData = {}
                let properties = [...new Set(this.changes)]
                properties.forEach(item => {
                    updatedUserData[item] = this[item];
                });
                updatedUserData.objectId = this.$store.getters.currentUser.objectId;
                //when updating the user, if fname or lname are updated then update the rooms that belongs to that user
                if(this.$store.getters.currentUserRooms.length !== 0 && (updatedUserData.fName || updatedUserData.lName)){
                    const roomIds = [];
                    this.$store.getters.currentUserRooms.forEach(room => roomIds.push(room.objectId));
                    updatedUserData.roomIdsToUpdate = roomIds;
                }
                const {valid, errors} = validateUpdateUser(updatedUserData);
                if(!valid) this.formErrors = errors;
                else {//if(Object.keys(this.userErrors).length === 0) {
                    this.updateUser(updatedUserData)
                    this.show = false;
                }
            } else {
                let errors = {
                    message: 'Nothing to update!'
                }
                this.formErrors = errors;
            }
        },
        uploadUserImage(file){
            // console.log(file)
            // const file = e.target.files[0];
            if(file) {
                var pattern = /image-*/;
                if(!file.type.match(pattern)){
                const error = {
                    invalidFile: 'File type must be an image.'
                }
                this.formErrors = error;
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = e => this.userPhoto = e.target.result;
                this.changes.push('userPhoto');
            }
            }
        },
        onKeyboardPressed(e){
            this.changes.push(e.target.name);
            // console.log('focus' ,e.target.name)
        },

        changePassword(){
            console.log("changing password");
            const data = {
                email: this.$store.getters.currentUser.email
            }
            this.changeUserPassword(data);
            this.showPasswordDialog= false;
            this.show = false;
        }
     }
  }
</script>

<style scoped>
    #profilePhotoContainer {
        padding: 15px;
        border: 2px solid;
        border-radius: 15px;
        margin: 10px;
    }
    .errorMsg{
        color: red;
        text-align: center;
        margin: 10px;
    }
</style>