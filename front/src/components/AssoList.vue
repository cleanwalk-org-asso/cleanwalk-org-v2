<script setup lang="ts">
import { ref, type Ref } from 'vue';

interface TODO {
  title: string;
  description: string;
  imageUrl: string;
  coverImageUrl: string;
}

const assoList: Ref<TODO[]> = ref([
  {
    title: "Association 1",
    description: "Description de l'association 1",
    imageUrl: "https://cdn2.thecatapi.com/images/4f3.jpg",
    coverImageUrl: "https://cdn2.thecatapi.com/images/700.jpg"
  },
  {
    title: "Association 2",
    description: "Description de l'association 2",
    imageUrl: "https://cdn2.thecatapi.com/images/4f3.jpg",
    coverImageUrl: "https://cdn2.thecatapi.com/images/700.jpg"
  },
  {
    title: "Association 3",
    description: "Description de l'association 3",
    imageUrl: "https://cdn2.thecatapi.com/images/4f3.jpg",
    coverImageUrl: "https://cdn2.thecatapi.com/images/700.jpg"
  },
  {
    title: "Association 4",
    description: "Description de l'association 4",
    imageUrl: "https://cdn2.thecatapi.com/images/4f3.jpg",
    coverImageUrl: "https://cdn2.thecatapi.com/images/700.jpg"
  },
  {
    title: "Association 5",
    description: "Description de l'association 5",
    imageUrl: "https://cdn2.thecatapi.com/images/4f3.jpg",
    coverImageUrl: "https://cdn2.thecatapi.com/images/700.jpg"
  },
  {
    title: "Association 6",
    description: "Description de l'association 6",
    imageUrl: "https://cdn2.thecatapi.com/images/4f3.jpg",
    coverImageUrl: "https://cdn2.thecatapi.com/images/700.jpg"
  },
  {
    title: "Association 7",
    description: "Description de l'association 7",
    imageUrl: "https://cdn2.thecatapi.com/images/4f3.jpg",
    coverImageUrl: "https://cdn2.thecatapi.com/images/700.jpg"
  },
  {
    title: "Association 8",
    description: "Description de l'association 8",
    imageUrl: "https://cdn2.thecatapi.com/images/4f3.jpg",
    coverImageUrl: "https://cdn2.thecatapi.com/images/700.jpg"
  },
  {
    title: "Association 9",
    description: "Description de l'association 9",
    imageUrl: "https://cdn2.thecatapi.com/images/4f3.jpg",
    coverImageUrl: "https://cdn2.thecatapi.com/images/700.jpg"
  },
  {
    title: "Association 10",
    description: "Description de l'association 10",
    imageUrl: "https://cdn2.thecatapi.com/images/4f3.jpg",
    coverImageUrl: "https://cdn2.thecatapi.com/images/700.jpg"
  },
  {
    title: "Association 11",
    description: "Description de l'association 11",
    imageUrl: "https://cdn2.thecatapi.com/images/4f3.jpg",
    coverImageUrl: "https://cdn2.thecatapi.com/images/700.jpg"
  },
  {
    title: "Association 12",
    description: "Description de l'association 12",
    imageUrl: "https://cdn2.thecatapi.com/images/4f3.jpg",
    coverImageUrl: "https://cdn2.thecatapi.com/images/700.jpg"
  }

]);

</script>


<template>
  <section class="container">
    <div v-for="asso in assoList" :key="asso.title" class="asso-card">
      <img :src="asso.coverImageUrl" alt="cover-img" class="cover">
      <img :src="asso.imageUrl" alt="asso-img" class="img">
      <h3>{{ asso.title }}</h3>
    </div>
  </section>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100vw;
  justify-content: center;
  padding: 150px 0 90px;

  .asso-card {
    width: 171px; // Inclut les marges et les bordures dans la largeur de la carte
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #CBD5E1;

    .cover {
      width: 100%;
      object-fit: cover;
      aspect-ratio: 9/3;
    }

    .img {
      width: 100%;
      object-fit: cover;
      aspect-ratio: 1/1;
      border-radius: 9999px;
      width: 55px;
      position: relative;
      margin-top: -30px;
      margin-left: 58px;
      border: 2px solid #fff;
    }

      h3 {
        font-size: 12px;
        font-weight: 700;
        color: #373646;
        text-align: center;
        margin: 5px 0 10px 0;
      }
    
  }
}
</style>