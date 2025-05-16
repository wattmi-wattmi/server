import {DefaultEventsMap, Socket} from "socket.io";
import Auth_Service from "@src/modules/auth/auth.service";

export default async function on_connection(socket : Socket<DefaultEventsMap, DefaultEventsMap>) {
    const user_id = socket.handshake.auth.user_id as number;
    if(!user_id) { socket.disconnect(); return; }
    socket.data.user_id = user_id;
    await Auth_Service.update_user(user_id, { active_now : true });

    console.log('user connected', user_id);

    socket.on("disconnect", async () => {
        await Auth_Service.update_user(user_id, { active_now : false });
        console.log('user disconnected', user_id);
    });
}