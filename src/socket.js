import { Server } from "socket.io";

const socket = {}; // !!** hace referencia al cliente
let messages = []; // los mensajes se almacenan en el array

socket.connect = function (httpServer) {
  socket.io = new Server(httpServer);

  let { io } = socket; // !!** hace referencia al Servidor de sockets

  io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    // configuramos el evento message
    socket.on("message", (data) => {
      //escucha el evento "message" emitido del lado cliente
      messages.push(data); // guardamos el objeto en el array
      io.emit("messageLogs", messages); // Reenviamos instantaneamente los logs actualizados.
      // reenvia el array de mensajes actualizados a los otros usuarios, en un evento q creamos dps
    });

    // evento newUserNotification
    socket.on("newUserAutentication", (data) => {
      socket.broadcast.emit("newUserSwal", data);
      socket.emit("messageLogs", messages);
    });
  });
};

export default socket;
