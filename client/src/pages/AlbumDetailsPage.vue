<script setup>
import { AppState } from '@/AppState.js';
import { albumsService } from '@/services/AlbumsService.js';
import { watchersService } from '@/services/WatchersService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const album = computed(() => AppState.activeAlbum)
const account = computed(() => AppState.account)
const watcherProfiles = computed(() => AppState.watcherProfiles)

const route = useRoute()

onMounted(() => {
  getAlbumById()
  getWatchersByAlbumId()
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

async function archiveAlbum() {
  try {
    const confirmed = await Pop.confirm(`Are you sure you want to ${album.value.archived ? 'unarchive' : 'archive'} ${album.value.title}?`)
    if (!confirmed) {
      return
    }
    const albumId = route.params.albumId
    await albumsService.archiveAlbum(albumId)
  }
  catch (error) {
    Pop.error(error, 'Could not archive album')
    logger.error('COULD NOT ARCHIVE ALBUM')
  }
}

async function getWatchersByAlbumId() {
  try {
    const albumId = route.params.albumId
    await watchersService.getWatchersByAlbumId(albumId)
  } catch (error) {
    Pop.error(error, 'Could not get watchers')
    logger.error('COULD NOT GET WATCHERS')
  }
}

async function createWatcher() {
  try {
    const watcherData = { albumId: route.params.albumId }
    await watchersService.createWatcher(watcherData)
  } catch (error) {
    Pop.error(error, 'Could not cREATE watcher')
    logger.error('COULD NOT CREATE WATCHER')
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
              <p v-if="album.archived" class="text-center">
                <span class="mdi mdi-alert text-warning"></span>
                This album has been archived and is no longer accepting new pictures
                <span class="mdi mdi-alert text-warning"></span>
              </p>
            </div>
            <div class="d-flex justify-content-between align-items-end">
              <div class="d-flex gap-2">
                <div class="bg-info px-4 py-1 rounded-pill">
                  {{ album.category }}
                </div>
                <button @click="archiveAlbum()" v-if="album.creatorId == account?.id"
                  class="btn btn-danger rounded-pill text-light">
                  {{ album.archived ? 'Unarchive Album' : 'Archive Album' }}
                  <span class="mdi" :class="album.archived ? 'mdi-publish' : 'mdi-close-circle'"></span>
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
    <div class="row">
      <!-- ANCHOR watchers -->
      <div class="col-md-3">
        <div class="d-flex mb-3">
          <div class="bg-dark-glass rounded p-2 flex-grow-1">
            <span class="d-block">{{ album.watcherCount }}</span>
            <span>Watchers</span>
          </div>
          <button @click="createWatcher()" class="btn btn-success">
            <span class="mdi mdi-account-plus d-block"></span>
            <span>Join</span>
          </button>
        </div>
        <div>
          <div v-for="watcher in watcherProfiles" :key="watcher.id">
            <img :src="watcher.profile.picture" :alt="watcher.profile.name" class="watcher-profile-img">
          </div>
        </div>
      </div>
      <!-- ANCHOR pictures -->
      <div class="col-md-9"></div>
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
  background-position: center;
}

.creator-picture {
  height: 5rem;
}

// TODO make this look good
.watcher-profile-img {}
</style>