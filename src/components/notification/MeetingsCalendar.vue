<template>
    <v-row justify="center">
        <h1 class="text-center font-weight-bold mb-3">
            Meeting Calendar:
        </h1>
        <div>
            <h1>{{date}} {{time}}</h1>
        </div>
    </v-row>
</template>

<script>
// import {mapActions, mapGetters } from 'vuex'
// import { SendEmailToClientOnOwnerCheckIn, SendEmailToOwnerOnClientrCheckIn } from '../../globals/emails'
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'
// import moment from 'moment-timezone'
import axios from 'axios'
export default {
    name: "MeetingsCalendar",
    components: {},
    data(){
        return {
            date: null,
            time: null
        }

    },
    beforeMount(){
        axios.get('http://worldclockapi.com/api/json/est/now')
        .then(res =>{
            this.date = new Date(res.data.currentDateTime).toDateString()
            this.time = new Date(res.data.currentDateTime).toLocaleTimeString()
            // console.log(new Date().getUTCHours())
        })
        .catch(err => {
            console.log(err)
        })
    },
    methods: {
        // ...mapActions([
        //     'updateOffer',
        //     'sendEmail'
        // ]),
    }
}
</script>
<style scoped>

</style>