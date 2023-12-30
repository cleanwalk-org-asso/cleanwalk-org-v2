<script lang="ts" setup>
</script>

<template>

<header class="header">

  <div class="flex-header">
    <div class="flex-header">
      <div>
        <img class="logoCleanwalk" src="../assets/img/logoCleanwalk.svg">
      </div>
      <a href="#" class="header-text title">Cleanwalks à venir</a>
      <a href="#" class="header-text title">Organiser une cleanwalk</a>
      <a href="#" class="header-text title">L'histoire de Cleanwalk.org</a>
      <a href="#" class="header-text title">Blog</a>
    </div>
      <div v-if="false" class="right-flex">
        <nav class="nav">
            <div class="flexUser">
              <p class="NomPrenomUser">Nom Prenom</p>  <!--- {{ AccountStore.user?.firstName }} ---> 
              <img class="sizingUserPhoto" src="../assets/img/userDefaultPicture.png">
            </div>
        </nav>
      </div>
      <div class="flexLoginSignup" v-else>
        <RouterLink class="nav-link" to="/signup">S'inscrire</RouterLink>
        <RouterLink class="nav-link" to="/login">Se connecter</RouterLink>
      </div>
    </div>
    <!-- <div class="vague-container">
      <img class="vague" src="../assets/img/vague.svg" alt="">
    </div> -->
  </header>
  

</template>

<style lang="scss" scoped>
@import '../assets/main.scss';
.header {
    width: 100%;
    position: fixed;
    top: 0;
    background-color: $primary;
    color: $onPrimary;
    z-index: 1001;
    // border-bottom: 2px solid #cccccc;
    box-shadow: 0 2px 6px rgba(15, 15, 15, 0.5);
  }

  .flex-header {

    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
  }

  .logoCleanwalk {
    width: 8rem;
    margin:0.8rem 0 0 1rem;

  }

    .right-flex {

      display: flex;
      justify-content: flex-end;
      padding-bottom: 2rem;
    }
 .header-text {

    font-size: 1rem;
    font-weight: 400;
    color: white;
    text-decoration: none;
    text-align: center;
    
 }
 
.sizingUserPhoto {

  width: 4.125rem;
  height: 4.125rem;
  margin-right: 3rem;
  
}
    
  .flexUser {

    gap: 2rem;
    display: flex;
    align-items: center;
    margin-top: 3rem;

  }
      
  .flexLoginSignup {

    display: flex;
    gap: 0.75rem;
    align-items: center;
    margin-right: 1rem;
  }

  .nav-link {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    display: block;
    white-space: nowrap;
    height: 2.5rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    border-radius: 0.3rem;
    color: $onPrimary;
    text-decoration: none;
    
    transition: 0.25s;

    &:hover{
      background-color: $onPrimary;
      color: $primary;
    }
  }


  @media screen and (max-width: 640px) {
    .nav-link {
    display: block;
    height: 3rem;
    font-size: 0.75rem;
    padding-bottom: 1rem;
    border-radius: 0.3rem;
    
    color: $onPrimary;
    text-decoration: none;
    transition: 0.25s;

    &:hover{
      background-color: $onPrimary;
      color: $primary;
    }
  }
  .header-text {

  font-size: 0.75rem;
  font-weight: 400;
  color: white;
  text-decoration: none;
}
  }

.vague {
  position: absolute;
  top: 3.3rem;
  z-index: 1002;
  height: 28px;
  object-fit: cover;
}

.vague-container {
  display: flex;
  justify-content: center;
  overflow: hidden;
}
</style>