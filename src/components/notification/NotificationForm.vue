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
                v-model="full_name"
                type="text"
                outlined
            ></v-text-field>

            <v-text-field
                v-model="email"
                label="email: example@email.com"
                outlined
            ></v-text-field>

            <v-text-field
                v-model="phone"
                label="phone number: (212-222-2222)"
                outlined
            ></v-text-field>

            <v-textarea
                v-model="message"
                filled
                label="Enter your message"
            ></v-textarea> 
            <div>
                <small style="color: darkcyan">(Tipically Respond in under 24 hours)</small>
            </div>
            <v-btn type="submit" @click="sendMessage" color="#2e8b57" dark>
                    Send
                <!-- <v-icon large color="#2E8B57">mdi-email</v-icon> -->
            </v-btn>
        </form>
    </v-col>
    </v-row>
    
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: {
        ...mapGetters([
            'contentRoom',
            'isNotificationSent',
        ]),
    },
   data () {
      return {
        full_name: '',
        email: '',
        phone: '',
        message: '',
        sent: false
      }
    },
    created() {
    },
    methods:{
        ...mapActions([                  // Add this
            'sendNotification'
        ]),
        sendMessage(e) {
            e.preventDefault();
            const notification = {
                    full_name: this.full_name,
                    email: this.email,
                    phone: this.phone,
                    message: this.message,
                    receiverId: this.contentRoom.ownerId,
                    readByDev: false,
                    readByReceiver: false
            }
            this.sendNotification(notification);
            console.log("sendingg");
        }
    }
  }

</script>