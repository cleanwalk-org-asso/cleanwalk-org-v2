<script setup lang="ts">
import { useCleanwalkChat } from '@/composables/useCleanwalkChat';
import { computed } from 'vue';
import router from '@/router';
import { useAccountStore } from '@/stores/AccountStore';


const props = defineProps<{
    cleanwalkId: string;
    username: string;
}>();

const accountStore = useAccountStore();
const isAuthenticated = computed(() => !!accountStore.CurrentUser?.id);

const goToLogin = () => {
    router.push({
        name: 'login',
        query: { redirect: router.currentRoute.value.fullPath }
    });
};

const { messages, newMessage, sendMessage } = useCleanwalkChat(
    props.cleanwalkId,
    props.username
);


</script>

<template>
    <div class="w-full max-w-2xl mx-auto">
        <div class="px-4 py-3 border-b border-slate-200">
        </div>

        <div class="h-72 flex flex-col overflow-y-auto px-4 gap-2 py-4">
            <div
                v-for="(msg, index) in messages"
                :key="index"
                class="flex flex-col gap-1 rounded-lg bg-slate-50 border border-slate-200 px-3 py-2"
            >
                <div class="text-xs font-semibold text-slate-600">
                    {{ msg.user }}
                </div>
                <div class="text-sm text-slate-900 leading-relaxed break-all">
                    {{ msg.text }}
                </div>
            </div>
        </div>

        <div v-if="isAuthenticated" class="px-4 py-3 border-t border-slate-200 flex gap-3">
            <input
                v-model="newMessage"
                @keyup.enter="sendMessage"
                placeholder="Écris ton message..."
                class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <button
                @click="sendMessage"
                class="rounded-lg bg-primary text-white px-4! py-2! text-sm font-semibold hover:opacity-90 transition"
            >
                Envoyer
            </button>
        </div>

        <div v-else class="px-4 py-3 border-t border-slate-200">
            <button
                @click="goToLogin"
                class="w-full rounded-lg bg-primary text-white px-4! py-2! text-sm font-semibold hover:opacity-90 transition"
            >
                Connectez-vous pour envoyer un message
            </button>
        </div>
    </div>
</template>
