
const request = require('supertest');
const express = require('express');
const causalRoutes = require('./causal');
const { getCausalLinks, getCausalAnomalies } = require('../controllers/causal');

jest.mock('../controllers/causal', () => ({
  getCausalLinks: jest.fn(),
  getCausalAnomalies: jest.fn(),
}));

const app = express();
app.use('/api/v1/causal', causalRoutes);

describe('Causal Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('should return a 200 and the causal links', async () => {
      const mockData = { timestamp: '2024-01-01T00:00:00.000Z', causalGraph: {} };
      getCausalLinks.mockResolvedValue(mockData);

      const res = await request(app).get('/api/v1/causal');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ success: true, result: mockData });
    });

    it('should return a 500 if there is an error', async () => {
      getCausalLinks.mockRejectedValue(new Error('Test Error'));

      const res = await request(app).get('/api/v1/causal');

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ success: false, error: 'Test Error' });
    });
  });

  describe('GET /anomalies', () => {
    it('should return a 200 and the anomalies', async () => {
      const mockAnomalies = [
        { id: 'anomaly-1', description: 'Unexpected correlation between events A and B', severity: 'high' },
        { id: 'anomaly-2', description: 'Temporal loop detected in sector 7', severity: 'critical' },
      ];
      getCausalAnomalies.mockResolvedValue({ anomalies: mockAnomalies });

      const res = await request(app).get('/api/v1/causal/anomalies');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ success: true, anomalies: mockAnomalies });
    });

    it('should return a 500 if there is an error', async () => {
      getCausalAnomalies.mockRejectedValue(new Error('Test Error'));

      const res = await request(app).get('/api/v1/causal/anomalies');

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ success: false, error: 'Test Error' });
    });
  });
});
