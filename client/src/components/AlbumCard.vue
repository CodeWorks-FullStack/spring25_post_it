<script setup>
import { Album } from '@/models/Album.js';

defineProps({
  album: { type: Album, required: true }
})
</script>


<template>
  <div class="rounded shadow p-2 album-card mb-3 d-flex align-items-end"
    :style="{ backgroundImage: `url(${album.coverImg})` }">
    <div class="d-flex justify-content-between align-items-center bg-dark-glass rounded p-2 flex-grow-1">
      <!-- TODO show off random color -->
      <div>
        <p class="fw-bold mb-1">{{ album.title }}</p>
        <div>
          <img :src="album.creator.picture" :alt="'A picture of ' + album.creator.name" class="round-picture me-2">
          <span>{{ album.creator.name }}</span>
        </div>
      </div>
      <div>
        <span class="mdi mdi-account-multiple me-2"></span>
        <span>0</span>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.album-card {
  min-height: 30dvh;
  background-size: cover;
  background-position: center;
}

img {
  height: 2rem;
}
</style>