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
        {{ album.title }}
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>