<script setup lang="ts">
import type { Cleanwalk, SingleCleanwalk } from '@/interfaces/cleanwalkInterface'
import iconClock from './icons/icon-clock.vue';
import iconMiniMap from './icons/icon-mini-map.vue';
import iconLeftArrow from './icons/icon-left-arrow.vue';
import iconInfo from './icons/icon-info.vue';
import iconCross from './icons/icon-cross.vue';
import iconAdd from './icons/icon-add.vue';
import iconMinus from './icons/icon-minus.vue';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import dateHelper from '@/helpers/dateHelper';
import { useAccountStore } from '@/stores/AccountStore';
import LeaveCwPopup from './LeaveCwPopup.vue';

const cleanwalkStore = useCleanwalkStore();
const currenUserId = ref(useAccountStore().CurrentUser?.id);
const token = ref(useAccountStore().getAccessToken());

let currentCleanwalk:Ref<SingleCleanwalk | undefined >= ref(undefined);

onMounted (async() => {
  const id = +useRoute().params.id; // + to convert string to number
  console.log("test",id);
  console.log(id);

  // id is NaN if it's not a number
  if (isNaN(id)) {
    router.push('/404');
    return;
  }

  console.log("userId:", useAccountStore().CurrentUser?.id)
  
  currentCleanwalk.value = await cleanwalkStore.getCleanwalkById(id, useAccountStore().CurrentUser?.id);
  console.log("cw data",currentCleanwalk.value);
  if (!currentCleanwalk.value) {
    router.push('/404');
  }
})

const showLeaveCwPopup = ref(false);

const toogleLeaveCwPopup = () => {
  showLeaveCwPopup.value = !showLeaveCwPopup.value;
}

let popupBool = ref(false);
let counterParticipate = ref(1);
let isAnonyme = ref(false);

const counterAdd = () => {
  if (counterParticipate.value < 5) {
    counterParticipate.value++;
  }
}

const counterMinus = () => {
  if (counterParticipate.value > 1) {
    counterParticipate.value--;
  }
}

const tooglePopup = () => {
  popupBool.value = !popupBool.value;
}

const participate = () => {
  tooglePopup();
}

const cancel = () => {
  tooglePopup()
  counterParticipate.value = 1;
  isAnonyme.value = false;
}

const getDate = () => {
  if (currentCleanwalk.value && currentCleanwalk.value.date_begin && currentCleanwalk.value.duration) {
    return dateHelper.getCleanwalkWrittenDate(new Date(currentCleanwalk.value.date_begin), currentCleanwalk.value.duration);
  }
}


const leaveCleanwalk = () => {
  console.log("leave cleanwalk");
  if (!currentCleanwalk.value || !currenUserId.value || !token.value) {
    router.push('/login');
    return;
  }
  cleanwalkStore.leaveCleanwalk(currentCleanwalk.value.id, token.value, currenUserId.value);
  currentCleanwalk.value.is_user_participant = false;
  toogleLeaveCwPopup();
}

const joinCleanwalk = () => {
  
  console.log("join cleanwalk");
  if (!currentCleanwalk.value || !currenUserId.value || !token.value) {
    router.push('/login');
    return;
  }
  cleanwalkStore.joinCleanwalk(currentCleanwalk.value?.id, token.value, counterParticipate.value, currenUserId.value);
  currentCleanwalk.value.is_user_participant = true;
  tooglePopup();
}

const actionButton = () => {
  if(!currentCleanwalk.value || !currenUserId.value || !token.value) {
    router.push('/login');
    return;
  }
  if(currentCleanwalk.value.host.author_id === currenUserId.value) {
    // edit cleanwalk
    console.log("edit cleanwalk");
    return;
  }
  if (currentCleanwalk.value.is_user_participant === true) {
    // leave cleanwalk
    toogleLeaveCwPopup();
    return;
  }
  if(currentCleanwalk.value.is_user_participant === false) {
    // join cleanwalk
    participate();
    return;
  }

}

const getActionButtonText = ():string => {
    if (currentCleanwalk.value?.host.author_id === currenUserId.value) {
      return "Editer la cleanwalk";
    }
    if (currentCleanwalk.value?.is_user_participant === true) {
      return "Se désinscrire";
    }
    if (currentCleanwalk.value?.is_user_participant === false) {
      return "Je participe";
    }
    return "";
  }

</script>

