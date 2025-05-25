<script setup lang="ts">
import { ref } from 'vue'
// import iconInfo from './icons/icon-info.vue'
// import iconLeftArrow from './icons/icon-left-arrow.vue'
// import iconSearch from './icons/icon-search.vue'

import { Info, ChevronLeft, Search } from 'lucide-vue-next'
import { useAccountStore } from '@/stores/AccountStore'

const props = defineProps({
  searchInput: String,
})

const emit = defineEmits(['updateSearch'])

const accountStore = useAccountStore()
const userImg = ref(accountStore.CurrentUser?.profile_picture)
const inputActive = ref(false)

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement; // Cast explicite de target en HTMLInputElement
  emit('updateSearch', target.value); // Émet l'événement avec la nouvelle valeur
}

const backButton = () => {
  inputActive.value = false
  emit('updateSearch', '')}
</script>

<template>
    <div class="top-bar">
        <img class="logo" src="../assets/logo.svg" alt="logo" v-if="!inputActive" />
        <div class="search-bar" :class="{ active: inputActive, base: !inputActive }">
            <button @click="backButton()">
                <ChevronLeft color="#94A3B8" />
            </button>
            <input
                @click="inputActive = true"
                name="search"
                type="text"
                placeholder="Rechercher une cleanwalk"
                :value="searchInput"
                @input="handleInput"
                autocomplete="off"
            />
            <label for="search" @click="inputActive = true">
                <Search :size="20" color="#94a3b8" />
            </label>
        </div>
        <RouterLink to="/menu/profile" class="pp" v-if="userImg">
            <img :src="userImg" alt="user img" />
        </RouterLink>
        <button class="info" v-else>
            <Info color="#94a3b8" />
        </button>
    </div>
</template>


<style scoped lang="scss">
.top-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 9998;
    background-color: var(--color-primary);
    display: flex;
    padding: 10px 19px 10px;
    justify-content: end;
    
    .logo {
        position: absolute;
        left: 31px;
        width: 104px;
        margin-top: 10px;
    }

    .pp {
        border-radius: 999px;
        width: 38px;
        height: 38px;
        margin-left: 8px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }
    .info {
        background-color: #fff;
        border-radius: 8px;
        border: 1px solid #cbd5e1;
        width: 38px;
        height: 38px;
        margin-left: 8px;
    }
    .search-bar {
        &.base {
            background-color: #fff;
            border-radius: 8px;
            border: 1px solid #cbd5e1;
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;

            input {
                opacity: 0;
                position: absolute;
                width: 44px;
                height: 44px;
            }
            button {
                display: none;
            }

            label {
                display: flex;
            }
        }
        &.active {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            border-radius: 8px;
            border: 1px solid #cbd5e1;
            stroke: #cbd5e1;

            button {
                padding: 0px 5px 0px 10px;
                background: none;
            }

            input {
                width: 100%;
                border: none;
                outline: none;
                font-size: 14px;
                font-weight: 500;
                color: #373646;
                background-color: white;
                padding: 10px 0;
            }

            label {
                padding-top: 8px;
                padding-right: 10px;
            }

        }
    }
}
</style>
