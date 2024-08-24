<template>
  <v-container>
    <!-- Dijalog za unos knjige -->
    <v-dialog v-model="dialog" max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="primary"
            text="Unesi knjigu"
            variant="flat"
        ></v-btn>
      </template>
      <v-card>
        <v-card-title>
          Unesite podatke
        </v-card-title>
        <v-card-text>
          <NovaForm :book="selectedBook" @formSubmitted="handleFormSubmitted"></NovaForm>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Zatvori" @click="closeDialog"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dijalog za brisanje knjige -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title>Obriši knjigu</v-card-title>
        <v-card-text>
          <p>Da li ste sigurni da želite da obrišete knjigu sa ID-jem <strong>{{ deleteBookId }}</strong>?</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="confirmDelete">Obriši</v-btn>
          <v-btn @click="closeDeleteDialog">Otkaži</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- UI elementi -->
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
            v-model="search"
            label="Traži po nazivu knjige"
            :loading="isLoading"
            @input="getData"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
            v-model="author"
            label="Traži po imenu autora"
            :loading="isLoading"
            @input="getData"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="book in books" :key="book.id" cols="12" md="3">
        <book :book="book" @editBook="editBook" @deleteBook="openDeleteDialog"></book>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-pagination
            v-model="page"
            total-visible="10"
            :length="Math.ceil(totalBooks / perPage)"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import NovaForm from "@/components/NovaForm.vue";
import Book from "@/components/BookComponent.vue";

export default {
  name: 'HomeView',
  components: {
    NovaForm,
    Book
  },
  data() {
    return {
      books: [],
      page: 1,
      totalBooks: 0,
      perPage: 20,
      search: '',
      author: '',
      isLoading: false,
      dialog: false,
      selectedBook: null,
      deleteDialog: false,
      deleteBookId: ''
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleFormSubmitted(formData) {
      console.log('Form data submitted:', formData);
      const url = formData.id ? 'http://localhost/updateBook.php' : 'http://localhost/saveBook.php';
      axios.post(url, formData)
          .then(response => {
            if (response.data.status === 'success') {
              this.getData();
              this.closeDialog();
            } else {
              alert(response.data.message);
            }
          })
          .catch(error => {
            console.error('Error saving book:', error);
          });
    },
    getData() {
      this.isLoading = true;
      axios.get('http://localhost/getBooks.php', {
        params: {
          offset: this.perPage * (this.page - 1),
          limit: this.perPage,
          search: this.search,  // Traženje knjiga po naslovu
          author: this.author   // Traženje knjiga po autoru
        }
      })
          .then(response => {
            this.books = response.data.books;
            this.totalBooks = response.data.totalBooks;
            this.isLoading = false;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            this.isLoading = false;
          });
    },
    editBook(book) {
      this.selectedBook = book;
      this.dialog = true;
    },
    openDeleteDialog(book) {
      console.log('Open delete dialog with book:', book);
      this.deleteBookId = book.id; // Postavite samo ID
      console.log('Set deleteBookId to:', this.deleteBookId);
      this.deleteDialog = true;
    },
    confirmDelete() {
      console.log('Confirm delete with ID:', this.deleteBookId);
      if (this.deleteBookId) {
        axios.post('http://localhost/deleteBook.php', JSON.stringify({ id: this.deleteBookId }), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
            .then(response => {
              if (response.data.status === 'success') {
                this.getData();
                this.closeDeleteDialog();
              } else {
                alert(response.data.message);
              }
            })
            .catch(error => {
              console.error('Error deleting book:', error);
            });
      } else {
        alert('No book ID provided for deletion.');
      }
    },
    closeDialog() {
      this.dialog = false;
      this.selectedBook = null;
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
      this.deleteBookId = '';
    }
  }
};
</script>
