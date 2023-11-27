<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useAccountStore } from './stores/AccountStore';

const user = useAccountStore();
user.loginWithToken().then(result => {
  console.log('login with cookie result: ' + result);
});

</script>

<template>
  <RouterView />
</template>
