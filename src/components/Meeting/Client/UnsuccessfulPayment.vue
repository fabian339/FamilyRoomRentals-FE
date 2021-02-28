<template>
  <div>
    <PageLoading  v-model="isPageLoading" :seconds="1000"/>
    <v-container v-if="!isPageLoading">
      <v-row class="text-center" justify="center">
        <div class="logo" >
          <img src="https://i.ibb.co/DrcHFyW/logo.png" alt="logo" width="400">
        </div>
        <v-col lg="6">
          <h2 class="headline font-weight-bold mb-3">
            We are sorry to see that you are having <span style="color:red">trouble</span> completing the payment process.
            If there is anything we can do to help you please let us know.
          </h2>
        </v-col>
      </v-row>
      <v-row class="text-center" justify="center">
        <v-col lg="8">
          <h2>Helpful Links:</h2>
          <div style="margin-top: 20px; display: inline-grid">
            <v-btn small class="btn" type="submit" dark color="#0f825a" to="/terms-and-conditions/services">Paying for the Service</v-btn>
            <v-btn small class="btn" type="submit" dark color="#7a2184" to="/contact-us">Contact Us</v-btn>
            <v-btn small class="btn" type="submit" dark color="#00799e" to="/qas">Questions & Answers</v-btn>
            <v-btn small class="btn" type="submit" dark color="#476500" to="/rooms">
              <v-icon>mdi-arrow-left</v-icon> Check More Properties
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
    
</template>

<script>
import {mapActions} from 'vuex'
import PageLoading from '@/components/Loading/PageLoading.vue';

// import axios from 'axios'
export default {
  name: "UnsuccessfulPayment",
  components: { PageLoading },
  data: () => {
      return{
          name: '',
          meetingUrlPath: '',
          isPageLoading: false
      }
  },
  created(){
    this.isPageLoading = true
    // next()
  },
  beforeMount(){
      // const {session_id} = this.$router.history.current.params;
      // // let data = { session_id: session_id}
      // console.log("Asucces payment", session_id)
      // axios.get(`https://familyroomrentals-be.herokuapp.com/new-client/${session_id}`)
      // .then(res => {
      //   console.log(res)
      //   this.name = res.data.clientName;
      //   this.meetingUrlPath = res.data.meetingUrlPath
      // })
      // .catch(err => {
      //   console.log(err)
      // });

  },
  methods: {
      ...mapActions([                  // Add this
          'sendEmailVerification',
          'setUserAuthorization'
      ]),
      // openMeetingPage(){
      //     window.open(this.meetingUrlPath, '_blank');
      // }
  }
}
</script>

<style scoped>
  .btn{
    margin: 5px
  }
</style>