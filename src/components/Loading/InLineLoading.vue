<template>
      <div v-if="show">   
        <v-progress-circular
          :color="this.component.color"
          :size="30"
          :width="6"
          indeterminate
        ></v-progress-circular>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'

export default {
    name: "InLineLoading",
    props: {
        value: Boolean,
        component: Object,
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
          countUp: 0,
          timeoutID: Number
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
                // this.clearTimeOut()
                // this.show = false
                // this.countUp = 0
            }
            if(this.countUp < this.component.seconds) {
              this.timeoutID = setTimeout(() => {
                  if(this.component.condition){
                    this.countUp += 500
                    this.startCountUpTimer()
                  }
                }, 500)
            }
        },
      
      clearTimeOut(){
        window.clearTimeout(this.timeoutID);
      },
      
        
    }
}
</script>