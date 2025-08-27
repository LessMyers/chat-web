<template>
  <div class="page">
    <header class="header">
      <Head></Head>
    </header>
    <main class="content">
      <Message></Message>
    </main>
    <footer class="footer">
      <Send></Send>
    </footer>
  </div>
</template>


<script setup>
//import { ref } from 'vue'
//import { showSuccessToast, showFailToast } from "vant";

import Head from "@/components/Head.vue";
import Message from "@/components/Message.vue";
import Send from "@/components/Send.vue";
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