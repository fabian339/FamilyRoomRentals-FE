<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <div class="logo" >
          <img :src="require('../../assets/logo.png')" alt="logo" width="400">
        </div>
        <h2 v-if="tokenError">You are unauthorized to view this page!</h2>
        <h2 v-else-if="tokenExpired"> Sorry, it looks like this page has expired.</h2>
        <h2 v-else-if="this.$store.getters.currentOffer.clientRequestedRefund && !this.$store.getters.isCountDownShowing">A refund is already issued!</h2>
        <v-col lg="12" v-else > 
            <h2 class="headline font-weight-bold mb-3">
                {{data.name}}, we are sorry your meeting did not work out!
            </h2> 
            <v-progress-circular
                v-if="isContentLoading"
                color="green"
                :size="100"
                :width="15"
                indeterminate
            >
            </v-progress-circular>
            <v-row class="text-center" v-if="!isContentLoading" justify="center">
                <v-col lg="4" v-if="!isOfferTokenVerified && !this.$store.getters.isCountDownShowing">
                    <h3 style="margin: -10px 0px 15px 0px;">Please enter your verification ID: </h3>
                    <form>
                        <v-text-field
                            label="Verification ID"
                            v-model="id"
                            append-icon="mdi-account"
                            type="text"
                            outlined
                            :error-messages="errors.id"
                        ></v-text-field>

                        <v-spacer></v-spacer>
                        
                        <v-btn color="#66CDAA" @click.stop="idVerification">Verify</v-btn>
                        <p style="color: red; margin: 15px 0px -30px 0px">{{offerErrors.error}}</p>
                    </form>
                </v-col>
                <v-col lg="4" v-if="!isContentLoading && isOfferTokenVerified && showRefundForm">
                    <h3 style="margin: -10px 0px 15px 0px;">Please enter information: </h3>
                    <form>
                        <v-text-field
                            label="Full Name"
                            v-model="name"
                            type="text"
                            outlined
                            :error-messages="errors.name"   
                        ></v-text-field>

                        <v-text-field
                            label="Email"
                            v-model="email"
                            type="text"
                            outlined
                            :error-messages="errors.email"   
                        ></v-text-field>

                        <v-text-field
                            label="Phone"
                            v-model="phone"
                            type="text"
                            outlined
                            :error-messages="errors.phone"   
                        ></v-text-field>
                        <v-btn color="#66CDAA" @click.stop="submitRefundData">Request $10 Refund</v-btn>
                    </form>
                </v-col>
            </v-row>
            <div v-if="this.$store.getters.isCountDownShowing" style="margin: 0px 15%">
                <SuccessAlert 
                    :msg="`We have received your request. Please allow us two business days to check that everything is fine.`" 
                />
                <p style="color: seagreen; font-size: 20px;">
                    Redirecting to homepage in: <strong>{{ countDown }}</strong>
                </p>
            </div>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
let jwt = require('jsonwebtoken');
import { mapGetters, mapActions, mapMutations } from 'vuex'
import SuccessAlert from '@/components/notification/SuccessAlert.vue'
import {validateClientRefundData} from '../../store/validators'
import {SendEmailToAdminOnRefundRequested} from '../../globals/emails'

// import SuccessAlert from '@/components/notification/SuccessAlert.vue'
// :label="`${ new Date(new Date(date.date).setDate(new Date(date.date).getDate()+1)).toDateString()} at ${date.time}`"

  export default {
    name: 'clientRefund',
    components: {SuccessAlert},
    computed: {
      ...mapGetters([
        'isContentLoading',
        'currentOffer',
        'offerErrors',
        'isOfferTokenVerified'
      ])
    },
    data () {
        return {
            data: {},
            tokenExpired: false,
            tokenError: false,
            id: '',
            name: '',
            email: '',
            phone: '',
            showRefundForm: false,
            countDown: 15,
            errors: {}
        }
    },
    
    beforeMount(){
        const {secretId, refundToken} = this.$router.history.current.params;

        try {
            var decoded = jwt.verify(refundToken, secretId);
        } catch(err) {
            this.tokenError = true;
        }
        if(decoded){
            // console.log(new Date() , new Date(decoded.exp))
            if(new Date() > new Date(decoded.exp)) this.tokenExpired = true;
            else this.data = decoded.data
        }
    },
    // created() {
    //        this.countDownTimer()
    //     },
    methods:{
        ...mapActions([
            'getOfferOnClientRefund',
            'updateOffer',
            'sendEmail'
        ]),
        ...mapMutations([
            'SET_COUNTDOWN',
        ]),

        idVerification(){
            if(this.id === '') {
                const errors = {
                    id: 'Must not be empty, verification id was send to your email.'
                }
                this.errors = errors;
            }
            else {
                this.getOfferOnClientRefund({
                    id :this.id,
                    token: this.$router.history.current.params.refundToken
                });
                // this.updateOffer({
                //     objectId: this.id,
                //     clientRequestedRefund: true,
                // })
               this.showRefundForm = true;
            }
        },
        submitRefundData(){
            const data = {
                name: this.name,
                email: this.email,
                phone: this.phone
            }
            const {valid, errors} = validateClientRefundData(data);
            if(!valid) this.errors = errors;
            else{
                const emailToAdmin = SendEmailToAdminOnRefundRequested({
                    email: 'mrfabian.cs@gmail.com'
                })
                this.sendEmail(emailToAdmin);
                this.updateOffer({
                    objectId: this.id,
                    clientRequestedRefund: true,
                    clientRefundData: data,
                    refundRequestCaseOpen: true,
                })
                //send email to admin
                this.SET_COUNTDOWN(true);
                this.countDownTimer();
                this.showRefundForm = false;
            }
        },
         countDownTimer() {
            if(this.countDown === 0){
                this.SET_COUNTDOWN(false);
                // this.$router.push('/')
            }
            if(this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }
        },
    }
  }
</script>

<style>
    .stripe-card {
        width: 300px;
        border: 1px solid grey;
    }
    .stripe-card.complete {
        border-color: green;
    }
    #confirmation{
        border: 2px dashed powderblue;
        padding: 15px;
        width: 85%;
        border-radius: 5px;
        margin: 20px 7.5%;
    }
</style>