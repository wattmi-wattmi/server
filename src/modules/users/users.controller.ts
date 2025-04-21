import { Request, Response } from "express";
import Users_Service from "@src/modules/users/users.service";
import { send_success_response } from "@src/lib/response.lib";

const Users_Controller = {
    async all_users (req : Request, res : Response) {
        const all_users = await Users_Service.all_users();
        send_success_response({res : res, data: all_users});
    },

    async get_user_with_username  (req : Request, res : Response) {
        const username = req.params.username;
        const user = await Users_Service.get_user_with_username(username);
        send_success_response({res, data : user});
    }
}

export default Users_Controller;