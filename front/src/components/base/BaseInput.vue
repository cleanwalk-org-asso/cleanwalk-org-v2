<script setup lang="ts">

// Utilisation de defineModel pour permettre la liaison bidirectionnelle avec v-model
const model = defineModel<string>();

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  }
});
</script>

<template>
  <div class="input-wrapper">
    <label v-if="label" :for="name" class="label">{{ label }}</label>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      v-model="model"
      :id="name"
      class="input"
    />    
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;

  .label {
    font-size: 12px;
    font-weight: 500;
    position: relative;
    margin-bottom: -18px;
    width: fit-content;
    margin-left: 13px;
    margin-top: 5px;
    color: #94A3B8;
    position: relative;
    z-index: 1;

    &::before { // line under the label for hide the input border
      content: '';
      background-color: #fff;
      width: 110%;
      height: 1px;
      position: absolute;
      bottom: 9px;
      left: -5%;
      z-index: -1;
    }
  }

  .input {
    border: 1px solid #94A3B8;
    border-radius: 8px;
    padding: 12px;
    margin-top: 0.5rem;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;

    &::placeholder {
      color: #94A3B8;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
