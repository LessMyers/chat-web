<template>
  <div class="page">
    <header class="header">
      <Head></Head>
    </header>
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

/*
let selectedFile = null

function handleFile(event) {
  selectedFile = event.target.files[0]
}

function upload() {
  if (!selectedFile) return

  const upload = new tus.Upload(selectedFile, {
    endpoint: 'http://localhost:8888/file/uploads/',
    retryDelays: [0, 1000, 3000, 5000],
    metadata: {
      filename: selectedFile.name,
      filetype: selectedFile.type
    },
    onProgress: (bytesUploaded, bytesTotal) => {
      console.log(`上传进度: ${(bytesUploaded / bytesTotal * 100).toFixed(2)}%`)
    },
    onSuccess: () => {
      console.log('上传成功! 文件 URL:', upload.url)
    },
    onError: (error) => {
      console.error('上传失败:', error)
    }
  })

  upload.start()
}
*/

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