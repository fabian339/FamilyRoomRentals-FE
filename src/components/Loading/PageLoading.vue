<template>
      <v-col
        class="py-4 text-center white--text"
        cols="12"
        v-if="show"
      >   

        <div class="sk-cube-grid">
          <!-- <p style="color: black">Seconds: {{countUp}}</p> -->
          <div >
            <img style="margin: 0 0px -15px -50px" :src="require('../../../config.json').imgLinks.logo" alt="logo" width="200">
          </div>
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
    </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'

export default {
    name: "PageLoading",
    props: {
        value: Boolean,
        seconds: Number 
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
            'isContentLoading',
            'currentUserOffers',
            'currentUser'
        ]),
    },
    data(){
        return{
          countUp: 0
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
            if(this.countUp === this.seconds){
                this.show = false
                this.countUp = 0
            }
            if(this.countUp < this.seconds) {
                setTimeout(() => {
                  if(this.didFetchingStop()){
                    this.countUp += 500
                    this.startCountUpTimer()
                  }
                }, 500)
            }
        },
      
      didFetchingStop(){
        // console.log("did Fetching stopped?", !this.isContentLoading)
        return !this.isContentLoading
      }
        
    }
}
</script>

<style scoped>

.sk-cube-grid {
  width: 100px;
  height: 100px;
  margin: 100px auto;
}

.sk-cube-grid .sk-cube {
  width: 33%;
  height: 33%;
  background-color: hsl(139, 30%, 18%);
  float: left;
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
          animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out; 
}
.sk-cube-grid .sk-cube1 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }
.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s; }
.sk-cube-grid .sk-cube3 {
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s; }
.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s; }
.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }
.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s; }
.sk-cube-grid .sk-cube7 {
  -webkit-animation-delay: 0s;
          animation-delay: 0s; }
.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s; }
.sk-cube-grid .sk-cube9 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
  } 35% {
    -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1); 
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
  } 35% {
    -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1);
  } 
}
</style>