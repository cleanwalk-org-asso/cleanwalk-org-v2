<script setup lang="ts">
import mapIcon from '@/components/icons/IconMap.vue';
import addIcon from '@/components/icons/IconAdd.vue';
import newspaperIcon from '@/components/icons/IconNewspaper.vue';
import accountIcon from '@/components/icons/IconAccount.vue';

defineProps({
    selectedMenu: String
});

</script>

<template>
    <div class="bottom-bar">
        <div class="icon-container">
            <img class="wave-icon" src="../assets/img/greyWave.svg"/>
        </div>
        
        <nav class="nav">
            <router-link class="link center" :class="selectedMenu == 'home' ? 'selected' : null" 
                        to="/">
                <mapIcon class="icon"/>
            </router-link>
            <router-link class="link center" :class="selectedMenu == 'create' ? 'selected' : null" 
                        to="/mobile/create-cleanwalk">
                <addIcon  class="icon"/>
            </router-link>
            <router-link class="link center" :class="selectedMenu == 'blog' ? 'selected' : null" 
                        to="/">
                <newspaperIcon class="icon-stroke"/>
            </router-link>
            <router-link class="link center" :class="selectedMenu == 'account' ? 'selected' : null" 
                        to="/">
                <accountIcon class="icon" />
            </router-link>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
  @import '../assets/main.scss';

    .bottom-bar {
        position: fixed;
        z-index: 200;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .icon-container {
        display: flex;
        justify-content: center;
        background-color: blue;
    }
    
    .wave-icon {
        width: 1000px;
        height: 30px;
        object-fit: cover;
        overflow: hidden;
        position: fixed;
        bottom: 3.8rem;
    }

    .nav {
        width: 100%;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: stretch;
        background-color: $surfaceVariant;

    .link {
        width: 100%;
        height: 100%;
        padding: 0px;
        .icon {
            width: 2.5rem;
            height: 2.5rem;
            fill: $onSurfaceVariant;
        }

        .icon-stroke {
            width: 2.5rem;
            height: 2.5rem;
            stroke: $onSurfaceVariant;
            fill: transparent;
        }
    }

    .selected{
        .icon {
            fill: $background;
        }

        .icon-stroke {
            stroke: $background;
        }
    }

}



</style>