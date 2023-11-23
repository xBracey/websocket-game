// Setup simple express server

import express from "express";
import expressWs from "express-ws";

const { app } = expressWs(express());

app.ws("/ws", (ws, req) => {
  ws.on("message", (msg) => {
    ws.send(msg);
  });
});
