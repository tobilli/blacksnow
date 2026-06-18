import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'blacksnow-be' });
});

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Blacksnow backend' });
});

app.post('/api/echo', (req, res) => {
  res.json({ received: req.body });
});

app.listen(port, () => {
  console.log(`BlackSnow backend running at http://localhost:${port}`);
});
