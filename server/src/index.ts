import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());           // Allow frontend to connect
app.use(express.json());   // Parse JSON request bodies

// Your routes will go here

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});