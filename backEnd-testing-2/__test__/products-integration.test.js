const mongoose = require('mongoose');
const { connectDb, createUri, closeDb } = require('../src/db/mongo');
const request = require('supertest');
const app = require('../src/app');
const { buildProduct } = require('../src/__fixture__/product-fixture');
const { saveProduct } = require('../src/data/product-data');

beforeAll(async () => {
  const uri = await createUri();
  await connectDb({ uri: uri });
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await closeDb;
});

describe('Products Integration Test', () => {
  test('POST /products', async () => {
    const product = buildProduct();
    const response = await request(app)
      .post('/products')
      .send({
        name: product.name,
        size: product.size,
        description: product.description,
      })
      .expect(201);
    const { name, size, description, _id } = response.body;
    expect(name).toBe(product.name);
    expect(size).toBe(product.size);
    expect(description).toBe(product.description);
    expect(_id).toBeDefined();
  });

  test('GET /products empty values', async () => {
    const response = await request(app).get('/products').expect(200);
    expect(response.body).toEqual([]);
  });

  test('GET /products with values', async () => {
    const product = buildProduct();

    const productStored = await saveProduct(product);

    const { name, size, description, _id, __v } = productStored;

    const responseGet = await request(app).get('/products').expect(200);
    expect(responseGet.body).toEqual([
      { name, size, description, _id: String(_id), __v },
    ]);
  });

  test('GET /products/:id empty value', async () => {
    const response = await request(app)
      .get('/products/6262ef054f3083f93c7d1664')
      .expect(200);

    expect(response.body).toEqual(null);
  });
  test('GET /products/:id with value', async () => {
    const product = buildProduct();

    const productStored = await saveProduct(product);
    const { name, size, description, _id, __v } = productStored;

    const response = await request(app).get(`/products/${_id}`).expect(200);

    expect(response.body).toEqual({
      name,
      size,
      description,
      _id: String(_id),
      __v,
    });
  });

  test('PUT /products/:id', async () => {
    const product = buildProduct();

    const productStored = await saveProduct(product);
    const { _id, __v } = productStored;

    const newProductValues = {
      name: 'updated name',
      size: 12,
      description: 'new description',
    };

    const response = await request(app)
      .put(`/products/${_id}`)
      .send(newProductValues)
      .expect(201);
    expect(response.body).toEqual({
      ...newProductValues,
      _id: String(_id),
      __v,
    });
  });

  test('DELETE /products/:id', async () => {
    const product = buildProduct();

    const productStored = await saveProduct(product);
    const { name, size, description, _id, __v } = productStored;

    const response = await request(app).delete(`/products/${_id}`).expect(200);

    expect(response.body).toEqual({
      name,
      size,
      description,
      _id: String(_id),
      __v,
    });
  });
});
