<template>
  <v-row class="text-center" justify="center">
    <v-col lg="4">
    <div id="logo" >
        <img style="margin: 10px" :src="require('../../assets/logo.png')" alt="logo" width="400">
    </div>
    <h2 class="headline font-weight-bold mb-3">
        Register
    </h2>
        <form
          @submit="submit"
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
            id="password"
            label="Password"
            name="password"
            v-model="password"
            prepend-icon="mdi-lock"
            type="password"
            :error-messages="formErrors.password"
          ></v-text-field>   
          <v-text-field
            id="confirmPassword"
            v-model="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            prepend-icon="mdi-lock"
            type="password"
            :error-messages="formErrors.confirmPassword"
          ></v-text-field>        
            <v-spacer></v-spacer>
            <v-btn type="submit" color="#66CDAA">Register</v-btn>
            <p style="color: red">{{userErrors.responseError}}</p>
        </form>
    </v-col>
    </v-row>
    
</template>


<script>
import {mapActions, mapGetters} from 'vuex'
import {validateUserRegistration} from '../../store/validators'

  export default {
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
        password: '',
        confirmPassword: '',
        formErrors: {},
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
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword
            }
            const {valid, errors} = validateUserRegistration(user);
            if(!valid) this.formErrors = errors;
            else this.registerUser(user);
    
            
            // else this.addRoom(room)
            // this.registerUser(user)
        }
     }
  }

</script>