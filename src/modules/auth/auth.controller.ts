import { Request, Response } from "express";
import Auth_Service from "./auth.service";
import { send_success_response } from "@src/lib/response.lib";
import Token_Lib from "@src/lib/token.lib";
import env_config from "@src/configs/env";

const Auth_Controller = {
    async register (req : Request, res : Response) {
        const user_data = req.body;
        const user = await Auth_Service.create_user(user_data);
        const token = Token_Lib.sign(user.username);
        set_response_cookies(res, token);
        send_success_response({ res, data : user, token });
    }
}

function set_response_cookies(res : Response, token : string) {
        res.cookie('token', token, {
            httpOnly : true, 
            secure : true, 
            sameSite : 'lax', 
            maxAge : 86400000 * 7, 
            domain : env_config.front_end_origin, 
            path : '/'
        });
}

export default Auth_Controller;