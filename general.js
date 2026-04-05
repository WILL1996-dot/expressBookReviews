const express = require('express');
const axios = require('axios');
const books = require('./booksdb.js');

const public_users = express.Router();

// Task 1
public_users.get('/', (req, res) => {
  res.send(JSON.stringify(books, null, 4));
});

// Task 2
public_users.get('/isbn/:isbn', (req, res) => {
  res.json(books[req.params.isbn] || "Book not found");
});

// Task 3
public_users.get('/author/:author', (req, res) => {
  let result = Object.values(books).filter(
    b => b.author.toLowerCase() === req.params.author.toLowerCase()
  );
  res.json(result);
});

// Task 4
public_users.get('/title/:title', (req, res) => {
  let result = Object.values(books).filter(
    b => b.title.toLowerCase() === req.params.title.toLowerCase()
  );
  res.json(result);
});

// Task 5
public_users.get('/review/:isbn', (req, res) => {
  res.json(books[req.params.isbn]?.reviews || "No reviews");
});


// Tasks 10–13 (Async)

// Task 10
public_users.get('/async/books', async (req, res) => {
  const response = await axios.get('http://localhost:5000/');
  res.json(response.data);
});

// Task 11
public_users.get('/async/isbn/:isbn', async (req, res) => {
  const response = await axios.get(`http://localhost:5000/isbn/${req.params.isbn}`);
  res.json(response.data);
});

// Task 12
public_users.get('/async/author/:author', async (req, res) => {
  const response = await axios.get(`http://localhost:5000/author/${req.params.author}`);
  res.json(response.data);
});

// Task 13
public_users.get('/async/title/:title', async (req, res) => {
  const response = await axios.get(`http://localhost:5000/title/${req.params.title}`);
  res.json(response.data);
});

module.exports.general = public_users;