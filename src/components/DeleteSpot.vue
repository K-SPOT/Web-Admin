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
        <v-btn @click="editSpot(selected_spotId)">수정</v-btn>
        <v-btn @click="deleteSpot(selected_spotId)">삭제</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-if="spot_edit">
      <v-flex xs5>
        <v-text-field
          label="name (한글)"
          placeholder="ex) 서울남산타워"
          outline
          v-model="name"
          :suffix="spot_edit[0].kor_name"
        ></v-text-field>
      </v-flex>
      <v-flex xs6 offset-xs1>
        <v-textarea
          outline
          label="description (한글)"
          placeholder="ex) 서울의 야경을 한 눈에 볼 수 있는 랜드마크"
          v-model="description"
          :suffix="spot_edit[0].kor_description"
        ></v-textarea>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="address"
          placeholder="ex) 용산구 남산공원길 105"
          outline
          v-model="address"
          :suffix="spot_edit[0].kor_address"
        ></v-text-field>
      </v-flex>
      <v-flex xs5 offset-xs1>
        <v-text-field
          label="address_gu"
          placeholder="ex) 용산구"
          outline
          v-model="address_gu"
          :suffix="spot_edit[0].kor_address_gu"
        ></v-text-field>
      </v-flex>
      <v-flex xs2 offset-xs5>
        <v-btn large color="primary" @click="register">등록하기</v-btn>
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
      name: null,
      description: null,
      address: null,
      address_gu: null
    }
  },
  computed: {
    ...mapGetters ({
      spots: 'getSpotList',
      spot_edit: 'getSpotEdit'
    })
  },
  methods: {
    deleteSpot (spot_id) {
      this.$store.dispatch('deleteSpot', spot_id)
      this.$store.dispatch('getSpotList')
    },
    editSpot (spot_id) {
      this.$store.dispatch('editSpot', spot_id)
    },
    register () {
      const object = {
        spot_id: this.selected_spotId,
        name: this.name,
        description: this.description,
        address: this.address,
        address_gu: this.address_gu
      }
      this.$store.dispatch('updateSpot', object)
    }
  },
  created () {
    this.$store.dispatch('getSpotList')
  }
}
</script>

<style>

</style>
