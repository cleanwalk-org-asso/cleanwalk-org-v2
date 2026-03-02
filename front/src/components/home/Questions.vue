<template>
    <div class="flex flex-col items-center">
        <div class="questions-section p-8 max-w-5xl">
            <h4 class="font-black text-2xl text-center">
                Questions fréquentes
            </h4>
            <div class="accordions-container pt-8">
                <Accordion 
                    v-for="(faq, index) in faqs"
                    :key="index"
                    :title="faq.title"
                    :description="faq.description"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Accordion from '../Accordion.vue'

interface FAQ {
    title: string
    description: string
}

const faqs: FAQ[] = [
    {
        title: 'Qu\'est-ce qu\'une cleanwalk ?',
        description: 'Une cleanwalk est un événement au cours duquel des personnes se  réunissent pour ramasser des déchets dans un lieu public. Cette action  permet d’avoir un impact concret sur l’environnement et de sensibiliser à la problématique des déchets sauvages.  Il est important de respecter certaines règles de sécurité lors des  cleanwalks. Il faut notamment suivre le code de la route, porter des  gants et ne pas ramasser des déchets suspects (objets coupants, produits chimiques ou seringues par exemple).'
    },
    {
        title: 'Combien de temps dure une cleanwalk ?',
        description: ''
    },
    {
        title: 'Qui peut organiser une cleanwalk ?',
        description: ''
    },
    {
        title: ' Pourquoi est-il important de ramasser les déchets ?',
        description: ''
    }
]
</script>

<style scoped>
.questions-section {
    width: 100%;
}

.accordions-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>