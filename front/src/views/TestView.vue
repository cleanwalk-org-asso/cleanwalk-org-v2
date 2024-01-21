<script setup lang="ts">
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import { onMounted } from 'vue';

const cleanwalkStore = useCleanwalkStore();

onMounted(async () => {
    await cleanwalkStore.getAllCleanwalks();

    if (cleanwalkStore.cleanwalks) {
        console.log(cleanwalkStore.cleanwalks);
    } else {
        console.error("cleanwalks is not defined yet");
    }
});
</script>

<template>
    <div>
        <p v-if="cleanwalkStore.cleanwalks">
            Cleanwalks:
            <ul>
                <li v-for="cleanwalk in cleanwalkStore.cleanwalks" :key="cleanwalk.id">
                    {{ cleanwalk.name }}
                </li>
            </ul>
        </p>
        <p v-else>Loading cleanwalks...</p>
    </div>
</template>
