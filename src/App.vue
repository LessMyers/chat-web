<template>
  <div>
    <input type="file" @change="handleFile" />
    <button @click="upload">上传</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import * as tus from 'tus-js-client'   // ⭐ 用这种方式

const fileRef = ref(null)
let selectedFile = null

function handleFile(e) {
  selectedFile = e.target.files[0]
}

function upload() {
  if (!selectedFile) return

  const upload = new tus.Upload(selectedFile, {
    endpoint: 'http://localhost:1080/uploads/',
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
    onError: (err) => {
      console.error('上传失败:', err)
    }
  })

  upload.start()
}
</script>
