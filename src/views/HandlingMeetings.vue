<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <div class="logo" >
        <img :src="require('../../config.json').imgLinks.logo" alt="logo" width="400">
      </div>
    <v-col lg="4">
      <h2 class="headline font-weight-bold mb-3">How To Handle Meetings</h2>
      </v-col>
    </v-row>
    <v-row class="text-center" justify="center">
      <v-col
        md="4"
      >
        <img style="margin: 10px" :src="require('../assets/room1.jpg')" alt="logo" width="400">
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
      <div style="padding-left: 80px; padding-right: 80px;">
        <h3>Objective:</h3>
        <p class="font">
          The main goal of FamilyRoomRentals is to provide solutions to those struggling to find a roof over their heads.
          We believe that many people cannot affort rent, specially if unemployed and living in busy areas such as NYC. 
          We offer the convenient option of renting an affordable room as it could ease the stress and cut the bills.
        </p>
        <p class="font">
          We want to help those going thorugh difficult situation and are in the need of moving quickly and safely.
          Our support goes mostly to minority groups and inmigrants, where opportunities are lacking and service are
          much needed.
        </p>
      </div>
      </v-col>
    </v-row>
  </v-container>

    
</template>