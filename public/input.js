/* eslint-disable no-undef */
const port = process.env.PORT; // fix this in the future. Get the port from the deploy server
const socket = io(':10000');

function joinButton() {
  const startBtn = document.getElementById('join-btn');
  startBtn.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

function prepareForm() {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      color: formData.get('color'),
    };

    socket.emit('join', data);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  joinButton();
  prepareForm();
});
