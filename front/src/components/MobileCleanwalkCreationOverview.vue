<script setup lang="ts">
import { useCleanwalkCreationStore } from '@/stores/CleanwalkCreationStore';
import CleanwalkCard from '@/components/GlobalCleanwalkCard.vue';

const CleanwalkCreationStore = useCleanwalkCreationStore();

</script>

<template>
    <div class="container">
        <CleanwalkCard :cleanwalk="{
                id: -1,
                name: CleanwalkCreationStore.cleanwalkName,
                description: CleanwalkCreationStore.cleanwalkDescription,
                date_begin: CleanwalkCreationStore.cleanWalkDate!,
                duration: CleanwalkCreationStore.getDuration,
                pos_lat: CleanwalkCreationStore.position![0],
                pos_long: CleanwalkCreationStore.position![1],
            }"
            colored-background
            show-description
        >
        </CleanwalkCard>

        <div class="tip-container">
            <p class="tip">
                Vérifier les informations à communiquer.
                Vous pouvez revenir en arrière pour les modifier en cas de besoin.
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../assets/main.scss';
    .container {
        width: 90%;
        height: 100%;
        margin: 1rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

</style>@/stores/CleanwalkStore