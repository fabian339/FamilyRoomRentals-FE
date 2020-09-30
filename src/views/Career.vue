<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <img id="careerBanner" :src="require('../assets/careers.jpg')" alt="career">
    </v-row>
    <div class="text-center" style="padding-left: 80px;padding-right: 80px;">
        <h1>JOIN OUR TEAM</h1>
        <h3>Available positions:</h3>
        <p class="font"> Opps. It seems like there a no openings for now. Check back later! :(</p>
    </div>
  </v-container>
</template>

<style scoped>
    #careerBanner{
        margin-top: -15px;
        width: 70%;
        height: 400px;
        border-radius: 15px;
    }
</style>