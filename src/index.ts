import 'module-alias/register';
import app from "@src/configs/app";
import env_config from '@src/configs/env';
import { createServer } from 'http';
import { Server } from "socket.io";
import on_connection from "@src/configs/socket.onconnection";

const http_server = createServer(app);
const front_end_origin = env_config.front_end_origin;

const io = new Server(http_server, {
    cors : {
        origin : front_end_origin,
        credentials : true
    }
});

io.on('connection', on_connection);

http_server.listen(env_config.port, () => {
    console.log("Server is running on port 8000");
})
