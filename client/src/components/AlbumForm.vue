<script setup>

const categories = ['aesthetics', 'food', 'games', 'animals', 'misc', 'vibes']

</script>


<template>
  <form>
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="albumTitle" placeholder="Album Title..." minlength="3" maxlength="25"
        required>
      <label for="albumTitle">Album Title</label>
    </div>
    <div class="form-floating mb-3">
      <input type="url" class="form-control" id="albumCoverImg" placeholder="Album Cover Image" maxlength="1000"
        required>
      <label for="albumCoverImg">Album Cover Image</label>
    </div>
    <div class="form-floating mb-3">
      <textarea class="form-control" placeholder="Album Description" id="albumDescription" minlength="15"
        maxlength="250"></textarea>
      <label for="albumDescription">Album Description</label>
    </div>
    <div class="form-floating mb-3">
      <select class="form-select" id="albumCategory" aria-label="Album Category" required>
        <option selected>Choose a category</option>
        <option v-for="category in categories" :key="'option ' + category" :value="category">
          {{ category }}
        </option>
      </select>
      <label for="albumCategory">Album Category</label>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>