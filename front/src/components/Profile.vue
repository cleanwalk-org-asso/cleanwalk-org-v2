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
    <file-pond
            name="test"
            ref="pond"
            class-name="my-pond"
            label-idle="Drop files here..."
            allow-multiple="false"
        />
</template>
<style scoped lang="scss">

</style>