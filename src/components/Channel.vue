<template>
<v-app>
  <v-layout>
    <v-flex xs12 d-flex>
        <v-select
          :items="types"
          label="Type"
          solo
          v-model="selected_type"
        ></v-select>
      </v-flex>
  </v-layout>
</v-app>
</template>

<script>
export default {
  name: 'Channel',
  data() {
    return {
      types: ['celebrity', 'broadcast'],
      selected_type: null
    }
  }
}
</script>

<style>

</style>
