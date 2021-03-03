<template>
  <div>
    <PageLoading  
      v-model="isPageLoading" 
      :component="{
        seconds: 1000,
        type: 'content'
      }"
    />      
    <v-row v-if="!isPageLoading" class="text-center" id="pageContainer">
      <v-col
        md="3"
        style="background-color: #c2d29c"
      > 
        <TermsNav />      
      </v-col>
      <v-col
        cols="12"
        md="9"
        id="txtCol"
      >
      <!-- <p>{{key}}</p> -->
        <Agreements v-if="path === '/terms-and-conditions/agreements' || this.$router.history.current.path === '/terms-and-conditions/agreements'" />
        <Commitments v-else-if="path === '/terms-and-conditions/commitments' || this.$router.history.current.path === '/terms-and-conditions/commitments'" />
        <Communications v-else-if="path === '/terms-and-conditions/communications' || this.$router.history.current.path === '/terms-and-conditions/communications'" />
        <OurUser v-else-if="path === '/terms-and-conditions/our-users' || this.$router.history.current.path === '/terms-and-conditions/our-users'" />
        <Privacy v-else-if="path === '/terms-and-conditions/privacy' || this.$router.history.current.path === '/terms-and-conditions/privacy'" />
        <Safety v-else-if="path === '/terms-and-conditions/safety' || this.$router.history.current.path === '/terms-and-conditions/safety'" />
        <Services v-else-if="path === '/terms-and-conditions/services' || this.$router.history.current.path === '/terms-and-conditions/services'" />
        <div class="termsContainer" v-else-if="path === '/terms-and-conditions' || this.$router.history.current.path === '/terms-and-conditions'">
          <div class="termsTextContainer">
            <p style="font-size: 55px"> Terms of Use ("Terms")</p>
            <hr style="margin: 15px 25px;">

            <h3 style="font-family: 'Scheherazade', serif; font-size: 25px">Welcome to FamilyRoomRentals!</h3>
            <br>
            <p>Last updated (10/23/2020)</p> 
          </div>
          <div class="termsTextContainer">
            <p>
              These Terms of Use govern your access and use of FamilyRoomRentals and offer important information about the 
              Service FamilyRoomRentals provide. By using, accessing, or interacting with our servers, services, websites 
              or any associated content or postings available in the FamilyRoomRentals platform, you agree to these Terms 
              of Use and Conditions. 
            </p>
            <p>
              Accessing, using, or interacting with FamilyRoomRentals on behalf of a business / organization,
              you declare and permit to FamilyRoomRentals that you have authority to accept the Terms and Conditions ("Terms") 
              on behalf of that business / organization, and such business / organization agrees to the terms and Conditions ("Terms"). 
            </p>
            <p>
              Such Terms of Use will be implemented when there is any sort of dispute between you (user) and us. A dispute between
              you and us will be resolved individually and you relinquish the rights of participating in a collective Lawsuit or arbitraton.
            </p>
            <p>
              FamilyRoomRentals may modify such Terms of Use ("Terms") at any time. Our users are responsible for 
              occasionally checking for any changes or updates in our Terms of Use and Conditons.
            </p>
            <p>
              Please carefully read the rest of FamilyRoomRentals Terms and Conditions for a better understanding.
            </p>
          </div>
            <v-btn
              icon
              to="/terms-and-conditions/services"
              class="termsNextLink"
            >
              <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TermsNav from './TermsNav.vue'
import Agreements from './tabs/Agreements.vue'
import Commitments from './tabs/Commitments.vue'
import Communications from './tabs/Communications.vue'
import OurUser from './tabs/OurUser.vue'
import Privacy from './tabs/Privacy.vue'
import Safety from './tabs/Safety.vue'
import Services from './tabs/Services.vue'
import PageLoading from '@/components/Loading/PageLoading.vue';


export default {
  name: 'TermsAndConditions',
  components: {
    TermsNav,
    Agreements,
    Commitments,
    Communications,
    OurUser,
    Privacy,
    Safety,
    Services,
    PageLoading
  },
  data: () => ({
    path: '/terms-and-conditions',
    isPageLoading: false,
  }),
  watch: {
    '$route': 'reInitialize',
  },
  created(){
    this.isPageLoading = true
    // next()
  },
  methods: {
      reInitialize: function(route) {
          this.path = route.path
          // console.log("YOOO", route)
      },
  },
}
</script>

<style scoped>

  #pageContainer{
    margin-top: -12px;
    margin-bottom: -12px;
  }

</style>