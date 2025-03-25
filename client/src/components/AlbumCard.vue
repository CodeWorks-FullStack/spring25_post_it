<script setup>
import { Album } from '@/models/Album.js';

defineProps({
  album: { type: Album, required: true }
})
</script>


<template>
  {{ album.title }}
</template>


<style lang="scss" scoped></style>