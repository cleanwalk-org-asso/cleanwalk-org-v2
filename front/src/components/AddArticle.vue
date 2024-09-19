<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

let quillOptions = {
    bounds: '#ql-editor',
    formats: [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ],
    modules: {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
            {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
        ]
    },
    placeholder: 'Ecrire votre article ici...',
    theme: 'snow',
}
</script>

<template>
    <div id="article-creation">
        <div id="ql-editor">
            <QuillEditor :options="quillOptions"/>
        </div>

        <button id="pub-button">Publier</button>
    </div>
</template>

<style scoped lang="scss">
    #article-creation {
        display: grid;
        position: absolute;
        top: 5rem;
        left: 5%;
        height: 90%;
        width: 90%;
    }

    #ql-editor {
        height: 27.5rem;
        margin-bottom: 2rem;
    }

    #pub-button {
        height: 3.5rem;
        width: 50%;
        margin: 0 auto;
        background-color: #4CAF50;
        color: white;
        font-size: 1.5rem;
        border: none;
    }
</style>
