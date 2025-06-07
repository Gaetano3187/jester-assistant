import request from 'supertest';
import express from 'express';
import handler from '../api/ocr-gpt.js';

describe('POST /api/ocr-gpt', () => {
  const app = express();
  app.use(express.json());
  app.post('/api/ocr-gpt', handler);

  afterEach(() => {
    delete process.env.OPENAI_API_KEY;
  });

  test('returns 200 when OPENAI_API_KEY is set', async () => {
    process.env.OPENAI_API_KEY = 'test-key';
    const response = await request(app)
      .post('/api/ocr-gpt')
      .send({ base64Image: 'data:image/png;base64,AAA' });
    expect(response.statusCode).toBe(200);
  });

  test('returns error when OPENAI_API_KEY is missing', async () => {
    const response = await request(app)
      .post('/api/ocr-gpt')
      .send({ base64Image: 'data:image/png;base64,AAA' });
    expect(response.statusCode).toBe(500);
    expect(response.text).toMatch(/missing/i);
  });
});
