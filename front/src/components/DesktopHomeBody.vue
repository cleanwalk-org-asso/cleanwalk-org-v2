
<script setup lang="ts">
import IconGlass from './icons/IconGlass.vue';
import DesktopMap from './DesktopMap.vue';
import GlobalCleanwalkCard from './GlobalCleanwalkCard.vue';
import IconMiniLogo from './icons/IconMiniLogo.vue';
import Icon4Logo from './icons/Icon4Logo.vue';
import DekstopCarousel from "@/components/DekstopCarousel.vue";
import IconX from './icons/IconX.vue';
import IconInsta from './icons/IconInsta.vue';
import IconFacebook from './icons/IconFacebook.vue';
import IconDiscord from './icons/IconDiscord.vue';
import DesktopArticleCard from './icons/DesktopArticleCard.vue';


</script>

<template>
    <section class="padding-top">
        <h1 id="section1" class="title fontClean padding-top">Les cleanwalks à venir</h1>
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
    </section>
    <section class="section2">
        <div class="left-side">
            <div class="list1">
                <h3>Vous êtes un citoyen qui souhaite s'engager ?</h3>
                <h4>Avec cleanwalk.org vous pouvez :</h4>
                <ul>
                    <li><strong>Prendre connaissance</strong> des initiatives de ramassage de déchets pres de chez vous et y prendre part.</li>
                    <li><strong>Lancer</strong> des initiatives citoyennes.</li>
                    <li><strong>Rencontrer</strong> d'autres personnes engagées !</li>
                </ul>
            </div>
            <div class="list2">
                <h3>Vous êtes une association ?</h3>
                <h4>Avec cleanwalk.org vous pouvez : </h4>
                <ul>
                    <li><strong>Faire connaître</strong>les ramassages que vous organisez aux utilisateurs de la plateforme pour les encourager à s'y inscrire.</li>
                    <li><strong>Prendre connaissance</strong> des initiatives citoyennes similaires aux vôtres près de chez vous..</li>
                    <li><strong>Rencontrer de nouvelles personnes</strong> prêtes à s'engager à vos côtés !</li>
                </ul>
            </div>
        </div>
        <div class="right-side">
            <h3>Retrouve nous sur les réseaux !</h3>
            <ul class="reseaux">
                <li><a href="https://www.instagram.com/cleanwalk_org/?hl=fr"><IconInsta></IconInsta></a></li>
                <li><a href="https://discord.com/invite/XZNHvvd"><IconDiscord></IconDiscord></a></li>
                <li><a href="https://twitter.com/Cleanwalk_org"><IconX></IconX></a></li>
                <li> <a href="https://www.facebook.com/Cleanwalk.org/"><IconFacebook></IconFacebook></a></li>
            </ul>
            <div class="green-circle">
                <IconMiniLogo></IconMiniLogo>
                <p>
                    Rejoignez dès maintenant l’aventure en créant votre compte en 2 minutes
                </p>
                <button class="button-on-circle">Je m'inscris</button>
            </div>
        </div>
    </section>
    <section class="section3">
        <DesktopArticleCard></DesktopArticleCard>
    </section>
    
        

    
</template>

<style lang="scss" scoped >
@import '@/assets/main.scss';

.section3 {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;

}

.section2 {
    margin-top: 5rem;
    width: 100%;
    background-color: #132778;
    color: #fff;
    padding: 4rem 6rem;
    display: flex;
    justify-content: space-between;



    .left-side {
        h3 {
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        h4 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
        ul {
            margin-left: 3rem;
        }
        li {
            list-style-type: disc;
        }
        
        strong {
            font-weight: bold;
        }

        .list2 {
            margin-top: 5rem;
        }

    }

    .right-side {
        display: flex;
        flex-direction: column;
        align-items: center;
        h3 {
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 1rem;
        }

        p {
            margin-top: 4rem;
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 0.5rem;
            padding: 0 2rem;
            text-align: center;
        }

        .reseaux {
            display: flex;
            margin: 2rem 0;

            li {
                cursor: pointer;
                &:hover {
                    scale: 1.1;
                }
                padding: 0 1rem;
            }
        }


        .green-circle {
            background-color: #72BDA3;
            width: 472px;
            height: 472px;
            border-radius: 9999rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        .button-on-circle {
            background-color: #132778;
            color: #fff;
            border: none;
            border-radius: 999rem;
            padding: 1rem 2rem;
            font-size: 1.25rem;
            font-weight: bold;
            margin-top: 2rem;
            cursor: pointer;

            &:hover {
                scale: 1.1;
            }
        }
    }
}


































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

    padding-top: 5.5rem;

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