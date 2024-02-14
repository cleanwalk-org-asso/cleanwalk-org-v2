<template>
    <main>
      <div ref="draggableCard" class="draggable-card">
        <div class="card-handle">
          <!-- Élément visuel indiquant que l'utilisateur peut glisser la card -->
        </div>
        <div class="card-content">
          <p>Contenu de la card...</p>
        </div>
      </div>
    </main>
  </template>
  
  <style scoped>
.draggable-card {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  z-index: 1000;
  transition: bottom 0.3s ease;
  touch-action: none; /* Pour améliorer les performances des événements touch */
}

.card-handle {
  width: 100%;
  height: 20px;
  background-color: #ccc;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
}

.card-content {
  padding: 20px;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const draggableCard = ref<HTMLElement | null>(null);

onMounted(() => {
  const card = draggableCard.value;
  if (!card) return;

  let startY = 0;
  let initialBottom = 0;
  const maxHeight = window.innerHeight / 2; // Limite de hauteur à 50% de la hauteur de l'écran

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
    if (newBottom < 0) newBottom = 0; // Empêcher la card de descendre sous le niveau initial
    card.style.bottom = `${newBottom}px`;
  };

  const onTouchEnd = () => {
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  };

  card.addEventListener('touchstart', onTouchStart);
});
</script>
