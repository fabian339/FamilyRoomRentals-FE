<template>
  <div id="termsContainer">
    <v-row class="text-center rowContainer">
      <v-col
        md="3"
        id="linksCol"
      > 
      <TermsNav />      
      </v-col>
      <v-col
        cols="12"
        md="9"
        id="txtCol"
      >
      <NewUserTerms />
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import TermsNav from './TermsNav.vue'
import NewUserTerms from './NewUserTerms.vue'

// import ContentLoading from '@/components/layout/ContentLoading.vue'

// import store from '@/actions/store'
import { mapGetters } from 'vuex'

export default {
  name: 'TermsAndConditions',
  components: {
    TermsNav,
    NewUserTerms
  },
  computed: {
      ...mapGetters([
      ])
  },
  data() {
    return{ 
    }
  },
  methods:{}
}
</script>

<style scoped>
  .rowContainer{
    height: 100%;
    /* margin: -24px -24px; */
    /* border: 2px solid; */
    /* margin-top: -12px; */
  }
  #termsContainer{
    position: absolute;
    right: 0;
    top: 0;
    /* border: 2px solid; */
    height: 100%;
    width: 100%;
    left: 0;
    bottom: 0;
  }
  #linksCol{
    background: #c2d29c;
    /* bottom: 0;
    top: 0;
    position: absolute;
    left: 0; */
  }
  #txtCol{
        /* background: blue; */
    /* bottom: 0;
    top: 0;
    position: absolute;
    left: 0; */
  }
</style>