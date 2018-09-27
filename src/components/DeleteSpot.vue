<template>
<v-app>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 d-flex>
        <v-select
          :items="spots"
          item-text="spot_name"
          item-value="spot_id"
          label="Spot"
          solo
          v-model="selected_spotId"
        ></v-select>
      </v-flex>
      <v-flex xs6>
        <v-btn @click="deleteSpot(selected_spotId)">삭제</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DeleteSpot',
  data () {
    return {
      selected_spotId: null,
    }
  },
  computed: {
    ...mapGetters ({
      spots: 'getSpotList'
    })
  },
  methods: {
    deleteSpot (spot_id) {
      this.$store.dispatch('deleteSpot', spot_id)
      this.$store.dispatch('getSpotList')
    }
  },
  created () {
    this.$store.dispatch('getSpotList')
  }
}
</script>

<style>

</style>
