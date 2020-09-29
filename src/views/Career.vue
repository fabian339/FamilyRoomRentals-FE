<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <img id="careerBanner" :src="require('../assets/careers.jpg')" alt="career">
    </v-row>
    <v-row class="text-center" justify="center">
        <v-col>
            <h1>JOIN OUR TEAM</h1>
            <div style="padding-left: 100px;padding-right: 100px;">
            <h3>Available positions:</h3>
            <p class="font"> Opps. It seems like there a no openings for now. Check back later! :(</p>
            </div>
        </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
    #careerBanner{
        margin-top: -85px;
        width: 70%;
        height: 400px;
        border-radius: 15px;
    }
</style>