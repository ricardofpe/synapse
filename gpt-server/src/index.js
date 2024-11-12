import express from 'express'
import {createServer} from 'http'
import {Server} from "socket.io"

import {getLlama, LlamaChatSession} from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const llama = await getLlama();
const model = await llama.loadModel({
    modelPath: path.join(__dirname, "models", "Meta-Llama-3-8B-Instruct.Q4_K_M.gguf")
});
const context = await model.createContext();
const session = new LlamaChatSession({
    contextSequence: context.getSequence()
});


const app = express()
const server = createServer(app)

const io = new Server(server)

const PORT = process.env.PORT || 8080



app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})