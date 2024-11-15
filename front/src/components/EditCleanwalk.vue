<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TopBar from './TopBar.vue';
import { useAccountStore } from '@/stores/AccountStore';
import type { SingleCleanwalk } from '@/interfaces/cleanwalkInterface';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import dateService from '@/services/dateService'; // Assurez-vous d'importer correctement
import dragDrop from './dragDrop.vue';
import AutocompleteAddress from './AutocompleteAddress.vue';
import { format, parse } from 'date-fns';
import { useUtilsStore } from '@/stores/UtilsStore';
import apiService from '@/services/apiService';

const showToast = useUtilsStore().showToast;

const getCleanwalkById = useCleanwalkStore().getCleanwalkById;

const accountStore = useAccountStore();
const route = useRoute();
const router = useRouter();

const dragDropRef = ref(null as any);

const dateCleanwalk = ref({
    dateDay: '',
    hourBegin: '',
    hourEnd: ''
});

let currentCleanwalk: Ref<SingleCleanwalk | undefined> = ref(undefined);

onMounted(async () => {
  if (!accountStore.CurrentUser?.id) {
    router.push('/login');
  }
  const cleanwalkId = route.params.id;
  if (!cleanwalkId) {
    router.push('/');
  }
  // fetch cleanwalk
  currentCleanwalk.value = await getCleanwalkById(+cleanwalkId);
  if (!currentCleanwalk.value) {
    router.push('/');
  } else {
    const { dateDay, hourBegin, hourEnd } = dateService.getDayAndHourBegginEndByDate(currentCleanwalk.value.date_begin, currentCleanwalk.value.duration);
    dateCleanwalk.value.dateDay = format(parse(dateDay, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd');
    dateCleanwalk.value.hourBegin = hourBegin;
    dateCleanwalk.value.hourEnd = hourEnd;
  }
});

const getWrittenDate = () => {
  if (currentCleanwalk.value && currentCleanwalk.value.date_begin && currentCleanwalk.value.duration) {
    return dateService.getCleanwalkWrittenDate(new Date(currentCleanwalk.value.date_begin), currentCleanwalk.value.duration);
  }
}

const validate = async() => {
  if (dateCleanwalk.value.dateDay && dateCleanwalk.value.hourBegin && dateCleanwalk.value.hourEnd) {
    const date = dateService.getDateBegginAndDuration(dateCleanwalk.value.dateDay, dateCleanwalk.value.hourBegin, dateCleanwalk.value.hourEnd);
    currentCleanwalk.value!.date_begin = date!.date_begin;
    currentCleanwalk.value!.duration = date!.duration;
  }
  await Upload();
  const res = await apiService.kyPut(`/cleanwalks/${currentCleanwalk.value!.id}`,
        {
            name: currentCleanwalk.value!.name,
            pos_lat: currentCleanwalk.value!.pos_lat,
            pos_long: currentCleanwalk.value!.pos_long,
            date_begin: currentCleanwalk.value!.date_begin,
            duration: currentCleanwalk.value!.duration,
            description: currentCleanwalk.value!.description,
            img_url: currentCleanwalk.value!.img_url,
            address: currentCleanwalk.value!.address,
            city: currentCleanwalk.value!.city,
        },
     accountStore.getAccessToken()!);
    if (res.success === false) {
        showToast(res.data.message as string, false);
    } else {
        showToast('La cleanwalk a été modifiée avec succès', true);
    }
}

const Upload = async () => {
    if (!dragDropRef.value) {
        return;
    }
    try {
        const response: string | undefined = await dragDropRef.value.handleUpload();
        if (response !== undefined) {
            currentCleanwalk.value!.img_url = response;
        }
    } catch (error) {
        showToast('Erreur lors de l\'upload de l\'image', false);
    }
};


const handleSelectAddress = (addressData: { address: string, lat: string, lon: string, city: string }) => {
  if (!currentCleanwalk.value) {
    return;
  }
    currentCleanwalk.value.address = addressData.address;
    currentCleanwalk.value.pos_lat = parseFloat(addressData.lat);
    currentCleanwalk.value.pos_long = parseFloat(addressData.lon);
    currentCleanwalk.value.city = addressData.city;
};



</script>

<template>
  <div v-if="currentCleanwalk" class="container">
    <div class="banner">
      <dragDrop ref="dragDropRef" :current-img="currentCleanwalk.img_url" format="card" />
    </div>
    <label for="name">Nom de la cleanwalk</label>
    <input id="name" type="text" v-model="currentCleanwalk.name">
    <label for="address">Adresse</label>
    <AutocompleteAddress v-model:query="currentCleanwalk.address"
    @select-suggestion="handleSelectAddress" />
    <label for="description">Description</label>
    <textarea name="description" v-model="currentCleanwalk.description" id="description"></textarea>
    <label class="label" for="date">date de l'évènement</label>
    <input id="date" v-model="dateCleanwalk.dateDay" type="date">
    <label class="label" for="hourBegin">heure de début</label>
    <input id="hourBegin" v-model="dateCleanwalk.hourBegin" type="time">
    <label class="label" for="hourEnd">heure de fin</label>
    <input id="hourEnd" v-model="dateCleanwalk.hourEnd" type="time">

    <button @click="validate()" class="validate button-primary">
      Valider
    </button>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  padding: 4.5rem 1rem 0 1rem;
}

.validate {
  width: 8rem;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  margin-top: 2rem;
}

label {
  font-size: 12px;
  font-weight: 500;
  position: relative;
  margin-bottom: -18px;
  background-color: #fff;
  width: fit-content;
  margin-left: 13px;
  margin-top: 5px;
  color: #94A3B8;
  z-index: 99;
}

input,
textarea {
  border: 1px solid #94A3B8;
  border-radius: 8px;
  padding: 12px;
  margin-top: 0.5rem;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  width: 100%;

  &::placeholder {
    color: #94A3B8;
  }

  &:focus {
    outline: none;
  }
}
</style>
