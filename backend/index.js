import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import apiRouter from "./src/routes/index.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;

// Allow only GET and POST requests from any origin
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Redirect route for /qrgen to an external URL
app.get('/qrgen', (req, res) => {
  res.redirect('https://multi-qr-code-generator.vercel.app/');
});

// Mount the API router at /api
app.use('/api', apiRouter);

// Redirect root (/) to an external URL
app.get('/', (req, res) => {
  res.redirect('/api/doc');
});

// Only start the server when running locally
if (!process.env.VERCEL_ENV) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
