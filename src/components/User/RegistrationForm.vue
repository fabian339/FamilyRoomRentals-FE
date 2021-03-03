<template>
  <div>
    <PageLoading  
      v-model="isPageLoading" 
      :component="{
        seconds: 1000,
        type: 'content',
        color: ''
      }"
    />    
    <v-container v-if="!isPageLoading">
      <v-row class="text-center" justify="center">
        <div class="logo" >
          <img src="https://i.ibb.co/DrcHFyW/logo.png" alt="logo" width="400">
        </div>
        <v-col lg="4" md="5" sm="8">
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
                ref="email"
                v-model="email"
                label="Email: example@email.com"
                :error-messages="formErrors.email"
              ></v-text-field>
              <!--username generator -->
              <div v-if="fName.length > 0 && lName.length > 0 && email.length > 0">
                <v-text-field
                  ref="username"
                  :value="username"
                  disabled
                  label="Choose an username from bellow"
                  :error-messages="formErrors.username"   
                ></v-text-field>
                  <v-row class="text-center" justify="center">
                    <div v-for="(randomChars, index) in randomUsernameStrs" :key="index + 2">
                      <v-chip
                        class="ma-2"
                        color="success"
                        outlined
                        @click.stop="username = `${fName.substring(0,1)}_${lName}_${randomChars}`"
                      >
                        {{`${fName.substring(0,1)}_${lName}_${randomChars}`}}
                      </v-chip>
                    </div>
                  </v-row>
              </div>
              
              <label for="phoneNumber" style="color: #0000008c">Enter Phone # Ex: (222-222-2222)</label>
              <!-- phone number format -->
              <v-row class="text-center" justify="center" style="margin: 0 0 -20px 0;">
                <v-col
                  cols="3"
                >
                  <v-text-field
                    outlined
                    placeholder="917"
                    v-model="phone1"
                    :rules="[() => !isNaN(phone1) || 'Must be a number']"
                    maxlength="3"
                  ></v-text-field>
                </v-col>
                <span style="margin: 30px 0;">-</span>
                <v-col
                  cols="3"
                >
                  <v-text-field
                    outlined
                    placeholder="450"
                    v-model="phone2"
                    :rules="[() => !isNaN(phone2) || 'Must be a number']"
                    maxlength="3"
                  ></v-text-field>
                </v-col>
                <span style="margin: 30px 0;">-</span>
                <v-col
                  cols="3"
                >
                  <v-text-field
                    outlined
                    placeholder="1452"
                    v-model="phone3"
                    :rules="[() => !isNaN(phone3) || 'Must be a number']"
                    maxlength="4"
                  ></v-text-field>
                </v-col>
                <p v-if="formErrors.phone && formErrors.phone.length !== 0" style="color: red">{{formErrors.phone}}</p>
              <!-- </v-row> -->
              </v-row>

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
              <p style="color: red; margin: 10px 0 0 0;">{{userErrors.responseError}}</p>
              <small>
                    Already have an account? Log In <router-link to="/login">HERE.</router-link>
              </small>
            </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'
import {validateUserRegistration} from '../../store/validators'
import PageLoading from '@/components/Loading/PageLoading.vue';

  export default {
    name: "RegistrationForm",
    components: {
        PageLoading
    },
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
        phone1: '',
        phone2: '',
        phone3: '',
        phone: '',
        password: '',
        confirmPassword: '',
        checkbox: false,
        formErrors: {},
        randomUsernameStrs: [],
        value1: String,
        value2: String,
        isPageLoading: false
      }
    },
    created(){
      this.isPageLoading = true
      //get 4 randomly generated strings for usernames
      for(let i = 0; i<4; i++){
        this.randomUsernameStrs.push(this.randomString())
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
                phone: `${this.phone1}-${this.phone2}-${this.phone3}`,
                password: this.password,
                confirmPassword: this.confirmPassword,
                agreement: this.checkbox
            }
            const {valid, errors} = validateUserRegistration(user);
            if(!valid) this.formErrors = errors;
            else this.registerUser(user);
        },
        randomString() {
          var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz_-";
          var string_length = 5;
          var randomstring = '';
          for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
          }
          return randomstring
        }
     }
  }

</script>