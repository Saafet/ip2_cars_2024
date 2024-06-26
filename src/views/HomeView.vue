<template>
  <v-container>
    <v-row>
      <v-col
          v-for="book in books"
          :key="book.title"
          cols="4"
      >
        <v-card height="200"></v-card>
        <h3>{{ book.title }}</h3>
        <h4>{{ book.author}}</h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import { defineComponent } from 'vue';

// Components
//import HelloWorld from '../components/HelloWorld.vue';

export default {
  name: 'HomeView',

  data() {
    return {
      test: 'Testna varijabla',
      books: []
    }
  },

  created() {
    console.log('created')
    this.getData();
  },

  methods: {
    getData() {
      let api = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=BnJg71ErAjBjY0N1iOlpRUugSS0F2zr5"
      this.axios.get(api).then((response) => {
        console.log(response.data)
        this.books = response.data.results
      })
    }
  }

  //components: {
    //HelloWorld,
  //},
}
</script>
