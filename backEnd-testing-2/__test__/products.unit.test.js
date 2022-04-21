const request = require('supertest');
const app = require('../src/app');

const {
  saveProduct,
  getProducts,
  getProductId,
  updateProductID,
} = require('../src/data/product-data');

jest.mock('../src/data/product-data.js');

afterEach(() => {
  saveProduct.mockClear();
  getProducts.mockClear();
  getProductId.mockClear();
  updateProductID.mockClear();
});

describe('products unit test', () => {
  test('POST /products', async () => {
    saveProduct.mockReturnValueOnce(
      Promise.resolve({
        name: 'fake',
        size: 1,
        description: 'test',
        _id: 'abc',
      })
    );
    const response = await request(app)
      .post('/products')
      .send({
        name: 'fake',
        size: 1,
        description: 'test',
      })
      .expect(201);
    expect(response.body).toEqual({
      name: 'fake',
      size: 1,
      description: 'test',
      _id: 'abc',
    });
  });

  test('GET /products', async () => {
    getProducts.mockReturnValueOnce({});
    const response = await request(app).get('/products').expect(200);
    expect(response.body).toEqual({});
  });

  test('GET /products/:id', async () => {
    getProductId.mockReturnValueOnce({
      name: 'fake',
      size: 1,
      description: 'test',
      _id: 'abc',
    });
    const response = await request(app).get('/products/abc').expect(200);
    expect(getProductId).toHaveBeenCalledWith('abc');
    expect(response.body).toEqual({
      name: 'fake',
      size: 1,
      description: 'test',
      _id: 'abc',
    });
  });

  test.only('PUT /products/:id', async () => {
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
});
