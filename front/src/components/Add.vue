<script setup lang="ts">
import iconAdd from './icons/icon-add.vue';
</script>

<template>
    <section class="container">
        <h1>Que souhaitez vous ajouter ?</h1>
        <router-link class="add" to="add-cleanwalk">
            <icon-add />
            <div>Ajouter une cleanwalk</div>
        </router-link>
        <router-link class="add" to="add-article">
            <icon-add />
            <div>Ajouter un article</div>
        </router-link>
    </section>
</template>

<style scoped lang="scss">
.container {
    padding-top: 78px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 78px 2rem 0;
    color: #333;

    h1 {
        margin-top: 2rem;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
    }

    .add {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        stroke: #373646;
        background-color: var(--color-secondary);
        border-radius: 8px;
        width: 100%;
        height: 165px;
        margin-top: 2rem;

        svg {
            width: 68px;
            height: 68px;
        }

        div {
            text-align: center;
            font-size: 20px;
            font-weight: 700;
        }

    }
}
</style>