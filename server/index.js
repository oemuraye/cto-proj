import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "/../client")));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/../client/index.html');
});

app.use('/post', postRoutes);

const connectionURL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));