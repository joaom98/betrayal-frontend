function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const socket = io();

// Create a 10x10 grid of buttons
const gridSize = 10;
const grid = document.getElementById('grid');
for (let i = 0; i < gridSize; i += 1) {
  const row = document.createElement('div');
  row.className = 'row';
  grid.appendChild(row);
  for (let j = 0; j < gridSize; j += 1) {
    const button = document.createElement('button');
    button.className = 'button';
    button.dataset.row = i.toString();
    button.dataset.col = j.toString();

    row.appendChild(button);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.button');
  console.log(buttons);

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const buttonE = e.target;
      console.log(buttonE);
      console.log(`Button (${buttonE.dataset.col},${buttonE.dataset.row}) has been clicked`);
      const square = button.querySelector('.button-square');
      if (square) {
        square.classList.remove('active');
        setTimeout(() => {
          square.remove();
        }, 300);
      } else {
        const square = document.createElement('div');
        square.classList.add('button-square');
        square.style.backgroundColor = getRandomColor();
        button.appendChild(square);

        // Animate the colored square growing to its full size
        setTimeout(() => {
          square.classList.add('active');
        }, 0);
      }
    });
  });
});
