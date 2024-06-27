<template>
  <v-card height="200"
          class="book pa-2 d-flex flex-column">
    <h3 class="text-center book-title">{{ book.title }}</h3>
    <h5>{{ book.author}}</h5>
    <h6>Cijena:{{ book.price}}</h6>
  </v-card>
</template>

<script>
export default {
  props: ['book']
}
</script>

<style>
.book {
  background: khaki !important;
}

.book-title {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>