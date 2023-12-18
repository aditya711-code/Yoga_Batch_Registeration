import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  return res.json("From backend side");
});

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "flexmoney",
});

app.get("/users", (req, res) => {
  const q = "Select * from users";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/batch", (req, res) => {
  const q = "Select * from batch";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/subscribe", (req, res) => {
  const { name, email, age, batch_id } = req.body;

  const q = "Insert into users (name,email,age,batch_id) VALUES (?,?,?,?)";

  db.query(q, [name, email, age, batch_id], (err, data) => {
    if (err) {
      return res.json(err);
    }

    return res.status(200).json({ success: "Subscribed" });
  });
});
app.post("/payment", (req, res) => {
  const { user_id } = req.body;

  const q = "Insert into payment (user_id,date) VALUES (?,NOW())";
  db.query(q, user_id, (err, data) => {
    if (err) {
      return res.json(err);
    }
    console.log("payment done");
    return res.status(200).json({ success: "Payment successful" });
  });
  return;
});
app.listen(3001, () => {
  console.log("listening");
});
