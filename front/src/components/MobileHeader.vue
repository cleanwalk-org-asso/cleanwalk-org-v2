<script setup lang="ts">

</script>

<template>
    <header class="primary-background center header">
        <img class="logo" src="../assets/img/logoCleanwalk.svg"/>
    </header>
</template>

<style lang="scss" scoped>
@import '../assets/main.scss';

.header {
    position: fixed;
    top: 0;
    height: 4rem;
    overflow: hidden;
    z-index: 200;
    box-shadow: 0 2px rgba($color: $primary, $alpha: 0.2);
}

.logo {
    object-fit: contain;
    height: 2.4rem;
}
</style>