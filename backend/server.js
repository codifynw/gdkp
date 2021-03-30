const express = require("express");
const socket = require("socket.io");
const PORT = 5000;
const connectDB = require("./config/db");
const dotenv = require("dotenv");
var path = require("path");
const handlebars = require("express-handlebars");
var Boss = require("./models/boss");

// LOAD CONFIG
dotenv.config({ path: "./config/config.env" });

// LOAD DB
connectDB();

// App setup
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

//Sets our app to use the handlebars engine
app.set("view engine", "handlebars");

//Sets handlebars configurations
app.engine(
  "handlebars",
  handlebars({
    layoutsDir: __dirname + "/views/",
  })
);

// Files
app.use(express.static("public"));
app.get("/raid", function (req, res) {
  Boss.findOne().exec(function (error, boss) {
    console.log(boss);
    res.render("raid", {
      layout: "raid",
      boss: boss,
    });
  });

  // NON TEMPLATE SOLUTION
  // res.sendFile(path.join(__dirname + '/public/raid.html'));
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
