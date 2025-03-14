// src/composables/useCleanwalkForm.js
import { ref } from 'vue';
import { set, parse, differenceInMinutes, format } from 'date-fns';
import router from '@/router';
import { useUtilsStore } from '@/stores/UtilsStore';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import { useAccountStore } from '@/stores/AccountStore';

export function useCleanwalkForm() {
  // References and local state
  const dragDropRef = ref(null as any);
  
  // Data for the new cleanwalk
  const newCleanwalk = ref({
    name: "",
    description: "",
    img_url: "",
    date_begin: "",
    duration: 0,
    pos_lat: 0,
    pos_long: 0,
    address: "",
    city: "",
    user_id: useAccountStore().CurrentUser?.id || 0,
  });

  // Date and time data
  const dateCleanwalk = ref({
    dateDay: undefined,
    hourBegin: '',
    hourEnd: ''
  });

  // Stores used
  const showToast = useUtilsStore().showToast;
  const createCleanwalk = useCleanwalkStore().createCleanwalk;

  // Function to handle address selection
  const handleSelectAddress = (addressData: any) => {
    newCleanwalk.value.address = addressData.address;
    newCleanwalk.value.pos_lat = parseFloat(addressData.lat);
    newCleanwalk.value.pos_long = parseFloat(addressData.lon);
    newCleanwalk.value.city = addressData.city;
  };

  // Function to set the date and time for start and end
  const setDate = () => {
    if (!dateCleanwalk.value.dateDay || !dateCleanwalk.value.hourBegin || !dateCleanwalk.value.hourEnd) {
      return;
    }
    const startDate = set(parse(dateCleanwalk.value.dateDay, 'yyyy-MM-dd', new Date()), {
      hours: parseInt(dateCleanwalk.value.hourBegin.split(':')[0]),
      minutes: parseInt(dateCleanwalk.value.hourBegin.split(':')[1]),
    });

    const formattedStartDate = format(startDate, 'yyyy-MM-dd HH:mm:ss');

    const endDate = set(parse(dateCleanwalk.value.dateDay, 'yyyy-MM-dd', new Date()), {
      hours: parseInt(dateCleanwalk.value.hourEnd.split(':')[0]),
      minutes: parseInt(dateCleanwalk.value.hourEnd.split(':')[1]),
    });

    const duration = differenceInMinutes(endDate, startDate);

    newCleanwalk.value.date_begin = formattedStartDate;
    newCleanwalk.value.duration = duration;
  };

  // Function to upload the image and create the cleanwalk
  const upload = async () => {
    if (!dragDropRef.value) {
      return;
    }
    try {
      const response = await dragDropRef.value.handleUpload();
      if (response) {
        newCleanwalk.value.img_url = response;
        const response_cw = await createCleanwalk(newCleanwalk.value);
        if (response_cw) {
          showToast('Your cleanwalk has been successfully published', true);
          setTimeout(() => {
            router.push({name: 'map'}).then(() => router.go(0));
          }, 1000);
        } else {
          showToast('Error while creating the event', false);
        }
      } else {
        showToast('Error during image upload', false);
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
  };
}
