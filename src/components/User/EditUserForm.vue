<template>
  <v-row justify="center">
    <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="#2F4F4F">
            <v-btn icon dark @click="show = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit User</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark text @click="submitUpdateUser">Save User Data</v-btn>
            </v-toolbar-items>
            </v-toolbar>
                <v-row class="text-center" justify="center">
                    <v-col lg="4">
                    <div id="logo" >
                        <img style="margin: 10px" :src="require('../../assets/logo.png')" alt="logo" width="400">
                    </div>
                    <h2 class="headline font-weight-bold mb-3">
                        Update User
                    </h2>
                        <form
                        @submit="submitUpdateUser"
                        >

                        <v-text-field
                            name="fName"
                            v-model="fName"
                            label="First Name"
                            @keydown="onKeyboardPressed"
                        ></v-text-field>

                        <v-text-field
                            name="lName"
                            v-model="lName"
                            label="Last Name"
                            @keydown="onKeyboardPressed"
                        ></v-text-field>

                        <v-text-field
                            name="username"
                            v-model="username"
                            label="Enter an username"
                            @keydown="onKeyboardPressed"
                        ></v-text-field>

                        <v-text-field
                            name="email"
                            v-model="email"
                            label="Email: example@email.com"
                            @keydown="onKeyboardPressed"
                        ></v-text-field>

                        <v-text-field
                            name="phone"
                            v-model="phone"
                            label="phone: (222-222-2222)"
                            @keydown="onKeyboardPressed"
                        ></v-text-field>

                        <p>How would you like to receive notifications? </p>
                        <v-radio-group 
                            v-model="notifyBy" 
                            style="margin: auto 30%"
                            @change="radioChange"
                        >
                            <v-radio
                                label="By email"
                            ></v-radio>
                            <v-radio
                                label="By phone/text"
                            ></v-radio>
                            <v-radio
                                label="Both"
                            ></v-radio>
                            <v-radio
                                label="None"
                            ></v-radio>
                        </v-radio-group>

                        <label for="userPhoto">Change profile picture</label>
                        <div id="profilePhotoContainer">
                            <img :src="userPhoto" alt="img" width="150" height="100">
                                <div>
                                    <input 
                                        type="file" 
                                        prepend-icon="mdi-camera" 
                                        accept="image/*" 
                                        style="margin: 8px 30%;"
                                        @change="uploadUserImage"
                                    >
                                </div>
                        </div>

                        <!-- <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            v-model="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            hint="At least 8 characters"
                        ></v-text-field> 
                            
                        <v-text-field
                            id="confirmPassword"
                            v-model="confirmPassword"
                            label="Confirm Password"
                            name="confirmPassword"
                            hint="Must match you password"
                            prepend-icon="mdi-lock"
                            type="password"
                        ></v-text-field>         -->
                            <!-- <v-spacer></v-spacer> -->
                            <!-- <v-btn type="submit" color="#66CDAA">Register</v-btn> -->
                            <!-- <p style="color: red">{{userErrors.responseError}}</p> -->
                        </form>
                    </v-col>
                </v-row>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapActions} from 'vuex'

  export default {
    name: "EditUserForm",
    props: {
    value: Boolean
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
    data () {
      return {
        fName: this.$store.getters.currentUser.fName,
        lName: this.$store.getters.currentUser.lName,
        username: this.$store.getters.currentUser.username,
        email: this.$store.getters.currentUser.email,
        phone: this.$store.getters.currentUser.phone,
        userPhoto: this.$store.getters.currentUser.userPhoto,
        // password: this.$store.getters.currentUser.fName,
        // confirmPassword: this.$store.getters.currentUser.fName,
        notifyBy: ['email', 'phone/text', 'both', 'none'].findIndex((item) => item === this.$store.getters.currentUser.notifyBy),
        notifyByArray: ['email', 'phone/text', 'both', 'none'],
        formErrors: {},
        changes: [],
      }
    },
     methods:{
        ...mapActions([
            'updateUser'
        ]),
        submitUpdateUser(e) {
            e.preventDefault();
            const updatedUserData = {}
            let properties = [...new Set(this.changes)]
            properties.forEach(item => {
                updatedUserData[item] = this[item];
            });
            updatedUserData.objectId = this.$store.getters.currentUser.objectId;
            this.updateUser(updatedUserData);
            this.show = false;
        },
        uploadUserImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => this.userPhoto = e.target.result;
            this.changes.push('userPhoto');
        },
        onKeyboardPressed(e){
            this.changes.push(e.target.name);
            // console.log('focus' ,e.target.name)
        },
        radioChange(){
            this.changes.push('notifyBy');
            // console.log("radio changing", e);
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
</style>