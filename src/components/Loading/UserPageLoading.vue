<template>
        <div v-if="show">
            <div class="dot-carousel"></div>
            <div class="small-circle first-left"></div>
            <div class="small-circle first-right"></div>
            <div class="circle second-left"></div>
            <div class="circle second-right"></div>
            <div class="title-container"><p class="app-title">FamilyRoomRentals</p></div>
        </div>

</template>

<script>
import { mapGetters } from 'vuex'
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'

export default {
    name: "UserPageLoading",
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
            'isUserLoading'
        ]),
    },
    data(){
        return{
          countUp: 0,
          timeoutID: Number
      }

    },
    beforeMount(){
        this.startCountUpTimer()
      // }
    },
    methods: {
        startCountUpTimer() {
            if(this.countUp === this.seconds){
              this.clearTimeOut()
              this.countUp = 0
              this.show = false
            }
            if(this.countUp < this.seconds) {
              this.timeoutID = setTimeout(() => {
                if(this.didFetchingStop()){
                  this.countUp += 500
                  this.startCountUpTimer()
                }
              }, 500)
            }
        },
      
      didFetchingStop(){
        // console.log("did Fetching stopped?", !this.isContentLoading)
        return !this.isContentLoading && !this.isUserLoading
      },
      clearTimeOut(){
        window.clearTimeout(this.timeoutID);
      },
      randomCircleColor(){
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

        
    }
}
</script>

<style scoped>
.app-title{
  /* position: absolute; */
  /* top: 50%;
  left: 50%; */
  /* border: 2px solid black; */
  font-family: 'Rochester', cursive;
  font-size: 35px;
  /* margin: 10px; */
  color: #2b2b2b;
  animation: zoomIn 1.8s 0s ease-in-out;
}

.title-container{
    /* border: 2px solid black; */
    /* text-align: center; */
    position: absolute;
    top: 50%;
    /* right: 43.5%; */
    /* left: 43.5%; */
    width: 100%;
    text-align: center;
}

.circles-container{
    /* width: 100px;
    height: 100px;
    margin: 100px auto; */
    justify-content: center;
    align-items: center;
    /* text-align: center; */
    display: flex;
} 


.circle {
  /* position: relative;
  left: -9999px; */
  /* position: fixed; */
  /* top: 45%; */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #688f7d;
  /* color: #9880ff; */
  /* box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff; */
  /* -webkit-animation: dot-carousel 1.5s infinite linear; */
  /* animation: left 1.5s infinite linear; */
  
}

.small-circle{
  /* position: fixed; */
  /* top: 45%; */
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #43cc4e;
}

.second-left{
     position: absolute;
    left: 35%;
    top: 65%;
    animation: second-left 1.5s infinite linear;
}
.second-right{
  position: absolute;
  right: 35%;
  top: 65%;
  animation: second-right 1.5s infinite linear;
}

.first-left{
    position: absolute;
    left: 45%;
    top: 45%;
    animation: first-left 1.5s infinite linear;
}

.first-right{
    position: absolute;
    right: 45%;
    top: 45%;
    animation: first-right 1.5s infinite linear;
}
  @keyframes second-left {
    0% {left: 25%;}
    50% {left: 47.5%;}
    100% {left: 25%;}
  }

    @keyframes first-left {
    0% {left: 30%;}
    50% {left: 45%;}
    100% {left: 30%;}
  }
  @keyframes first-right {
    0% {right: 30%;}
    50% {right: 45%;}
    100% {right: 30%;}
  }
    @keyframes second-right {
    0% {right: 25%;}
    50% {right: 47.5%;}
    100% {right: 25%;}
  }

   @keyframes zoomIn{
        0%{
          transform: scale(0.4) rotate(0deg);
        }
        100%{
          transform: scale(1) rotate(360deg);
        }
      }

</style>