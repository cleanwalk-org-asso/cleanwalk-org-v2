import { ref, onMounted, onUnmounted } from 'vue';

export function useDevice() {
  // Référence réactive pour indiquer si l'appareil est mobile
  const isMobile = ref(window.innerWidth < 1024);

  // Fonction pour mettre à jour l'état selon la taille de l'écran
  const updateDeviceType = () => {
    isMobile.value = window.innerWidth < 1024;
  };

  // Écoute des changements de taille d'écran
  onMounted(() => {
    window.addEventListener('resize', updateDeviceType);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateDeviceType);
  });

  return { isMobile };
}
