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
          label="open_time"
          placeholder="10:00 or 2018.09.17"
          outline
          v-model="open_time"
        ></v-text-field>
      </v-flex>
      <v-flex xs3 offset-xs1>
        <v-text-field
          label="close_time"
          placeholder="22:00 or 2018.10.11"
          outline
          v-model="close_time"
        ></v-text-field>
      </v-flex>
      <v-flex xs5>
        <h2>장소의 경우 10:00, 22:00같은 시간으로 형식을 맞춰주고, 이벤트의 경우 2018.09.17, 2018.10.11같은 날짜로 형식을 맞춰준다.</h2>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          label="latitude"
          placeholder="ex) 37.5298942"
          outline
          v-model="latitude"
        ></v-text-field>
      </v-flex>
      <v-flex xs3 offset-xs1>
        <v-text-field
          label="longitude"
          placeholder="ex) 126.9625863"
          outline
          v-model="longitude"
        ></v-text-field>
      </v-flex>
      <v-flex xs5>
        <h3>구글맵 사이트 url : https://www.google.co.kr/maps/place/%EC%9A%A9%EC%82%B0%EC%97%AD/@
          <strong style="color: red">37.5298942,126.9625863</strong>,17z/data=!3m1!4b1!4m5!3m4!1s0x357ca204a823150f:
          0x4d6c05392eb58762!8m2!3d37.52989!4d126.964775?hl=ko</h3>
      </v-flex>
      <v-flex xs4>
        <v-text-field
          label="contact"
          placeholder="ex) 010-1234-5678"
          outline
          v-model="contact"
        ></v-text-field>
      </v-flex>
      <v-flex xs8>
        <h2>장소의 경우는 연락가능한 전화번호, 이벤트의 경우는 주최 계정을 채워넣는다.</h2>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          label="address"
          placeholder="ex) 용산구 남산공원길 105"
          outline
          v-model="address"
        ></v-text-field>
      </v-flex>
      <v-flex xs3 offset-xs1>
        <v-text-field
          label="address_gu"
          placeholder="ex) 용산구"
          outline
          v-model="address_gu"
        ></v-text-field>
      </v-flex>
      <v-flex xs5>
        <h2>address는 구글맵을 보고 채워넣고, address_gu는 '구'를 꼭 붙인다.</h2>
      </v-flex>
      <v-flex xs4>
        <v-text-field
          label="name (한글)"
          placeholder="ex) 서울남산타워"
          outline
          v-model="name"
        ></v-text-field>
      </v-flex>
      <v-flex xs6 offset-xs2>
        <v-textarea
          outline
          label="description (한글)"
          placeholder="ex) 서울의 야경을 한 눈에 볼 수 있는 랜드마크"
          v-model="description"
        ></v-textarea>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          label="station"
          placeholder="ex) 강남역"
          outline
          v-model="station"
        ></v-text-field>
      </v-flex>
      <v-flex xs1>
        <v-btn color="primary" @click="insertStation">확인</v-btn>
      </v-flex>
      <v-flex xs7 offset-xs1>
        <h2>station은 '역'을 꼭 붙인다. 확인누르면 밑에 자동완성됨.</h2>
      </v-flex>
      <v-flex xs3 offset-xs1>
        <v-text-field
          label="line_number"
          placeholder="자동완성"
          outline
          v-model="line_number"
        ></v-text-field>
      </v-flex>
      <v-flex xs3 offset-xs1>
        <v-text-field
          label="prev_station"
          placeholder="자동완성"
          outline
          v-model="prev_station"
        ></v-text-field>
      </v-flex>
      <v-flex xs3 offset-xs1>
        <v-text-field
          label="next_station"
          placeholder="자동완성"
          outline
          v-model="next_station"
        ></v-text-field>
      </v-flex>
      <form id="form">
        <v-flex xs12>
          <h2>spot_img (10장이 안될 경우 위에서부터 채워넣고 나머지는 파일 안 넣으면 된다.)</h2>
        </v-flex>
        <v-flex xs12>
          이미지 1
          <input name="spot_img" type="file" :multiple="false" @change="onFileChanged($event, 0)" accept="image/*">
        </v-flex>
        <v-flex xs12>
          이미지 2
          <input name="spot_img" type="file" :multiple="false" @change="onFileChanged($event, 1)" accept="image/*">
        </v-flex>
        <v-flex xs12>
          이미지 3
          <input name="spot_img" type="file" :multiple="false" @change="onFileChanged($event, 2)" accept="image/*">
        </v-flex>
        <v-flex xs12>
          이미지 4
          <input name="spot_img" type="file" :multiple="false" @change="onFileChanged($event, 3)" accept="image/*">
        </v-flex>
        <v-flex xs12>
          이미지 5
          <input name="spot_img" type="file" :multiple="false" @change="onFileChanged($event, 4)" accept="image/*">
        </v-flex>
        <v-flex xs12>
          이미지 6
          <input name="spot_img" type="file" :multiple="false" @change="onFileChanged($event, 5)" accept="image/*">
        </v-flex>
        <v-flex xs12>
          이미지 7
          <input name="spot_img" type="file" :multiple="false" @change="onFileChanged($event, 6)" accept="image/*">
        </v-flex>
        <v-flex xs12>
          이미지 8
          <input name="spot_img" type="file" :multiple="false" @change="onFileChanged($event, 7)" accept="image/*">
        </v-flex>
        <v-flex xs12>
          이미지 9
          <input name="spot_img" type="file" :multiple="false" @change="onFileChanged($event, 8)" accept="image/*">
        </v-flex>
        <v-flex xs12>
          이미지 10
          <input name="spot_img" type="file" :multiple="false" @change="onFileChanged($event, 9)" accept="image/*">
        </v-flex>
      </form>
      <v-list v-if="channels">
        <h2>------------channel_list</h2>
        <v-list-tile v-for="item in channels.channel_celebrity_list" :key="item.channel_id">
            {{ item.name }}
            <v-btn @click="addChannel(item.channel_id)">추가</v-btn>
            <v-btn @click="cancelChannel(item.channel_id)">취소</v-btn>
        </v-list-tile>
        <v-list-tile v-for="item in channels.channel_broadcast_list" :key="item.channel_id">
            {{ item.name }}
            <v-btn @click="addChannel(item.channel_id)">추가</v-btn>
            <v-btn @click="cancelChannel(item.channel_id)">취소</v-btn>
        </v-list-tile>
      </v-list>
      <v-flex xs4 offset-xs8>
        <h2>{{ channelList }}</h2>
      </v-flex>
      <v-flex xs2 offset-xs5>
        <v-btn large color="primary" @click="register">등록하기</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</v-app>
