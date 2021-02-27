import express from "express";
import { PORT } from "./utils/constants";
const app = express();

app.use(express.static("dist"));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
