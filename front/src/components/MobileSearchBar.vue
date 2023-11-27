<script lang="ts" setup>
import { ref } from 'vue'
import IconGlass from './icons/IconGlass.vue';
import IconBackArrow from './icons/IconBackArrow.vue';

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Rechercher par nom, ville, organisateurs'
    },
})

const searchText = ref('');
const focused = ref(false);

const getFocus = () => {
    emit('focusChange', true);
    focused.value = true;
}

const looseFocus = () => {
    emit('focusChange', false);
    focused.value = false;
}

const emit = defineEmits([
  'update:searchText',
  'focusChange',
])

</script>

<template>
    <div class="search-input-container">
        <span v-if="focused" class="back-btn"  @click="looseFocus">
                <IconBackArrow class="back-icon"></IconBackArrow>
        </span>
        <input
          type="text"
          v-model="searchText"
          :placeholder="placeholder"
          @input="emit('update:searchText', searchText)"
          @focusin="getFocus"
          class="search-field"
          :class="{'focused': focused}"> 
          <span class="seach-btn">
            <IconGlass class="search-icon"></IconGlass>
          </span>
    </div>


</template>

<style lang="scss" scoped>
@import '../assets/main.scss';

.search-input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
}
.search-field {
    margin: 0;
    width: 90%;
    display: block;
    background-color: $background;
    color: $onBackground;
    height: 3rem;
    border-radius: 3rem;
    border: 3px solid $onBackground-20;


    padding: 0 1rem;
    font-size: 0.9rem;

    &:hover {
        border-color: $primary-40;
    }

    &:focus {
        border: 3px solid $primary;
        outline: none;
    }

    &::placeholder {
        color: $onBackground;
        opacity: 0.4;
    }
}

.focused {
    padding-left: 2.5rem;
}

.back-btn {
    background-color: transparent;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    display: inline-block;
    position: relative;
    left: 0.7rem;
    width: 0px;
    height: 1.6rem;
    
    .back-icon {
        fill: $onBackground-20;
        rotate: -90;
        width: 1.6rem;
        height: 1.6rem;
        cursor: pointer;
    }
}

.seach-btn {
    background-color: transparent;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    display: inline-block;
    position: relative;
    right: 2.6rem;
    width: 0px;
    height: 1.6rem;

    .search-icon {
        fill: $onBackground-20;
        width: 1.6rem;
        height: 1.6rem;
    }
}
</style>

