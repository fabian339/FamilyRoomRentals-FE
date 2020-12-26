<template>
  <v-container>
    <v-row class="text-center" justify="center">
        <div class="logo" >
            <img src="https://i.ibb.co/DrcHFyW/logo.png" alt="logo" width="400">
        </div>
        <v-col
            md="10"
        >
            <h2> 
                An email has been sent to <span style="text-decoration: underline;">{{this.$store.getters.currentUser.email}}</span> 
                for verification purposes.
            </h2>
            <h2> 
                After verifying, please 
                <a @click.stop="$router.go(0)">reload</a> this page or <a @click.stop="$router.push('/login')">log back in</a>
                to start your journey with us!
            </h2>
        </v-col>
    </v-row>
    <v-row class="text-center" justify="center">
        <v-btn color="#66CDAA" style="margin: 20px;" @click.stop="resendEmailVerification">
            <v-progress-circular
                v-if="emailResent && this.$store.getters.isUserLoading"
                indeterminate
                color="#f4ffff"
                :size="35"
                :width="5"
            ></v-progress-circular>
            <span v-else>Re-send Email Verification</span>
        </v-btn>    
    </v-row>
    <v-row v-if="emailResent" class="text-center" justify="center">
        <p style="color: #00580f">Email Sent!</p>
    </v-row>
  </v-container> 
</template>

<script>
import {mapActions} from 'vuex'

  export default {
    name: "emailVerification",
    data: () => {
        return{
            emailResent: false
        }
    },
    beforeUpdate(){
        // console.log("beforeupdate user is authenticated: ", this.isUserAuthenticated)
        //once the email has been verified, direct user to profile page
      if(this.$store.getters.isUserAuthenticated){
            //set user authorized token
            const token = localStorage.getItem('user-token');
            let data = {
                token,
                userEmailVerified: true
            }
            this.setUserAuthorization(data)
            this.$router.push('/profile')
        }
    },
    methods: {
        ...mapActions([                  // Add this
            'sendEmailVerification',
            'setUserAuthorization'
        ]),
        authorizeUser(data){
            this.setUserAuthorization(data)
        },
        //resent email to verify email
        resendEmailVerification(){
            if(this.$store.getters.currentUser.email){
                this.sendEmailVerification({email: this.$store.getters.currentUser.email})
                this.emailResent = true
            }

        },
    }
  }
</script>