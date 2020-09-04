<template>
  <v-row class="text-center" justify="center">
    <v-col lg="4">
    <h2 class="headline font-weight-bold mb-3">
        Interested?
    </h2>
    <h5 class="headline font-weight-bold mb-3">
       Send us a message
    </h5>
        <form
        >
            <v-text-field
                label="Your Name"
                name="name"
                type="text"
                outlined
            ></v-text-field>

            <v-text-field
                ref="email"
                label="Email: example@email.com"
                outlined
                required
            ></v-text-field>

            <v-text-field
                label="phone number:(212-222-2222)"
                hide-details
                single-line
                outlined
            />

            <v-textarea
                name="input-7-1"
                filled
                label="Enter your message"
            ></v-textarea> 

            <v-btn type="submit" color="#A9A9A9">
                <v-icon large color="#2E8B57">mdi-email</v-icon>
                    Send
                <v-icon large color="#2E8B57">mdi-email</v-icon>
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