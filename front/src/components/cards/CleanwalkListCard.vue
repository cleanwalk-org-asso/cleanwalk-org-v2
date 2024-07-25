<script setup lang="ts">
import { ref, computed } from 'vue'
import iconMiniMap from '../icons/icon-mini-map.vue';
import iconClock from '../icons/icon-clock.vue';
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface';
import dateHelper from '@/helpers/dateHelper';

//define props
const props = defineProps<{
    cleanwalk: Cleanwalk
}>()


</script>

<template>
    <div class="cleanwalk">
        <div class="title">{{ cleanwalk.name }}</div>
        <div class="flex">
            <icon-clock />
            <div>{{ dateHelper.getCleanwalkWrittenDate(new Date(cleanwalk.date_begin), cleanwalk.duration) }}</div>
        </div>
        <div class="flex">
            <iconMiniMap />
            <div>{{ cleanwalk.address }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cleanwalk {
    border: 2px solid rgb(155, 155, 155);
    border-radius: 12px;
    padding: 10px;
    background-color: white;
    width: 90%;

    .title {
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
    }

    .flex {
        display: flex;
        align-items: center;
        gap: 10px;
    }

}
</style>