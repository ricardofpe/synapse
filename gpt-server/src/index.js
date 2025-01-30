import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

import { getLlama, LlamaChatSession } from "node-llama-cpp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const llama = await getLlama();
const model = await llama.loadModel({
    modelPath: path.join(__dirname, "..", "models", "llama-2-7b.Q4_0.gguf"),
});
const context = await model.createContext();
const session = new LlamaChatSession({
    contextSequence: context.getSequence(),
});

const app = express();
const server = createServer(app);

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

io.on("connection", (soc) => {
    console.log("There is a new connection");
    soc.on("message", async (msg) => {
        const bot_reply = await session.prompt(msg);
        soc.emit("response", bot_reply);
    });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
