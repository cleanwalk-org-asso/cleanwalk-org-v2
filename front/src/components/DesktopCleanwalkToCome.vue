
<script setup lang="ts">
import IconGlass from './icons/IconGlass.vue';
import DesktopMap from './DesktopMap.vue';
import GlobalCleanwalkCard from './GlobalCleanwalkCard.vue';
import IconMiniLogo from './icons/IconMiniLogo.vue';
import Icon4Logo from './icons/Icon4Logo.vue';
import DekstopCarousel from "@/components/DekstopCarousel.vue";

</script>

<template>
    <h1 class="title fontClean padding-top">Les cleanwalks à venir</h1>
    <div class="flex center" >
        <input class="text-field text-field-fix margin-top" placeholder="Rechercher par nom, ville, organisateurs" type="search"/>
        <button class="searchButton">
            <IconGlass class="glassIcon" />
        </button>
    </div>
    <div class="flexCartMap">
        <div class="flexCart">
            <DesktopMap></DesktopMap>
        </div>
        <div class="flexCart">
            <GlobalCleanwalkCard v-for="(_,index) in [1,2,3]" :key="index" colored-background more-button></GlobalCleanwalkCard>
        </div>
    </div>
    <div class="flex-button">
        <div class="icon-Button image">
            <img class="arrow-left" src="../assets/img/leftArrow.svg">
        </div>
        <div class="icon-Button">1</div>
        <div class="icon-Button">2</div>
        <div class="icon-Button">3</div>
        <div class="icon-Button">
            <img class="arrow-right" src="../assets/img/rightArrow.svg">
        </div>
    </div>
    <div class="backgroundRDM" >
        <div class="flexRDM">
            <div class="leftAdjustment">
                <h1 class="title h1">Vous êtes un citoyen qui souhaite s'engager ?</h1>
                <p class="avecClean">Avec cleanwalk.org vous pouvez : </p>
                <ul class="ulRDM">
                    <li>
                        <p class="main-text title"><span class="bold">Prendre connaissance</span> des initiatives de ramassage de déchets près de chez vous et y prendre part</p>
                    </li>
                    <li class="li2">
                        <p class="main-text title"><span class="bold">Lancer</span> des initiatives citoyennes</p>
                    </li>
                    <li>
                        <p class="main-text title"><span class="bold">Rencontrer</span> d'autres personnes engagées !</p>
                    </li>
                </ul>
            </div>
            <div class="grandCircle">
                <div class="flexCircle">
                    <IconMiniLogo></IconMiniLogo>
                    <p class="textCircle">Rejoignez dès maintenant l'aventure en créant votre compte en 2 minutes</p>
                    <a href="#" class="primary-button button-sizing">Je m'inscris</a>
                </div>
            </div>
            <div class="rightAdjustment">
                <h1 class="title h1">Vous êtes une association ?</h1>
                <p class="avecClean">Avec cleanwalk.org vous pouvez : </p>
                <ul class="ulRDM">
                    <li>
                        <p class="main-text title"><span class="bold">Faire connaître</span> les ramassages que vous organisez aux utilisateurs de la plateforme pour les encourager à s'y inscrire.</p>
                    </li>
                    <li class="li2">
                        <p class="main-text title"><span class="bold">Prendre connaissance</span> des initiatives citoyennes similaires aux vôtres près de chez vous.</p>
                    </li>
                    <li>
                        <p class="main-text title"><span class="bold">Rencontrer de nouvelles personnes</span> prêtes à s'engager à vos côtés !</p>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
    <div class="backgroundDNA">
        <h1 class="title h1DNA">Découvrez nos articles</h1>
        <DekstopCarousel></DekstopCarousel>
    </div>
    <div class="retrouvezClean"> 
        <div class="flexRECRS">
        <h1 class="RECRS">Retrouvez également Cleanwalk.org sur les réseaux sociaux</h1>
            <Icon4Logo class="margin4Logo"></Icon4Logo>
        </div>
    </div>
    <div class="div-vague">
        <img class="IconVagueFooter" src="../assets/img/vague.svg">
    </div>
    <div class="PhotoInox">     
    </div>

    
</template>

<style lang="scss" scoped >
@import '@/assets/main.scss';

    .fontClean {
    color: #000;
    text-align: center;
    font-size: 2.1875rem;
    line-height: normal;
}

.text-field-fix {

    
    max-width: 49rem;
}

.padding-top {

    padding-top: 11rem;

}
.margin-top {

    margin-top: 2rem;
}

.glassBackground {

    position: relative;
    right: 10px;
    stroke: #000;
    width: 2rem;
    height: 2rem;
}
.flex {
    display: flex;
    flex-direction: row;
}

.searchButton {

    display: inline-block;
    padding: 0;
    background: transparent;
    width: 2rem;
    height: 2rem;
    border: none;
    position: relative;
    right: 3.3rem;
    top: 0.6rem;
}


