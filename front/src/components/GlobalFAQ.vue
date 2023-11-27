<script setup lang="ts">
</script>

<template>
  <div class="container">
    <h1 class="H1">FAQ</h1>
    <div class="article lightblue">
      <h2 class="H2">Qu’est-ce qu’une cleanwalk ?</h2>
      <br>
      <div>
        Une cleanwalk est un événement au cours duquel des personnes se réunissent pour ramasser des déchets dans un lieu public.
        Cette action permet d’avoir un impact concret sur l’environnement et de sensibiliser à la problématique des déchets sauvages.
        <br><br>
        Il est important de respecter certaines règles de sécurité lors des cleanwalks.
        Il faut notamment suivre le code de la route, porter des gants et ne pas ramasser des déchets suspects
        (objets coupants, produits chimiques ou seringues par exemple).
      </div>
    </div>
    <div class="article blue">
      <h2 class="H2">Combien de temps dure une cleanwalk ?</h2>
      <br>
      <div>
        La durée d’une cleanwalk est fixée librement par l’organisateur mais le format choisi est souvent celui d’une cleanwalk de 1h30 à 3 heures.
        A vous de choisir le ramassage en fonction de vos disponibilités.
        Et si aucune des opérations ne vous convient, n’hésitez pas à organiser la vôtre !
      </div>
    </div>
    <div class="article lightblue">
      <h2 class="H2">Qui peut organiser une cleanwalk ?</h2>
      <br>
      <div>
        Tout le monde peut organiser une cleanwalk dans sa ville.
        Il suffit de motiver quelques personnes autour de vous et de vous procurer le matériel nécessaire.
        Pour plus d’informations, consultez le guide de la cleanwalk , ou contactez-nous à l’adresse contact@cleanwalk.org .
      </div>
    </div>
    <div class="article blue">
      <h2 class="H2">Pourquoi est-il important de ramasser les déchets ?</h2>
      <br>
      <div>
        Certains déchets, comme les déchets organiques (épluchures de fruits et légumes par exemple) se décomposent naturellement.
        Toutefois, la majorité des déchets que nous générons actuellement mettent des décennies, voire des siècles, à se décomposer.
        Les jeter par terre entraîne donc la pollution des sols et des océans.
        <br><br>
        La décomposition des déchets plastiques, qu’elle ait lieu dans l’eau ou dans les sols,
        entraîne la propagation de fibres microplastiques qui sont ensuite ingérées par les organismes vivants
        (les poissons ou les vers de terre par exemple) et entraînent des perturbations sur tout l’écosystème.
        Selon une étude publiée dans la revue Limnology and Oceanography Letters, dans l’océan,
        1 000 litres d’eau contiennent en moyenne 8,3 millions de morceaux de plastique.
        <br><br>
        D’après le Ministère de la Transition Ecologique et Solidaire,
        80% des déchets en mer proviennent du continent : ramasser les déchets à terre, c’est donc éviter qu’ils terminent leur chemin dans les océans.
      </div>
    </div>
    <div class="article lightblue">
      <h2 class="H2">Quel est l’impact des cleanwalks ?</h2>
      <br>
      <div>
        Chez Cleanwalk.org, nous sommes convaincus que la meilleure sensibilisation est l’action.
        D'une part, une cleanwalk permet de sensibiliser les participants : les enfants prennent de bonnes habitudes,
        les adultes échangent entre eux autour des enjeux liés aux déchets par exemple.
        D'autre part, elle permet aussi la sensibilisation des observateurs, qui, en voyant des personnes agir,
        réfléchissent à cette problématique des déchets et changent parfois leurs comportements.
        <br><br>
        Nous sommes persuadés qu’à force d’implication, les habitudes de tous vont peu à peu changer,
        pour tendre vers un monde où les déchets ne seront plus répandus dans nos océans, forêts, parcs et rues.
      </div>
    </div>
    <div class="article blue">
      <h2 class="H2">Est-il possible d’organiser une cleanwalk pour sensibiliser au sein de mon entreprise ?</h2>
      <br>
      <div>
        Nous pouvons organiser des cleanwalks pour les salariés de votre entreprise en collaboration avec nos associations partenaires,partout en France.
        Ces actions permettent d’engager votre entreprise dans une démarche environnementale autour de la problématique des déchets et de sensibiliser vos collaborateurs.
        Vous souhaitez plus d’informations ? Rendez-vous sur Lakaa !
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem 0;
    margin: 2vw;
  }
  .H1{
    font-size: 2rem;
    font-weight: bold;
  }
  .H2{
    font-size: 1.1rem;
    font-weight: bold;
  }
  .article{
    max-width: 72rem;
    padding: 2.5rem;
    font-size: 0.9rem;
    line-height: 1.3rem;
    border-radius: 0.3rem;
  }
  .lightblue{
    background-color: #E1F4F8;
    color: #4a4a4a;

    .H2{
      color: #000;
    }
  }
  .blue{
    background-color: #132778;
    color: #fff;
  }
</style>