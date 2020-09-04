<template>
  <v-row class="text-center" justify="center">
    <v-col lg="4">
    <div id="logo" >
        <img style="margin: 10px" :src="require('../../assets/logo.png')" alt="logo" width="400">
    </div>
    <h2 class="headline font-weight-bold mb-3">
        Login
    </h2>
        <form
          @submit="submit"
        >
            <v-text-field
            label="email"
            name="email"
            v-model="email"
            prepend-icon="mdi-account"
            type="text"
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
            <v-spacer></v-spacer>
            <v-btn type="submit" color="#66CDAA">Login</v-btn>
            <p style="color: red">{{userErrors.responseError}}</p>
        </form>
    </v-col>
    </v-row>
    
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {validateLoginData} from '../../store/validators'

  export default {
  computed: {
    ...mapGetters([
      'userErrors',
    ])
  },
   data () {
      return {
        email: '',
        password: '',
        formErrors: {},
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