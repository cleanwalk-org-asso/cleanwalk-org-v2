<script setup lang="ts">
import { useCleanwalkChat } from '@/composables/useCleanwalkChat';


const props = defineProps<{
    cleanwalkId: string;
    username: string;
}>();

const { messages, newMessage, sendMessage } = useCleanwalkChat(
    props.cleanwalkId,
    props.username
);


</script>

<template>
    <div>
        <h3>Chat de la Cleanwalk {{ cleanwalkId }}</h3>

        <div class="messages">
            <div v-for="(msg, index) in messages" :key="index">
                <strong>{{ msg.user }}:</strong> {{ msg.text }}
            </div>
        </div>

        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Écris ton message..." />
        <button @click="sendMessage">Envoyer</button>
    </div>
</template>

<style scoped lang="scss">
.messages {
    height: 300px;
    overflow-y: auto;
    background: #f8f8f8;
    padding: 1rem;
    margin-bottom: 1rem;
}
</style>