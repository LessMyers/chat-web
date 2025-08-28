<template>
    <div style="background-color:#f7f8fa; padding-top: 6px; padding-bottom: 6px;">
        <template v-for="msg in messages">
            <van-row v-if="msg.type == Type.Text">
                <van-col span="2" class="side">
                    <van-icon v-if="u_id == msg.receiver" name="like" size="25" color="#1989fa" />
                </van-col>
                <van-col span="20" v-if="u_id == msg.sender" class="is-self">
                    <div class="text" style="background-color: #90ee90;" v-html="text_time(msg.text, msg.utc)">
                    </div>
                </van-col>
                <van-col span="20" v-else>
                    <div class="name">
                        {{ get_name(msg.sender) }}</div>
                    <br />
                    <div class="text" v-html="text_time(msg.text, msg.utc)">
                    </div>
                </van-col>
                <van-col span="2" class="side">
                    <van-icon v-if="u_id == msg.sender" name="star" size="25" color="#ee0a24" />
                </van-col>
            </van-row>
            <van-row v-else-if="msg.type == Type.Audio">
            </van-row>
            <van-row v-else-if="msg.type == Type.Video">
            </van-row>
            <van-row v-else-if="msg.type == Type.Image">
            </van-row>
            <br />
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import moment from "moment";

const u_id = ref(1);
const messages = ref([
    {
        sender: 1, receiver: 2, type: 1, url: "", text: "你好这两种语法等效吗qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq?这两种语法等效吗?这两种语法等效吗?这两种语法等效吗?这两种语法等效吗??", utc: 1756306120, group: 0
    },
    { sender: 2, receiver: 1, type: 1, url: "", text: "你好", utc: 1756306220, group: 0 },
    { sender: 2, receiver: 1, type: 1, url: "", text: "你好", utc: 1756306220, group: 0 },
    { sender: 1, receiver: 2, type: 1, url: "", text: "你好", utc: 1756306320, group: 0 },
    { sender: 2, receiver: 1, type: 1, url: "", text: "你好", utc: 1756306420, group: 0 },
    { sender: 1, receiver: 2, type: 1, url: "", text: "你好", utc: 1756306920, group: 0 },
    { sender: 1, receiver: 2, type: 1, url: "", text: "你好", utc: 1756306920, group: 0 },
    { sender: 1, receiver: 2, type: 1, url: "", text: "你好", utc: 1756306920, group: 0 }, { sender: 1, receiver: 2, type: 1, url: "", text: "你好", utc: 1756306920, group: 0 },
]);

const Type = {
    Text: 1,
    Audio: 2,
    Video: 3,
    Image: 4,
};

function text_time(text, utc) {
    return `${text}<span class="time"> ${moment(utc * 1000).format("HH:mm")}<span>`;
}

function get_name(id) {
    if (id == 1) {
        return "张三";
    } else {
        return "李四";
    }

}
</script>

<style>
.is-self {
    text-align: right;
}

.time {
    font-size: 12px;
    color: #969799;
    display: inline-block;
    margin-left: 6px;
    transform: translateY(6px);
}

.name {
    color: #323233;
    font-size: 10px;
    line-height: 10px;
    padding: 8px;
    display: inline-block;
}

.text {
    white-space: pre-line;
    word-break: break-all;
    background-color: white;
    padding: 8px;
    border-radius: 4px;
    display: inline-block;
}

.side {
    text-align: center;
    padding-top: 5px;
}
</style>