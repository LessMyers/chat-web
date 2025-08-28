<template>
  <div class="page">
    <header class="header">
      <Head></Head>
    </header>
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

import Head from "@/components/Head.vue";
import Message from "@/components/Message.vue";
import Send from "@/components/Send.vue";

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
  //playSendSound();
  showSuccessToast("发送消息");
  playReceiveSound();
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