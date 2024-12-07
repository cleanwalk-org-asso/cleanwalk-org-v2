<script setup lang="ts">
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
    <div class="solo-cw">
        <img :src="cleanwalk.img_url ?? defaultCover" alt="cleanwalk">
        <div class="container">
            
            <div class="content">
                <div class="title">{{ cleanwalk.name }}</div>
                <div class="date">
                    <icon-clock />
                    <div>{{ dateService.getCleanwalkWrittenDate(new Date(cleanwalk.date_begin), cleanwalk.duration) }}
                    </div>
                </div>
                <div>
                    <iconMiniMap />
                    <div>{{ cleanwalk.address }}</div>
                </div>
                <p>
                    {{ cleanwalk.description }}
                </p>
            </div>
            <div class="author">
                {{ cleanwalk.host!.name }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.solo-cw {
    position: fixed;
    transform: translateY(calc(50% + 2.75rem));
    background-color: #fff;
    z-index: 10000;
    bottom: 50%;
    left: 1rem;
    height: calc(100% - 9rem);
    border-radius: 8px;
    width: 30rem;
    overflow: hidden;
    stroke: #65707F;
    color: #65707F;
    font-size: 1.125rem;

    img {
        width: 100%;
        aspect-ratio: 21/9;
        object-fit: cover;
    }

    .container {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(100% - 205px); // 205px = static height of the banner
    }

    
    .content {
        
        .title {
            padding-bottom: 1.5rem;
            color: #373646;
            font-size: 1.5625rem;
            font-weight: 700;
        }
        div {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        p {
            padding-top: 2.2rem;
        }
    }

}
</style>