const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Mouse", price: 19.99 }
];
let nextId = 3;

// ---------- GET /items ----------
app.get('/items', (req, res) => {
  res.status(200).json({
    success: true,
    count: items.length,
    data: items
  });
});

// ---------- POST /items ----------
app.post('/items', (req, res) => {
  let { name, price } = req.body;
  const errors = [];

  // Validate name
  if (name === undefined || typeof name !== 'string' || name.trim() === '') {
    errors.push("Field 'name' is required and must be a non-empty string.");
  } else {
    name = name.trim();
  }

  // Validate price
  if (price === undefined) {
    errors.push("Field 'price' is required.");
  } else if (typeof price !== 'number') {
    errors.push("Field 'price' must be a number.");
  } else if (price <= 0) {
    errors.push("Field 'price' must be a positive number.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  const newItem = { id: nextId++, name, price };
  items.push(newItem);
  res.status(201).json({
    success: true,
    data: newItem
  });
});

// ---------- (Bonus) GET /items/:id ----------
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ success: false, message: "Item not found" });
  }
  res.json({ success: true, data: item });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});