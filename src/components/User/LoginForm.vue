<template>
  <div>
    <PageLoading  
      v-model="isPageLoading" 
      :component="{
        seconds: 1000,
        type: '',
        color: ''
      }"
    />    
    <v-container v-if="!isPageLoading">
      <v-row class="text-center" justify="center">
        <div class="logo" >
            <img :src="require('../../assets/logo.png')" alt="logo" width="400">
        </div>
        <v-row class="text-center" justify="center">
          <v-col
            md="6"
          >
            <SuccessAlert v-if="isPasswordResetEmailSent" msg="Reset password email sent successfully!" />
            <SuccessAlert v-if="isEmailVerificationSent" msg="Email Verification was sent successfully!" />
          </v-col>
        </v-row>
      </v-row>
      <v-row class="text-center" justify="center">
          <v-col cols="10" sm="6" md="5" lg="4">        
                <h2 class="headline font-weight-bold mb-3">Login</h2>
          <form
            @submit="submit"
          >
              <v-text-field
                label="Email"
                name="email"
                v-model="email"
                append-icon="mdi-account"
                type="text"
                :error-messages="formErrors.email"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                v-model="password"
                :append-icon="value ? 'mdi-lock' : 'mdi-lock-open'"
                :type="value ? 'password' : 'text'"
                :error-messages="formErrors.password"
                @click:append="() => (value = !value)"
              ></v-text-field>  

              <v-spacer></v-spacer>
              
              <v-btn 
                type="submit" 
                color="#66CDAA"
              >
                <span v-if="!userLoading.userLoggingIn">Login</span>
                <v-progress-circular
                  v-else
                  color="#4b634d"
                  :size="30"
                  :width="5"
                  indeterminate
                ></v-progress-circular>
              </v-btn>
              <p style="color: red; margin: 10px 0 0 0;">{{userErrors.responseError}}</p>
              <div>
                <small>
                    Forgot your password Reset it <router-link to="/password-reset">HERE.</router-link>
                </small>
              </div>
              <div>
                <small>
                    Do not have an account? Don't wait Sign Up <router-link to="/signup">HERE.</router-link>
                </small>
              </div>
          </form>
        </v-col>
      </v-row>
    </v-container> 
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {validateLoginData} from '../../store/validators'
import SuccessAlert from '@/components/Offer/SuccessAlert.vue'
import PageLoading from '@/components/Loading/PageLoading.vue';

  export default {
  name: "login",
  components: {
    SuccessAlert,
    PageLoading
  },
  computed: {
    ...mapGetters([
      'userLoading',
      'isPasswordResetEmailSent',
      'isEmailVerificationSent'
    ]),
    //return errors when password or emails do not match
    userErrors() {
        return this.$store.getters.userErrors
      }
    },
    watch: {
      //watch for user error response, clear password if entered incorrectly
      userErrors() {
        this.password = ''
      }
    },
   data () {
      return {
        email: '',
        password: '',
        formErrors: {},
        value: String,
        isPageLoading: false,
      }
    },
    created(){
      this.isPageLoading = true
      // next()
    },
    // mounted(){
    //   if(this.userErrors.responseError) this.password = '';
    // },
     methods:{
        ...mapActions([                  // Add this
            'logInUser'
        ]),
        submit(e) {
            e.preventDefault();
            const user = {
                email: this.email.toLowerCase(),
                password: this.password,
            }
            const {valid, errors} = validateLoginData(user);
              if(!valid) this.formErrors = errors;
              else this.logInUser(user);
            // this.$router.push("/")
        }
     }
  }

</script>