<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

let quillOptions = {
    placeholder: 'Ecrire votre article ici...',
}
</script>

<template>
    <div id="ql-editor">
        <QuillEditor theme="snow" toolbar="full" :options="quillOptions"/>
    </div>
</template>

<style scoped lang="scss">
    #ql-editor {
        position: absolute;
        top: 3.5rem;
        
        // Avoid text zone to grow when typing
        height: calc(100vh - 3.5rem);
        width: 100%;
    }
</style>
