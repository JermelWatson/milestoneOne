import request from 'supertest';
import app from '../app.js';
import login from '../routes/login.js';
import sinon from 'sinon';
  // For using Chai's assertion library


import { connection } from '../database/database.js';

const { expect } = chai;

describe('Login API', () => {
  afterEach(() => {
    sinon.restore(); // Restore mocked methods after each test
  });

  it('should log in successfully with valid credentials', async () => {
    const mockResult = [{ email: 'valid_user@example.com', password: 'correct_password' }];
    sinon.stub(connection, 'execute').yields(null, mockResult);

    const response = await request(login)
      .post('/login')
      .send({
        email: 'valid_user@example.com',
        password: 'correct_password',
      });

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Log in successful');
    expect(response.body.data).to.exist;
  });

  it('should return an error for an invalid password', async () => {
    const mockResult = [{ email: 'valid_user@example.com', password: 'hashed_correct_password' }];
    sinon.stub(connection, 'execute').yields(null, mockResult);

    const response = await request(login)
      .post('/login')
      .send({
        email: 'valid_user@example.com',
        password: 'wrong_password',
      });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('Invalid password');
  });

  it('should return a 404 for non-existent user', async () => {
    sinon.stub(connection, 'execute').yields(null, []);

    const response = await request(login)
      .post('/login')
      .send({
        email: 'nonexistent_user@example.com',
        password: 'password',
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('User does not exist. Please sign up.');
  });
});

describe('Sign in API', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should add a new user and return a success response', async () => {
    const hashedPassword = 'hashedPassword123';
    const mockResult = { affectedRows: 1, insertId: 42 };

    sinon.stub(connection, 'execute').yields(null, mockResult);
    sinon.stub(require('../utils/helper.js'), 'HashedPassword').returns(hashedPassword);

    const userData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      is_admin: false,
      token: 'dummyToken123',
    };

    const response = await request(app).post('/signin').send(userData);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      status: 200,
      message: 'User has been added',
      data: mockResult,
    });
  });

  it('should return an error response if the database fails', async () => {
    const errorMessage = 'Database error';
    sinon.stub(connection, 'execute').yields(new Error(errorMessage));

    const userData = {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
      is_admin: true,
      token: 'dummyToken456',
    };

    const response = await request(app).post('/signin').send(userData);

    expect(response.status).to.equal(500);
    expect(response.body.error).to.equal(errorMessage);
  });
});

describe('POST /verify', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return success when the verification code matches', async () => {
    const mockResult = [{ email: 'test@example.com', token: 1234 }];
    sinon.stub(connection, 'execute').yields(null, mockResult);

    const requestBody = {
      email: 'test@example.com',
      code: 1234,
    };

    const response = await request(app).post('/verify').send(requestBody);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      status: 200,
      message: 'Verification successful',
      data: mockResult,
    });
  });

  it('should return an error when the verification code does not match', async () => {
    const mockResult = [{ email: 'test@example.com', token: 1234 }];
    sinon.stub(connection, 'execute').yields(null, mockResult);

    const requestBody = {
      email: 'test@example.com',
      code: 5678,
    };

    const response = await request(app).post('/verify').send(requestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      status: 400,
      message: 'Inccorect verification code',
      data: [],
    });
  });

  it('should handle a database error gracefully', async () => {
    const errorMessage = 'Database error';
    sinon.stub(connection, 'execute').yields(new Error(errorMessage));

    const requestBody = {
      email: 'test@example.com',
      code: 1234,
    };

    const response = await request(app).post('/verify').send(requestBody);

    expect(response.status).to.equal(500);
    expect(response.body.error).to.equal(errorMessage);
  });
});

