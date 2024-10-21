import request from 'supertest';
import { Pool } from 'pg';
import app from './app';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'air_quality',
  password: 'postgres',
  port: 5432,
});

describe('API Tests', () => {
  beforeAll(async () => {
    await pool.query('CREATE TABLE IF NOT EXISTS pm25 (id SERIAL PRIMARY KEY, year INTEGER, latitude REAL, longitude REAL, pm25 REAL)');
  });

  afterAll(async () => {
    await pool.query('DROP TABLE pm25');
    await pool.end();
  });

  it('GET /data - should return all data', async () => {
    const response = await request(app).get('/data');
    expect(response.status).toBe(200);
  });

  it('GET /data/:id - should return a specific data entry', async () => {
    const response = await request(app).post('/data').send({
      year: 2000,
      latitude: 34.0522,
      longitude: -118.2437,
      pm25: 12.5,
    });
    const id = response.body.id;

    const specificResponse = await request(app).get(`/data/${id}`);
    expect(specificResponse.status).toBe(200);
    expect(specificResponse.body.id).toBe(id);
  });

  it('POST /data - should create a new data entry', async () => {
    const response = await request(app).post('/data').send({
      year: 2000,
      latitude: 34.0522,
      longitude: -118.2437,
      pm25: 12.5,
    });
    expect(response.status).toBe(201);
    expect(response.body.year).toBe(2000);
    expect(response.body.pm25).toBe(12.5);
  });

  it('PUT /data/:id - should update an existing data entry', async () => {
    const response = await request(app).post('/data').send({
      year: 2000,
      latitude: 34.0522,
      longitude: -118.2437,
      pm25: 12.5,
    });
    const id = response.body.id;

    const updateResponse = await request(app).put(`/data/${id}`).send({
      year: 2001,
      latitude: 35.0522,
      longitude: -119.2437,
      pm25: 13.5,
    });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.year).toBe(2001);
    expect(updateResponse.body.pm25).toBe(13.5);
  });

  it('DELETE /data/:id - should delete an existing data entry', async () => {
    const response = await request(app).post('/data').send({
      year: 2000,
      latitude: 23.0522,
      longitude: -168.2437,
      pm25: 12.5,
    });
    const id = response.body.id;

    const deleteResponse = await request(app).delete(`/data/${id}`);
    expect(deleteResponse.status).toBe(204);
  });
});
