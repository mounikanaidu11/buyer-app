const fs = require('fs');

const categories = [
  { id: 1, name: 'Shoes' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Accessories' },
  { id: 4, name: 'Electronics' }
];

const items = {
  1: ['Running Shoes', 'Canvas Sneakers', 'Leather Loafers', 'Trekking Boots', 'Sports Sandals', 'Formal Oxfords'],
  2: ['Cotton T-Shirt', 'Denim Jacket', 'Slim Fit Jeans', 'Hooded Sweatshirt', 'Formal Shirt', 'Track Pants'],
  3: ['Leather Belt', 'Sports Cap', 'Canvas Backpack', 'Analog Watch', 'Sunglasses', 'Leather Wallet'],
  4: ['Wireless Earbuds', 'Bluetooth Speaker', 'Power Bank', 'Smart Watch', 'USB-C Charger', 'Phone Stand']
};

const products = [];
let id = 1;
for (const cat of categories) {
  items[cat.id].forEach((name, i) => {
    products.push({
      id,
      name,
      description: `${name} - good quality, comfortable and made to last.`,
      price: 299 + ((id * 137) % 4700),
      categoryId: cat.id,
      image: `https://picsum.photos/seed/product${id}/400/300`
    });
    id++;
  });
}

const db = { users: [], categories, products, cart: [], orders: [] };
fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log(`db.json created with ${categories.length} categories and ${products.length} products`);