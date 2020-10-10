<template>
  <v-container>
    <v-row class="text-center" justify="center" v-if="currentOffer.offerAcceptedByOwner || currentOffer.offerRejectedByOwner">
        <div class="logo" >
            <img :src="require('../../assets/logo.png')" alt="logo" width="400">
        </div>
        <h1 style="color: brown; font-style: italic;">
            {{currentOffer.offerAcceptedByOwner ? (
                `This offer is already accepted and has the schedule: ${currentOffer.offerAcceptedByOwner}`) : (
                    'This offer was rejected.'
                )
            }}
        </h1>
    </v-row>
    <div v-else>
        <v-row class="text-center" justify="center">
            <div class="logo" >
                <img :src="require('../../assets/logo.png')" alt="logo" width="400">
            </div>
            <v-col lg="8">
                <h2 class="headline font-weight-bold mb-3">Schedule your meeting with {{currentOffer.full_name}}</h2>
                <h3>Please select three available dates at your best convenience.</h3>
                <h4>{{currentOffer.full_name}} will select one of these dates to meet with you, see the property, and discuss details.</h4>
            </v-col>
        </v-row>
        <v-row justify="space-around">
            <div v-for="(item, index) in dates" :key="index + 4" style="border: 2px solid lightgray; border-radius: 15px; width: 294px;">
                <div>
                    <p :style="`text-align: center; color: ${item.color}`"><strong> SELECT DATE# {{index + 1}} </strong></p>
                     <v-date-picker
                        v-model="item.date"
                        :color="item.color"
                    ></v-date-picker>
            
                    <p :style="`text-align: center; color: ${item.color}`"><strong> SELECT TIME# {{index + 1}} </strong></p>
                    <v-time-picker
                        v-model="item.tempTime"
                        @input="fixTime(index)"
                        :color="item.color"
                    ></v-time-picker>
                <div style="text-align: center;line-height: 10px;margin: 20px 0px;">
                    <p :style="`color: ${item.color}`">{{`Schedule: ${item.date} at ${item.time}`}}</p>
                    <p style="color: red; line-height: 15px;">{{item.errorDateMsg}}</p>
                </div>
                </div>
            </div>
        </v-row>
        <v-row class="text-center" justify="center" style="margin: 35px 0px -5px 0px;">
            <v-btn @click.stop="SendSchedule" color="#483D8B" dark>
                Save Avaliable Dates
            </v-btn>
        </v-row>
        <v-row class="text-center" justify="center" style="margin: 25px 0px -15px 0px">
            <p style="color:red">{{duplicatedDateError}}</p>
        </v-row>
    </div>
    <UserAgreementWithClient 
        v-model="showUserAgreement" 
        :offerData="{
                    objectId: this.currentOffer.objectId,
                    offerAcceptedByOwner: true,
                    meetingDates: this.dates,
                }"
    />
  </v-container>
</template>
<script>
import UserAgreementWithClient from '@/components/agreements/UserAgreementWithClient.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Schedule',
    components: {
        UserAgreementWithClient
    },
    computed: {
        ...mapGetters([
            'isAuthenticated',
            'currentOffer'
        ])
    },
    data: () => ({
        dates: [
            {
                date: new Date().toISOString().substr(0, 10),
                tempTime: '',
                time: '',
                color: '#191970',
                errorDateMsg: ''
            },
            {
                date: new Date().toISOString().substr(0, 10),
                tempTime: '',
                time: '',
                color: '#FF7F50',
                errorDateMsg: ''
            },
            {
                date: new Date().toISOString().substr(0, 10),
                tempTime: '',
                time: '',
                color: '#C71585',
                errorDateMsg: ''
            }
        ],
        duplicatedDateError: '',
        showUserAgreement: false,
        data: {}
    }),
    created(){

    },
    methods:{
        ...mapActions([
            'acceptOffer',
        ]),
        fixTime(index){
            // console.log("HEREEEEE", e)
            let time = this.dates[index].tempTime;
            this.dates[index].time = (parseInt(time.substr(0, 2)) < 12) ? 
                (parseInt(time.substr(0, 2)) === 0 ) ? 
                (`12${(time.substr(2, 4))} AM`) :
                (time + ' AM') : (parseInt(time.substr(0, 2)) > 12) ? 
                (`${(parseInt(time.substr(0, 2)) - 12)}${(time.substr(2, 4))} PM`) : 
                (`${time} PM`);
        },
        SendSchedule(){
            console.log("validating schedule")
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
                    item.errorDateMsg = 'This date has passed or its too soon.';
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
                    console.log(item.time, "error time")
                    validSchedule = false;
                } else {
                    item.errorDateMsg = '';
                    console.log("cleaning errors")
                }
            })
            // show dialog to accept terms and conditions
            if(validSchedule) {
                // this.dates.forEach(item => delete item.errorDateMsg)
                // const offerData = {
                //     objectId: this.currentOffer.objectId,
                //     offerAcceptedByOwner: true,
                //     meetingDates: this.dates
                // }
                // this.data = offerData;
                this.showUserAgreement = true;
                // this.acceptOffer(offerData);
                // console.log('schedule is valid', offerData)
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