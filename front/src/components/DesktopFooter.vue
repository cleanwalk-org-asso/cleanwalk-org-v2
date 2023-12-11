<script lang="ts" setup >
import IconLogoCleanwalk from './icons/IconLogoCleanwalk.vue';

</script>

<template>

<footer class="footer">


    
    <div class="back-footer">
        <div class="flexFooter">
            <div class="flexLeftFooter">
                <img src="../assets/img/logoCleanwalk.svg" class="logoSizing">
                <div class="line"></div>
                <p class="title fontPQCACRD">La plateforme qui centralise les actions citoyennes de ramassage des déchets</p>
                <div class="line"></div>
                <div class="leaflet-control-attribution leaflet-control">
                    <span>openstreetmap: </span>
                    <a href="https://leafletjs.com/" title="A JavaScript library for interactive maps">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag">
                            <path fill="#4C7BE1" d="M0 0h12v4H0z"></path><path fill="#FFD500" d="M0 4h12v3H0z"></path><path fill="#E0BC00" d="M0 7h12v1H0z"></path>
                        </svg>
                        <span class="leaflet">
                            Leaflet
                        </span>
                    </a>
                </div>
            </div>
            <div class="linker">
                <div>
                    <a href="#" class="fontFooter">Contact</a>
                    <a href="#" class="fontFooter">Notre histoire</a>
                    <a href="#" class="fontFooter">Evènements entreprises</a>
                    <a href="#" class="fontFooter">Condition générales d'utilisation</a>
                </div>
                <div>
                    <a href="#" class="fontFooter">Blog</a>
                    <a href="#" class="fontFooter">Ressources utiles</a>
                    <a href="#" class="fontFooter">Pourquoi agir ?</a>
                </div>
            </div>
        </div>
        <div class="bottomFlex">
            <div class="lineBottom"></div>
                <p class="fontFooter">© Cleanwalk.org - Tout droits réservé 2023</p>
        </div>
    </div>



</footer>
</template>

<style lang="scss" scoped >
 @import '../assets/main.scss';

.leaflet {
    color: #FFF;
    &:hover {
        text-decoration: #FFF underline;
    }
}

.leaflet-control {
    margin-top: 0.5rem;
    color: #FFF;
}
    
.PhotoInox {

    height: 38rem;
    background-image: url('../assets/img/inox.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 50%;
   }



.back-footer {

    background-color: $surfaceVariant;
    position: relative;
    z-index: 1;    
    }

  



.logoSizing {

    width: 16.8125rem;
    height: 5.1875rem;
    fill: white;
    background-color: $surfaceVariant;
    z-index: 10;

}

.line {

    width: 6.0625rem;
    height: 0.0625rem;
    background-color: white;
    margin-top: 1rem;
}

.fontPQCACRD {

    font-weight: 300;
    color: $onPrimary;
    line-height: 110.5%;
    margin-top: 0.94rem;
    max-width: 15.75rem;
    font-size: 1.125rem;
}

.linker {

    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
  

}



.fontFooter {
    
    text-align: left;
    display: block;
    padding-bottom: 0.3rem;
    font-size: 1.125rem;
    font-weight: 300;
    color: $onSurfaceVariant;
    padding-right: 3rem;
    text-decoration: none;
    

}


.flexLeftFooter {
    display: flex;
    flex-direction: column;
    

}
.flexFooter {

    display: flex;
    justify-content: space-around;
    align-items: center;
    
    padding: 5rem 0;
}



.lineBottom {

    width: 7rem;
    height: 0.01rem;
    background-color: white;
    margin-bottom: 2rem;
    margin-right: 1.5rem;
}


.bottomFlex {

    align-items: center;
    display: flex;
    flex-direction: column;
}


</style>