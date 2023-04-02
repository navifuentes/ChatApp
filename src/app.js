import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import socket from "./socket.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

//Configuracin HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => {
  console.log("Listening on port 8080");
});

socket.connect(httpServer);
