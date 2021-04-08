const express = require("express");
const socket = require("socket.io");
const PORT = process.env.PORT || 5000;
var path = require("path");
var Boss = require("./models/boss");

// LOAD CONFIG
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// LOAD DB
const connectDB = require("./config/db");
connectDB();

// App setup
const app = express();

// LOAD CORS
var cors = require('cors');
app.use(cors());

const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Socket setup
const io = socket(server);
const activeUsers = new Set();

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("new user", function (data) {
    socket.userId = data;
    activeUsers.add(data);
    io.emit("new user", [...activeUsers]);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    activeUsers.delete(socket.userId);
    io.emit("user disconnected", socket.userId);
  });

  socket.on("chat message", function (data) {
    console.log("chat message received");
    console.log(data);
    io.emit("chat message", data);
  });
});

// API
app.use(express.json());

const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);
const locationsRouter = require("./routes/locations");
app.use("/locations", locationsRouter);
const bossesRouter = require("./routes/bosses");
app.use("/bosses", bossesRouter);
const raidsRouter = require("./routes/raids");
app.use("/raids", raidsRouter);
const leusersRouter = require("./routes/leusers");
app.use("/leusers", leusersRouter);
const lootRouter = require("./routes/loot");
app.use("/loot", lootRouter);
const itemsRouter = require("./routes/items");
app.use("/items", itemsRouter);
const lootTablesRouter = require("./routes/lootTables");
app.use("/lootTables", lootTablesRouter);

// Files
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/build")));


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});