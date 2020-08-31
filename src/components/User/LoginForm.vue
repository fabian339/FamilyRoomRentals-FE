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
        >
            <v-text-field
            label="Login"
            name="login"
            prepend-icon="mdi-account"
            type="text"
            ></v-text-field>

            <v-text-field
            id="password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            ></v-text-field>        
            <v-spacer></v-spacer>
            <v-btn color="#66CDAA">Login</v-btn>
        </form>
    </v-col>
    </v-row>
    
</template>


        

<script>
  export default {
    props: {
      source: String,
    },
  }
</script>