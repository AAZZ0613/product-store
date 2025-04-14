const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let products = [];
let id = 1;

app.get('/api/products', (req, res) => res.json(products));

app.post('/api/products', (req, res) => {
  const product = { id: id++, name: req.body.name };
  products.push(product);
  res.status(201).json(product);
});

app.put('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    product.name = req.body.name;
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.delete('/api/products/:id', (req, res) => {
  products = products.filter((p) => p.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(5000, () => console.log('Server running on port 5000'));
