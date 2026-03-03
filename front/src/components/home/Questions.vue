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
        description: 'La durée d’une cleanwalk est fixée librement par l’organisateur mais le format choisi est souvent celui d’une cleanwalk de 1h30 à 3 heures. A vous de choisir le ramassage en fonction de vos disponibilités. Et si aucune des opérations ne vous convient, n’hésitez pas à organiser'
    },
    {
        title: 'Qui peut organiser une cleanwalk ?',
        description: 'Tout le monde peut organiser une cleanwalk dans sa ville. Il suffit de motiver quelques personnes autour de vous et de vous procurer le matériel nécessaire. Pour plus d’informations, consultez le guide de la cleanwalk , ou contactez-nous à l’adresse contact@cleanwalk.org .'
    },
    {
        title: ' Pourquoi est-il important de ramasser les déchets ?',
        description: 'Certains déchets, comme les déchets organiques (épluchures de fruits et légumes par exemple) se décomposent naturellement. Toutefois, la majorité des déchets que nous générons actuellement mettent des décennies, voire des siècles, à se décomposer. Les jeter par terre entraîne donc la pollution des sols et des océans. La décomposition des déchets plastiques, qu’elle ait lieu dans l’eau ou dans les sols, entraîne la propagation de fibres microplastiques qui sont ensuite ingérées par les organismes vivants (les poissons ou les vers de terre par exemple) et entraînent des perturbations sur tout l’écosystème. Selon une étude publiée dans la revue Limnology and Oceanography Letters, dans l’océan, 1 000 litres d’eau contiennent en moyenne 8,3 millions de morceaux de plastique. D’après le Ministère de la Transition Ecologique et Solidaire, 80% des déchets en mer proviennent du continent : ramasser les déchets à terre, c’est donc éviter qu’ils terminent leur chemin dans les océans.'
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