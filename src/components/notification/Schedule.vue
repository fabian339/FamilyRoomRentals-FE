<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <div class="logo" >
          <img :src="require('../../assets/logo.png')" alt="logo" width="400">
      </div>
      <v-col lg="8">
        <h2 class="headline font-weight-bold mb-3">Schedule your meeting with the client</h2>
        <h3>Please select three available dates, you will be notified prior the meeting day.</h3>
      </v-col>
    </v-row>
    <v-row justify="space-around">
        <div>
            <div>
                <v-date-picker
                    v-model="dates[0].date"
                    color="blue"
                ></v-date-picker>
            </div>
            <div>
                <v-time-picker
                    @input="fixDate1"
                ></v-time-picker>
            </div>
            <v-text-field
                :value="`Schedule: ${dates[0].date} at ${dates[0].time}`"
                disabled
                :error-messages="errors.time1"   
            ></v-text-field>
        </div>
        <div>
            <div>
                <v-date-picker
                    v-model="dates[1].date"
                    color="orange"
                ></v-date-picker>
            </div>
            <div>
                <v-time-picker
                    @input="fixDate2"
                    color="orange"
                ></v-time-picker>
            </div>
            <v-text-field
                :value="`Schedule: ${dates[1].date} at ${dates[1].time}`"
                disabled
                :error-messages="errors.time2"   
            ></v-text-field>
        </div>
        <div>
            <div>
                <v-date-picker
                    v-model="dates[2].date"
                    color="pink"
                ></v-date-picker>
            </div>
            <div>
                <v-time-picker
                    @input="fixDate3"
                    color="pink" 
                ></v-time-picker>
            </div>
            <v-text-field
                :value="`Schedule: ${dates[2].date} at ${dates[2].time}`"
                disabled
                :error-messages="errors.time3"  
            ></v-text-field>
        </div>
    </v-row>
    <v-row class="text-center" justify="center" style="margin: 15px">
        <v-btn @click.stop="SendSchedule" color="#483D8B" dark>
            Save Avaliable Dates
        </v-btn>
    </v-row>
  </v-container>
</template>
<script>
// import ViewOffer from '@/components/notification/ViewOffer.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Schedule',
    components: {
        // ViewOffer
    },
    computed: {
        ...mapGetters([
            'isAuthenticated',
            'currentUserNotifications',
        ])
    },
    data: () => ({
        dates: [
            {
                date: new Date().toISOString().substr(0, 10),
                time: '',
            },
            {
                date: new Date().toISOString().substr(0, 10),
                time: '',
            },
            {
                date: new Date().toISOString().substr(0, 10),
                time: ''
            }
        ],
        errors: {}
    }),
    methods:{
        ...mapActions([
            'logout',
            'markNotificationRead'
        ]),
        fixDate1(time){
            this.dates[0].time = (parseInt(time.substr(0, 2)) < 12) ? 
                (parseInt(time.substr(0, 2)) === 0 ) ? 
                (`12${(time.substr(2, 4))} AM`) :
                (time + ' AM') : (parseInt(time.substr(0, 2)) > 12) ? 
                (`${(parseInt(time.substr(0, 2)) - 12)}${(time.substr(2, 4))} PM`) : 
                (`${time} PM`);
        },
        fixDate2(time){
            this.dates[1].time = (parseInt(time.substr(0, 2)) < 12) ? 
                (parseInt(time.substr(0, 2)) === 0 ) ? 
                (`12${(time.substr(2, 4))} AM`) :
                (time + ' AM') : (parseInt(time.substr(0, 2)) > 12) ? 
                (`${(parseInt(time.substr(0, 2)) - 12)}${(time.substr(2, 4))} PM`) : 
                (`${time} PM`);
        },
        fixDate3(time){
            this.dates[2].time = (parseInt(time.substr(0, 2)) < 12) ? 
                (parseInt(time.substr(0, 2)) === 0 ) ? 
                (`12${(time.substr(2, 4))} AM`) :
                (time + ' AM') : (parseInt(time.substr(0, 2)) > 12) ? 
                (`${(parseInt(time.substr(0, 2)) - 12)}${(time.substr(2, 4))} PM`) : 
                (`${time} PM`);
        },
        SendSchedule(){
            let errors = {};
            if(this.dates[0].time === '') errors.time1 = 'Please select an appropiate time.'
            if(this.dates[1].time === '') errors.time2 = 'Please select an appropiate time.'
            if(this.dates[2].time === '') errors.time3 = 'Please select an appropiate time.'
            this.errors = errors;
        }
    },
}
</script>