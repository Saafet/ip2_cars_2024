<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                v-bind="activatorProps"
                color="surface-variant"
                text="Unesi knjigu"
                variant="flat"
            ></v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Unesite podatke">
              <v-card-text>
                <NovaForm></NovaForm>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    text="Unesi"
                    @click="isActive.value = false; successAlert=true;"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-alert v-if="showAlert" type="success" v-model="successAlert">
        Uspjeno ste unjeli knjigu
      </v-alert>
    </v-col>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
            v-model="search"
            label="Trazi po nazivu knjige"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            :loading="isLoading"
            single-line
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
            v-model="author"
            label="Trazi po imenu autora"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            :loading="isLoading"
            single-line
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          v-for="book in books"
          :key="book.title"
          cols="12"
          md="3"
      >
        <book :book="book"></book>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-pagination
            v-model="page"
            total-visible="10"
            :length="totalBooks/perPage"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import { defineComponent } from 'vue';

// Components
//import HelloWorld from '../components/HelloWorld.vue';
import Book from "@/components/BookComponent.vue";
import NovaForm from "@/components/NovaForm.vue";

export default {
  name: 'HomeView',

  components: {
    NovaForm,
    Book
  },

  data() {
    return {
      test: 'Testna varijabla',
      books: [],
      page: 1,
      totalBooks: 0,
      perPage: 20,
      search: '',
      author: '',
      isLoading: false,
      isLoadingAuthor: false,
      successAlert: false,
      showAlert: false,
      alertTimeout: 10000
    }
  },

  mounted() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, this.alertTimeout);
  },

  created() {
    console.log('created')
    this.getData();
  },

  methods: {
    getData() {
      let api = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=BnJg71ErAjBjY0N1iOlpRUugSS0F2zr5"
      this.axios.get(api, {
        params: {
          'offset': this.perPage * (this.page - 1),
          'title': this.search,
          'author': this.author
        }
      }).then((response) => {
        console.log(response.data)
        this.books = response.data.results
        this.totalBooks = response.data.num_results
        this.isLoading = false
        this.isLoadingAuthor = false
      })
    },
    fetchEntriesDebounced() {
      clearTimeout(this._searchTimerId)
      this._searchTimerId = setTimeout(() => {
        this.getData()
      }, 500) /* 500ms throttle */
    },
  },

  watch: {
    page: function () {
      this.getData();
    },
    search (val) {
      if (!val) {
        return
      }
      this.books = []
      this.page = 1
      this.isLoading = true
      this.fetchEntriesDebounced()
    },
    author (val) {
      if (!val) {
        return
      }
      this.books = []
      this.page = 1
      this.isLoading = true
      this.fetchEntriesDebounced()
    }
  }
}
</script>
