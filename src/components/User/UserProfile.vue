<template>
    <div>
        <h1>HEYY</h1>
        <h1>{{currentUser.fName}}</h1>
        <h1>{{currentUser.lName}}</h1>
    </div>
</template>

<script>
// @ is an alias to /src
// import store from '@/actions/store'
import { mapGetters } from 'vuex'

export default {
  name: 'Nav',
  computed: {
      ...mapGetters([
        'currentUser',
      ])
  },
  methods:{
    //   ...mapActions([
    //       'logout'
    //   ]),
    //   logoutUser(e){
    //     e.preventDefault();
    //     this.logout()
    //     this.$router.push("/")
    //   }

  }
}
</script>