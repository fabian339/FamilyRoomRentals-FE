<template>
    <v-row class="text-center" justify="center" >
        <v-col lg="4" v-if="!isNotificationSent" style="border: 2px solid #8fbc8f; border-radius: 10px">
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
                    :error-messages="errors.full_name"   
                ></v-text-field>

                <v-text-field
                    v-model="email"
                    label="email: example@email.com"
                    outlined
                    :error-messages="errors.email"   
                ></v-text-field>

                <v-text-field
                    v-model="phone"
                    label="phone number: (212-222-2222)"
                    outlined
                    :error-messages="errors.phone"   
                ></v-text-field>

                <v-textarea
                    v-model="message"
                    filled
                    label="Enter your message"
                    :error-messages="errors.message"   
                ></v-textarea> 
                <div>
                    <small style="color: darkcyan">(Tipically Respond in under 24 hours)</small>
                </div>
                <v-btn type="submit" @click="sendMessage" color="#2e8b57" dark>
                    Send
                </v-btn>
            </form>
        </v-col>
        <SuccessAlert v-if="isNotificationSent" msg="Your Message was sent and received. Please kindly wait for a reesponse to the email or phone you provided." />
    </v-row>
    
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {validateNotification} from '../../store/validators'
import SuccessAlert from '@/components/notification/SuccessAlert.vue';

  export default {
    name: 'NotificationForm',
    components: {
        SuccessAlert
    },
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
        sent: false,
        errors: {}
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
                    roomId: this.contentRoom.objectId,
                    readByDev: false,
                    readByReceiver: false
                }
            const {valid, errors} = validateNotification(notification);
            if(!valid) this.errors = errors;
            else this.sendNotification(notification);
        }
    }
  }

</script>