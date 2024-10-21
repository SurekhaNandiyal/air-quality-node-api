import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import { AirQualityData } from './AirQualityData'; 

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'air_quality',
  password: 'postgres',
  port: 5432,
});

app.get('/data', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM pm25');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/data/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM pm25 WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/data', async (req: Request, res: Response) => {
  const { year, latitude, longitude, pm25 }: AirQualityData = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pm25 (year, latitude, longitude, pm25) VALUES ($1, $2, $3, $4) RETURNING *',
      [year, latitude, longitude, pm25]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/data/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const { year, latitude, longitude, pm25 }: AirQualityData = req.body;
  try {
    const result = await pool.query(
      'UPDATE pm25 SET year = $1, latitude = $2, longitude = $3, pm25 = $4 WHERE id = $5 RETURNING *',
      [year, latitude, longitude, pm25, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/data/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM pm25 WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.status(204).send();
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/data/filter', async (req: Request, res: Response) => {
  const { year, lat, long } = req.query;
  try {
    const result = await pool.query(
      'SELECT * FROM pm25 WHERE year = $1 AND latitude = $2 AND longitude = $3',
      [year, lat, long]
    );
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/data/stats', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT COUNT(*) as count, AVG(pm25) as avg, MIN(pm25) as min, MAX(pm25) as max
      FROM pm25
    `);
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;

export const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};