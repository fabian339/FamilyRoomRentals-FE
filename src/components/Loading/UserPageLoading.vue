<template>
        <div v-if="show">
            <!-- <div class="dot-carousel"></div> -->
            <div class="circle left"></div>
            <div class="small-circle small-left"></div>
            <div class="small-circle small-right"></div>
            <div class="circle right"></div>
            <p class="app-title">FamilyRoomRentals</p>
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
.app-title{
  position: fixed;
  top: 52%;
  left: 43.5%;
  /* border: 2px solid black; */
  font-family: 'Rochester', cursive;
  font-size: 35px;
  /* margin: 10px; */
  color: #2b2b2b;
  animation:zoomIn 1.8s 0s ease-in-out;

}

.circle {
  /* position: relative;
  left: -9999px; */
  position: fixed;
  top: 45%;
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
  position: fixed;
  top: 45%;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #43cc4e;
}

.small-left{
    left: 0;
    animation: small-left 1.5s infinite linear;
}
.left{
  left: 0;
    animation: left 1.5s infinite linear;
}
.right{
  right: 0;
  animation: right 1.5s infinite linear;
}
.small-right{
    right: 0;
    animation: small-right 1.5s infinite linear;
}
  @keyframes left {
    0% {left: 25%;}
    50% {left: 47.5%;}
    100% {left: 25%;}
  }

    @keyframes small-left {
    0% {left: 30%;}
    50% {left: 45%;}
    100% {left: 30%;}
  }
  @keyframes small-right {
    0% {right: 30%;}
    50% {right: 45%;}
    100% {right: 30%;}
  }
    @keyframes right {
    0% {right: 25%;}
    50% {right: 47.5%;}
    100% {right: 25%;}
  }

   @keyframes zoomIn{
        0%{
          transform: scale(0.4) rotate(0deg);
        }
        100%{
          transform: scale(1) rotate(0deg);
        }
      }
/* @-webkit-keyframes dot-carousel {
  0% {
    box-shadow: 10084px 0 0 -1px #9880ff, 9999px 0 0 1px #9880ff, 10014px 0 0 -1px #9880ff;
  }
  100% {
    box-shadow: 10014px 0 0 -1px #9880ff, 9984px 0 0 -1px #9880ff, 9999px 0 0 1px #9880ff;
  }
  100% {
    box-shadow: 9999px 0 0 1px #9880ff, 10014px 0 0 -1px #9880ff, 9984px 0 0 -1px #9880ff;
  }
} */

/* @keyframes wefw {
  0% {
    box-shadow: 10984px 0 0 -1px #9880ff, 9999px 0 0 1px #9880ff, 10014px 0 0 -1px #9880ff;
  }
  50% {
    box-shadow: 10014px 0 0 -1px #9880ff, 9984px 0 0 -1px #9880ff, 9999px 0 0 1px #9880ff;
  }
  100% {
    box-shadow: 9999px 0 0 1px #9880ff, 10014px 0 0 -1px #9880ff, 9984px 0 0 -1px #9880ff;
  }
} */

</style>