const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Book = require('./models/Book');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kreiranje knjige
app.post('/api/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Dohvatanje svih knjiga
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.send(books);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Dohvatanje jedne knjige
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Ažuriranje knjige
app.patch('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Brisanje knjige
app.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/booksDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch(err => console.error('Could not connect to MongoDB', err));
