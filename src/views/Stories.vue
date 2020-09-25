<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <div class="logo" >
          <img style="margin: 10px" :src="require('../assets/logo.png')" alt="logo" width="400">
      </div>
    <v-col lg="4">
      <h2 class="headline font-weight-bold mb-3">USER EXPERIENCE</h2>
      </v-col>
    </v-row>
        <v-row class="text-center" justify="center">

    <div id="container">
      <div class="message">
          <p class="message-content">
            The main goal of FamilyRoomRentals is to provide solutions to those struggling to find a roof over their heads.
            We believe that many people cannot affort rent, specially if unemployed and living in busy areas such as NYC. 
            We offer the convenient option of renting an affordable room as it could ease the stress and cut the bills.
          </p>
          <div class="message-timestamp-right">SMS 6:37</div>
      </div>

      <div class="message">
          <p class="message-content">
            The main goal of FamilyRoomRentals is to provide solutions to those struggling to find a roof over their heads.
            We believe that many people cannot affort rent, specially if unemployed and living in busy areas such as NYC. 
            We offer the convenient option of renting an affordable room as it could ease the stress and cut the bills.
          </p>
          <div class="message-timestamp-right">SMS 13:37</div>
      </div>

      <div class="message">
        <p class="message-content">
          The main goal of FamilyRoomRentals is to provide solutions to those struggling to find a roof over their heads.
          We believe that many people cannot affort rent, specially if unemployed and living in busy areas such as NYC. 
          We offer the convenient option of renting an affordable room as it could ease the stress and cut the bills.
        </p>
        <div class="message-timestamp-right">SMS 19:37</div>
      </div>
            <div class="message">
        <p class="message-content">
          The main goal of FamilyRoomRentals is to provide solutions to those struggling to find a roof over their heads.
          We believe that many people cannot affort rent, specially if unemployed and living in busy areas such as NYC. 
          We offer the convenient option of renting an affordable room as it could ease the stress and cut the bills.
        </p>
        <div class="message-timestamp-right">SMS 2:37</div>
      </div>
    </div>
        </v-row>
  </v-container>

    
</template>

<style scoped>
/* @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400); */

#container {
    width: 100%;
    padding: 10px;
    overflow: auto;
    height: 380px;
    /* border: 2px solid black; */
    margin-top: -25px;
}

.message {
    position: relative;
    margin: 20px 20%;
    padding: 10px;
    background-color: lightblue;
    width: 60%;
    /* height: 500px; */
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
    border-bottom: 15px solid lightblue;
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