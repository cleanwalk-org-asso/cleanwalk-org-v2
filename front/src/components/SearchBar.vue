<script setup lang="ts">
import { ref, type Ref} from 'vue';
import iconInfo from './icons/icon-info.vue';
import iconLeftArrow from './icons/icon-left-arrow.vue';
import iconSearch from './icons/icon-search.vue';
import { tr } from 'date-fns/locale';

const inputActive = ref(true);
const searchInput = ref('');
</script>


<template>
    <div class="top-bar">
            <img src="../assets/logo.svg" alt="logo" v-if="!inputActive">
            <div class="search-bar" :class="{ 'active': inputActive, 'base': !inputActive }">
                <button @click="inputActive = false">
                    <iconLeftArrow />
                </button>
                <input @click="inputActive = true" name="search" type="text" placeholder="Rechercher une cleanwalk" v-model="searchInput" />
                <label for="search" @click="inputActive = true">
                    <iconSearch />
                </label>
            </div>
            <button class="info">
                <iconInfo />
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
        padding: 20px 19px 20px;
        justify-content: end;

        img {
            position: absolute;
            left: 31px;
            width: 104px;
            margin-top: 10px;
        }

        .info {
            background-color: #fff;
            border-radius: 8px;
            border: 1px solid #CBD5E1;
            width: 38px;
            height: 38px;
            margin-left: 8px;

            svg {
                stroke: #94A3B8;
            }

        }

        .search-bar {
            &.base {

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
                    padding: 0 10px;
                }

                background-color: #fff;
                border-radius: 8px;
                border: 1px solid #CBD5E1;
                width: 38px;
                height: 38px;
                display: flex;
                align-items: center;
                justify-content: center;

                svg {
                    stroke: #94A3B8;
                    width: 24px;
                    height: 24px;
                    margin: 5px 1px 0 0;
                }

            }

            &.active {

                flex-grow: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: white;
                border-radius: 8px;
                border: 1px solid #CBD5E1;
                stroke: #CBD5E1;

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

                svg {
                    width: 20px;
                    height: 20px;
                    stroke: #94A3B8;
                }

            }
        }
    }
</style>