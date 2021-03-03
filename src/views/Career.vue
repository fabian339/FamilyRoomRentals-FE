<template>
  <div>
    <PageLoading  
      v-model="isPageLoading" 
      :component="{
        seconds: 1000,
        type: 'content'
      }"
    />

    <v-container v-if="!isPageLoading">
      <v-row class="text-center" justify="center">
        <img id="careerBanner" :src="require('../assets/careers.jpg')" alt="career">
      </v-row>
      <div class="text-center" style="padding-left: 80px;padding-right: 80px;">
          <h1>JOIN OUR TEAM</h1>
          <h3>Available positions:</h3>
          <p class="font"> Opps. It seems like there a no openings for now. Check back later! :(</p>
      </div>
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
    this.isPageLoading = true
    // next()
  }
}
</script>

<style scoped>
    #careerBanner{
        margin-top: -15px;
        width: 70%;
        height: 400px;
        border-radius: 15px;
    }
</style>