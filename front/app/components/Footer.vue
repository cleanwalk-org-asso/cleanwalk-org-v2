<template>
  <footer class="flex flex-col bg-footer p-12 text-footer-content">
    <div class="flex justify-between gap-6">
      <div>
        <img src="~/assets/logo.svg" alt="logo cleanwalk.org" class="w-48.5 pb-4">
        <p>La plateforme qui centralise les actions <br> citoyennes de ramassage des déchets</p>
      </div>
      <div class="flex gap-12">
        <div>
          <div class="pb-2 font-bold">Nos réseaux sociaux</div>
          <SocialLinks class="mt-4" icon-class="size-6" />
        </div>

        <div>
          <div class="pb-2.5 font-bold">Nous contacter</div>
          <a href="mailto:contact@cleanwalk.org">contact@cleanwalk.org</a>
        </div>
      </div>
      <div class="flex">
        <div>
          <div class="font-bold">Ressources</div>
          <div class="w-48">
            <NuxtLink to="/notre-histoire">Histoire de Cleanwalk.org</NuxtLink> <br>
            <NuxtLink to="/cleanwalk-guide">Guide de la Cleanwalk</NuxtLink>
          </div>
        </div>
        <div>
          <div class="font-bold">Menu</div>
          <div class="w-38">
            <NuxtLink to="/cleanwalks">Carte des ramassages</NuxtLink><br>
            <a href="https://www.helloasso.com/associations/cleanwalk-org">l'association</a>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-2 h-px bg-footer-content/20" />
    <div class="flex items-center justify-between pt-5 text-xs text-footer-content/80">
      <div class="flex gap-4">
        <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
        <NuxtLink to="/conditions-generales-utilisation">Conditions générales d'utilisation</NuxtLink>
      </div>
      <div class="flex gap-6">
        <span>Cleanwalk.org 2025 - Association de loi 1901</span>
        <span>Développé par nos bénévoles.</span>
        <span>
          Cartographie :
          <a href="https://maplibre.org" target="_blank" rel="noopener noreferrer">MapLibre</a>
          &amp;
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>
        </span>
      </div>
    </div>
  </footer>
</template>
