<template>
  <div class="page">
    <header class="header">
      <Head></Head>
    </header>
    <img v-if="src" :src="src" style="height: 20vh; width: auto;"></img>
    <input type="file" @change="handleFile" />
    <button @click="upload">上传</button>
    <main ref="content" class="content" id="content">
      <Message></Message>
    </main>
    <footer class="footer">
      <Send></Send>
    </footer>
  </div>
</template>


<script setup>
import { ref, nextTick,onMounted } from 'vue'
import { showSuccessToast, showFailToast } from "vant";
//import {tus} from 'tus-js-client';
import Head from "@/components/Head.vue";
import Message from "@/components/Message.vue";
import Send from "@/components/Send.vue";

import * as tus from 'tus-js-client'   // ⭐ 用这种方式

let selectedFile = null

function handleFile(e) {
  selectedFile = e.target.files[0]
}
const src = ref("");

const server_url = "https://qftms.metabasenet.site/";

function upload() {
  if (!selectedFile) return
  const upload = new tus.Upload(selectedFile, {
    endpoint: server_url,
    //endpoint: 'http://127.0.0.1/',
    retryDelays: [0, 1000, 3000, 5000],
    metadata: {
      filename: selectedFile.name,
      filetype: selectedFile.type
    },
    onProgress: (bytesUploaded, bytesTotal) => {
      console.log(`上传进度: ${(bytesUploaded / bytesTotal * 100).toFixed(2)}%`)
    },
    onSuccess: () => {
      //console.log('上传成功! 文件 URL:', `${upload.url}.${selectedFile.name.split('.').pop()}`)
      const url_tmep = upload.url.replace(`${server_url}files/`,`${server_url}chat/`);
      src.value = `${url_tmep}.${selectedFile.name.split('.').pop()}`
      console.log(src.value);
    },
    onError: (err) => {
      console.error('上传失败:', err)
    }
  })
  upload.start()
}

function playSendSound() {
  const soundSendUrl = "/send.wav";
  const audio = new Audio(soundSendUrl);
  audio.play().catch(() => { });
}

function playReceiveSound() {
  const soundReceiveUrl = "/receive.wav";
  const audio = new Audio(soundReceiveUrl);
  audio.play().catch(() => { 
    //console.log("播放接收消息声音失败");
  });
}

function send() {
  //const msg = { sender: 2, receiver: 1, type: 1, url: "", text: "你好", utc: get_utc(), group: 0 };
  //ws.send(JSON.stringify(msg));
  //console.log("发送消息: " + JSON.stringify(msg));

  playSendSound();
  showSuccessToast("发送消息");
}

setTimeout(() => {
  //showFailToast("发送消息.........");
  //send();
}, 5000);

const content = ref(null);
async function scrollToBottom() {
    await nextTick();
    if (content.value) {
        content.value.scrollTop = content.value.scrollHeight;
        //playReceiveSound();
        //playSendSound();
    }
}

setTimeout(() => {
    //scrollToBottom();
    //console.log("滚动到底部");
}, 5000);

onMounted(() => {
    //scrollToBottom();
    //console.log("滚动到底部");
});

</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  flex-shrink: 0;
}

.footer {
  flex-shrink: 0;
}

.content {
  flex: 1;
  overflow-y: auto;
}
</style>