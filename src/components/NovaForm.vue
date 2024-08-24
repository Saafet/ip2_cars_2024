<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
              v-model="title"
              :counter="10"
              label="Naziv"
              hide-details
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
              v-model="author"
              :counter="10"
              label="Autor"
              hide-details
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
              v-model="price"
              label="Cijena"
              type="number"
              hide-details
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn @click="submitForm">Uredi</v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: ['book'],
  data() {
    return {
      title: this.book ? this.book.title : '',
      author: this.book ? this.book.author : '',
      price: this.book ? this.book.price : '',
      valid: false
    };
  },
  methods: {
    submitForm() {
      if (this.valid && this.title && this.author && this.price) {
        const formData = {
          title: this.title,
          author: this.author,
          price: this.price,
          id: this.book ? this.book.id : null // Include ID if book exists
        };
        this.$emit('formSubmitted', formData);
      } else {
        alert('Molimo unesite sve podatke.');
      }
    }
  }
};
</script>
