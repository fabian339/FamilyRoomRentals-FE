<template>
    <v-app-bar
      app
      color="#556B2F"
      dark
    >
      <v-toolbar-title id="title">FamilyRoomRentals</v-toolbar-title>

      <v-spacer></v-spacer>

    <v-btn to="/" text>
        <span>Home</span>
    </v-btn>

    <v-btn to="/create" text>
        <span>Post a Room</span>
    </v-btn>

    <v-btn to="/rooms" text>
        <span>View Rooms</span>
    </v-btn>

    <v-btn to="/vip-rooms" text>
        <span>VIP Rooms</span>
    </v-btn>

    <v-btn to="/documentation" text>
        <span>Documentation</span>
    </v-btn>
    
    <v-btn to="/about" text>
        <span>About</span>
    </v-btn>
      
    </v-app-bar>
</template>

<style scoped>
    #title {
        font-family: 'Rochester', cursive;
        font-size: 35px;
    }
</style>