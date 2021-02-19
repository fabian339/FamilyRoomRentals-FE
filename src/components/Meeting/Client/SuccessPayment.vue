<template>
  <v-container>
    <p>Payment</p>
  </v-container> 
</template>

<script>
import {mapActions} from 'vuex'
var stripe = window.Stripe('pk_test_51HapnKJSKBXxCn1NhtSdWf20xtfcBHhY4vdpfsGbcLjEYpYlc7EhPoyZcZtJHUSieWnVnaBPTgtHHRE3neumb8SP00FqpVZSGn')

  export default {
    name: "SuccessPayment",
    data: () => {
        return{
            // emailResent: false
        }
    },
    async beforeMount(){
        const {session_id} = this.$router.history.current.params;
        console.log("Asucces payment", this.$router.history.current.params)
        const session = await stripe.checkout.sessions.retrieve(session_id);
        console.log(session)
       //once the email has been verified, direct user to profile page
    //   if(this.$store.getters.isUserAuthenticated){
    //         //set user authorized token
    //         const token = localStorage.getItem('user-token');
    //         let data = {
    //             token,
    //             userEmailVerified: true
    //         }
    //         this.setUserAuthorization(data)
    //         this.$router.push('/profile')
    //     }
    },
    methods: {
        ...mapActions([                  // Add this
            'sendEmailVerification',
            'setUserAuthorization'
        ]),
        // authorizeUser(data){
        //     this.setUserAuthorization(data)
        // },
        // //resent email to verify email
        // resendEmailVerification(){
        //     if(this.$store.getters.currentUser.email){
        //         this.sendEmailVerification({email: this.$store.getters.currentUser.email})
        //         this.emailResent = true
        //     }

        // },
    }
  }
</script>