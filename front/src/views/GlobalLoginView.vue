<script setup lang="ts">
import IconLogoCleanwalk from '@/components/icons/IconLogoCleanwalk.vue';
import LoginForm from '@/components/GlobalLoginForm.vue';
</script>

<template>
    <main class="view-layout">
        <section class="image-background banner">
          <div class="center">
            <img class="logo" src="../assets/img/logoCleanwalk.svg" alt="">
          </div>
        </section>

        <div class="center">
            <LoginForm />
        </div>
    </main>
</template>

<style lang='scss' scoped>
  @import '../assets/main.scss';

  .logo {
    width: 80%;
  }

  .view-layout {
    height: 100%;
    width: 100%;
    background-color: $background;

    display: flex;
  }

  .banner {
    width: 50%;
    height: 100%;
    min-width: 10rem;
    padding: 1rem;
  }

  .image-background {
    background: linear-gradient(to right bottom ,#13277881, rgba(0, 0, 0, 0)), url('../assets/img/Inox.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size:  cover;
  }

  @media screen and (max-width: 640px){
  .view-layout {
    display: block;
  }

  .banner {
    width: 100%;
    height: 7rem;
    padding: 1rem;
  }

  .center {
    overflow: visible;
  }
}

</style>