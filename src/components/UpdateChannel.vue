<template>
<v-app>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 d-flex v-if="channels">
        <v-select
          :items="channels.channel_celebrity_list"
          item-text="name"
          item-value="channel_id"
          label="celebrity"
          solo
          v-model="selected_channel_id"
        ></v-select>
      </v-flex>
      <v-flex xs6>
        <v-btn @click="updateChannel(selected_channel_id)">수정</v-btn>
        <v-btn @click="deleteChannel(selected_channel_id)">삭제</v-btn>
      </v-flex>
      <v-flex xs6 d-flex v-if="channels">
        <v-select
          :items="channels.channel_broadcast_list"
          item-text="name"
          item-value="channel_id"
          label="broadcast"
          solo
          v-model="selected_channel_id"
        ></v-select>
      </v-flex>
      <v-flex xs6>
        <v-btn @click="updateChannel(selected_channel_id)">수정</v-btn>
        <v-btn @click="deleteChannel(selected_channel_id)">삭제</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-if="editChannel">
      <v-flex xs5>
        <v-text-field
          label="kor_name"
          placeholder="ex) 방탄소년단"
          outline
          v-model="kor_name"
          :suffix="editChannel[0].kor_name"
        ></v-text-field>
      </v-flex>
      <v-flex xs5 offset-xs1>
        <v-text-field
          label="eng_name"
          placeholder="ex) BTS"
          outline
          v-model="eng_name"
          :suffix="editChannel[0].eng_name"
        ></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs5>
        <v-text-field
          label="kor_company"
          placeholder="ex) 빅히트 엔터테인먼트"
          outline
          v-model="kor_company"
          :suffix="editChannel[0].kor_company"
        ></v-text-field>
      </v-flex>
      <v-flex xs5 offset-xs1>
        <v-text-field
          label="eng_company"
          placeholder="ex) BigHit Entertainment"
          outline
          v-model="eng_company"
          :suffix="editChannel[0].eng_company"
        ></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs5>
        <h2>background_img</h2>
        <div>
          <input type="file" :multiple="false" @change="onBgFileChanged" accept="image/*">
        </div>
        <img :src="editChannel[0].background_img" v-if="!bg_img" alt="background_img">
        <img :src="bg_img" v-if="bg_img" alt="background_img">
      </v-flex>
      <v-flex xs5 offset-xs2>
        <h2>thumbnail_img</h2>
        <div>
          <input type="file" :multiple="false" @change="onThFileChanged" accept="image/*">
        </div>
        <img :src="editChannel[0].thumbnail_img" v-if="!th_img" alt="background_img">
        <img :src="th_img" v-if="th_img" alt="thumbnail_img">
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
  name: 'UpdateTheme',
  data () {
    return {
      selected_channel_id: null,
      channel_edit: null,
      kor_name: null,
      eng_name: null,
      kor_company: null,
      eng_company: null,
      bg_file: null,
      bg_img: null,
      th_file: null,
      th_img: null
    }
  },
  computed: {
    ...mapGetters({
      channels: 'getChannelsData',
      editChannel: 'getChannelEdit'
    }),
  },
  methods: {
    deleteChannel (channel_id) {
      this.$store.dispatch('deleteChannel', channel_id)
      this.$store.dispatch('getChannels')
    },
    updateChannel (channel_id) {
      this.$store.dispatch('editChannel', channel_id)
    },
    onBgFileChanged (event) {
      if(event.target.files[0]['type'].split('/')[0] === 'image') {
        this.bg_file = event.target.files[0]
        this.getBgImage(this.bg_file)
      } else {
        alert('이미지 파일만 가능합니다.')
      }
    },
    getBgImage (file) {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        console.log(fileReader)
        this.bg_img = fileReader.result
      }
      fileReader.readAsDataURL(file)
    },
    onThFileChanged (event) {
      if(event.target.files[0]['type'].split('/')[0] === 'image') {
        this.th_file = event.target.files[0]
        this.getThImage(this.th_file)
      } else {
        alert('이미지 파일만 가능합니다.')
      }
    },
    getThImage (file) {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        console.log(fileReader)
        this.th_img = fileReader.result
      }
      fileReader.readAsDataURL(file)
    },
    register () {
      let data = new FormData()
      data.append('channel_id', this.editChannel[0].id)
      data.append('kor_name', this.kor_name)
      data.append('eng_name', this.eng_name)
      data.append('kor_company', this.kor_company)
      data.append('eng_company', this.eng_company)
      data.append('background_img', this.bg_file)
      data.append('thumbnail_img', this.th_file)
      this.$store.dispatch('updateChannel', data)
    }
  },
  created () {
    this.$store.dispatch('getChannels')
  }
}
</script>

<style>

</style>
