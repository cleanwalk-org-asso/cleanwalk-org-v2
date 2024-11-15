// src/composables/useCleanwalkForm.js
import { ref } from 'vue';
import { set, parse, differenceInMinutes, format } from 'date-fns';
import router from '@/router';
import { useUtilsStore } from '@/stores/UtilsStore';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import { useAccountStore } from '@/stores/AccountStore';

export function useCleanwalkForm() {
  // References and local state
  const progress = ref(1);
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
    let startDate = set(parse(dateCleanwalk.value.dateDay, 'yyyy-MM-dd', new Date()), {
      hours: parseInt(dateCleanwalk.value.hourBegin.split(':')[0]),
      minutes: parseInt(dateCleanwalk.value.hourBegin.split(':')[1]),
    });

    let formattedStartDate = format(startDate, 'yyyy-MM-dd HH:mm:ss');

    let endDate = set(parse(dateCleanwalk.value.dateDay, 'yyyy-MM-dd', new Date()), {
      hours: parseInt(dateCleanwalk.value.hourEnd.split(':')[0]),
      minutes: parseInt(dateCleanwalk.value.hourEnd.split(':')[1]),
    });

    let duration = differenceInMinutes(endDate, startDate);

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
            router.push('/').then(() => router.go(0));
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

  // Handling next and previous buttons
  const next = () => {
    if (progress.value === 1 && !newCleanwalk.value.name) {
      showToast('Please enter a name for your event', false);
      return;
    }
    if (progress.value === 2 && !newCleanwalk.value.address) {
      showToast('Please enter an address for your event', false);
      return;
    }
    if (progress.value === 3) {
      setDate();
      if (!newCleanwalk.value.date_begin || !newCleanwalk.value.duration || newCleanwalk.value.duration < 0) {
        showToast('Please enter a valid start and end time', false);
        return;
      }
    }
    if (progress.value === 4 && !newCleanwalk.value.description) {
      showToast('Please enter a description for your event', false);
      return;
    }
    if (progress.value === 6) {
      upload();
      return;
    }

    progress.value += 1;
  };

  const back = () => {
    if (progress.value === 1) {
      router.push('/add');
      return;
    }
    progress.value -= 1;
  };

  return {
    progress,
    dragDropRef,
    newCleanwalk,
    dateCleanwalk,
    handleSelectAddress,
    setDate,
    upload,
    next,
    back
  };
}
