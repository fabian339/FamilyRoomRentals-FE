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
            :rules="[() => !!fName || 'This field is required']"
            label="First Name"
            required
          ></v-text-field>

          <v-text-field
            ref="lName"
            v-model="lName"
            :rules="[() => !!lName || 'This field is required']"
            label="Last Name"
            required
          ></v-text-field>

          <v-text-field
            ref="username"
            v-model="username"
            :rules="[() => !!username || 'This field is required']"
            label="Enter an username"
            required
          ></v-text-field>

          <v-text-field
            ref="email"
            v-model="email"
            :rules="[() => !!email || 'This field is required']"
            label="Email: example@email.com"
            required
          ></v-text-field>

            <v-text-field
              id="password"
              label="Password"
              name="password"
              v-model="password"
              :rules="[() => !!password || 'This field is required']"
              prepend-icon="mdi-lock"
              type="password"
              required
            ></v-text-field>   
            <v-text-field
              id="confirmPassword"
              v-model="confirmPassword"
              :rules="[() => !!confirmPassword || 'This field is required']"
              label="Confirm Password"
              name="confirmPassword"
              prepend-icon="mdi-lock"
              type="password"
              required
            ></v-text-field>        
            <v-spacer></v-spacer>
            <v-btn type="submit" color="#66CDAA">Register</v-btn>
        </form>
    </v-col>
    </v-row>
    
</template>


<script>
import {mapActions} from 'vuex'
  export default {
   data () {
      return {
        fName: '',
        lName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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
            this.registerUser(user)
        }
     }
  }

</script>