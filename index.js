const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");

const server = require("http").Server(app);
const io = require("socket.io")(server);

require("./models/User");
require("./services/passport");

app.use(morgan("combined")); /*login server in your terminal */
app.use(bodyParser.json({ type: "*/*" })); /* used to parse incoming requests */

// Create Cookie Session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/authRoutes")(app);
require("./routes/discoverRoutes")(app);
require("./routes/chatRoutes")(app);
require("./routes/messageRoutes")(app);

// Connect Mongo Atlas
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));
  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Server Setup
const PORT = process.env.PORT || 3001;
console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
server.listen(PORT);

//// Socket Io ////////////
io.on("connection", socket => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);
  // Send Message
  socket.on("chat message", msg => {
    const msgForm = {
      id: id,
      msg: msg.message,
      user: msg.user,
      room: msg.room,
      date: msg.date
    };
    console.log(msg);
    io.emit("chat message", msgForm);
  });

  socket.on("update chatlist", () => {
    io.emit("update chatlist");
  });
});
