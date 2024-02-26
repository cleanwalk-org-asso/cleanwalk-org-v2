<script setup lang="ts">
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface'
import iconClock from './icons/icon-clock.vue';
import iconMiniMap from './icons/icon-mini-map.vue';
import iconLeftArrow from './icons/icon-left-arrow.vue';
import iconInfo from './icons/icon-info.vue';

const currentCleanwalk = {
  id: 1,
  title: 'Cleanwalk 2',
  addess: 'Rue de la paix',
  isAsso: false,
  organizer: "Qui nettoie si ce n’est Toi "
}

</script>

<template>
  <div class="top-bar">
    <router-link class="back" to="/">
      <iconLeftArrow />
    </router-link>
    <img src="../assets/logo.svg" alt="logo">
    <button class="info">
      <iconInfo />
    </button>
  </div>
  <main>
    <div>
      <img class="cover" src="../assets/desert.png" alt="" />
    </div>
    <div class="container">
      <h1>{{ currentCleanwalk.title }}</h1>
      <div class="date-location">
        <div class="top">
          <icon-clock />
          <div>Date et heure de l’évènement</div>
        </div>
        <div class="bot">
          <iconMiniMap />
          <div>Localité, France</div>
        </div>
      </div>
      <div class="orga">
        <div class="left">
          <div>organisé par:</div>
          <h2> {{ currentCleanwalk.organizer }} </h2>
        </div>
        <div class="right">
          <img src="../assets/defaultprofile.png" alt="profile-picture">
        </div>

      </div>
      <button class="button-primary">
        Je participe
      </button>
      <p>
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus vestibulum interdum. Phasellus libero
        nibh, tincidunt sed massa dictum, feugiat interdum mi. Pellentesque finibus cursus quam ut efficitur. Integer
        lobortis tortor velit, at suscipit justo scelerisque et. Integer lobortis tortor velit, at suscipit justo
        scelerisque et. Integer lobortis tortor velit, at suscipit justo
      </p>
    </div>

  </main>
</template>

<style scoped lang="scss">
@import '@/assets/base.scss';


main {
  overflow: scroll;
}

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

  img {
    width: 104px;
    margin-top: 10px;
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

.cover {
  width: 100vw;
  object-fit: cover;
  aspect-ratio: 21/9;
}

.container {
  padding: 0 26px;
  font-size: 12px;

  h1 {
    color: var(--text-color-primary);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding: 20px 0 30px;
  }

  .date-location {
    display: flex;
    stroke: var(--text-color-primary);
    flex-direction: column;
    padding-bottom: 20px;
    font-size: 12px;

    .top {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .bot {
      margin-top: 5px;
      display: flex;
      align-items: center;
      gap: 10px;

    }
  }

  .orga {
    display: flex;
    background-color: var(--color-secondary);
    justify-content: space-between;
    border-radius: 8px;
    padding: 11px 20px 4px 14px;
    margin-bottom: 20px;

    .left {
      display: flex;
      flex-direction: column;

      h2 {
        font-size: 15px;
        font-style: normal;
        font-weight: 700;
      }
    }

    .right {
      img {
        width: 44px;
        height: 44px;
        object-fit: cover;
      }
    }

  }

  .button-primary {
    padding: 15px 0;
    width: 100%;
    text-align: center;
  }

  p {
    padding-top: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }

}</style>
