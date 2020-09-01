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
            label="username"
            name="login"
            v-model="username"
            prepend-icon="mdi-account"
            type="text"
            ></v-text-field>

            <v-text-field
            id="password"
            label="Password"
            name="password"
            v-model="password"
            prepend-icon="mdi-lock"
            type="password"
            ></v-text-field>        
            <v-spacer></v-spacer>
            <v-btn type="submit" color="#66CDAA">Login</v-btn>
        </form>
    </v-col>
    </v-row>
    
</template>

<script>
import {mapActions} from 'vuex'
  export default {
   data () {
      return {
        username: '',
        password: '',
      }
    },
     methods:{
        ...mapActions([                  // Add this
            'logInUser'
        ]),
        submit(e) {
            e.preventDefault();
            const user = {
                username: this.username,
                password: this.password,
            }
            this.logInUser(user)
            this.$router.push("create-room")
        }
     }
  }

</script>