<script setup lang="ts">
import iconLeftArrow from './icons/icon-left-arrow.vue';
import iconInfo from './icons/icon-info.vue';

</script>
<template>
    <div class="top-bar">
        <router-link class="back" to="/">
            <iconLeftArrow />
        </router-link>
        <h2>Ajouter une cleanwalk</h2>
        <button class="info">
            <iconInfo />
        </button>
    </div>
</template>

<style lang="scss" scoped>
.top-bar {
    position: sticky;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 999;
    background-color: var(--color-primary);
    stroke: #fff;
    display: flex;
    padding: 20px;
    flex-direction: center;
    justify-content: space-between;

    .back {
        display: flex;
        flex-direction: column;
        justify-content: end;
        padding-bottom: 5px;

        svg {
            width: 24px;
            height: 24px;
        }
    }

    h2 {
        color: #FFF;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        padding-top: 5px;
    }

    .info {
        background-color: #fff;
        border-radius: 8px;
        border: 1px solid #CBD5E1;
        width: 38px;
        height: 38px;
        stroke: #94A3B8;
    }


}
</style>