</template>

<script>
import subway_data from './SubwayData.js'
import { mapGetters } from 'vuex'
export default {
  name: 'Spot',
  data () {
    return {
      types: ['맛집', '카페', '명소', '기타', '생일', '기념', '이벤트기타'],
      selected_type: null,
      open_time: null,
      close_time: null,
      latitude: null,
      longitude: null,
      contact: null,
      address: null,
      address_gu: null,
      name: null,
      description: null,
      station: null,
      line_number: null,
      prev_station: null,
      next_station: null,
      imgFiles: null,
      imgList: [null, null, null, null, null, null, null, null, null, null],
      channelList: []
    }
  },
  computed: {
    ...mapGetters({
      channels: 'getChannelsData'
    })
  },
  methods: {
    insertStation () {
      const data = subway_data.subwayData
      for(var i=0; i<data.length; i++) {
        let check = 0
        for(var j=0; j<data[i].line.length; j++) {
          if(this.station === data[i].line[j]) {
            this.line_number = data[i].subway_num
            if(j !== 0)
              this.prev_station = data[i].line[j-1]
            if(j !== (data[i].line.length - 1))
              this.next_station = data[i].line[j+1]
            check = 1
          }
        }
        if(check === 1) break
      }
    },
    onFileChanged (event, i) {
      if(event.target.files[0]['type'].split('/')[0] === 'image') {
        this.imgList[i] = event.target.files[0]
        console.log(this.imgList[i])
      } else {
        alert('이미지 파일만 가능합니다.')
      }
    },
    addChannel (id) {
      this.channelList.push(id)
    },
    cancelChannel (id) {
      this.channelList.splice(this.channelList.indexOf(id), 1)
    },
    register () {
      let type_num = null
      if (this.selected_type === '맛집') type_num = 0
      else if (this.selected_type === '카페') type_num = 1
      else if (this.selected_type === '명소') type_num = 2
      else if (this.selected_type === '생일') type_num = 3
      else if (this.selected_type === '기념') type_num = 4
      else if (this.selected_type === '이벤트기타') type_num = 5
      else type_num = 6

      let fileList = []
      for (var i=0; i < this.imgList.length; i++) {
        if(this.imgList[i] !== null)
          fileList.push(this.imgList[i])
      }

      var form = document.getElementById('form')
      let data = new FormData(form)
      data.append('type', type_num)
      data.append('open_time', this.open_time)
      data.append('close_time', this.close_time)
      data.append('contact', this.contact)
      data.append('latitude', this.latitude)
      data.append('longitude', this.longitude)
      data.append('name', this.name)
      data.append('description', this.description)
      data.append('line_number', this.line_number)
      data.append('station', this.station)
      data.append('prev_station', this.prev_station)
      data.append('next_station', this.next_station)
      data.append('address', this.address)
      data.append('address_gu', this.address_gu)
      data.append('channel_id', this.channelList)

      this.$store.dispatch('registerSpot', data)
    }
  },
  created () {
    this.$store.dispatch('getChannels')
  }
}
</script>

<style>

</style>