.glassIcon {

    width: 1.6rem;
    height: 1.6rem;
    fill: $onBackground-20;
    &:active {fill: red;}
}

.flexCartMap {

    flex-direction: row;
    display: flex;
    justify-content: center;
    width: 100%;
}
.flexCart {

    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: 40rem;
}

    $icon-size: 2rem;
    $icon-spacing: 1.5rem;
.icon-Button {
    display: inline-flex; 
    align-items: center; 
    justify-content: center; 
    margin-right: $icon-spacing;
    width: $icon-size;
    height: $icon-size;
    border-radius: 50%; 
    background-color: #D9D9D9; 
    border: none; 
    color: black; 
    font-weight: 700;
    font-size: 1.5rem; 
    cursor: pointer;
    
    @media (max-width: 1020px) {
    
    width: 2rem; 
    height: 2rem; 
    font-size: 1.25rem; 
  }


  @media (max-width: 768px) {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 1rem;
    margin-right: 1rem;
  }
}


    .icone-bouton.image {
        overflow: hidden;
    }


.flex-button {

    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 45rem;

    @media (max-width: 768px) {
    
    padding-left: 2rem;
  }
}

.arrow-left {

max-width: 100%;
max-height: 100%;

}

.h1 {

    font-size: 1.5625rem;
    font-weight: 600;
}

.backgroundRDM {

    width: 90%;
    padding: 4rem;
    border-radius: 0.3125rem;
    border: 3px solid rgba(0, 0, 0, 0.20);
    background: #E1F4F8;
    margin: 0 auto;
    margin-top: 8rem;
}
.textCircle {

    color: white;
    max-width: 20rem;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 700;
}

.flexCircle {

    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    height: 100%;
    width: 100%;
}


    .div-vague {
        fill: #72BDA3;
        width: 100%;
        overflow: hidden;
        justify-content: center;
        display: flex;
        position: relative;
        top: 31.45px;
    }
    .PhotoInox {

    height: 38rem;
    background-image: url('../assets/img/inox.png');
     background-repeat: no-repeat;
    background-size: cover;
    background-position: center 50%;
}

    .IconVagueFooter {

    width: 100%;
    height: 51px;
    object-fit: fill;
   
}
.avecClean {

    margin: 1rem 0;
    font-size: 1.25rem;
    font-weight: 700;
}

.bold {

    font-weight: bold;
}

.main-text {

    max-width: 15rem;
    font-size: 1.0625rem; 
    font-weight: 400;
    
}

.ulRDM {

    list-style: disc;
    margin-left: 3rem;
    
}
.li2 {

    margin: 1rem 0;
}

.flexRDM {

    display: flex;
    justify-content: space-around;
    gap: 2rem;
}





.grandCircle {

    clip-path: circle();
    padding: 4rem;
    background: #72BDA3;
    width: 30rem;
    
    
}

.leftAdjustment {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    width: 30%;
    align-items: center;
}

.rightAdjustment {

    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30%;
    align-items: center;
}

.button-sizing {

    display: block;
    width: 8.739rem;
    height: 2.913rem;
    padding: 0.5rem 1rem;
    text-align: center;
    gap: 0.625rem;
    border-radius: 0.3125rem;
    background: #132778;
    padding-top: 0.7rem;
    text-decoration: none;
    max-height: 2.913rem;
}


.backgroundDNA {

    border-radius: 0.3125rem;
    border: 3px solid rgba(0, 0, 0, 0.20);
    background: #E1F4F8;
    width: 90%;
    height: 56.6875rem;
    margin: 5rem auto;

    }

.h1DNA {

    text-align: center;
    font-size: 2.1875rem;
    font-weight: bold;
    padding-top: 0.5rem;
    color: #000;
    
}


.jusedda {

    color: #132778;
}


.retrouvezClean {

    background: #E1F4F8;
    height: 28.75rem;
    border-radius: 0.3125rem;
    border: 3px solid rgba(0, 0, 0, 0.20);
    margin: 0 auto;
    width: 90%;
}

.RECRS {

    font-size: 3.125rem;
    font-weight: 700;
    color: #363636;
    max-width: 50rem;
    margin: 0 auto;
    text-align: center;
    padding-top: 7rem;
}

.flexRECRS {

    display: flex;
    flex-direction: column;
    gap: 2rem;
}
.margin4Logo {

    margin: 0 auto;
}


@media screen and (max-width: 1000px) {
    .flexRDM {
        align-items: center;
        display: flex;
        justify-content: space-around;
        gap: 3rem;
        flex-direction: column;
    }
    
    .rightAdjustment {

        width: 100%;
    }
    
    .leftAdjustment {
        
        width: 100%;
    }
    .grandCircle {
        
        max-width: 22rem;
        
        
    }
}
@media screen and (max-width: 1350px) {
    
    .textCircle {

        
    font-size: 1rem;
    
    }
    .grandCircle {

    max-width: 22rem;
    

}
}
</style>