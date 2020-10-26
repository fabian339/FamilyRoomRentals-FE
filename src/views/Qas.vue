<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <div class="logo" >
        <img src="https://i.ibb.co/DrcHFyW/logo.png" alt="logo" width="400">
      </div>
    <v-col lg="4">
      <h2 class="headline font-weight-bold mb-3">Questions / Answers</h2>
      <p>Have a Questions? Please <router-link to="/contact-us">contact us.</router-link></p>
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

    
</template>

<script>
import qaList from '../globals/qaList'

export default {
  data() {
    return {
      list: []
    }
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

</style>