<template>
  <div class="top-bar">
    <router-link class="back" to="/">
      <iconLeftArrow />
    </router-link>
    <img src="../assets/logo.svg" alt="logo">
    <button class="info">
      <iconInfo />
    </button>
  </div>
  <LeaveCwPopup :isVisible="showLeaveCwPopup" :tooglePopup="toogleLeaveCwPopup" :leaveCw="leaveCleanwalk"/>
  <div class="popup" v-if="popupBool">
    <div class="popup-validation">
      <div class="cross-container">
        <button class="cross" @click="cancel()">
          <iconCross />
        </button>
      </div>
      <h3>Validation de la participation au ramassage</h3>
      <div class="warning">Maximum 5 personnes avec vous</div>
      <div class="counter">
        <button class="button-primary minus" @click="counterMinus()">
          <iconMinus />
        </button>
        <div>{{ counterParticipate }}</div>
        <button class="button-primary add" @click="counterAdd()">
          <iconAdd />
        </button>
      </div>
      <div class="anonyme">
        <input type="checkbox" name="anonyme" id="anonyme" v-model="isAnonyme">
        <label for="anonyme">participer en anonyme</label>
      </div>
      <div class="button-container">
        <button @click="cancel()" class="cancel">Annuler</button>
        <button @click="joinCleanwalk()" class="button-primary">Valider</button>
      </div>
    </div>


  </div>
  <main>
    <div>
      <img class="cover" src="../assets/desert.png" alt="" />
    </div>
    <div class="container">
      <h1>{{ currentCleanwalk?.name }}</h1>
      <div class="date-location">
        <div class="top">
          <icon-clock />
          <div>{{ getDate() }}</div>
        </div>
        <div class="bot">
          <iconMiniMap />
          <div>{{ currentCleanwalk?.address }}</div>
        </div>
      </div>
      <div v-if="currentCleanwalk?.host.author_id === currenUserId">
        {{ currentCleanwalk?.participant_count }} participant(s)
      </div>
      <div class="orga">
        <div class="left">
          <div>organisé par:</div>
          <h2> {{ currentCleanwalk?.host?.name }} </h2>
        </div>
        <div class="right" v-if="currentCleanwalk?.host?.profile_picture">
          <img :src="currentCleanwalk.host.profile_picture" alt="profile-picture">
        </div>
      </div>
      <button class="button-primary" @click="actionButton()">
        {{ getActionButtonText() }}
      </button>
      <p class="description">
        {{ currentCleanwalk?.description }}
      </p>
    </div>

  </main>
</template>

<style scoped lang="scss">
@import '@/assets/base.scss';


main {
  overflow: scroll;
}

.top-bar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;
  background-color: var(--color-primary);
  stroke: #fff;
  display: flex;
  padding: 20px;
  flex-direction: center;
  justify-content: space-between;

  .back {
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding-bottom: 5px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  img {
    width: 104px;
    margin-top: 10px;
  }

  .info {
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #CBD5E1;
    width: 38px;
    height: 38px;
    stroke: #94A3B8;
  }


}

.cover {
  width: 100vw;
  object-fit: cover;
  aspect-ratio: 21/9;
}

.container {
  padding: 0 26px;
  font-size: 12px;

  .description {
    width: 100%;
    //le texte ne dois pas depasser et sauter une ligne si besoins
    overflow: hidden;
    word-wrap: break-word;
  }

  h1 {
    color: var(--text-color-primary);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding: 20px 0 30px;
  }

  .date-location {
    display: flex;
    stroke: var(--text-color-primary);
    flex-direction: column;
    padding-bottom: 20px;
    font-size: 12px;

    .top {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .bot {
      margin-top: 5px;
      display: flex;
      align-items: center;
      gap: 10px;

    }
  }

  .orga {
    display: flex;
    background-color: var(--color-secondary);
    justify-content: space-between;
    border-radius: 8px;
    padding: 11px 20px 4px 14px;
    margin-bottom: 20px;

    .left {
      display: flex;
      flex-direction: column;

      h2 {
        font-size: 15px;
        font-style: normal;
        font-weight: 700;
      }
    }

    .right {
      img {
        border-radius: 9999px;
        width: 44px;
        height: 44px;
        object-fit: cover;
      }
    }

  }

  .button-primary {
    padding: 15px 0;
    width: 100%;
    text-align: center;
  }

  p {
    padding-top: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }

}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .popup-validation {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    width: 90%;
    padding: 0 10%;
    .cross-container {
      display: flex;
      justify-content: flex-end;
      position: relative;
      margin-right: -10%; // to compensate padding :( sorry
      .cross {
        background-color: transparent;
        stroke: var(--text-color-primary);
        padding: 13px 13px 0 0;
        // styles for cross button
      }
    }

    .warning {
      padding: 40px 0 10px;
      font-size: 12px;
    }
    h3 {
      // styles for h3
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      max-width: 230px;
      margin: 0 auto;
    }


    .counter {
      display: flex;
      width: 100%;
      justify-content: space-between;

      button {
        // styles for counter buttons
        width: 50px;
        height: 50px;
        stroke: #fff;
        padding-top: 4px;
        &.add {
          padding-top: 4px;
          svg {
            width: 32px;
            height: 32px;
          }
        }

      }
      div {
        // styles for counter div
        font-size: 25px;
        font-style: normal;
        font-weight: 700;
        line-height: 47px;
        background-color: var(--color-secondary);
        margin: 0 20px;
        border-radius: 8px;
        flex-grow: 1;
        text-align: center;

      }
    }
    .anonyme {
      display: flex;
      padding-top: 20px;
      visibility: hidden; //provisoire
      padding: 0;

      input[type="checkbox"] {
        // styles for checkbox
        margin-right: 5px
        
      }
      label {
        display: block;
        font-size: 12px;
        padding-top: 2px;
      }
    }
    .button-container {
      display: flex;
      padding: 20px 0;
      button {
        font-weight: 500;
        padding: 15px 0;
        border-radius: 8px;
        &.cancel {
          // styles for cancel button
          flex-grow: 0.25;
          margin-right: 10px;
          font-size: 16px;
        }
        &.button-primary {
          // styles for primary button
          flex-grow: 0.75;
        }
      }
    }
  }
}

</style>