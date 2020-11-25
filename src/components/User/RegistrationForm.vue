<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <div class="logo" >
        <img src="https://i.ibb.co/DrcHFyW/logo.png" alt="logo" width="400">
      </div>
      <v-col lg="4">
        <h2 class="headline font-weight-bold mb-3">Register</h2>
          <form
            @submit.stop="submit"
          >
            <v-text-field
              ref="fName"
              v-model="fName"
              label="First Name"
              :error-messages="formErrors.fName"   
            ></v-text-field>

            <v-text-field
              ref="lName"
              v-model="lName"
              label="Last Name"
              :error-messages="formErrors.lName"   
            ></v-text-field>

            <v-text-field
              ref="username"
              v-model="username"
              label="Enter an username"
              :error-messages="formErrors.username"   
            ></v-text-field>

            <v-text-field
              ref="email"
              v-model="email"
              label="Email: example@email.com"
              :error-messages="formErrors.email"
            ></v-text-field>

            <v-text-field
              ref="phone"
              v-model="phone"
              label="Phone: (222-222-2222)"
              :error-messages="formErrors.phone"
            ></v-text-field>

            <v-text-field
              id="password"
              label="Password"
              name="password"
              v-model="password"
              :append-icon="value1 ? 'mdi-lock' : 'mdi-lock-open'"
              :type="value1 ? 'password' : 'text'"
              hint="At least 8 characters"
              @click:append="() => (value1 = !value1)"
              :error-messages="formErrors.password"
            ></v-text-field> 
              
            <v-text-field
              id="confirmPassword"
              v-model="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              hint="Must match you password"
              :append-icon="value2 ? 'mdi-lock' : 'mdi-lock-open'"
              :type="value2 ? 'password' : 'text'"
              :error-messages="formErrors.confirmPassword"
              @click:append="() => (value2 = !value2)"
            ></v-text-field> 

            <v-row>
              <v-checkbox
                style="margin: 0px 0px 0px 15px;"
                v-model="checkbox"
                :error-messages="formErrors.agreement"
              >
                <template slot="label">
                  <label >I agree to the <a @click.stop href="/#/terms-and-conditions" target="_blank">   Terms & Conditions.</a></label>
                </template>
              </v-checkbox>
            </v-row>

            <v-spacer></v-spacer>
            <v-btn type="submit" color="#66CDAA">Register</v-btn>
            <p style="color: red">{{userErrors.responseError}}</p>
            <small>
                  Already have an account? Log In <router-link to="/login">HERE </router-link>
            </small>
          </form>
      </v-col>
    </v-row>
  </v-container>
    
</template>


<script>
import {mapActions, mapGetters} from 'vuex'
import {validateUserRegistration} from '../../store/validators'

  export default {
    name: "RegistrationForm",
    computed: {
    ...mapGetters([
      'userErrors',
    ])
  },
   data () {
      return {
        fName: '',
        lName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        checkbox: false,
        formErrors: {},
        value1: String,
        value2: String
      }
    },
     methods:{
        ...mapActions([                  // Add this
            'registerUser'
        ]),
        submit(e) {
            e.preventDefault();
            const user = {
                fName: this.fName,
                lName: this.lName,
                username: this.username,
                email: this.email.toLowerCase(),
                phone: this.phone,
                password: this.password,
                confirmPassword: this.confirmPassword,
                agreement: this.checkbox
            }
            const {valid, errors} = validateUserRegistration(user);
            if(!valid) this.formErrors = errors;
            else this.registerUser(user);
        }
     }
  }

</script>