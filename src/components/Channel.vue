<template>
<v-app>
  <v-container>
    <v-layout row wrap>
      <v-flex xs3 d-flex>
        <v-select
          :items="types"
          label="Type"
          solo
          v-model="selected_type"
        ></v-select>
      </v-flex>
      <v-flex xs9></v-flex>
      <v-flex xs3>
        <v-text-field
          label="kor_name"
          placeholder="ex) 방탄소년단"
          outline
          v-model="kor_name"
        ></v-text-field>
      </v-flex>
      <v-flex xs3 offset-xs1>
        <v-text-field
          label="eng_name"
          placeholder="ex) BTS"
          outline
          v-model="eng_name"
        ></v-text-field>
      </v-flex>
      <v-flex xs4></v-flex>
      <v-flex xs3>
        <v-text-field
          label="kor_company"
          placeholder="ex) 빅히트 엔터테인먼트"
          outline
          v-model="kor_company"
        ></v-text-field>
      </v-flex>
      <v-flex xs3 offset-xs1>
        <v-text-field
          label="eng_company"
          placeholder="ex) BigHit Entertainment"
          outline
          v-model="eng_company"
        ></v-text-field>
      </v-flex>
      <v-flex xs4></v-flex>
      <v-flex xs5>
        <h2>background_img</h2>
        <div class="dropbox" v-if="!bg_img">
          <input class="input-image" type="file" :multiple="false" @change="onBgFileChanged" accept="image/*">
          <p>Drag your image</p>
        </div>
        <img :src="bg_img" v-if="bg_img" alt="background_img">
      </v-flex>
      <v-flex xs5 offset-xs2>
        <h2>thumbnail_img</h2>
        <div class="dropbox" v-if="!th_img">
          <input class="input-image" type="file" :multiple="false" @change="onThFileChanged" accept="image/*">
          <p>Drag your image</p>
        </div>
        <img :src="th_img" v-if="th_img" alt="thumbnail_img">
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="member_kor"
          placeholder="ex) 정국,뷔,지민"
          outline
          v-model="member_kor"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <h1>띄어쓰기없이 ,로 구분해주세요!</h1>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="member_eng"
          placeholder="ex) SUGA,V"
          outline
          v-model="member_eng"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <h1>순서상관없음!</h1>
      </v-flex>
      <v-flex xs2 offset-xs5>
        <v-btn large color="primary" @click="register">등록하기</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</v-app>
</template>

<script>
export default {
  name: 'Channel',
  data() {
    return {
      types: ['연예인', '방송'],
      selected_type: null,
      kor_name: null,
      eng_name: null,
      kor_company: null,
      eng_company: null,
      bg_file: null,
      bg_img: null,
      th_file: null,
      th_img: null,
      member_kor: null,
      member_eng: null
    }
  },
  methods: {
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
      let type_num = null
      if (this.selected_type === '연예인')
        type_num = 0
      else
        type_num = 1

      let mem_kor = []
      if(this.member_kor) {
        for (var i=0; i < this.member_kor.split(',').length; i++) {
          mem_kor.push(this.member_kor.split(',')[i])
        }
      }
      let mem_eng = []
      if(this.member_eng) {
        for (var i=0; i < this.member_eng.split(',').length; i++) {
          mem_eng.push(this.member_eng.split(',')[i])
        }
      }

      let data = new FormData()
      data.append('type', type_num)
      data.append('kor_name', this.kor_name)
      data.append('eng_name', this.eng_name)
      data.append('kor_company', this.kor_company)
      data.append('eng_company', this.eng_company)
      data.append('background_img', this.bg_file)
      data.append('thumbnail_img', this.th_file)
      data.append('member_kor', mem_kor)
      data.append('member_eng', mem_eng)
      this.$store.dispatch('registerChannel', data)
    }
  }
}
</script>

<style scoped>
.dropbox {
  background-color: blueviolet;
  outline: 2px dashed grey;
  min-height: 200px;
}

.dropbox p {
  text-align: center;
  line-height: 200px;
}

.input-image {
  opacity: 0;
  width: 80%;
  height: 200px;
  position: absolute;
}
</style>
