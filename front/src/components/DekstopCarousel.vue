<script setup lang="ts">
  import IconCarouselRightArrow from "@/components/icons/IconCarouselRightArrow.vue";
  import IconCarouselLeftArrow from "@/components/icons/IconCarouselLeftArrow.vue";
  import type {Article} from "@/interfaces/articleInterface";

  import {onMounted, ref} from 'vue'

  (() => {
    setInterval(() =>{
      if(new Date().getTime() - lastClick.value.getTime() >= 5000){
        move(1);
      }
    }, 5000)
  })();

  const switchCircles = () => {
    let circles =  Array.from(document.getElementsByClassName('circle') as HTMLCollectionOf<HTMLElement>)
    for(let i = 0; i < circles.length; i++){
      if(index.value == i){
        circles[i].style.backgroundColor = "#132778";
      }
      else {
        circles[i].style.backgroundColor = "#CCC";
      }
    }
  }

  const move = (dir: number) => {
    index.value = (index.value + dir + articles.length) % articles.length;
    lastClick.value = new Date();
    switchCircles();
  };

  const articles: Article[] = [
    {
      title: "Titre !",
      content: "Ceci est un article",
    },
    {
      title: "Titre 2!",
      content: "Ceci n'est pas un article",
    },
    {
      title: "Titre 3!",
      content: "Ceci n'est pas un article",
    },
    {
      title: "Titre 4!",
      content: "Ceci n'est pas un article",
    },
    {
      title: "Titre 5!",
      content: "Ceci n'est pas un article",
    },
  ];
  const index = ref(Math.ceil(articles.length / 2)- 1);
  const lastClick = ref(new Date());
  const decalage = articles.length%2 == 0? 24.25: 0;
  onMounted(switchCircles);
</script>

<template>
  <div class="container">
    <IconCarouselLeftArrow class="leftArrow" @click="move(-1)"></IconCarouselLeftArrow>
    <IconCarouselRightArrow class="rightArrow" @click="move(1)"></IconCarouselRightArrow>
    <div class="carousel">
      <div class="background-article"
           v-for="(article, idx) in articles"
           :key="idx"
           :style="{ transform: `translateX(calc(${-48.5 * index + 97 - decalage}rem))` }">
        <img class="imgSizing" src="../assets/img/mainArticle.png">
        <div class="flexArticle">
          <p class="cleanInterview title">{{ article.title }}</p>
          <p class="fontDate title">vendredi 14 août 2020</p>
          <p class="main-textDNA title">{{ article.content }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="circles">
    <div v-for="i in articles.length" class="circle" :key="i"></div>
  </div>
</template>

<style lang="scss" scoped >
  .container{
    overflow: hidden;
    display: flex;
    justify-content: center;
  }

  .carousel{
    display: flex;
    flex-wrap: nowrap;
    gap: 2.5rem;
  }

  .leftArrow{
    z-index: 10;
    fill: #CCC;
    cursor: pointer;
    position: absolute;
    margin-top: 300px;
    margin-right: 80%;
  }:hover{
      fill: #132778;
    }
  .rightArrow{
    z-index: 10;
    fill: #CCC;
    cursor: pointer;
    position: absolute;
    margin-top: 300px;
    margin-left: 80%;
  }:hover{
     fill: #132778;
   }

  .background-article {

    width: 46rem;
    height: 46.875rem;
    border-radius: 4.375rem;
    border: 3px solid #CCC;
    background: #FFF;
    margin: 1rem auto;
    cursor: pointer;
    transition: transform 0.5s;
    user-select: none;

  }
  .flexArticle {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 1rem;
  }


  .cleanInterview {

    font-weight: 700;
    font-size: 1.125rem;
    color: #373646;
    padding-left: 3rem;
    padding-top: 3.50rem;
  }

  .fontDate {

    font-weight: 300;
    font-size: 0.75rem;
    padding-left: 3rem;
  }

  .imgSizing {

    width: 100%;
    object-fit: contain;

  }
  .main-textDNA {

    font-size: 0.875rem;
    font-weight: 400;
    padding: 3rem;
  }

  .circles{
    display: flex;
    justify-content: center;
    gap: 0.25rem;
    margin-top: 1rem;
  }

  .circle{
    height: 0.75rem;
    width: 0.75rem;
    border-radius: 50%;
    background-color: #CCC;
  }
</style>