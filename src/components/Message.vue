<template>
    <div style="background-color:#f7f8fa">
        <van-row v-for="msg in messages">
            <van-col span="2">{{ msg.receiver }}</van-col>
            <van-col span="20">{{ msg.text }}</van-col>
            <van-col span="2">{{ msg.sender }}</van-col>
        </van-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const u_id = ref(1);
const messages = ref([
    { sender: 1, receiver: 2, type: 1, url: "", text: "你好", utc: 1756306120, group: 0 },
    { sender: 2, receiver: 1, type: 1, url: "", text: "你好", utc: 1756306220, group: 0 },
    { sender: 1, receiver: 2, type: 1, url: "", text: "你好", utc: 1756306320, group: 0 },
    { sender: 2, receiver: 1, type: 1, url: "", text: "你好", utc: 1756306420, group: 0 },
    { sender: 1, receiver: 2, type: 1, url: "", text: "你好", utc: 1756306920, group: 0 },
]);

</script>