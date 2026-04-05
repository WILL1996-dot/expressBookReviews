const express = require('express');
const jwt = require('jsonwebtoken');
const books = require('./booksdb.js');

const regd_users = express.Router();

let users = [];

// Register
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing data" });
  }

  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: "User exists" });
  }

  users.push({ username, password });
  res.json({ message: "Registered successfully" });
});

// Login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) return res.status(401).json({ message: "Invalid login" });

  const token = jwt.sign({ username }, "access", { expiresIn: 3600 });

  req.session.authorization = { accessToken: token, username };

  res.json({ message: "Login successful" });
});

// Add/Modify review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const user = req.session.authorization.username;

  books[isbn].reviews[user] = review;

  res.json({ message: "Review added/updated" });
});

// Delete review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const user = req.session.authorization.username;

  delete books[isbn].reviews[user];

  res.json({ message: "Review deleted" });
});

module.exports.authenticated = regd_users;