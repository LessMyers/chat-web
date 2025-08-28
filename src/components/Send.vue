<template>
  <!--
  <div v-if="audioUrl">
    <audio :src="audioUrl" controls></audio>
  </div>
  -->
  <van-row>
    <van-col span="2" class="send-btn">
      <van-icon v-if="isRecording" name="stop-circle-o" class="recording" size="26px" @click="stopRecording" />
      <van-icon v-else name="play-circle-o" size="24px" @click="startRecording" />
    </van-col>
    <van-col span="18" style="padding: 4px;">
      <emoji-picker v-if="showPicker" @emoji-click="onEmojiClick"></emoji-picker>
      <van-field @focus="showPicker=false" :rows="1" v-model="text" type="textarea" placeholder="请输入消息..." :autosize="true" />
    </van-col>
    <van-col span="2" class="send-btn">
      <van-icon name="smile-o" size="24px" @click="showPicker = !showPicker" />
    </van-col>
    <van-col span="2" class="send-btn">
      <van-icon v-if="text" name="guide-o" size="24px" @click="send" />
      <van-icon v-else name="search" size="24px" />
    </van-col>
  </van-row>
</template>

<script setup>
import { ref } from 'vue'
import { showSuccessToast, showFailToast } from "vant";
//import EmojiPicker from 'emoji-picker-element';

function playSendSound() {
  const soundSendUrl = "https://assets.cometchat.io/uikits/static/audio/outgoingmessage.wav";
  const audio = new Audio(soundSendUrl);
  audio.play().catch(() => { });
}

function playReceiveSound() {
  const soundReceiveUrl = "https://assets.cometchat.io/uikits/static/audio/incomingmessage.wav";
  const audio = new Audio(soundReceiveUrl);
  audio.play().catch(() => { });
}

const text = ref('');
const showPicker = ref(false);

function send() {
  showSuccessToast(text.value);
  text.value = "";
  showPicker.value = false;
  playSendSound();
}

const onEmojiClick = (event) => {
  text.value += event.detail.unicode;
}

const audioUrl = ref('')
const isRecording = ref(false)
let mediaRecorder = null
let audioChunks = []
let time_out = null;
const startRecording = async () => {
  clearTimeout(time_out);
  time_out = setTimeout(() => {
    if (isRecording.value) {
      stopRecording();
    }
  }, 60 * 1000);

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder = new MediaRecorder(stream)
    audioChunks = []

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data)
    }

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
      audioUrl.value = URL.createObjectURL(audioBlob)
      isRecording.value = false
    }

    mediaRecorder.start()
    isRecording.value = true
  } catch (err) {
    console.error('无法获取麦克风权限', err)
    alert('请允许访问麦克风')
  }
}

const stopRecording = () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop()
  }
  if (mediaRecorder && mediaRecorder.stream) {
    mediaRecorder.stream.getTracks().forEach(track => track.stop())
  }
}

</script>

<style scoped>
.send-btn {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 16px;
}

/* 录音中高亮 */
.van-icon.recording {
  color: red;
  padding-left: 10px;
  animation: pulse 2s infinite;
  z-index: 1;
}

/* 脉动动画 */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.5);
    opacity: 0.7;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>