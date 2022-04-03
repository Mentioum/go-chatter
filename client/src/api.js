import { messages } from "./store.js";

const ws = new WebSocket("ws://localhost:9000/ws");

ws.addEventListener("open", function (event) {
  console.log("connected");
});

ws.addEventListener("message", function (event) {
  messages.update((msgs) => {
    if (Array.isArray(event.data)) return [...msgs, ...event.data];
    return [...msgs, event.data];
  });
});

ws.addEventListener("close", function (event) {
  console.log("disconnected");
});

ws.addEventListener("onerror", function (error) {
  console.log("error: ", error);
});

const sendMessage = (message) => {
  if (ws.readyState <= 1) {
    ws.send(message);
  }
};

export default {
  sendMessage,
};
