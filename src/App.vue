<template>
  <v-app id="inspire">
    <v-app-bar extended>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Informaticki projekt 2 - Knjige</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn @click="goToHomePage">
        Početna
      </v-btn>

      <v-btn @click="goToAboutPage">
        O nama
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    // Vaši podaci ovdje
  }),

  methods: {
    goToAboutPage() {
      this.$router.push('/about');
    },

    goToHomePage() {
      this.$router.push('/');
    }
  }
}
</script>
