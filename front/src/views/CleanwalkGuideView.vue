<script setup lang="ts">
const defaultCover = new URL('../assets/default_cover.webp', import.meta.url).href

const preparation = [
  { text: 'Fixez une date + un horaire' },
  { text: "Repérez et/ou déterminez un lieu de départ et/ou un lieu d'arrivée" },
  { text: 'Définissez plusieurs parcours afin de pouvoir y diriger plusieurs groupes (selon le nombre de participant·e·s au final)' },
  { text: "Déclarez l'action à la collectivité pour obtenir leur accord. Ils pourront également vous soutenir de différentes manières :" },
]

const preparationSub = [
  'communication',
  'prêt de matériel',
  'aide logistique pour assurer la collecte des déchets',
]

const materiel = [
  'Des gants avec des tailles adaptées',
  'Des gilets fluorescents',
  'Des sacs de tri sélectifs (déchets ménagers, déchets recyclables plastique, aluminium et carton, et déchets en verre) ou des sacs en toile de jute',
  'Des sceaux pour les mégots',
  'Un pèse-déchets',
  'Des pinces ou, si besoin, des épuisettes',
]

const obtenir = [
  'Prévoir soi-même le matériel nécessaire',
  'Demander un prêt à la collectivité ou une autre association',
  "Demander à chacun d'en apporter",
]

const communication = [
  { icon: '✏️', label: "Un titre / une phrase d'accroche" },
  { icon: '📅', label: "La date de l'évènement" },
  { icon: '🕐', label: 'L\'heure de rendez-vous' },
  { icon: '📍', label: 'Le lieu de rendez-vous' },
  { icon: '📋', label: 'Le programme / le déroulé' },
  { icon: '🌐', label: "Le contexte de l'évènement" },
  { icon: '👤', label: 'Le(s) nom(s) du/des organisateur(s)' },
  { icon: '📞', label: 'Un contact (mail ou téléphone)' },
]

const canaux = [
  'Vos réseaux sociaux (ex : créez un évènement Facebook et partagez-le dans des groupes)',
  'La presse locale',
  "La mairie (panneaux d'affichages), les commerces",
  'Votre entourage',
  'Votre lieu de travail',
  'etc...',
]

const accueil = [
  { icon: '⏰', text: "D'être sur le site entre 30 minutes et 1 heure avant que les premier·ère·s participant·e·s arrivent pour repérer les lieux, et installer votre matériel" },
  { icon: '😊', text: "D'avoir le sourire et de dégager une belle énergie" },
  { icon: '🙏', text: 'De remercier chacune des personnes pour sa présence' },
]

const briefing = [
  'Vous présenter',
  'Présenter les personnes qui sont avec vous',
  'Présenter votre organisme',
  "Expliquer le déroulé de l'évènement",
  'Donner l\'heure de rendez-vous final',
  "Expliquer l'intérêt du ramassage de déchets et votre objectif en les accueillant",
  'Donner quelques chiffres concernant la pollution représentée par les déchets',
  'Donner quelques consignes de sécurité',
  'Former les équipes et désigner un "référent d\'équipe"',
  'Présenter puis distribuer le matériel mis à disposition de chaque équipe',
]

const ramassage = [
  {
    title: "🚶 Option 1 — Vous joindre à un groupe et participer au ramassage",
    desc: "Si vous choisissez cette option, nous vous conseillons de vous rendre de nouveau au point de départ ou d'arrivée au minimum 15 minutes avant l'heure de rendez-vous donné pour :",
    subItems: [
      "Préparer le pot de l'amitié",
      'Accueillir les équipes de retour du ramassage',
      'Les inviter à retirer puis peser leurs déchets',
    ],
  },
  {
    title: '🏠 Option 2 — Rester sur place',
    desc: "Si vous choisissez de rester, cela vous donnera le temps de ranger le matériel et préparer le pot de l'amitié, afin que tout soit prêt et que vous puissiez sereinement accueillir les participant·e·s.",
    subItems: null,
  },
]

const conclusion = [
  'Remerciements et félicitations',
  'Un bilan de ce qui a été ramassé',
  "Souligner l'importance d'une action collective",
  "Encourager la poursuite de l'engagement",
  "Remercier les partenaires (s'il y en a)",
]

const dernierEffort = [
  "Récupérer, rassembler et ranger l'ensemble du matériel",
  'Déposer/jeter les sacs poubelles et le verre dans les bons conteneurs',
  "Mettre les masques et les mégots de côté si leur devenir a été prévu à l'avance",
  "Laver l'ensemble du matériel sans trop tarder",
]
</script>

