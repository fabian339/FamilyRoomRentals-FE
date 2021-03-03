<template>
    <v-row justify="center">
        <v-dialog
            v-model="show"
            transition="dialog-top-transition"
            width="650px"
        >
            <v-card 
                v-if="this.component.type === 'success'"
                style="background-color: #d7ffd4;"
            >                
                <v-card-text                     
                    class="headline justify-center font"
                    style="color: #1a7cab; padding: 30px; text-align: center"
                >
                    {{this.component.message}}
                </v-card-text>
       
                <v-btn id="closeBtn" small color="red" @click.stop="show = false" dark >X</v-btn>
          
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'

export default {
    name: "OwnerClaimReward",
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
    },
    data(){
        return{
            // rewardSelected: false,
            // ownerReward: {}
        }
    },
    methods: {
    }
}
</script>
<style scoped>
  #closeBtn{
    position: absolute;
    top: 0px;
    right: 0;
  }
</style>