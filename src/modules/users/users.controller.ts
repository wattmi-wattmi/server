import { Request, Response } from "express";
import Users_Service from "@src/modules/users/users.service";
import { send_success_response } from "@src/lib/api/response.lib";

const Users_Controller = {
    all_users : async (req : Request, res : Response) => {
        const all_users = await Users_Service.all_users();
        send_success_response({res : res, data: all_users});
    }
}

export default Users_Controller;