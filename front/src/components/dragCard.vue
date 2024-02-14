<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';

const cleanwalkStore = useCleanwalkStore()

const draggableCard = ref<HTMLElement | null>(null);

onMounted(() => {
  console.log(cleanwalkStore.cleanwalkIsSelect.valueOf())
  const card = draggableCard.value;
  if (!card) return;

  let startY = 0;
  let initialBottom = -20;
  const maxHeight = 70 // Limite de hauteur en px

  const onTouchStart = (e: TouchEvent) => {
    startY = e.touches[0].clientY;
    initialBottom = parseInt(window.getComputedStyle(card).bottom, 10);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
  };

  const onTouchMove = (e: TouchEvent) => {
    e.preventDefault(); // Prévenir le scroll de la page
    const diffY = startY - e.touches[0].clientY;
    let newBottom = initialBottom + diffY;
    if (newBottom > maxHeight) newBottom = maxHeight; // Appliquer la limite de hauteur
    if (newBottom < 0) newBottom = -20; // Empêcher la card de descendre sous le niveau initial
    card.style.bottom = `${newBottom}px`;
  };

  const onTouchEnd = () => {
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  };

  card.addEventListener('touchstart', onTouchStart);
});
</script>

<template>
  <main>
    <div ref="draggableCard" class="draggable-card">
      <div class="card-handle">
        <svg width="43" height="3" viewBox="0 0 43 3" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="43" height="3" rx="1.5" fill="#373646" />
        </svg>
      </div>
      <div class="card-content" v-if="cleanwalkStore.cleanwalkIsSelect">
        <h3>Je nettoie la Nature</h3>
        <div>Date et heure de l’évènement</div>
        <div>Localité, France</div>
      </div>
      <div class="card-content" v-else>
        <h3>Contenu alternatif</h3>
        <div>Autre information pertinente ici.</div>
        <div>fqfbqifbqsfb</div>
      </div>
    </div>
  </main>
</template>
  
<style scoped lang="scss">
.draggable-card {
  position: fixed;
  bottom: -10px;
  left: 0;
  width: 100%;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  z-index: 998;
  transition: bottom 0.3s ease;
  touch-action: none;

  /* Pour améliorer les performances des événements touch */
  .card-handle {
    width: 100%;
    height: 20px;
    border-radius: 10px 10px 0 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    .card-content {
      padding: 20px;
    }
  }
}
</style>

