<template>
  <div id="test">
    <p>{{ sentence_content }}</p>
    <p>{{ "[" + symbol_content + "]" }}</p>
    <br />
    <span>score: {{ score }}</span>
    <br />
    <button
      class="move"
      id="btnPre"
      @click="pre()"
      :disabled="idx === 0 || recording"
      style="vertical-align: middle"
    >
      <span>上一个</span>
    </button>
    <button
      class="record"
      id="btnStart"
      @click="recOpen(recStart)"
      style="margin: 1vw; vertical-align: middle"
    >
      <span>开始录音</span>
    </button>
    <button
      class="record"
      id="btnEnd"
      @click="recStop()"
      style="margin: 1vw; vertical-align: middle"
    >
      <span>结束录音</span>
    </button>
    <button
      class="move"
      id="btnNext"
      @click="next()"
      :disabled="idx === len - 1 || recording"
      style="vertical-align: middle"
    >
      <span>下一个</span>
    </button>
    <br />
    <!-- <button @click="getPermission()" style="margin:1vw;">获取权限</button> -->
    <button
      class="record"
      @click="recSave(sentence_content)"
      style="margin: 1vw; vertical-align: middle"
    >
      <span>下载录音</span>
    </button>
    <div
      id="wave"
      style="width: 100%; height: 200px; border: 1px solid black"
    ></div>
  </div>
</template>

<script>
import Recorder from "recorder-core/recorder.wav.min"
import "recorder-core/src/extensions/waveview"
import axios from "axios"


let wave

let rec = Recorder({
            type: "wav", sampleRate: 16000, bitRate: 16 //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
            , onProcess: function (buffers, powerLevel, bufferDuration, bufferSampleRate, newBufferIdx, asyncEnd) {
                //录音实时回调，大约1秒调用12次本回调
                //可利用extensions/waveview.js扩展实时绘制波形
                //可利用extensions/sonic.js扩展实时变速变调，此扩展计算量巨大，onProcess需要返回true开启异步模式
                wave.input(buffers[buffers.length - 1], powerLevel, bufferSampleRate)
                console.log(newBufferIdx, asyncEnd)

            }
        })
export default {
  name: "Voice",
  data() {
    return {
      sentence_content: "show sentence",
      symbol_content: "voice",
      wav_data: null,
      record: [],
      idx: 0,
      len: 65536,
      score: 0,
      recording: false,
      words_record: []
    };
  },
  mounted: function(){
    this.requestData()
  },
  methods: {
    recOpen(success) {
      //一般在显示出录音按钮或相关的录音界面时进行此方法调用，后面用户点击开始录音时就能畅通无阻了
      //var dialog=createDelayDialog(); 我们可以选择性的弹一个对话框：为了防止移动端浏览器存在第三种情况：用户忽略，并且（或者国产系统UC系）浏览器没有任何回调，此处demo省略了弹窗的代码
      rec.open(
        function () {
          //打开麦克风授权获得相关资源
          //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
          //rec.start() 此处可以立即开始录音，但不建议这样编写，因为open是一个延迟漫长的操作，通过两次用户操作来分别调用open和start是推荐的最佳流程
          success && success()
        },
        function (msg, isUserNotAllow) {
          //用户拒绝未授权或不支持
          //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
          console.log(
            (isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg
          )
        }
      )
    },
    /**开始录音**/
    recStart() {
      //打开了录音后才能进行start、stop调用
      wave = Recorder.WaveView({ elem: "#wave" })//创建wave对象，写这里面浏览器妥妥的
      rec.start()
      this.recording = true
    },
    /**结束录音**/
    recStop() {
      let self = this
      //this.$emit('showbox', true)
      rec.stop(function (blob, duration) {
        console.log(blob,window.URL.createObjectURL(blob),"时长:" + duration + "ms")
        rec.close() //释放录音资源，当然可以不释放，后面可以连续调用start；但不释放时系统或浏览器会一直提示在录音，最佳操作是录完就close掉
        //rec = null;
        self.wav_data = blob
        self.submit(blob)
      })
      this.recording = false
      this.$emit('recordend', {idx: this.idx, record: this.record, words_record: this.words_record})
      this.$emit('showbox', true)
    },
    recSave(name) {
      try {
        let oA = document.createElement("a");
        console.log(this.wav_data);

        oA.href = window.URL.createObjectURL(this.wav_data);
        oA.download = name + ".wav";
        oA.click();
      } catch (err) {
        alert("未录音，请重试");
      }
    },
    requestData() {
      let url = "http://150.158.158.190/api/pro_sen/?course_id=3";
      let self = this;
      axios.get(url).then(function (responce) {
          console.log(responce)
          self.sentence_set = responce.data.data
          self.sentence_content = self.sentence_set[self.idx].sentence_content
          self.len = self.sentence_set.length
          self.$emit('updatelen', self.len)
          //console.log(self.len)
        }).catch((error) => console.log(error));
    },
    next() {
      this.idx++
      this.sentence_content = this.sentence_set[this.idx].sentence_content
      this.score = 0
      this.$emit('updateidx', this.idx)
    },
    pre() {
      this.idx-- 
      this.sentence_content = this.sentence_set[this.idx].sentence_content
      this.score = 0
      this.$emit('updateidx', this.idx)
    },
    submit(data) {
      let self = this;
      let url = "http://150.158.158.190/api/sen_recorder/";
      let formData = new FormData();
      let file = new File([data], this.sentence_content, {
        type: this.wav_data.type,
        lastModified: Date.now(),
      });
      console.log(file);
      formData.append("sentence_content", this.sentence_content);
      formData.append("sentence_audio", file);
      axios.post(url, formData).then(function (res) {
          console.log(res.data)
          self.score = res.data.pron_total_score
          //self.sentence_content = res.data.sentence_content
          self.words_record = res.data.words_record
          let _record = {word: self.sentence_content, score: self.score}
          if (self.idx > self.record.length - 1)
            self.record.push(_record)
          else self.record.splice(self.idx, 1, _record)
        }).catch((err) => console.log(err))
    },
  },
}

</script>

<style>
#test {
  width: 50%;
  height: 100%;
  float: left;
  text-align: center;
}
.move {
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 20px;
  padding: 6px;
  width: 100px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

#btnNext span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

#btnNext span:after {
  content: "»";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

#btnNext:hover span {
  padding-right: 20px;
}

#btnNext:hover span:after {
  opacity: 1;
  right: 0;
}

#btnPre span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

#btnPre span:after {
  content: "«";
  position: absolute;
  opacity: 0;
  top: 0;
  left: -20px;
  transition: 0.5s;
}

#btnPre:hover span {
  padding-left: 20px;
}

#btnPre:hover span:after {
  opacity: 1;
  left: 0;
}

.record {
  display: inline-block;
  padding: 15px 25px;
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.record:hover {
  background-color: #3e8e41;
}

.record:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>