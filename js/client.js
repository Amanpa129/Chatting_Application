
const socket = io('http://localhost:8000');




const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");



// Function to append messages to the container
const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);

 
};

form.addEventListener(`submit`,(e)=>{
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, 'right');
  socket.emit(`send`,message);
})



const id = prompt("Enter your name to join");
socket.emit('new-user-joined', id);

socket.on('user-joined', (id) => {
  append(`${id} joined the chat`, 'right');
});


socket.on('receive', (data) => {
  append(`${data.id}: ${data.message}`, 'left'); 
});


socket.on('left', (id) => {
  append(`${id} left the chat`,'left'); 
});