<template>
  <div class="min-h-screen bg-white font-sans flex flex-col items-center w-full">

    <!-- Hero -->
    <section
      class="text-white pb-24 pt-8 px-8 flex flex-col items-center relative overflow-hidden w-full bg-cover bg-center"
      :style="{ backgroundImage: `linear-gradient(rgba(19, 39, 120, 0.78), rgba(19, 39, 120, 0.78)), url(${defaultCover})` }"
    >
      <div class="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <h1 class="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-center">
          Comment organiser<br>une <span class="text-[#72BDA3]">Cleanwalk</span>&nbsp;?
        </h1>
        <p class="text-white/70 text-lg mb-10! max-w-xl text-center leading-relaxed">
          Un guide complet pour organiser votre ramassage de déchets en 3 étapes simples.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <a
            href="https://drive.google.com/file/d/1Iv56ES7hGadMDWfro09GwiJnTYelkO8S/view?usp=sharing"
            target="_blank"
            class="inline-flex items-center gap-2 bg-[#72BDA3] hover:bg-[#5aa98e] text-white font-semibold px-7 py-3.5 rounded-full transition-colors duration-200 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            Télécharger le guide PDF
          </a>
          <a
            href="#avant"
            class="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-7 py-3.5 rounded-full transition-colors duration-200 text-sm"
          >
            Lire le guide
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Sommaire -->
    <section class="py-16 px-8">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="#avant" class="group flex flex-col gap-4 p-7 border-2 border-[#132778]/10 hover:border-[#132778] rounded-2xl transition-all duration-200 cursor-pointer">
            <div class="w-11 h-11 rounded-xl bg-[#132778] flex items-center justify-center text-white font-bold text-lg">1</div>
            <div>
              <div class="font-bold text-[#132778] text-lg group-hover:underline">L'Avant</div>
              <div class="text-sm text-gray-500 mt-1.5">Préparation · Matériel · Communication</div>
            </div>
          </a>
          <a href="#pendant" class="group flex flex-col gap-4 p-7 border-2 border-[#132778]/10 hover:border-[#132778] rounded-2xl transition-all duration-200 cursor-pointer">
            <div class="w-11 h-11 rounded-xl bg-[#132778] flex items-center justify-center text-white font-bold text-lg">2</div>
            <div>
              <div class="font-bold text-[#132778] text-lg group-hover:underline">Le Pendant</div>
              <div class="text-sm text-gray-500 mt-1.5">Accueil · Briefing · Ramassage</div>
            </div>
          </a>
          <a href="#apres" class="group flex flex-col gap-4 p-7 border-2 border-[#132778]/10 hover:border-[#132778] rounded-2xl transition-all duration-200 cursor-pointer">
            <div class="w-11 h-11 rounded-xl bg-[#132778] flex items-center justify-center text-white font-bold text-lg">3</div>
            <div>
              <div class="font-bold text-[#132778] text-lg group-hover:underline">L'Après</div>
              <div class="text-sm text-gray-500 mt-1.5">Conclusion · Convivialité · Rangement</div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- AVANT -->
    <section id="avant" class="py-16 px-8 border-t border-gray-100 w-full flex flex-col items-center">
      <div class="max-w-4xl mx-auto">

        <div class="flex items-center gap-5 mb-14">
          <div class="flex-shrink-0 bg-[#132778] text-white font-black text-2xl px-7 py-3.5 rounded-2xl tracking-tight">L'AVANT</div>
          <div class="h-px flex-1 bg-[#132778]/15"></div>
        </div>

        <!-- Préparation -->
        <div class="mb-16">
          <div class="flex items-center gap-3 mb-8">
            <h2 class="text-2xl font-black text-[#132778]">Préparation</h2>
            <span class="ml-auto bg-[#72BDA3]/15 text-[#72BDA3] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">Étape 1</span>
          </div>
          <p class="text-gray-700 font-semibold mb-2">Commençons par le commencement !</p>
          <p class="text-gray-700 font-semibold mb-6">Pour qu'un évènement ait lieu, il faut d'abord le <span class="underline">préparer</span>. Pour cela :</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div v-for="item in preparation" :key="item.text" class="flex gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100">
              <div class="w-6 h-6 rounded-full bg-[#132778] flex-shrink-0 flex items-center justify-center mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-700 text-sm leading-relaxed">{{ item.text }}</span>
            </div>
          </div>
          <div class="mt-4 ml-10 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div v-for="sub in preparationSub" :key="sub" class="flex gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <span class="text-[#72BDA3] font-bold flex-shrink-0">•</span>
              <span class="text-gray-600 text-sm leading-relaxed">{{ sub }}</span>
            </div>
          </div>
          <div class="mt-6! p-5 bg-[#72BDA3]/10 border-l-4 border-[#72BDA3] rounded-r-xl">
            <p class="text-sm text-gray-700 leading-relaxed">💡 Généralement, les parcours forment une boucle. Ce ne sont qu'une direction à suivre, mais les participant·e·s pourront l'adapter selon où ils trouvent le plus de déchets. Le ou la chef·fe d'équipe devra tout de même veiller à ce que les déviations préservent la sécurité des participant·e·s.</p>
          </div>
          <div class="mt-4! p-5 bg-[#132778]/5 border-l-4 border-[#132778] rounded-r-xl">
            <p class="text-sm text-gray-700 leading-relaxed">💡 Un événement dure généralement <strong>entre 1h30 et 2h</strong>. Ceci étant, avec de jeunes enfants, 1 heure suffit. À l'inverse, entre adultes, le ramassage peut tendre vers les 3 heures si tout le monde est motivé.</p>
          </div>
        </div>

        <!-- Matériel -->
        <div class="mb-16">
          <div class="flex items-center gap-3 my-4!">
            <h2 class="text-2xl font-black text-[#132778]">Le Matériel</h2>
            <span class="ml-auto bg-[#72BDA3]/15 text-[#72BDA3] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">Étape 2</span>
          </div>
          <p class="text-gray-700 font-semibold mb-6">La préparation du matériel est essentielle.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 class="font-bold text-[#132778] mb-5 text-sm uppercase tracking-wider">Que devez-vous prendre ?</h3>
              <ul class="space-y-3">
                <li v-for="item in materiel" :key="item" class="flex gap-3 items-start">
                  <span class="text-[#72BDA3] font-bold mt-0.5 flex-shrink-0">→</span>
                  <span class="text-gray-700 text-sm leading-relaxed">{{ item }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold text-[#132778] mb-5 text-sm uppercase tracking-wider">Comment obtenir du matériel ?</h3>
              <ul class="space-y-3">
                <li v-for="item in obtenir" :key="item" class="flex gap-3 items-start">
                  <span class="text-[#72BDA3] font-bold mt-0.5 flex-shrink-0">→</span>
                  <span class="text-gray-700 text-sm leading-relaxed">{{ item }}</span>
                </li>
              </ul>
              <div class="mt-6 p-5 bg-orange-50 border border-orange-200 rounded-xl">
                <p class="text-sm text-orange-700 leading-relaxed">⚠️ Évitez d'utiliser des gants jetables ou des gants chirurgicaux en plastique. Ceux-ci ne sont pas résistants et surtout, pas du tout écologiques.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Communication -->
        <div>
          <div class="flex items-center gap-3 my-4!">
            <h2 class="text-2xl font-black text-[#132778]">La Communication</h2>
            <span class="ml-auto bg-[#72BDA3]/15 text-[#72BDA3] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">Étape 3</span>
          </div>
          <p class="text-gray-600 text-sm mb-2 leading-relaxed">Une fois que toutes ces cases sont cochées, arrive le moment de la communication.</p>
          <p class="text-gray-600 text-sm mb-7 leading-relaxed">Pour cela, nous vous encourageons à créer une affiche et rédiger une description complète. Voici une liste non-exhaustive des éléments qui devront et/ou pourront être inscrits sur votre affiche et dans votre description :</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div v-for="item in communication" :key="item.label" class="p-5 rounded-xl border-2 border-[#132778]/10 text-center">
              <div class="text-2xl mb-2">{{ item.icon }}</div>
              <div class="text-xs text-gray-600 font-medium">{{ item.label }}</div>
            </div>
          </div>
          <div class="p-7 bg-[#132778] rounded-2xl text-white mt-4!">
            <p class="text-sm font-semibold mb-4">Il est maintenant temps de partager l'information ! Tous les canaux sont bons :</p>
            <div class="flex flex-wrap gap-3">
              <span v-for="canal in canaux" :key="canal" class="bg-white/15 text-white text-xs px-4 py-1.5 rounded-full">{{ canal }}</span>
            </div>
            <p class="mt-5 text-[#72BDA3] font-bold text-sm">➜ Sans oublier www.cleanwalk.org !</p>
          </div>
        </div>

      </div>
    </section>

    <!-- PENDANT -->
    <section id="pendant" class="bg-gray-50 py-16 px-8 border-t border-gray-200 w-full flex flex-col items-center">
      <div class="max-w-4xl w-full mx-auto">

        <div class="flex items-center gap-5 mb-14">
          <div class="flex-shrink-0 bg-[#72BDA3] text-white font-black text-2xl px-7 py-3.5 rounded-2xl tracking-tight">LE PENDANT</div>
          <div class="h-px flex-1 bg-[#72BDA3]/30"></div>
        </div>

        <!-- Accueil -->
        <div class="mb-16">
          <div class="flex items-center gap-3 my-4!">
            <h2 class="text-2xl font-black text-[#132778]">L'Accueil</h2>
          </div>
          <p class="text-gray-700 font-semibold mb-2">C'est enfin le moment ! La première étape importante est d'<span class="underline">accueillir les participant·e·s</span>.</p>
          <p class="text-gray-600 text-sm mb-6">Nous vous conseillons...</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="item in accueil" :key="item.text" class="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex flex-col gap-4">
              <div class="text-3xl">{{ item.icon }}</div>
              <p class="text-gray-700 text-sm leading-relaxed">{{ item.text }}</p>
            </div>
          </div>
          <div class="mt-6! p-5 bg-[#72BDA3]/10 border-l-4 border-[#72BDA3] rounded-r-xl">
            <p class="text-sm text-gray-700 leading-relaxed">💡 Gagnez du temps en <strong>distribuant les gants et les gilets au fur et à mesure</strong> de l'arrivée des participants.</p>
          </div>
        </div>

        <!-- Briefing -->
        <div class="mb-16">
          <div class="flex items-center gap-3 my-4!">
            <h2 class="text-2xl font-black text-[#132778]">Le Briefing</h2>
            <span class="ml-auto bg-[#132778]/10 text-[#132778] text-xs font-semibold px-4 py-1.5 rounded-full">15–20 min idéalement</span>
          </div>
          <p class="text-gray-600 text-sm mb-6 leading-relaxed">Avec de l'expérience, il peut durer jusqu'à 30 minutes, voire plus. Le mieux étant de le limiter à 15-20 minutes pour obtenir et surtout garder l'attention des personnes !</p>
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-8">
              <p class="font-semibold text-[#132778] text-sm mb-5 uppercase tracking-wider">Que devez-vous et pouvez-vous faire ?</p>
              <ol class="space-y-4">
                <li v-for="(item, i) in briefing" :key="item" class="flex gap-4 items-start">
                  <span class="flex-shrink-0 w-7 h-7 rounded-full bg-[#132778] text-white text-xs font-bold flex items-center justify-center mt-0.5!">{{ i + 1 }}</span>
                  <span class="text-gray-700 text-sm leading-relaxed">{{ item }}</span>
                </li>
              </ol>
            </div>
            <div class="bg-[#132778]/5 border-t border-gray-100 px-8 py-5 flex flex-wrap gap-6 text-sm text-gray-600">
              <span>👥 Une équipe doit être composée de <strong>10 à 20 personnes</strong></span>
              <span>📞 Veiller à ce que chaque équipe ait <strong>votre numéro de téléphone</strong></span>
            </div>
          </div>
        </div>

        <!-- Ramassage -->
        <div>
          <div class="flex items-center gap-3 my-4!">
            <h2 class="text-2xl font-black text-[#132778]">Pendant le ramassage</h2>
          </div>
          <p class="text-gray-600 text-sm mb-6 leading-relaxed">Une fois que toutes les équipes sont parties, plusieurs options s'offrent à vous :</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="option in ramassage" :key="option.title" class="bg-white rounded-2xl p-7 border-2 border-[#132778]/10">
              <div class="font-bold text-[#132778] mb-3">{{ option.title }}</div>
              <p class="text-gray-600 text-sm leading-relaxed">{{ option.desc }}</p>
              <ul v-if="option.subItems" class="mt-4 space-y-2">
                <li v-for="sub in option.subItems" :key="sub" class="flex gap-2 text-sm text-gray-600">
                  <span class="text-[#72BDA3] font-bold flex-shrink-0">→</span>
                  <span>{{ sub }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- APRÈS -->
    <section id="apres" class="py-16 px-8 border-t border-gray-100 w-full flex flex-col items-center">
      <div class="max-w-4xl w-full mx-auto">

        <div class="flex items-center gap-5 mb-14">
          <div class="flex-shrink-0 bg-[#132778] text-white font-black text-2xl px-7 py-3.5 rounded-2xl tracking-tight">L'APRÈS</div>
          <div class="h-px flex-1 bg-[#132778]/15"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-10!">
          <div class="bg-[#132778] rounded-2xl p-7 text-white flex flex-col gap-4">
            <div class="text-3xl">🏁</div>
            <h3 class="font-black text-lg">La Conclusion</h3>
            <p class="text-white/80 text-sm">Pour conclure l'évènement de la plus belle des manières possibles, réalisez un bilan de l'action comprenant :</p>
            <ul class="space-y-2.5 text-sm text-white/85 flex-1">
              <li v-for="item in conclusion" :key="item" class="flex gap-2 items-start">
                <span class="flex-shrink-0 mt-0.5">→</span>
                <span>{{ item }}</span>
              </li>
            </ul>
            <div class="pt-4 border-t border-white/20 text-xs text-[#72BDA3] font-medium">📸 Et surtout... la photo ! Prenez de belles photos de votre équipe et des déchets ramassés afin de pouvoir partager le résultat sur les réseaux sociaux.</div>
          </div>

          <div class="bg-[#72BDA3]/15 border-2 border-[#72BDA3]/30 rounded-2xl p-7 flex flex-col gap-4 items-center text-center">
            <div class="text-3xl">🥤</div>
            <h3 class="font-black text-[#132778] text-lg">Le Pot de l'amitié</h3>
            <p class="text-gray-600 text-sm leading-relaxed">Le moment tant attendu est arrivé, celui de boire, manger, discuter, souffler et profiter pleinement de l'instant !</p>
          </div>

          <div class="bg-gray-50 rounded-2xl p-7 border border-gray-100 flex flex-col gap-4 items-center text-center">
            <div class="text-3xl">🧹</div>
            <h3 class="font-black text-[#132778] text-lg">Un dernier effort</h3>
            <p class="text-gray-600 text-sm mb-2">Après l'effort, le réconfort, et... encore un p'tit effort ! Vos dernières missions :</p>
            <ul class="space-y-2.5 text-sm text-gray-600 text-left">
              <li v-for="item in dernierEffort" :key="item" class="flex gap-2 items-start">
                <span class="flex-shrink-0 mt-0.5">→</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- CTA final -->
        <div class="bg-[#132778] rounded-3xl p-12 text-center text-white flex flex-col items-center gap-6">
          <div class="text-5xl">🌍</div>
          <div>
            <h2 class="text-3xl font-black mb-3">Bravo &amp; Merci !</h2>
            <p class="text-white/70 max-w-md mx-auto text-sm leading-relaxed">Et voilà, vous avez terminé votre évènement ! Pour votre initiative, votre engagement, votre travail et votre détermination, et aussi : d'agir, d'être acteur·rice, et de faire une réelle différence dans la préservation de notre environnement.</p>
          </div>
          <div class="mt-4 p-6 bg-white/10 rounded-2xl max-w-lg text-sm text-white/80 leading-relaxed text-left">
            <p>Ce guide n'est peut-être pas parfait, mais nous nous efforçons continuellement de l'améliorer. Nous vous invitons à partager vos commentaires sur ce guide et à nous faire part de vos suggestions pour apporter des changements, des ajouts et des améliorations. Votre retour est précieux pour nous aider à optimiser cet outil et à mieux répondre à vos besoins.</p>
            <p class="mt-3 font-semibold text-white">Merci d'avance pour votre contribution.<br><span class="text-[#72BDA3]">L'équipe de Cleanwalk.org</span></p>
          </div>
          <div class="flex flex-wrap gap-4 justify-center">
            <a
              href="https://drive.google.com/file/d/1Iv56ES7hGadMDWfro09GwiJnTYelkO8S/view?usp=sharing"
              target="_blank"
              class="inline-flex items-center gap-2 bg-[#72BDA3] hover:bg-[#5aa98e] text-white font-semibold px-7 py-3.5 rounded-full transition-colors duration-200 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              Télécharger le guide PDF
            </a>
            <a
              href="https://www.cleanwalk.org"
              target="_blank"
              class="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-7 py-3.5 rounded-full transition-colors duration-200 text-sm"
            >
              Visiter cleanwalk.org ↗
            </a>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>