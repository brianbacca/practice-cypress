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
    const response = await request(app)
      .get(`/products/${product._id}`)
      .expect(200);
    expect(getProductId).toHaveBeenCalledWith(product._id);
    expect(response.body).toEqual(product);
  });

  test('PUT /products/:id', async () => {
    updateProductID.mockReturnValueOnce(
      Promise.resolve({
        name: 'update',
        size: 10,
        description: 'pass',
        _id: '6261995ef32543a6eaf9a6a8',
      })
    );
    const response = await request(app)
      .put('/products/6261995ef32543a6eaf9a6a8')
      .send({
        name: 'update',
        size: 10,
        description: 'pass',
      })
      .expect(201);
    expect(updateProductID).toHaveBeenCalledWith(
      { id: '6261995ef32543a6eaf9a6a8' },
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
      _id: '6261995ef32543a6eaf9a6a8',
    });
  });

  test('DELETE /products/:id', async () => {
    const product = buildProduct();
    deleteProductID.mockReturnValueOnce(product);
    const response = await request(app)
      .delete(`/products/${product._id}`)
      .expect(200);
    expect(deleteProductID).toHaveBeenCalledWith({ id: product._id });
    expect(response.body).toEqual(product);
  });

  test('POST /products validations', async () => {
    const response = await request(app).post('/products').expect(400);
    expect(response.body).toEqual({
      error: 'name, size, and description are required',
    });
  });

  test('GET /products/:id validation of the id', async () => {
    const invalidId = 'cba';
    const response = await request(app)
      .get(`/products/${invalidId}`)
      .expect(400);

    expect(response.body).toEqual({
      error: `the ${invalidId} is not a valid id`,
    });
  });

  test('PUT /products/:id valdiate id', async () => {
    const invalidId = 'cba';
    const response = await request(app)
      .put(`/products/${invalidId}`)
      .expect(400);
    expect(response.body).toEqual({
      error: `the ${invalidId} is not a valid id`,
    });
  });

  test('PUT /products/:id valdiate required value', async () => {
    const product = buildProduct();

    const response = await request(app)
      .put(`/products/${product._id}`)
      .expect(400);
    expect(response.body).toEqual({
      error: 'name, size, and description are required',
    });
  });

  test('DELETE /products/:id validate id', async () => {
    const invalidId = 'cba';
    const response = await request(app)
      .delete(`/products/${invalidId}`)
      .expect(400);
    expect(response.body).toEqual({
      error: `the ${invalidId} is not a valid id`,
    });
  });

  test('GET /products error handler', async () => {
    getProducts.mockImplementation(() => {
      throw new Error('test');
    });
    const response = await request(app)
      .get('/products')
      .set('Authorization', 'Bearer myToken')
      .expect(500);
    expect(response.body).toEqual({ message: 'something is wrong' });
  });
});
