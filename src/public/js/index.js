const socket = io();

let user; // Este "user" será para que el cliente se identifique
let chatBox = document.getElementById("chatBox"); //referencia DOM

Swal.fire({
  title: "Identificate",
  input: "text", //escribir un texto para avanzar en la alerta
  text: "Ingresa el usuario para identificarte en el chat",
  inputValidator: (value) => {
    return !value && "Necesitas escribir un nombre de usuario para continuar";
    // Validacion si el usuario da click en OK sin haber colocado un nombre
  },
  allowOutsideClick: false, //impide que salga del Alert al dar "click" fuera de esta
}).then((result) => {
  user = result.value;
  socket.emit("newUserAutentication", result.value);
  //Una vez q se identifica, le asignamos la variable USER
});

//Emitir mensajes
chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    // el mensaje se enviara cuando el usuario apriete "ENTER"
    if (chatBox.value.trim().length > 0) {
      // validamos que el mensaje no esté vacio
      socket.emit("message", { user: user, message: chatBox.value }); //emitimos nuestor primer evento con la info a transportar
      chatBox.value = ""; // se limpia el input
    }
  }
});

//Recibir mensajes
socket.on("messageLogs", (data) => {
  //recibimos en DATA el array de msjs actualizados
  let logs = document.getElementById("messageLogs"); // Agarramos el elemento <p>

  //logica para los msjs
  let messages = "";
  data.forEach((message) => {
    messages += `${message.user}: ${message.message} </br>`;
  });
  logs.innerHTML = messages;
});

socket.on("newUserSwal", (data) => {
  Swal.fire({
    text: `user: "${data}" has entered the chat!`,
    toast: true,
    position: "top-right",
    timer: 4000,
  });
});
