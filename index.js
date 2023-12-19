import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import subscribeRoutes from "./routes/subscribe.js";
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
app.use("/subscribe", subscribeRoutes);
app.get("/batch", (err, res) => {
  const q = "Select * from batch";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
