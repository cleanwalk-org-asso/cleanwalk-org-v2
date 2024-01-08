<script lang="ts" setup>
import {ref, watch} from 'vue';
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface';
import dateHelper from '@/helpers/dateHelper';
import nominatimHelper from '@/helpers/NominatimHelper';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import { onMounted } from '@vue/runtime-core';
const cleanwalkStore = useCleanwalkStore();

onMounted(() => {
    cleanwalkStore.getAllCleanwalks();
});


const location = ref('');


</script>

<template>
    <!-- <article class="card" :class="{'primaryContainer-Background': coloredBackground }">
        <div class="main-information">
            <div>
                <p class="cleanwalk-name">{{cleanwalk.name}}</p>
                <p class="cleanwalk-information cleanwalk-date">{{dateHelper.getCleanwalkWrittenDate(new Date(cleanwalk.date_begin), cleanwalk.duration)}}</p>
                <p class="cleanwalk-information">{{ location }}</p>
            </div>
            <div class="user-information">
                <div class="user-picture">

                </div>
                <p class="cleanwalk-information">Username</p>
            </div>
        </div>

        <p v-if="showDescription" class="cleanwalk-description">{{cleanwalk.description}}</p>
        <button v-if="moreButton" class="primary-button more-button" @click="$emit('moreButtonAction')">En savoir plus</button>
    </article> -->
</template>

<style lang="scss" scoped>
    @import '../assets/main.scss';

    .card {
        border-radius: 0.32rem;
        padding: 1rem;
        width: 100%;
        background-color: $background;
        color: $onBackground;
    }

    .primaryContainer-Background {
        background-color: $primaryContainer;
        color: $onPrimaryContainer;
    }

    .main-information {
        display: flex;
        flex-direction: row;
        align-items: start;
        justify-content: space-between;
        gap: 0.8rem;

        .user-information {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            max-width: 10rem;
        }
    }

    .cleanwalk-name {
        font-size: 1.1rem;
        font-weight: 500;
    }

    .cleanwalk-information {
        font-size: 0.9rem;
        font-weight: 500;
    }

    .cleanwalk-date {
        margin: 0.35rem 0;
    }

    .user-picture {
        background-image: url('../assets/img/userDefaultPicture.png');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 50%;
        width: 4.4rem;
        height: 4.4rem;
    }

    .cleanwalk-description {
        font-size: 0.9rem;
        font-weight: 400;
        margin-top: 1rem;
    }

    .more-button {
        width: 8rem;
        height: 2.25rem;
        margin: 1rem 0 0 0;
    }

</style>
