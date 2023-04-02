import { Server } from "socket.io";

const socket = {};
let messages = []; // los mensajes se almacenan en el array

socket.connect = function (httpServer) {
  socket.io = new Server(httpServer);

  let { io } = socket;

  io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    // configuramos el evento message
    socket.on("message", (data) => {
      //escucha el evento "message" emitido del lado cliente
      messages.push(data); // guardamos el objeto en el array
      io.emit("messageLogs", messages); // Reenviamos instantaneamente los logs actualizados.
      //
    });
  });
};

export default socket;
