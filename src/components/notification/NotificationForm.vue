<template>
  <v-row class="text-center" justify="center">
    <v-col lg="4" style="border: 2px solid #8fbc8f; border-radius: 10px">
    <h2 class="headline font-weight-bold mb-3">
        Interested?
    </h2>
    <h5 class="headline font-weight-bold mb-3">
       Send us a message
    </h5>
        <form
        >
            <v-text-field
                label="Full Name"
                name="name"
                type="text"
                outlined
            ></v-text-field>

            <v-text-field
                ref="email"
                label="email: example@email.com"
                outlined
            ></v-text-field>

            <v-text-field
                ref="phone"
                label="phone number: (212-222-2222)"
                outlined
            ></v-text-field>

            <v-textarea
                name="input-7-1"
                filled
                label="Enter your message"
            ></v-textarea> 
            <div>
                <small style="color: darkcyan">(Tipically Respond in under 24 hours)</small>
            </div>
            <v-btn type="submit" color="#2e8b57" dark>
                    Send
                <!-- <v-icon large color="#2E8B57">mdi-email</v-icon> -->
            </v-btn>
        </form>
    </v-col>
    </v-row>
    
</template>

<script>
// import {mapActions} from 'vuex'
  export default {
//    data () {
//       return {
//         username: '',
//         password: '',
//       }
//     },
//      methods:{
//         ...mapActions([                  // Add this
//             'logInUser'
//         ]),
//         submit(e) {
//             e.preventDefault();
//             const user = {
//                 username: this.username,
//                 password: this.password,
//             }
//             this.logInUser(user)
//             // this.$router.push("/")
//         }
//      }
  }

</script>