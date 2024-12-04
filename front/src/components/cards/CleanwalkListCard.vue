<script setup lang="ts">
import { ref, computed } from 'vue'
import iconMiniMap from '../icons/icon-mini-map.vue';
import iconClock from '../icons/icon-clock.vue';
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface';
import dateService from '@/services/dateService';

//define props
const props = defineProps<{
    cleanwalk: Cleanwalk
}>()

const defaultCover = '/src/assets/default_cover.webp'


</script>

<template>
    <div class="cleanwalk">
        <div class="left">
            <div class="title">{{ cleanwalk.name }}</div>
            <div class="flex">
                <icon-clock />
                <div>{{ dateService.getCleanwalkWrittenDate(new Date(cleanwalk.date_begin), cleanwalk.duration) }}</div>
            </div>
            <div class="flex">
                <iconMiniMap />
                <div>{{ cleanwalk.address }}</div>
            </div>
        </div>
        <img :src="cleanwalk.img_url ?? defaultCover" alt="cleanwalk">
    </div>
</template>

<style lang="scss" scoped>
.cleanwalk {
    border: 1px solid #65707F;
    border-radius: 12px;
    padding: 10px;
    background-color: #fff;
    width: 100%;
    stroke: #65707F;
    color: #65707F;
    display: flex;
    justify-content: space-between;

    .title {
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        color: #373646;
    }

    .flex {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    img {
        width: 136px;
        height: 136px;
        border-radius: 12px;
        margin-left: 10px;
        object-fit: cover;
    }

}

</style>