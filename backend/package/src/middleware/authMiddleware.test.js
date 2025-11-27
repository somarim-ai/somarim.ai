
const request = require('supertest');
const express = require('express');
const authMiddleware = require('./authMiddleware');

// Mock firebase-admin
jest.mock('firebase-admin', () => ({
  credential: {
    cert: jest.fn(),
  },
  initializeApp: jest.fn(),
  auth: () => ({
    verifyIdToken: jest.fn(async (token) => {
      if (token === 'valid-token') {
        return { uid: 'test-user' };
      }
      throw new Error('Invalid token');
    }),
  }),
}));

const app = express();
app.use(authMiddleware);
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Success', user: req.user });
});

describe('Auth Middleware', () => {
  it('should return 401 if no token is provided', async () => {
    const res = await request(app).get('/test');
    expect(res.statusCode).toEqual(401);
    expect(res.body.error).toBe('Unauthorized: No token provided');
  });

  it('should return 403 if an invalid token is provided', async () => {
    const res = await request(app)
      .get('/test')
      .set('Authorization', 'Bearer invalid-token');
    expect(res.statusCode).toEqual(403);
    expect(res.body.error).toBe('Unauthorized: Invalid token');
  });

  it('should call next() if a valid token is provided', async () => {
    const res = await request(app)
      .get('/test')
      .set('Authorization', 'Bearer valid-token');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Success');
    expect(res.body.user).toEqual({ uid: 'test-user' });
  });

  it('should log an error if the environment is not \'test\'', async () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await request(app)
      .get('/test')
      .set('Authorization', 'Bearer invalid-token');

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
    process.env.NODE_ENV = originalNodeEnv;
  });
});
