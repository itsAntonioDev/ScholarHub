import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CorsOptions } from "cors";
require('dotenv').config();

const port = process.env.PORT;

const app = express();
app.use(express.json({
  limit: '15mb'
}));

app.use(cookieParser());

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
  const allowedOrigins = [
    'http://localhost:5173',
  ]
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language'],
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});