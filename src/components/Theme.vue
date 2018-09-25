<template>
<v-app>
  <v-container>
    <v-layout row wrap>
      <v-flex xs4>
        <v-textarea
          outline
          label="title (한글)"
          placeholder="ex) 방탄소년단's PICK
          HOT PLACE 5!"
          v-model="title"
        ></v-textarea>
      </v-flex>
      <v-flex xs4 offset-xs2>
        <v-text-field
          label="subtitle (한글)"
          placeholder="ex) #논현동 #압구정동 #신사동 #가락시장"
          outline
          v-model="subtitle"
        ></v-text-field>
      </v-flex>
      <v-flex xs2></v-flex>
      <v-flex xs5>
        <h3>main_img_kor 메인에서 보여지는 이미지(텍스트 포함)</h3>
        <div class="dropbox" v-if="!main_img_kor">
          <input class="input-image" type="file" :multiple="false" @change="onFileChanged($event, 0)" accept="image/*">
          <p>Drag your image</p>
        </div>
        <img :src="main_img_kor" v-if="main_img_kor" alt="main_img_kor">
      </v-flex>
      <v-flex xs5 offset-xs2>
        <h3>main_img_eng 메인에서 보여지는 이미지(텍스트 포함)</h3>
        <div class="dropbox" v-if="!main_img_eng">
          <input class="input-image" type="file" :multiple="false" @change="onFileChanged($event, 1)" accept="image/*">
          <p>Drag your image</p>
        </div>
        <img :src="main_img_eng" v-if="main_img_eng" alt="main_img_eng">
      </v-flex>
      <v-flex xs5 offset-xs3>
        <h2>img 테마 들어가면 보여지는 배경이미지</h2>
        <div class="dropbox" v-if="!img">
          <input class="input-image" type="file" :multiple="false" @change="onFileChanged($event, 2)" accept="image/*">
          <p>Drag your image</p>
        </div>
        <img :src="img" v-if="img" alt="img">
      </v-flex>
      <v-flex xs4></v-flex>
      <v-flex xs2 offset-xs5>
        <v-btn large color="primary" @click="register">등록하기</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap style="margin-top: 50px">
      <v-flex xs12>
        <h1>테마의 컨텐츠 등록하기</h1>
      </v-flex>
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
      <v-flex xs6></v-flex>
      <v-flex xs3 v-if="!theme_id">
        <v-text-field
          label="selected_theme_id"
          placeholder="ex) 7"
          outline
          v-model="themeId"
        ></v-text-field>
      </v-flex>
      <v-flex xs3 v-if="theme_id">
        <v-text-field
          label="selected_theme_id"
          placeholder="자동완성"
          outline
          v-model="theme_id"
        ></v-text-field>
      </v-flex>
      <v-flex xs9>
        <h2>테마를 등록하면 그 아이디를 자동으로 채워줌. 혹시나 새로고침누르면 그 아이디로 다시 채워넣어야함.</h2>
      </v-flex>
      <v-flex xs4>
        <v-text-field
          label="title"
          placeholder="방탄소년단의 힘의 원천 '유정식당'"
          outline
          v-model="contents_title"
        ></v-text-field>
      </v-flex>
      <v-flex xs8></v-flex>
      <v-flex xs6>
        <v-textarea
          outline
          label="description (한글)"
          placeholder="ex) 유정식당은 방탄 신인 시절 방송에서 추천한 맛집"
          v-model="description"
        ></v-textarea>
      </v-flex>
      <v-flex xs6>
        <h2>description 총 3개가 들어가야 하는데, 엔터로 나눠주면 된다.</h2>
      </v-flex>
      <v-flex xs2 offset-xs5>
        <v-btn large color="primary" @click="register_contents">컨텐츠 등록하기</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Theme',
  data () {
    return {
      title: null,
      subtitle: null,
      main_kor_file: null,
      main_eng_file: null,
      img_file: null,
      main_img_kor: null,
      main_img_eng: null,
      img: null,
      selected_spotId: null,
      contents_title: null,
      description: null,
      themeId: null,
    }
  },
  computed: {
    ...mapGetters ({
      theme_id: 'getThemeId',
      spots: 'getSpotList'
    })
  },
  methods: {
    onFileChanged (event, idx) {
      if(event.target.files[0]['type'].split('/')[0] === 'image') {
        if(idx === 0)
          this.main_kor_file = event.target.files[0]
        else if(idx === 1)
          this.main_eng_file = event.target.files[0]
        else
          this.img_file = event.target.files[0]
        this.getImage(event.target.files[0], idx)
      } else {
        alert('이미지 파일만 가능합니다.')
      }
    },
    getImage (file, idx) {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        console.log(fileReader)
        if(idx === 0)
          this.main_img_kor = fileReader.result
        else if(idx === 1)
          this.main_img_eng = fileReader.result
        else
          this.img = fileReader.result
      }
      fileReader.readAsDataURL(file)
    },
    register () {
      let data = new FormData()
      data.append('title', this.title)
      data.append('subtitle', this.subtitle)
      data.append('main_img_kor', this.main_kor_file)
      data.append('main_img_eng', this.main_eng_file)
      data.append('img', this.img_file)

      this.$store.dispatch('registerTheme', data)
    },
    register_contents () {
      const theme_last_id = this.theme_id? this.theme_id : this.themeId
      const object = {
        theme_id: theme_last_id,
        spot_id: this.selected_spotId,
        title: this.contents_title,
        description: this.description
      }

      this.$store.dispatch('registerContents', object)
    }
  },
  created () {
    this.$store.dispatch('getSpotList')
  }
}
</script>

<style>
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
