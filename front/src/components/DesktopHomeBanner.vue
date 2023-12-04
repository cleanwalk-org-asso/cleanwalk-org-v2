<script setup lang="ts">
import IconPoint from './icons/IconPoint.vue';
import IconArrow from './icons/IconArrow.vue';
import IconVague from './icons/IconVague.vue';
function scrollTo(divId: string) {
  const maDiv = document.getElementById(divId);
  if (maDiv) {
    maDiv.scrollIntoView({ behavior: 'smooth' });
  }
}

</script>

<template>
  <div class="primary-background background-adjustment">
    <h1 class="title fontBanner">La plateforme qui centralise<br>les ramassages citoyens de déchets</h1>
    <div class="row gap padding-top padding-left">
      <h2 class="title fontNumber marginElements1">1800</h2>
      <p class="fontHeaderbanner marginElements2">cleanwalks orgnisés</p>
      <IconPoint class="marginElements3"></IconPoint>
      <h2 class="title fontNumber marginElements4">40000</h2>
      <p class="fontHeaderbanner marginElements5">citoyens mobilisés</p>
    </div>
    <nav class="nav">
      <button @click="scrollTo('section1')" class="centerButton">
        <IconArrow class="arrow"></IconArrow>
      </button>
    </nav>
    <div class="div-vawe">
      <img draggable="false" src="../assets/img/wave.svg">
    </div>
  </div>
</template>



<style lang="scss" scoped >
.div-vawe {
  fill: #72BDA3;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  display: flex;
  position: relative;
  top: 31.45px;

  img {
    object-fit: fill;
    max-height: 51px;
  }
}


//need refacto scss 

.fontBanner {
  font-size: 2.7rem;
  font-style: normal;
  text-align: center;
  margin: 0 auto;
  padding-top: 7rem;
  text-shadow: rgba($color: #000000, $alpha: 0.25) 0.2rem 0.2rem 5px;
}

.marginElements1:nth-child(1),
.marginElements2:nth-child(2) {
  margin-right: 1rem;
}

.marginElements2:nth-child(2) {

  margin-right: 3rem;
}

.marginElements3:nth-child(3) {
  margin-right: 3rem;
}

.marginElements4:nth-child(4),
.marginElements5:nth-child(5) {
  margin-right: 1rem;
}

.padding-top {

  padding-top: 2.5rem;
}

.padding-left {

  padding-left: 3px;
}


.arrow {

  width: 2.6rem;
  height: 1.25rem;
  margin-right: 1.5rem;
  margin-top: 5rem;
  margin-bottom: 2rem;

}

.centerButton {

  background-color: transparent;
  border: none;
  cursor: pointer;

}

.nav {

  display: flex;
  align-items: center;
  justify-content: center;
}


.fontHeaderbanner {

  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.44375rem;

}

.background-adjustment {

  padding-top: 9rem;
}
</style>
