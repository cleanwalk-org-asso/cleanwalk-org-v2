<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput.vue';
import { useAccountStore } from '@/stores/AccountStore';
import { useUtilsStore } from '@/stores/UtilsStore';
import { X } from 'lucide-vue-next';
import { ref } from 'vue';

const accountStore = useAccountStore();
const showToast = useUtilsStore().showToast;
const confirmPassword = ref('');

const deleteAccount = async () => {
  if (!confirmPassword.value) {
    showToast('Veuillez confirmer votre mot de passe', false);
    return;
  }

  const success = await accountStore.deleteAccount(confirmPassword.value);
  if (success) {
    confirmPassword.value = '';
  } else {
    showToast('Mot de passe incorrect', false);
  }
};

const onClose = () => {
  confirmPassword.value = '';
  props.togglePopup?.();
};

const props = defineProps({
  isVisible: Boolean,
  togglePopup: Function,
});
</script>

<template>
  <div v-if="isVisible" class="popup" @click="onClose()">
    <div class="popup-content" @click.stop>
      <div class="cross"><X @click="onClose()" /></div>
      <h2>Clôturer son compte</h2>
      <p>Êtes-vous certain de vouloir clôturer votre compte ? Cette action est irréversible et toutes vos données seront définitivement supprimées.</p>
      <BaseInput
        v-model="confirmPassword"
        name="confirm-delete-password"
        type="password"
        label="Confirmez votre mot de passe"
        placeholder="Votre mot de passe actuel"
      />
      <div class="btn-container mt-8!">
        <button @click="onClose()" class="cancel-button">Annuler</button>
        <button @click="deleteAccount()" class="danger-button">Confirmer</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  
  .popup-content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    padding: 1rem;
    margin: 1.5rem;
    position: relative;
    z-index: 1001;
    
    .cross {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 1rem;
      stroke: var(--text-color-primary);
    }
    
    h2 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 1rem;
      text-align: center;
      padding-bottom: 1rem;
      color: #FF5757;
    }
    
    p {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      padding: 0 1rem;
      margin-bottom: 1rem;
    }
  }
  
  .btn-container {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    
    .cancel-button {
      flex: 1;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      padding: 0.75rem;
      background-color: white;
      color: #94A3B8;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: #F8FAFC;
      }
    }
    
    .danger-button {
      flex: 1;
      border: none;
      border-radius: 8px;
      padding: 0.75rem;
      background-color: #FF5757;
      color: white;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: #FF3A3A;
      }
    }
  }
}
</style>