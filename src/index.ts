import 'module-alias/register';
import app from "@src/configs/app";
import env_config from '@src/configs/env';
import { createServer } from 'http';
import { Server } from "socket.io";

const http_server = createServer(app);
const front_end_origin = env_config.front_end_origin;
console.log('frontend origin in index.ts', front_end_origin);
const io = new Server(http_server, {
    cors : {
        origin : front_end_origin,
        credentials : true
    }
});

io.on('connection', socket => {
    console.log('connected');
});

http_server.listen(env_config.port, () => {
    console.log("Server is running on port 8000");
})