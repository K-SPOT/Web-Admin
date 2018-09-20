<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>K-SPOT</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">Channel</v-btn>
        <v-btn flat to="/spot">Spot</v-btn>
        <v-btn flat to="/theme">Theme</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <login v-if="loginPopUp"></login>
    <router-view/>
  </v-app>
</template>

<script>
import Login from '@/components/Login'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Login
  },
  computed: {
    ...mapGetters({
      loginPopUp: 'getOpenLoginPopUp'
    })
  }
}
</script>

<style>
*
{
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
