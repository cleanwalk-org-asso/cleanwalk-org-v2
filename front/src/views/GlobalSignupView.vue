<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogoCleanwalk.vue';
import SignupForm from '@/components/GlobalSignupForm.vue';
</script>

<template>
    <main class="view-layout">
        <section class="primary-background banner">
          <div class="center">
            <img class="logo" src="../assets/img/logoCleanwalk.svg" alt="">
          </div>
        </section>

        <div class="center">
            <SignupForm />
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
