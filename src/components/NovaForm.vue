<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
            cols="12"
        >
          <v-text-field
              v-model="title"
              :counter="10"
              label="Naziv"
              hide-details
              required
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
        >
          <v-text-field
              v-model="author"
              :counter="10"
              label="Autor"
              hide-details
              required
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
        >
          <v-text-field
              v-model="price"
              label="Cijena"
              type="number"
              hide-details
              required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      author: '',
      price: ''
    }
  }
}
</script>
