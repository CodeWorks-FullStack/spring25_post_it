<script setup>
import { AppState } from '@/AppState.js';
import AlbumCard from '@/components/AlbumCard.vue';
import { albumsService } from '@/services/AlbumsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const albums = computed(() => AppState.albums)

onMounted(() => {
  getAlbums()
})

async function getAlbums() {
  try {
    await albumsService.getAlbums()
  } catch (error) {
    Pop.error(error, 'Could not get albums')
    logger.error('COULD NOT GET ALBUMS', error)
  }
}
</script>

<template>
  <div class="container fredoka-font">
    <div class="row">
      <div class="col-12">
        <div class="border-bottom border-grey my-2">
          <span class="fs-5 fw-bold">Popular Albums</span>
        </div>
      </div>
      <div v-for="album in albums" :key="album.id" class="col-md-4">
        <AlbumCard :album="album" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
