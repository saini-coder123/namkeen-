const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const { nanoid } = require('nanoid');

const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const CARTS_FILE = path.join(DATA_DIR, 'carts.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

async function readJson(filePath, fallback = null) {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

async function ensureDataFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  const defaultProducts = [
    {
      id: 'sev',
      name: { en: 'Sev', hi: 'सेव', gu: 'સેવ' },
      price: 120,
      unit: '250g',
      image: 'https://images.unsplash.com/photo-1616947696400-443894fa5b07?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'puri',
      name: { en: 'Puri', hi: 'पुरी', gu: 'પુરિ' },
      price: 100,
      unit: '200g',
      image: 'https://images.unsplash.com/photo-1615421252074-d1a1bb070192?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'bhujia',
      name: { en: 'Bhujia', hi: 'भुजिया', gu: 'ભુજીયા' },
      price: 130,
      unit: '250g',
      image: 'https://images.unsplash.com/photo-1627939997520-7f397e35c525?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'mixture',
      name: { en: 'Mixture', hi: 'मिक्सचर', gu: 'મિશ્રણ' },
      price: 140,
      unit: '250g',
      image: 'https://images.unsplash.com/photo-1563245375-76e66b5daa73?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'kachori',
      name: { en: 'Kachori', hi: 'कचोरी', gu: 'કચૌરી' },
      price: 90,
      unit: '180g',
      image: 'https://images.unsplash.com/photo-1591669270145-61b52ec0f1e2?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'farsan',
      name: { en: 'Farsan', hi: 'फरशन', gu: 'ફરસાણ' },
      price: 110,
      unit: '220g',
      image: 'https://images.unsplash.com/photo-1590432667813-8b971c1c59c7?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const ensureFile = async (file, defaultContent) => {
    try {
      await fs.access(file);
    } catch {
      await writeJson(file, defaultContent);
    }
  };

  await ensureFile(PRODUCTS_FILE, defaultProducts);
  await ensureFile(CARTS_FILE, []);
  await ensureFile(ORDERS_FILE, []);
}

// Products
app.get('/api/products', async (req, res) => {
  const products = await readJson(PRODUCTS_FILE, []);
  res.json(products);
});

app.post('/api/admin/products', async (req, res) => {
  const products = await readJson(PRODUCTS_FILE, []);
  const incoming = req.body;

  if (!incoming || typeof incoming !== 'object') {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  // update an existing product
  if (incoming.id) {
    const existing = products.find((p) => p.id === incoming.id);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }
    existing.name = incoming.name || existing.name;
    existing.price = typeof incoming.price === 'number' ? incoming.price : existing.price;
    existing.unit = incoming.unit || existing.unit;
    existing.image = incoming.image || existing.image;
    await writeJson(PRODUCTS_FILE, products);
    return res.json(existing);
  }

  // create new product
  const id = nanoid(8);
  const newProduct = {
    id,
    name: incoming.name || { en: 'New product', hi: 'नया उत्पाद', gu: 'નવા ઉત્પાદન' },
    price: typeof incoming.price === 'number' ? incoming.price : 100,
    unit: incoming.unit || '250g',
    image: incoming.image || 'https://images.unsplash.com/photo-1588805096936-03d0b0f6b1fd?auto=format&fit=crop&w=800&q=70',
  };
  products.push(newProduct);
  await writeJson(PRODUCTS_FILE, products);
  res.status(201).json(newProduct);
});

// Cart persistence
app.get('/api/cart/:userId', async (req, res) => {
  const userId = req.params.userId;
  const carts = await readJson(CARTS_FILE, []);
  const cart = carts.find((c) => c.userId === userId);
  res.json(cart ? cart.items : []);
});

app.post('/api/cart/:userId', async (req, res) => {
  const userId = req.params.userId;
  const items = Array.isArray(req.body) ? req.body : [];
  const carts = await readJson(CARTS_FILE, []);
  const existingIndex = carts.findIndex((c) => c.userId === userId);

  const entry = { userId, items };
  if (existingIndex >= 0) {
    carts[existingIndex] = entry;
  } else {
    carts.push(entry);
  }
  await writeJson(CARTS_FILE, carts);
  res.json({ success: true });
});

// Orders
app.post('/api/orders', async (req, res) => {
  const payload = req.body;
  if (!payload || !payload.items || !Array.isArray(payload.items)) {
    return res.status(400).json({ error: 'Invalid order data.' });
  }

  const orders = await readJson(ORDERS_FILE, []);
  const order = {
    id: nanoid(10),
    createdAt: new Date().toISOString(),
    status: 'pending',
    ...payload,
  };
  orders.push(order);
  await writeJson(ORDERS_FILE, orders);

  res.json({ success: true, orderId: order.id });
});

app.get('/api/orders', async (req, res) => {
  const orders = await readJson(ORDERS_FILE, []);
  res.json(orders);
});

// Serve index by default (for SPA style)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

ensureDataFiles().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
