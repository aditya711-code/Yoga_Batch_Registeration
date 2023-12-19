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
// app.use("/subscribe", subscribeRoutes);
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const paymentProcess = async (userId) => {
  const q = "Insert into payment (user_id,date) VALUES (?,NOW())";
  db.query(q, userId, (err, data) => {
    if (err) {
      return res.json(err);
    }
    console.log("payment done");
    return;
  });
  return;
};
app.post("/subscribe", (req, res) => {
  const { name, email, age, batchId } = req.body;
  const q = "Insert into users (name,email,age,batch_id) VALUES (?,?,?,?)";
  db.query(q, [name, email, age, batchId], async (err, data) => {
    if (err) {
      return res.json(err);
    }
    await paymentProcess(data.insertId);
    return res.status(200).json({ success: "Subscribed" });
  });
});
app.get("/batch", (err, res) => {
  const q = "Select * from batch";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
});

app.listen(process.env.PORT, () => {
  console.log("listening");
});
