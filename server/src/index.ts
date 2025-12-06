import express from 'express';
import cors from 'cors';
import router from './routes/events';

const app = express();

app.use(cors());           // Allow frontend to connect
app.use(express.json());   // Parse JSON request bodies

// Routes
app.use('/api', router);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
