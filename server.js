
/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const  makeid  = (length) => {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
  res.render("index");
});

/**
 * Server Activation
 */

const server = app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

var io = socketio(server)

io.on('connection', (socket) => {
  console.log('socket conected ', socket.id);

  socket.on('createRoom', () => {
    const roomName = makeid(5);
    socket.join(roomName);

    io.sockets.in(roomName).emit('roomCreated', { roomName })
  });

  // Report event
  socket.on('playerPosition', (data) => {
    io.sockets.in(data.roomName).emit('playerPositionUpdate', data)
  });
  
});