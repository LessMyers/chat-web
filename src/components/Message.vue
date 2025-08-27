<template>
    <div style="max-height: 90vh; background-color:aqua; overflow-y: auto;">
        <ul>
            <li v-for="(item, index) in items" :key="index">
                <br />
                {{ item }}
                <br />
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref(['苹果1', '香蕉2', '橙子3', '苹果', '香蕉', '橙子', '苹果', '香蕉', '橙子', '苹果', '香蕉', '橙子', '苹果', '香蕉', '橙子', '苹果', '香蕉', '橙子']);
</script>