const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');
const Coordinate = require('./private/game/Coordinate');
const Game = require('./private/game/Game');

const io = new Server(server, {
  cookie: {
    name: 'io',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  },
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

const game = new Game();

function updateGame(socket) {
  console.log('updated');
  const gameState = game.getGameState();
  socket.emit('update', gameState);
}

io.on('connection', (socket) => {
  console.log('a user connected');
  updateGame(socket);

  // Implement a vote for 50% + 1 to start the match
  socket.on('ready', () => {
    setInterval(() => {
      game.giveEnergyToPlayers();
      updateGame(socket);
    }, 1000);
    // game.giveEnergyToPlayers
    updateGame(socket);
  });

  socket.on('join', (data) => {
    game.addPlayer(socket.id, data.name, data.color);

    updateGame(socket);
  });

  socket.on('action', (data) => {
    const coordinate = new Coordinate(data.coordinateClicked.x, data.coordinateClicked.y);
    const change = game.action(socket.id, coordinate, data.action);
    if (change) {
      updateGame(socket);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    game.removePlayer(socket.id);
    updateGame(socket);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
