<template>
  <v-container>
    <v-row class="text-center" justify="center" v-if="this.$store.getters.currentOffer.offerAccepted">
        <div class="logo" >
            <img :src="require('../../assets/logo.png')" alt="logo" width="400">
        </div>
        <h1 style="color: brown; font-style: italic;">This Offer is already accepted!</h1>
    </v-row>
    <div v-else>
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
                    :error-messages="dates[0].errorDateMsg"   
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
                    :error-messages="dates[1].errorDateMsg"   
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
                    :error-messages="dates[2].errorDateMsg"  
                ></v-text-field>
            </div>
        </v-row>
        <v-row class="text-center" justify="center" style="margin: 15px">
            <v-btn @click.stop="SendSchedule" color="#483D8B" dark>
                Save Avaliable Dates
            </v-btn>
        </v-row>
        <v-row class="text-center" justify="center" style="margin: 0px 15px">
            <p style="color:red">{{duplicatedDateError}}</p>
        </v-row>
    </div>
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
        ])
    },
    data: () => ({
        dates: [
            {
                date: new Date().toISOString().substr(0, 10),
                time: '',
                errorDateMsg: ''
            },
            {
                date: new Date().toISOString().substr(0, 10),
                time: '',
                errorDateMsg: ''
            },
            {
                date: new Date().toISOString().substr(0, 10),
                time: '',
                errorDateMsg: ''
            }
        ],
        duplicatedDateError: ''
    }),
    methods:{
        ...mapActions([
            'acceptOffer',
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
            let validSchedule = true;
            if(this.isThereDuplicatedDates()){
                this.duplicatedDateError = 'Cannot select duplicated dates!'
                validSchedule = false;
            }
            this.dates.forEach(item => {
                let selectedDate = new Date(item.date);
                let restrictionDate = new Date();
                restrictionDate.setMonth(restrictionDate.getMonth() + 1);
                if(new Date(item.date).toISOString() < new Date().toISOString()){
                    item.errorDateMsg = 'This date has passed, please select another date.';
                    validSchedule = false;
                } else if(!(selectedDate.toISOString() < restrictionDate.toISOString())) {
                    item.errorDateMsg = 'Please select a date within one month from today.'
                    validSchedule = false;
                } else if(item.time === '') {
                    item.errorDateMsg = 'Please select a time for the meeting.'
                    validSchedule = false;
                } else if(!(new Date("01/01/2000 "+item.time) > new Date("01/01/2000 7:00 AM") &&
                    new Date("01/01/2000 "+item.time) < new Date("01/01/2000 8:00 PM"))) {
                    item.errorDateMsg = 'Please select an appropiate time.'
                    validSchedule = false;
                } else item.errorDateMsg = '';
            })
            // show dialog to accept terms and conditions
            if(validSchedule) {
                this.dates.forEach(item => delete item.errorDateMsg)
                const offerData = {
                    objectId: this.$route.params.id,
                    offerAcceptedByOwner: true,
                    meetingDates: this.dates
                }
                // this.acceptOffer(offerData);
                console.log('schedule is valid', offerData)
            }
        },
        isThereDuplicatedDates(){
            let isDuplicated = false;
            if(this.dates[0].date === this.dates[1].date || this.dates[0].date === this.dates[2].date) isDuplicated = true;
            else if(this.dates[1].date === this.dates[0].date || this.dates[1].date === this.dates[2].date) isDuplicated = true;
            else if(this.dates[2].date === this.dates[0].date || this.dates[2].date === this.dates[1].date) isDuplicated = true;
            else this.duplicatedDateError = ''

            return isDuplicated;
        }
    },
}
</script>