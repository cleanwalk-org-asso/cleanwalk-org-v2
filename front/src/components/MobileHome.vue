<script setup lang="ts">
import {ref} from 'vue';
import type {Ref} from 'vue';
import type {Cleanwalk} from '@/interfaces/cleanwalkInterface';
import mobileMap from '@/components/MobileMap.vue';
import MobileSearchBarVue from '@/components/MobileSearchBar.vue';
import GlobalCleanwalkCard from './GlobalCleanwalkCard.vue';
import databaseHelper from '@/helpers/databaseHelper';

const searching = ref(false);
const selectedCleanwalk: Ref<Cleanwalk|undefined> = ref();

const searchedCleanwalks: Ref<Array<Cleanwalk>|undefined> = ref();

databaseHelper.getAllCleanwalks().then(result => {
    searchedCleanwalks.value = result;
})

function selectedCleanwlk(index:number) {
    if(searchedCleanwalks != undefined){
        selectedCleanwalk.value = searchedCleanwalks.value![index];
    }
}

const search = (text: string) => {

}

</script>

<template>
    <div class="body">
        <mobileMap :coordinates="searchedCleanwalks?.map(c => [c.pos_lat, c.pos_long])"
            @selected="selectedCleanwlk"></mobileMap>
        <Transition name="fade">
            <div v-if="searching" class="dark-background"></div>
        </Transition>
        <div class="search-bar">
            <MobileSearchBarVue @focusChange="(value) => searching = value" @update:searchText="search"></MobileSearchBarVue>
        </div>

        <transition name="fade">
            <section v-if="searching" class="search-result-section">
                <div class="cleanwalks-result">
                    <GlobalCleanwalkCard v-for="(cleanwalk, index) in searchedCleanwalks" :key="index" :cleanwalk="cleanwalk"></GlobalCleanwalkCard>
                </div>
            </section>
        </transition>

        <transition name="slide-up">
            <div class="selected-cleanwalk" v-if="selectedCleanwalk != null && !searching">
                <div class="selected-cleanwalk-card">
                    <GlobalCleanwalkCard :cleanwalk="selectedCleanwalk" showDescription></GlobalCleanwalkCard>
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss">

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.2s ease-out;
}

.slide-up-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(10rem);
  opacity: 0;
}

.leaflet-control-container {
  display: none;
  visibility: collapse;
}

.body {
    margin-top: 4rem;
    margin-bottom: 5rem;
    height: 90%;
    overflow: hidden; 
}
 
.search-bar {
    position: relative;
    z-index: 20;
    top: 2rem;
}

.dark-background {
    position: absolute;
    height: 90%;
    width: 100%;
    z-index: 12;
    background-color: rgba($color: #000000, $alpha: 0.6);
}

.search-result-section {
    position: relative;
    top: 1.5rem;
    height: 82%;
    width: 100%;
    z-index: 20;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cleanwalks-result {
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 0.8rem;
    overflow-y: scroll;
}

.selected-cleanwalk {
    position: absolute;
    z-index: 20;
    bottom: 6rem;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.selected-cleanwalk-card {
    width: 95%;
}

</style>