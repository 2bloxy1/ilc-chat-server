const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://ilcyouthgroup:<kQrC5XaSQFM0M36m>@cluster0.y9aunz4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const messageSchema = new mongoose.Schema({
  userId: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// Send a message
app.post("/messages", async (req, res) => {
  const message = new Message(req.body);
  await message.save();
  res.sendStatus(201);
});

// Get messages by user
app.get("/messages/:userId", async (req, res) => {
  const messages = await Message.find({ userId: req.params.userId });
  res.json(messages);
});

app.listen(3000, () => console.log("Server running on port 3000"));
