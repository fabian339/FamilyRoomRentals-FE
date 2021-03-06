<template>
  <div>
    <PageLoading  
      v-model="isPageLoading" 
      :component="{
        seconds: 1000,
        type: ''
      }"
    />

    <v-container v-if="!isPageLoading">
      <v-row class="text-center" justify="center">
        <div class="logo" >
          <img :src="require('../../config.json').imgLinks.logo" alt="logo" width="400">
        </div>
        <div>
          <h2 class="headline font-weight-bold mb-3">Contact Us</h2>
          <div style="padding-left: 100px; padding-right: 100px;">
            <p class="font">
              If you are experiencing problems or have any questions, please do not hesitate to
              reach us out. We are here to help!
            </p>
            <p class="font">
              Send us an email to 
              <a href="mailto:familyroomrentas@dr.com" target="_blank">familyroomrentas@dr.com</a> 
              and share you experience with us.
            </p>
          </div>
        </div>
      </v-row>
    </v-container>
  </div>  
</template>

<script>
import PageLoading from '@/components/Loading/PageLoading.vue';

// const config = require('./config.json')
export default {
  name: 'About',
  components: { PageLoading },
  data: () => ({
    isPageLoading: false,
  }),
  created(){
    console.log("Entering Route")
    this.isPageLoading = true
    // next()
  }
}
</script>