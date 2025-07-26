// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Simple user store (hardcoded)
const users = [{ username: "test", password: "pass123" }];

// Simple token sim (not secure)
const validTokens = new Set();

// Items storage in-memory
let items = [];
let currentId = 1;

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = `token-${Math.random().toString(36).substring(2, 15)}`;
    validTokens.add(token);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Middleware to check auth token
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }
  const token = auth.substring(7);
  if (!validTokens.has(token)) {
    return res.status(403).json({ error: "Invalid token" });
  }
  next();
}

app.use(authMiddleware);

// CRUD endpoints
app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  const item = { id: currentId++, text };
  items.push(item);
  res.status(201).json(item);
});

app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  const item = items.find((i) => i.id === id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  item.text = text;
  res.json(item);
});

app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return res.status(404).json({ error: "Item not found" });
  items.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
