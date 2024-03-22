<script setup lang="ts">
const props = defineProps({
    categorie1: String,
    categorie2: String,
    activeCategory: Boolean,
});
</script>

<template>
    <div class="container">
        <router-link class="router-link" :to="'/' + categorie1" :class="{ active: activeCategory === true }">
            {{ categorie1 }}
        </router-link>
        <router-link class="router-link" :to="'/' + categorie2" :class="{ active: activeCategory === false }">
            {{ categorie2 }}
        </router-link>
    </div>
</template>

<style scoped lang="scss">

.container {
    position: fixed;
    width: 100%;
    left: 0;
    top: 78px;
    display: flex;
    box-shadow: 0px 10px 100px rgba(194, 194, 194, 0.2);

    .router-link {
        color: var(--color-primary);
        font-size: 14px;
        font-weight: 500;
        width: 50%;
        text-align: center;
        padding: 13px 0 12px 0;
        background-color: #fff;

        &::first-letter {
            text-transform: uppercase;
        }

    }

    .active {
        background-color: #E1F4F8;
        border-bottom: 2px solid var(--color-primary);

    }
}
</style>