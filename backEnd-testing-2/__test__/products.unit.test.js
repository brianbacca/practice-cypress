const request = require('supertest');
const app = require('../src/app');

const {
  saveProduct,
  getProducts,
  getProductId,
  updateProductID,
  deleteProductID,
} = require('../src/data/product-data');
const { buildProduct } = require('../src/__fixture__/product-fixture');

jest.mock('../src/data/product-data.js');

afterEach(() => {
  saveProduct.mockClear();
  getProducts.mockClear();
  getProductId.mockClear();
  updateProductID.mockClear();
  deleteProductID.mockClear();
});

describe('products unit test', () => {
  test('POST /products', async () => {
    const product = buildProduct();
    saveProduct.mockReturnValueOnce(Promise.resolve(product));
    const response = await request(app)
      .post('/products')
      .send({
        name: product.name,
        size: product.size,
        description: product.description,
      })
      .expect(201);
    expect(response.body).toEqual(product);
  });

  test('GET /products', async () => {
    getProducts.mockReturnValueOnce({});
    const response = await request(app).get('/products').expect(200);
    expect(response.body).toEqual({});
  });

  test('GET /products/:id', async () => {
    const product = buildProduct();
    getProductId.mockReturnValueOnce(product);
    const response = await request(app).get('/products/abc').expect(200);
    expect(getProductId).toHaveBeenCalledWith('abc');
    expect(response.body).toEqual(product);
  });

  test('PUT /products/:id', async () => {
    updateProductID.mockReturnValueOnce(
      Promise.resolve({
        name: 'update',
        size: 10,
        description: 'pass',
        _id: 'abc',
      })
    );
    const response = await request(app)
      .put('/products/abc')
      .send({
        name: 'update',
        size: 10,
        description: 'pass',
      })
      .expect(201);
    expect(updateProductID).toHaveBeenCalledWith(
      { id: 'abc' },
      {
        name: 'update',
        size: 10,
        description: 'pass',
      }
    );
    expect(response.body).toEqual({
      name: 'update',
      size: 10,
      description: 'pass',
      _id: 'abc',
    });
  });

  test('DELETE /products/:id', async () => {
    const product = buildProduct();
    deleteProductID.mockReturnValueOnce(product);
    const response = await request(app).delete('/products/abc').expect(200);
    expect(deleteProductID).toHaveBeenCalledWith({ id: 'abc' });
    expect(response.body).toEqual(product);
  });
});
