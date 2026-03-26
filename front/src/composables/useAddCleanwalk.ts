// src/composables/useCleanwalkForm.js
import { ref, watch, onMounted } from 'vue';
import { set, parse, differenceInMinutes, format } from 'date-fns';
import router from '@/router';
import { useUtilsStore } from '@/stores/UtilsStore';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import { useAccountStore } from '@/stores/AccountStore';

const STORAGE_KEY = 'cleanwalk-form-data';

export function useCleanwalkForm() {
  // References and local state
  const dragDropRef = ref(null as any);
  
  // Load data from sessionStorage or use defaults
  const loadFromStorage = () => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error loading from sessionStorage:', error);
      return null;
    }
  };

  const storedData = loadFromStorage();
  const hasRestoredData = !!storedData;
  
  // Data for the new cleanwalk
  const newCleanwalk = ref({
    name: storedData?.newCleanwalk?.name || "",
    description: storedData?.newCleanwalk?.description || "",
    img_url: storedData?.newCleanwalk?.img_url || "",
    date_begin: storedData?.newCleanwalk?.date_begin || "",
    duration: storedData?.newCleanwalk?.duration || 0,
    pos_lat: storedData?.newCleanwalk?.pos_lat || 0,
    pos_long: storedData?.newCleanwalk?.pos_long || 0,
    address: storedData?.newCleanwalk?.address || "",
    city: storedData?.newCleanwalk?.city || "",
    participant_count_public: storedData?.newCleanwalk?.participant_count_public || false,
    user_id: useAccountStore().CurrentUser?.id || 0,
  });

  // Date and time data
  const dateCleanwalk = ref({
    dateDay: storedData?.dateCleanwalk?.dateDay || undefined,
    hourBegin: storedData?.dateCleanwalk?.hourBegin || '',
    hourEnd: storedData?.dateCleanwalk?.hourEnd || ''
  });

  // Stores used
  const showToast = useUtilsStore().showToast;
  const cleanwalkStore = useCleanwalkStore();
  const createCleanwalk = cleanwalkStore.createCleanwalk;


  // Function to save form data to sessionStorage
  const saveToStorage = () => {
    try {
      const dataToSave = {
        newCleanwalk: newCleanwalk.value,
        dateCleanwalk: dateCleanwalk.value
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  };

  // Function to clear form data from sessionStorage
  const clearStorage = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  };

  // Watch for changes and save to sessionStorage
  watch([newCleanwalk, dateCleanwalk], () => {
    saveToStorage();
  }, { deep: true });

  // Function to handle address selection
  const handleSelectAddress = (addressData: any) => {
    newCleanwalk.value.address = addressData.address;
    newCleanwalk.value.pos_lat = parseFloat(addressData.lat);
    newCleanwalk.value.pos_long = parseFloat(addressData.lon);
    newCleanwalk.value.city = addressData.city;
    // Data will be saved automatically via the watcher
  };

  // Function to set the date and time for start and end
  const setDate = () => {
    if (!dateCleanwalk.value.dateDay || !dateCleanwalk.value.hourBegin || !dateCleanwalk.value.hourEnd) {
      return { ok: false as const, reason: 'missing' as const };
    }
    const startDate = set(parse(dateCleanwalk.value.dateDay, 'yyyy-MM-dd', new Date()), {
      hours: parseInt(dateCleanwalk.value.hourBegin.split(':')[0]),
      minutes: parseInt(dateCleanwalk.value.hourBegin.split(':')[1]),
    });

    if (startDate.getTime() < Date.now()) {
      showToast('La date de début ne peut pas être dans le passé', false);
      return { ok: false as const, reason: 'past' as const };
    }

    // Conversion en string ISO pour Prisma/Backend
    newCleanwalk.value.date_begin = startDate.toISOString();

    const endDate = set(parse(dateCleanwalk.value.dateDay, 'yyyy-MM-dd', new Date()), {
      hours: parseInt(dateCleanwalk.value.hourEnd.split(':')[0]),
      minutes: parseInt(dateCleanwalk.value.hourEnd.split(':')[1]),
    });

    const duration = differenceInMinutes(endDate, startDate);

    newCleanwalk.value.duration = duration;
    // Data will be saved automatically via the watcher
    return { ok: true as const };
  };

  // Function to upload the image and create the cleanwalk
  const upload = async () => {
    console.log('Uploading image and creating cleanwalk...');
    try {
      // Try to upload image if it exists and dragDropRef is available
      if (dragDropRef.value) {
        try {
          const response = await dragDropRef.value.handleUpload();
          console.log('Image upload response:', response);
          if (response) {
            newCleanwalk.value.img_url = response;
          }
        } catch (error) {
          console.log('No image uploaded, using default cover');
        }
      }
      
      // If no image URL, use default cover image
      if (!newCleanwalk.value.img_url) {
        newCleanwalk.value.img_url = new URL('@/assets/default_cover.webp', import.meta.url).href;
      }

      // Create cleanwalk with or without custom image
      const response_cw = await createCleanwalk(newCleanwalk.value);
      if (response_cw) {
        // Clear form data from storage after successful creation
        clearStorage();
        showToast('Your cleanwalk has been successfully published', true);
        setTimeout(() => {
          router.push({ name: 'map' }).then(() => router.go(0));
        }, 1000);
      } else {
        showToast('Error while creating the event', false);
      }
    } catch (error) {
      showToast('Error during image upload', false);
    }
  };



  return {
    dragDropRef,
    newCleanwalk,
    dateCleanwalk,
    handleSelectAddress,
    setDate,
    upload,
    clearStorage, // Export clearStorage for manual clearing if needed
    hasRestoredData, // Export to let components know if data was restored
  };
}
