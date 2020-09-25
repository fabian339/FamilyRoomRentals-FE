<template>
  <v-footer
    color="#8FBC8F"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="(link, index) in links"
        color="black"
        text
        :key="index + 99"
        rounded
        :to="link.path"
        class="my-2"
      >
        {{ link.name }}
      </v-btn>
      <v-col
        class="lighten-2 py-4 text-center white--text"
        cols="12"
      >
        <v-btn
            v-for="(icon, index) in icons"
            :key="index + 88"
            class="mx-4"
            dark
            icon
            color="black"
        >
            <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>      
        </v-col>
        <v-col
            class="py-4 text-center white--text"
            style="background-color: darkslategray"
            cols="12"
        >
            © {{ new Date().getFullYear() }} — <strong>Copyright: FamilyRoomRentals</strong>
        </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        {name: 'Home', path: '/'},
        {name: 'About Us', path: '/about'},
        {name: 'Careers', path: '/careers'},
        {name: 'Contact Us', path: '/contact'},
        {name: 'Stories', path: '/stories'},
      ],
    icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>