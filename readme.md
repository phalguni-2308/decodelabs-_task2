# Simple Backend API – Internship Submission

A REST API built with **Node.js** and **Express** that handles `GET` and `POST` requests with full input validation. Data is stored in‑memory.

## 🚀 Features

- `GET /items` – retrieve all items
- `POST /items` – add a new item (validates name & price)
- `GET /items/:id` – fetch a single item (bonus)
- Proper HTTP status codes: 200, 201, 400, 404
- Validation: `name` (non‑empty string), `price` (positive number)

## 🛠️ Tech Stack

- Node.js
- Express.js
- Nodemon (dev only)