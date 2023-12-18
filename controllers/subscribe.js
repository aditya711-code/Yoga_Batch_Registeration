export const subscribe = () => {
  const { name, email, age, batchId } = req.body;
  const q = "Insert into users value(name,email,age,batch_id) VALUES?";

  db.query(q, [name, email, age, batchId], (err, data) => {
    if (err) {
      return res.json(err);
    }
    console.log("query inserted");
    return res.status(200);
  });
};
