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
  placeholder: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 4,
  },
  resizable: {
    type: Boolean,
    default: false,
  }
});
</script>

<template>
  <div class="textarea-wrapper">
    <label v-if="label" :for="name" class="label">{{ label }}</label>
    <textarea
      :name="name"
      :placeholder="placeholder"
      v-model="model"
      :id="name"
      :rows="rows"
      class="textarea"
      :style="{ resize: resizable ? 'vertical' : 'none' }"
    ></textarea>    
  </div>
</template>

<style scoped lang="scss">
.textarea-wrapper {
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

  .textarea {
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
