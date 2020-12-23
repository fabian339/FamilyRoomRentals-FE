<template>
  <v-container>
    <v-row class="text-center" justify="center">
        <div class="logo" >
            <img src="https://i.ibb.co/DrcHFyW/logo.png" alt="logo" width="400">
        </div>
        <v-col
            md="10"
        >
            <h2> An email has been sent to {{this.$store.getters.currentUser.email}} for verification.</h2>
            <h2> Please Verify email, then <a @click.stop="$router.go(0)">reload</a> or log back in! </h2>
        </v-col>
    </v-row>
    <v-row class="text-center" justify="center">
        <v-btn color="#66CDAA" style="margin: 20px;" @click.stop="resendEmailVerification">Re-send Email Verification</v-btn>    
    </v-row>
  </v-container> 
</template>

<script>
import {mapActions} from 'vuex'

  export default {

    beforeMount(){
        // if(!this.$store.getters.currentUser.email || this.$store.getters.currentUser.email === ''){
        //     this.$router.push('/login')
        // }
        // if(!this.$store.getters.currentUser.emailVerified){
        //     this.$router.push('/profile')
        // }
    },
    methods: {
        ...mapActions([                  // Add this
            'sendEmailVerification'
        ]),
        resendEmailVerification(){
            console.log("email veri",this.$store.getters.currentUser.email)
            if(this.$store.getters.currentUser.email){
                this.sendEmailVerification({email: this.$store.getters.currentUser.email})
                this.$router.push("/login")
            }

        },
    }
  }
</script>