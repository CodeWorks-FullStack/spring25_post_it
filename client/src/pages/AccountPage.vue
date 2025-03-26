<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { watchersService } from '@/services/WatchersService.js';

const account = computed(() => AppState.account)

onMounted(() => {
  getMyWatchedAlbums()
})

async function getMyWatchedAlbums() {
  try {
    await watchersService.getMyWatchedAlbums()
  } catch (error) {
    Pop.error(error, 'could not get albums')
    logger.error('could not get albums'.toUpperCase(), error)
  }
}

</script>

<template>
  <div>
    <div v-if="account">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="text-center my-3">
              <span>Welcome back {{ account.name }}</span>
              <img :src="account.picture" :alt="account.name" class="account-img ms-3 round-picture">
              <p class="mt-3">You are watching 107 albums</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-img {
  height: 7rem;
}
</style>
