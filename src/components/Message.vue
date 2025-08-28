<template>
    <div style="background-color:#f7f8fa; padding-top: 6px; padding-bottom: 6px;">
        <div v-if="date" class="date">
            {{ date }}
        </div>
        <template v-for="msg in messages">
            <van-row class="item" :data-utc="msg.utc">
                <van-col span="2" class="side">
                    <van-icon v-if="u_id == msg.receiver" name="like" size="25" color="#1989fa" />
                </van-col>

                <van-col span="20" v-if="u_id == msg.sender" class="is-self">
                    <div class="text" style="background-color: #90ee90;" v-html="text_time(msg)">
                    </div>
                </van-col>
                <van-col span="20" v-else>
                    <div class="name">
                        {{ get_name(msg.sender) }}</div>
                    <br />
                    <div class="text" v-html="text_time(msg)">
                    </div>
                </van-col>

                <van-col span="2" class="side">
                    <van-icon v-if="u_id == msg.sender" name="star" size="25" color="#ee0a24" />
                </van-col>
            </van-row>
            <br />
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import moment from "moment";


const u_id = ref(1);
const messages = ref([
    {
        sender: 1, receiver: 2, type: 1, url: "", text: "你好这两种语法等效吗qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq?这两种语法等效吗?这两种语法等效吗?这两种语法等效吗?这两种语法等效吗??", utc: 1756306120, group: 0
    },
    { sender: 2, receiver: 1, type: 1, url: "", text: "你好这两种语法等效吗qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq?这两种语法等效吗?这两种语法等效吗?这两种语法等效吗?这两种语法等效吗??", utc: 1756306220, group: 0 },
    { sender: 2, receiver: 1, type: 1, url: "", text: "你好", utc: 1756306220, group: 0 },
    { sender: 1, receiver: 2, type: 1, url: "", text: "你好", utc: 1756306320, group: 0 },
    { sender: 2, receiver: 1, type: 1, url: "", text: "你好", utc: 1756306420, group: 0 },
    { sender: 1, receiver: 2, type: 1, url: "", text: "你好", utc: 1756306920, group: 0 },
    { sender: 1, receiver: 2, type: 1, url: "", text: "你好", utc: 1756306920, group: 0 },
    { sender: 1, receiver: 2, type: 1, url: "", text: "你好", utc: 1756306920, group: 0 },
    { sender: 1, receiver: 2, type: 1, url: "", text: "你好", utc: 1756306920, group: 0 },
    { sender: 1, receiver: 2, type: 1, url: "", text: "你好111111111111111", utc: 1756306920, group: 0 },
    { sender: 1, receiver: 2, type: 1, url: "", text: "你好222222222222222", utc: 1756306920, group: 0 },
    { sender: 1, receiver: 2, type: 4, url: "/vite.svg", text: "", utc: 1756307920, group: 0 },
    { sender: 2, receiver: 1, type: 4, url: "/vite.svg", text: "", utc: 1756307920, group: 0 },
    { sender: 1, receiver: 2, type: 2, url: "/di-8.mp3", text: "", utc: 1756308920, group: 0 },
    { sender: 2, receiver: 1, type: 2, url: "/di-8.mp3", text: "", utc: 1756309920, group: 0 },
    { sender: 1, receiver: 2, type: 3, url: "https://www.w3schools.com/html/mov_bbb.mp4", text: "", utc: 1756302920, group: 0 },
    { sender: 2, receiver: 1, type: 3, url: "https://www.w3schools.com/html/mov_bbb.mp4", text: "", utc: 1756303920, group: 0 },

]);

const Type = {
    Text: 1,
    Audio: 2,
    Video: 3,
    Image: 4,
};

function text_time(msg) {
    if (msg.type == Type.Text) {
        return `${msg.text}<span class="time"> ${moment(msg.utc * 1000).format("HH:mm")}<span>`;
    } else if (msg.type == Type.Audio) {
        return `<audio src="${msg.url}" controls class="audio"></audio><span class="time"> ${moment(msg.utc * 1000).format("HH:mm")}<span>`;
    } else if (msg.type == Type.Video) {
        return `<video src="${msg.url}" controls class="audio"></video><span class="time">${moment(msg.utc * 1000).format("HH:mm")}<span>`;
    } else if (msg.type == Type.Image) {
        return `<img src="${msg.url}" class="image"></img><span class="time"> ${moment(msg.utc * 1000).format("HH:mm")}<span>`;
    }
}


function get_name(id) {
    if (id == 1) {
        return "张三";
    } else {
        return "李四";
    }

}

const date = ref("");

let show_time = null;
onMounted(async () => {
    const container = document.getElementById('content');
    container.addEventListener('scroll', () => {
        const scrollTop = container.scrollTop;
        const items = container.querySelectorAll('.item');
        for (let item of items) {
            if (item.offsetTop >= scrollTop) {
                if (item.dataset.utc) {
                    date.value = moment(item.dataset.utc * 1000).format("MM-DD");
                    clearTimeout(show_time);
                    show_time = setTimeout(() => {
                        date.value = "";
                    }, 3000);
                }
                break;
            }
        }
    });
});

</script>

<style>
.date {
    border-radius: 5px;
    width: 50px;
    opacity: 0.5;
    position: absolute;
    text-align: center;
    color: white;
    background-color: #969799;
    left: 50%;
    transform: translateX(-50%);
}

.is-self {
    text-align: right;
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
    text-align: left;
    background-color: white;
    padding: 8px;
    border-radius: 4px;
    display: inline-block;
}

.time {
    font-size: 12px;
    color: #969799;
    display: inline-block;
    text-align: center;
    float: right;
    width: 40px;
    transform: translateY(16px) translateX(4px);
}

.image {
    max-width: 90vw;
}

.side {
    text-align: center;
    padding-top: 5px;
}

.audio {
    max-width: 75vw;
}
</style>