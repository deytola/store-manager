const products = [
  {
    id: 1,
    itemName: 'Nike Hat',
    category: 'Male clothing',
    price: 3000,
    minimumQuantityAllowed: 10,
  },
  {
    id: 2,
    itemName: 'Nike shoes',
    category: 'Male clothing',
    price: 13000,
    minimumQuantityAllowed: 10,
  },
  {
    id: 3,
    itemName: 'Nike AirMax',
    category: 'Female clothing',
    price: 23000,
    minimumQuantityAllowed: 20,
  },
];


// List all the products
const getProducts = (req, res) => res.json(products);

// Route to get a specific product
const getProduct = (req, res) => {
  const currentProduct = products.filter((product) => {
    if (product.id === parseInt(req.params.id, 10)) {
      return true;
    }
    return false; // This had to be created to solve an error with the arrow function
  });
  // console.log(products.filter(product => product.id === parseInt(req.params.id, 10)));

  if (currentProduct.length === 1) {
    return res.json(currentProduct[0]);
  }
  res.status(404); // Set status to 404 since product was not found
  return res.json({ message: 'Not Found' });
};

// Route to post a product
const createProduct = (req, res) => {
  // Check if all fields are provided and are valid:
  if (!req.body.itemName
      || !req.body.category
        || req.body.price <= 0
      || !req.body.minimumQuantityAllowed) {
    res.status(400);
    return res.json({ message: 'Bad Request' });
  }
  const newId = Math.floor(Math.random() * 9000000) + 1000000;
  products.push({
    id: newId,
    itemName: req.body.itemName,
    category: req.body.category,
    price: req.body.price,
    minimumQuantityAllowed: req.body.minimumQuantityAllowed,
  });
  return res.json({ message: 'New product created.', location: `/api/v1/products/${newId}` });
};

// Route to update a product
const updateProduct = (req, res) => {
  // Check if all fields are provided and are valid:
  if (!req.body.itemName
    || !req.body.category
    || req.body.price <= 0
    || !req.params.id) {
    res.status(400);
    return res.json({ message: 'Bad Request' });
  }
  // Get the index of product with given id.

  const updateIndex = products.map(product => product.id).indexOf(parseInt(req.params.id, 10));

  if (updateIndex === -1) {
    // Product not found, create new
    products.push({
      id: req.params.id,
      itemName: req.body.itemName,
      category: req.body.category,
      price: req.body.price,
      minimumQuantityAllowed: req.body.minimumQuantityAllowed,
    });
    return res.json({ message: 'New product created.', location: `/api/v1/products/${req.params.id}` });
  }
  // Update existing product
  products[updateIndex] = {
    id: req.params.id,
    itemName: req.body.itemName,
    category: req.body.category,
    price: req.body.price,
    minimumQuantityAllowed: req.body.minimumQuantityAllowed,
  };
  return res.json({
    message: `Product id ${req.params.id} updated.`,
    location: `/api/v1/products/${req.params.id}`,
  });
};

// Route to delete a product
const removeProduct = (req, res) => {
  const removeIndex = products.map(
    product => product.id,
  ).indexOf(parseInt(req.params.id, 10)); // Get the index of product with given id.
  if (removeIndex === -1) {
    res.json({ message: 'Product not found' });
  } else {
    products.splice(removeIndex, 1);
    return res.send({ message: `Product id ${req.params.id} removed.` });
  }
};

export {
  getProducts, getProduct, updateProduct, createProduct, removeProduct,
};
