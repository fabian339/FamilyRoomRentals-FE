<template>
  <div>
    <PageLoading  
      v-model="isPageLoading" 
      :component="{
        seconds: 1000,
        type: ''
      }"
    />

    <v-container v-if="!isPageLoading">
      <v-row class="text-center" justify="center">
        <div class="logo" >
          <img :src="require('../../config.json').imgLinks.logo" alt="logo" width="400">
        </div>
          <v-col cols="10" sm="8">        
            <h2 class="font" style="color: #771818; padding: 20px">
              Accoding to the access that has been granted for your usage, 
              you are <span style="text-decoration: underline">UNAUTHOTIZED</span>
              to view the content of this page.
            </h2>
            <p class="font" style="padding: 10px">
              Redirecting to {{goingTo}} in: 
              <strong v-if="countDown >= 10000">{{countDown.toString().substring(0, 2)}}</strong>
              <strong v-else>{{countDown.toString()[0]}} </strong>
            </p>
          </v-col>
      </v-row>
    </v-container>
  </div>  
</template>

<script>
import PageLoading from '@/components/Loading/PageLoading.vue';
import { mapGetters } from 'vuex'
// const config = require('./config.json')
export default {
  name: 'About',
  components: { PageLoading },
  data: () => ({
    isPageLoading: false,
    countDown: 15000,
    timeoutID: Number,
    goingTo: ''
  }),
  computed: {
    ...mapGetters([
      'isUserAuthenticated'
    ])
  },
  created(){
    this.isPageLoading = true
    // next()
    if(this.isUserAuthenticated){
      this.goingTo = 'profile'
    } else {
      this.goingTo = 'home'
    }

    this.startCountDownTimer()
  },
  methods: {
    startCountDownTimer() {
      if(this.countDown === 0){
          this.clearTimeOut();
          this.countDown = 15000;
          this.redirect()
      } else {
        this.timeoutID = setTimeout(() => {
          this.countDown -= 1000
          this.startCountDownTimer()
        }, 1000)
      }
    },
    clearTimeOut(){
      window.clearTimeout(this.timeoutID);
    },
    redirect(){
      if(this.isUserAuthenticated) {
        this.$router.push('/profile')
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>