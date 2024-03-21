<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import VueFilePond from 'vue-filepond';
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
const FilePond = VueFilePond();
const backgroundImageUrl = ref('https://cdn2.thecatapi.com/images/1nk.jpg');

onMounted(() => {
    console.log('mounted');
});

</script>
<template>
    <img src="../" alt="">

</template>
<style scoped lang="scss">

</style>