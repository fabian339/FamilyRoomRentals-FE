<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <div class="logo" >
          <img :src="require('../../assets/logo.png')" alt="logo" width="400">
      </div>
      <v-col lg="4">
        <h2 class="headline font-weight-bold mb-3">
            Reset Password:
        </h2>
        <form
          @submit="submit"
        >
            <v-text-field
              label="Email"
              name="email"
              v-model="email"
              append-icon="mdi-account"
              type="text"
              outlined
            :error-messages="formErrors.email"
            ></v-text-field>

            <v-spacer></v-spacer>
            
            <v-btn type="submit" color="#66CDAA">Send Recovery Email</v-btn>
            <!-- <p style="color: red">{{userErrors.responseError}}</p> -->
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
import {validatePasswordResetEmail} from '../../store/validators'


  export default {
    name: "PasswordChange",
    data () {
      return {
        email: '',
        formErrors: {}
      }
    },
     methods:{
        ...mapActions([                  // Add this
            'changeUserPassword'
        ]),
        submit(e) {
            e.preventDefault();
            const data = {
                email: this.email
            }
            const {valid, errors} = validatePasswordResetEmail(data);
            if(!valid) this.formErrors = errors;
            else {
                this.changeUserPassword(data);
                this.$router.push("/login")
            }
        }
     }
  }

</script>