<template>
    <section class="section">
        <img src="../assets/coquelicots.webp" alt="todo" class="img">
        <slot></slot>
    </section>
</template>


<style lang="scss" scoped>
    .section {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .img {
        display: none;
    }

    @media (min-width: 1024px) {

        .img {
            display: block;
            height: 100vh;
            width: 50vw;
            object-fit: cover;
        }
    }
    
</style>