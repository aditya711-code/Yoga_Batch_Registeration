import { db } from "../index.js";
const paymentProcess = async (userId) => {
  return new Promise((resolve, reject) => {
    const q = "Insert into payment (user_id,date) VALUES (?,NOW())";
    console.log("userId", userId);
    db.query(q, userId, (err, data) => {
      if (err) {
        return reject(err);
      }
      console.log("payment done");
      resolve();
    });
  });
};
export const subscribe = async (req, res) => {
  const { name, email, age, batchId } = req.body;
  const q = "Insert into users (name,email,age,batch_id) VALUES (?,?,?,?)";
  try {
    const data = await new Promise((resolve, reject) => {
      db.query(q, [name, email, age, batchId], async (err, data) => {
        if (err) {
          return reject(err);
        } else return resolve(data);
      });
    });
    await paymentProcess(data.insertId);
    return res.status(200).json({ success: "Subscribed" });
  } catch (error) {
    console.error("Error:", error);
    return res.json({
      error: "Subscription failed",
      message: error.sqlMessage.split("for")[0],
    });
  }
};
