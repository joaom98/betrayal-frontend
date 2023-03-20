/* eslint-disable no-undef */
function createGrid(sizeX, sizeY) {
  const grid = document.getElementById('grid');

  grid.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  for (let y = 0; y < sizeY; y += 1) {
    const row = document.createElement('div');
    row.className = 'row';
    grid.appendChild(row);
    for (let x = 0; x < sizeX; x += 1) {
      const button = document.createElement('button');
      button.classList.add('button');
      button.dataset.row = y;
      button.dataset.col = x;

      row.appendChild(button);
    }
  }
}

function sendDataToGame(data) {
  socket.emit('action', data);
}

function addListenersToButtons() {
  const buttons = document.querySelectorAll('.row button');

  buttons.forEach((button) => {
    button.addEventListener('mousedown', (e) => {
      e.preventDefault();

      const click = e.button;
      let action = 'none';
      if (click === 0) {
        action = 'primary';
      } else if (click === 2) {
        action = 'secondary';
      }
      const buttonTarget = e.target;
      console.log(`Button (${buttonTarget.dataset.col},${buttonTarget.dataset.row}) has been clicked`);
      const data = {
        message: 'button clicked',
        action,
        coordinateClicked: {
          x: buttonTarget.dataset.col,
          y: buttonTarget.dataset.row,
        },
      };

      sendDataToGame(data);
    });
  });

  const readyBtn = document.querySelector('.ready-button');

  readyBtn.addEventListener('click', () => {
    socket.emit('ready');
  });
}

function selectTile(coordX, coordY) {
  return document.querySelector(`button[data-row="${coordY}"][data-col="${coordX}"]`);
}

function drawTile(x, y, color) {
  const button = selectTile(x, y);
  button.style.backgroundColor = color;
}

function resetGrid() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((button) => {
    // properly setup the standard tile later
    button.style.backgroundColor = '#ccc';
  });
}

function updateGrid(gameState) {
  resetGrid();
  gameState.forEach((player) => {
    drawTile(player.coordinates.x, player.coordinates.y, player.color);
  });
}

// Code for the player list

function writePlayer(player) {
  console.log(player);
  const playerElement = document.createElement('div');
  playerElement.className = 'player';
  playerElement.style.backgroundColor = player.color;

  const nameElement = document.createElement('div');
  nameElement.className = 'player-name';
  nameElement.innerText = player.name;
  playerElement.appendChild(nameElement);

  const healthElement = document.createElement('div');
  healthElement.className = 'player-health';
  healthElement.innerText = `Health
  ${'❤️'.repeat(player.health)}`;
  playerElement.appendChild(healthElement);

  const energyElement = document.createElement('div');
  energyElement.className = 'player-energy';
  energyElement.innerText = `Energy
  ${'⚡'.repeat(player.energy)}`;
  playerElement.appendChild(energyElement);

  const rangeElement = document.createElement('div');
  rangeElement.className = 'player-range';
  rangeElement.innerText = `Range
  ${'↗️'.repeat(player.range)}`;
  playerElement.appendChild(rangeElement);

  const playersList = document.getElementById('players');
  playersList.appendChild(playerElement);
}

function resetPlayerList() {
  const players = document.querySelectorAll('.player');
  players.forEach((player) => {
    player.remove();
  });
}

function updatePlayerList(gameState) {
  resetPlayerList();
  gameState.forEach((player) => {
    writePlayer(player);
  });
}

createGrid(10, 10);

document.addEventListener('DOMContentLoaded', () => {
  addListenersToButtons();
});

socket.on('update', (gameState) => {
  console.log(gameState);
  updateGrid(gameState);
  updatePlayerList(gameState);
});
