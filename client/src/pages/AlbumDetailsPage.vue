<script setup>
import { AppState } from '@/AppState.js';
import { albumsService } from '@/services/AlbumsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const album = computed(() => AppState.activeAlbum)

const route = useRoute()

onMounted(() => {
  getAlbumById()
})

async function getAlbumById() {
  try {
    const albumId = route.params.albumId
    await albumsService.getAlbumById(albumId)
  } catch (error) {
    Pop.error(error, 'Could not get album')
    logger.error('COULD NOT GET ALBUM')
  }
}

</script>


<template>
  <div v-if="album" class="container">
    <div class="row">
      <div class="col-12">
        <div class="rounded shadow album-details my-3 p-3 d-flex align-items-end"
          :style="{ backgroundImage: `url(${album.coverImg})` }">
          <div class="rounded bg-dark-glass p-2 flex-grow-1">
            <div class="mb-5">
              <h1 class="text-center">{{ album.title }}</h1>
              <p class="fs-4">{{ album.description }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-end">
              <div class="d-flex gap-2">
                <div class="bg-info px-4 py-1 rounded-pill">
                  {{ album.category }}
                </div>
                <button class="btn btn-danger rounded-pill text-light">
                  Archive Album <span class="mdi mdi-close-circle"></span>
                </button>
              </div>
              <div class="d-flex gap-2 align-items-end">
                <span>created by {{ album.creator.name }}</span>
                <img :src="album.creator.picture" :alt="album.creator.name" class="round-picture creator-picture">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Loading <span class="mdi mdi-pinwheel mdi-spin"></span></h1>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.album-details {
  min-height: 60dvh;
  background-size: cover;
}

.creator-picture {
  height: 5rem;
}
</style>