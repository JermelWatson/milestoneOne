import request from 'supertest';
import app from '../app'; // Ensure your Express app is properly exported

describe('Login API', () => {
  it('should log in successfully with valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'valid_user@example.com',
        password: 'correct_password',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Log in successful');
    expect(response.body.data).toBeDefined();
  });

  it('should return an error for invalid password', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'valid_user@example.com',
        password: 'wrong_password',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid password');
  });

  it('should return a 404 for non-existent user', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'nonexistent_user@example.com',
        password: 'password',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User does not exist. Please sign up.');
  });
});
