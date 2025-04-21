import { Request, Response } from "express";
import Users_Service from "@src/modules/users/users.service";

const Users_Controller = {
    all_users : async (req : Request, res : Response) => {
        const all_users = await Users_Service.all_users();
        res.status(200).json(all_users);
    }
}

export default Users_Controller;