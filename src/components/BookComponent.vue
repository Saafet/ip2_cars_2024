<template>
  <v-card>
    <v-card-title>{{ book.title }}</v-card-title>
    <v-card-subtitle>{{ book.author }}</v-card-subtitle>
    <v-card-text>Price: {{ book.price }}</v-card-text>
    <v-card-actions>
      <v-btn @click="$emit('editBook', book)">Uredi</v-btn>
      <v-btn @click="$emit('deleteBook', book)">Obrisi</v-btn> <!-- Emit entire book object -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'BookComponent',
  props: {
    book: Object
  }
};
</script>
