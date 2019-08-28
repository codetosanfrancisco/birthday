import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8080");

function notifyNewRecords() {
  socket.emit("newRecords");
}

function subscribeAndlistenToUpdate(callback) {
  socket.emit("joinAdmin");
  socket.on("users", data => callback(data));
}

export { notifyNewRecords, subscribeAndlistenToUpdate };
