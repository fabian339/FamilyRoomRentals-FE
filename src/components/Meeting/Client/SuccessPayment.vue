<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <div class="logo" >
        <img src="https://i.ibb.co/DrcHFyW/logo.png" alt="logo" width="400">
      </div>
      <v-col lg="6">
        <div>
          <h2 class="headline font-weight-bold mb-3">
            {{thereIsAnError ? '' : `${name},`}} <span style="color:green">Congratulations!</span> Your appointment has been 
            <span style="color:green">officially</span> scheduled. 
            A confirmation email has been sent and we really hope your meeting goes well.
          </h2>
          <h2 style="color: #226158; margin-top: 25px">WHAT'S NEXT?</h2>
          <div style="margin-top: 20px; display: inline-grid">
            <v-btn small class="btn" type="submit" dark color="#0f825a" to="/meetings/handling-meetings">How To Handle Meetings</v-btn>
            <v-btn small class="btn" type="submit" dark color="#7a2184" @click.stop="openMeetingPage">Check meeting Status</v-btn>
            <v-btn small class="btn" type="submit" dark color="#00799e" to="/qas">Questions & Answers</v-btn>
            <v-btn small class="btn" type="submit" dark color="#476500" to="/rooms">
              <v-icon>mdi-arrow-left</v-icon> Check More Properties
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>

    
</template>

<script>
import {mapActions} from 'vuex'
import axios from 'axios'
  export default {
    name: "SuccessPayment",
    data: () => {
        return{
            name: '',
            meetingUrlPath: '',
            thereIsAnError: false
        }
    },
    beforeMount(){
        const {session_id} = this.$router.history.current.params;
        // let data = { session_id: session_id}
        console.log("Asucces payment", session_id)
        axios.get(`https://familyroomrentals-be.herokuapp.com/new-client/${session_id}`)
        .then(res => {
          console.log(res)
          this.name = res.data.clientName;
          this.meetingUrlPath = res.data.meetingUrlPath
        })
        .catch(err => {
          this.thereIsAnError = true;
          console.log("ERROR", err) // if there is an error redirect to homepage
        });
    },
    methods: {
        ...mapActions([                  // Add this
            'sendEmailVerification',
            'setUserAuthorization'
        ]),
        openMeetingPage(){
            window.open(this.meetingUrlPath, '_blank');
        }
    }
  }
</script>

<style scoped>
  .btn{
    margin: 5px
  }
</style>