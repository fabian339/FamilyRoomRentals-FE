<template>
    <div id="navContainer">
        <div >
            <img src="https://i.ibb.co/DrcHFyW/logo.png" alt="logo" width="200">
        </div>
        <div id="items">
            <v-btn
                v-for="(tab, index) in tabs"
                text
                :key="index + 99"
                :to="tab.path"
                class="my-2 tabBtn"
            >
                {{tab.name}}
            </v-btn>
        </div>
    </div>
</template>

<script>
  // import store from '../store.js'
//   import { mapMutations } from 'vuex'

  // import axios from 'axios'
  export default {
    name: 'TermsNav',
    data: () => ({
      tabs: [
        {name: 'Our Service', path: '/terms-and-conditions/services'},
        {name: 'Our Users', path: '/terms-and-conditions/our-users'},
        {name: 'The Commitments', path: '/terms-and-conditions/commitments'},
        {name: 'Agreements', path: '/terms-and-conditions/agreements'},
        {name: 'Communications', path: '/terms-and-conditions/communications'},
        {name: 'Privacy Basics', path: '/terms-and-conditions/privacy'},
        {name: 'Security', path: '/terms-and-conditions/security'},
      ],
    }),
    methods: {
        // onClickButton (path) {
        // this.$emit('clicked', path)
        // }
  }
}
</script>


<style scoped>
    #navContainer{
        /* background-color: #c2d29c; */
        /* margin: -12px 0px -38px 0px; */
        /* height: 100%; */
        padding: 50px;
        /* top: 0; */
        /* border: 0; */
        /* position: absolute; */
        /* left: 0; */
        /* width: 25%; */
    }
    #items{
        display: grid;
    }
    .tabBtn{
        color: #447273;
        margin: 5px 0px;
    }

</style>