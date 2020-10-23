<template>
    <v-row class="text-center" id="pageContainer">
      <v-col
        md="3"
        style="background-color: #c2d29c"
      > 
        <TermsNav @clicked="onClickChild"/>      
      </v-col>
      <v-col
        cols="12"
        md="9"
        id="txtCol"
      >
        <Agreements v-if="path === '/terms-and-conditions/agreements' || this.$router.history.current.path === '/terms-and-conditions/agreements'" />
        <Commitments v-if="path === '/terms-and-conditions/commitments' || this.$router.history.current.path === '/terms-and-conditions/commitments'" />
        <Communications v-if="path === '/terms-and-conditions/communications' || this.$router.history.current.path === '/terms-and-conditions/communications'" />
        <OurUser v-if="path === '/terms-and-conditions/our-users' || this.$router.history.current.path === '/terms-and-conditions/our-users'" />
        <Privacy v-if="path === '/terms-and-conditions/privacy' || this.$router.history.current.path === '/terms-and-conditions/privacy'" />
        <Security v-if="path === '/terms-and-conditions/security' || this.$router.history.current.path === '/terms-and-conditions/security'" />
        <Services v-if="path === '/terms-and-conditions/services' || this.$router.history.current.path === '/terms-and-conditions/services'" />
      </v-col>
    </v-row>
</template>

<script>
import TermsNav from './TermsNav.vue'
import Agreements from './tabs/Agreements.vue'
import Commitments from './tabs/Commitments.vue'
import Communications from './tabs/Communications.vue'
import OurUser from './tabs/OurUser.vue'
import Privacy from './tabs/Privacy.vue'
import Security from './tabs/Security.vue'
import Services from './tabs/Services.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'TermsAndConditions',
  components: {
    TermsNav,
    Agreements,
    Commitments,
    Communications,
    OurUser,
    Privacy,
    Security,
    Services,
  },
  data: () => ({
    path: ''
  }),
  computed: {
      ...mapGetters([
      ])
  },
  created(){
        console.log(this.path)
  },
  methods:{
    onClickChild (value) {
      this.path = value;
      console.log(value) // someValue
    }
  }
}
</script>

<style scoped>

  #pageContainer{
    margin-top: -12px;
    margin-bottom: -12px;
  }

</style>