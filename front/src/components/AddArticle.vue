<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

let quillOptions = {
    bounds: '#article-editor',
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

function publishArticle() {
    // @ts-ignore: Property 'checked' does not exist on type 'HTMLElement'. ts-plugin(2339) => False positive
    if (document.getElementById('article-is-draft')?.checked) {
        alert('Article enregistré en tant que brouillon');

        window.location.href = '/';

        return;
    }

    // @ts-ignore: Property 'checked' does not exist on type 'HTMLElement'. ts-plugin(2339) => False positive
    if (!document.getElementById('article-content-is-correct')?.checked) {
        alert('Veuillez vérifier l\'article avant de le publier');

        return;
    };

    alert('Article publié');

    window.location.href = '/';

    return;
}
</script>

<template>
    <div id="add-article-component">
        <div id="article-editor">
            <QuillEditor :options="quillOptions"/>
        </div>

        <div id="article-params-list">
            <div class="param-checkbox">
                <input type="checkbox" id="article-is-draft" name="article-is-draft">

                <label for="article-is-draft">
                    Brouillon (l'article ne sera pas publié)
                </label>
            </div>
            
            <div class="param-checkbox">
                <input type="checkbox" id="article-content-is-correct" name="article-content-is-correct">

                <label for="article-content-is-correct">
                    Je certifie que le contenu de l'article est correct
                </label>
            </div>
        </div>

        <button id="article-pub-button" @click="publishArticle">Publier</button>
    </div>
</template>

<style scoped lang="scss">
    #add-article-component {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        margin-bottom: 8rem;
        position: relative;
        top: 3.5rem;
    }

    #article-pub-button {
        height: 3.5rem;
        width: 15rem;
        background-color: #4CAF50;
        color: white;
        font-size: 1.5rem;
        border: 1px solid #4CAF50;
        border-radius: 1rem;
    }
</style>
