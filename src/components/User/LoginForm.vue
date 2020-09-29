<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <div class="logo" >
          <img :src="require('../../assets/logo.png')" alt="logo" width="400">
      </div>
      <SuccessAlert v-if="isPasswordResetEmailSent" msg="Reset password email sent successfully!" />
      <v-col lg="4">
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
            
            <v-btn type="submit" color="#66CDAA">Login</v-btn>
            <p style="color: red">{{userErrors.responseError}}</p>
            <div>
              <small>
                  Forgot your password Reset it <router-link to="/password-reset">HERE</router-link>
              </small>
            </div>
            <div>
              <small>
                  Do not have an account? Don't wait Sign Up <router-link to="/signup">HERE </router-link>
              </small>
            </div>
        </form>
      </v-col>
    </v-row>
  </v-container> 
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {validateLoginData} from '../../store/validators'
import SuccessAlert from '@/components/notification/SuccessAlert.vue'

  export default {
  name: "login",
  components: {
    SuccessAlert
  },
  computed: {
    ...mapGetters([
      'userErrors',
      'isPasswordResetEmailSent'
    ])
  },
   data () {
      return {
        email: '',
        password: '',
        formErrors: {},
        value: String
      }
    },
     methods:{
        ...mapActions([                  // Add this
            'logInUser'
        ]),
        submit(e) {
            e.preventDefault();
            const user = {
                email: this.email,
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