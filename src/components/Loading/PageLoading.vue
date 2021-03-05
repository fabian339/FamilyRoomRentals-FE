<template>
    <div v-if="this.component.type === 'content' || this.component.type === ''">
      <div v-if="show">   
        <div class="sk-cube-grid">
            <div class="sk-cube sk-cube1"></div>
            <div class="sk-cube sk-cube2"></div>
            <div class="sk-cube sk-cube3"></div>
            <div class="sk-cube sk-cube4"></div>
            <div class="sk-cube sk-cube5"></div>
            <div class="sk-cube sk-cube6"></div>
            <div class="sk-cube sk-cube7"></div>
            <div class="sk-cube sk-cube8"></div>
            <div class="sk-cube sk-cube9"></div>
        </div>
        <div class="title-container-content"><p class="app-title-content">FamilyRoomRentals</p></div>
      </div>
    </div>
    <div v-else-if="this.component.type === 'user'">
      <div v-if="show">
        <div class="dot-carousel"></div>
        <div class="small-circle first-left"></div>
        <div class="small-circle first-right"></div>
        <div class="circle second-left"></div>
        <div class="circle second-right"></div>
        <div class="title-container-user"><p class="app-title-user">FamilyRoomRentals</p></div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import './contentLoading.css'
import './userLoading.css'

// import SuccessAlert from '@/components/notification/SuccessAlert.vue'

export default {
    name: "PageLoading",
    props: {
        value: Boolean,
        component: Object 
    },
    components: {},
    computed: {
        show: {
            get () {
                return this.value
            },
            set (value) {
                if (!value) {
                    this.$emit('input', value)
                }
            }
        },
        ...mapGetters([
            'userLoading',
            'isOfferSending',
            'contentLoading',
            'userLoading'
        ]),
    },
    data(){
        return{
          countUp: 0,
          timeoutID: Number,
          stopTimer: false
      }
    },
    beforeMount(){
      // if(!this.isContentLoading) {
        // console.log("HEREE", this.isContentLoading)
        this.startCountUpTimer()
      // }
    },
    methods: {
        startCountUpTimer() {
            if(this.countUp === this.component.seconds){
                this.clearTimeOut();
                this.show = false;
                this.countUp = 0;
                this.stopTimer = true;
            } 
            if(this.countUp < this.component.seconds && !this.stopTimer) {
              this.timeoutID = setTimeout(() => {
                console.log("counting", this.didFetchingStop())
                  if(this.didFetchingStop()){
                    this.countUp += 500
                    this.startCountUpTimer()
                  } else {
                    console.log("rooms loading")
                  }
                }, 500)
            }
        },
      
      didFetchingStop(){
        // console.log("did Fetching stopped?", !this.isContentLoading)
        if(this.component.type === 'content') return !this.contentLoading.loadingRooms;
        else if(this.component.type === 'user') return !this.userLoading.userRegistering || this.userLoading.userLoggingIn;
        else if(this.component.type === '') return true;
      },
      
      
      clearTimeOut(){
        window.clearTimeout(this.timeoutID);
      },
        
    }
}
</script>
