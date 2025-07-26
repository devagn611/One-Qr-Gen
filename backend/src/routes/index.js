
import express from "express";
import qrGenRouter from "./v1/qrGen.js";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __dirname = dirname(fileURLToPath(import.meta.url));

router.get('/doc', (req, res) => {
  res.sendFile(join(__dirname, 'apidoc.html'));
});

router.get('/', (req, res) => {
  res.redirect('/doc');
});

router.use('/v1', qrGenRouter);

export default router;
