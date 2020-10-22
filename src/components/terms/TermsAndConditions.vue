<template>
  <div>
    <v-row class="text-center rowContainer">
      <v-col
        md="4"
      > 
      <TermsNav />      
      </v-col>
      <v-col
        cols="12"
        md="8"
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
    margin: -24px -24px;
    /* border: 2px solid; */
    /* margin-top: -12px; */
  }
</style>