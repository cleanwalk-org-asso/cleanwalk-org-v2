<script lang="ts" setup>
import { ref } from 'vue'
import IconEyeClose from './icons/IconEyeClose.vue';
import IconEyeOpen from './icons/IconEyeOpen.vue';;

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Mot de passe'
    },
    error: {
        type: Boolean,
        default: false
    },
})

const password = ref('');
const showPassword = ref(false)

const emit = defineEmits([
  'update:password',
])

</script>

<template>
    <div class="password-input-container">
        <input
          :type="showPassword ? 'text' : 'password'"
          required
          v-model="password"
          :placeholder="placeholder"
          @input="emit('update:password', password)"
          class="text-field password-field"
          :class="{'text-field-error': error}">
          <span class="show-password-btn" @click="showPassword = !showPassword">
            <IconEyeOpen v-if="!showPassword" class="eye-icon"></IconEyeOpen>
            <IconEyeClose v-if="showPassword" class="eye-icon"></IconEyeClose>
          </span>
    </div>


</template>

<style lang="scss" scoped>
@import '../assets/main.scss';

.password-input-container {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 0.4rem;
}
.password-field {
    margin: 0;
}

.show-password-btn {
    background-color: transparent;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    display: inline-block;
    position: relative;
    right: 3rem;
    width: 0px;
    height: 1.8rem;

    .eye-icon {
        fill: $onBackground-20;
        width: 1.8rem;
        height: 1.8rem;
        cursor: pointer;
    }
}
</style>

