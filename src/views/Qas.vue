<template>
  <div>
    <PageLoading v-model="isPageLoading" :seconds="1000"/>
    <v-container v-if="!isPageLoading">
      <v-row class="text-center" justify="center">
        <div class="logo" >
          <img :src="require('../../config.json').imgLinks.logo" alt="logo" width="400">
        </div>
      <v-col lg="4">
        <h2 class="headline font-weight-bold mb-3">Questions / Answers</h2>
        <p>Have a Question? Please please do not hesitate to <router-link to="/contact-us">contact us.</router-link></p>
        </v-col>
      </v-row>
      <v-row class="text-center" justify="center">
        <div id="container">
          <div class="message" v-for="(QA, index) in list" :key="index + 20">
              <p>Q: {{QA.Q}}</p>
              <p>A: {{QA.A}}</p>          
          </div>
        </div>
      </v-row>
    </v-container>
  </div>
    
</template>

<script>
import qaList from '../globals/qaList'
import PageLoading from '@/components/Loading/PageLoading.vue';

export default {
  name: 'QuestionsAndAnswers',
  components: { PageLoading },
  data() {
    return {
      list: [],
      isPageLoading: false,
    }
  },
  created(){
    this.isPageLoading = true
    // next()
  },
  beforeMount(){
    this.list = qaList
  }

}
</script>

<style scoped>
#container {
    width: 100%;
    padding: 10px;
    overflow: auto;
    height: 380px;
    margin-top: -25px;
}

.message {
    position: relative;
    margin: 20px 15%;
    padding: 10px;
    /* background-color: lightblue; */
    width: 70%;
    text-align: left;
    font: 400 .9em 'Open Sans', sans-serif;
    border: 1px solid #211755;
    border-radius: 10px;
}

.message-content {
    padding: 0;
    margin: 0;
}

.message-timestamp-right {
    position: absolute;
    font-size: .85em;
    font-weight: 300;
    bottom: 5px;
    right: 5px;
}

.message:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-bottom: 15px solid #ffff;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    bottom: 0;
    right: -15px;
}

.message:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-bottom: 16px solid #211755;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    bottom: -1px;
    right: -17px;
}

.message:hover, .message:hover::before, .message:hover::after {
  cursor: pointer;
  background-color: rgb(118, 203, 224);
  transition: all 0.7s;
  transform: scale(1.02);
  border: 0;
      /* border-left-color: transparent; */

  /* border-bttom */
  
}

</style>