<script setup lang="ts">
import iconRightArrow from '@/components/icons/icon-right-arrow.vue';
</script>

<template>
    <section class="container">
        <div class="profil">
            <img class="img" src="https://cdn2.thecatapi.com/images/tv8tNeYaU.jpg" alt="">
            <h3>Mon Profil</h3>
            <iconRightArrow />
        </div>
    </section>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    padding: 100px 1.6rem 1.6rem 1.6rem;
    color: #94A3B8;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;

    .profil {
        stroke: #94A3B8;
        border: 1px solid #CBD5E1;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 1rem;
        border-radius: 8px;

        .img {
            width: 44px;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 9999px;
        }
    }

    h3 {
        margin: 0 1rem;
        flex-grow: 1;
    }
}
</style>