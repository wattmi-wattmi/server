import { Request, Response } from "express";
import Auth_Service from "./auth.service";
import { send_success_response } from "@src/lib/response.lib";
import Token_Lib from "@src/lib/token.lib";
import env_config from "@src/configs/env";
import Users_Service from "@src/modules/users/users.service";
import {Unauthorized_Error} from "@src/classes/error.classes";


const Auth_Controller = {
    async register(req: Request, res: Response) {
        const user_data = req.body;
        const user = await Auth_Service.create_user(user_data);
        const token = Token_Lib.sign(user.username);
        set_response_cookies(res, token);
        send_success_response({ res, data: user, token });
    },


    async login (req : Request, res : Response) {
        const login_data = req.body;
        const user = await Auth_Service.login(login_data);
        const token = Token_Lib.sign(user.username);
        set_response_cookies(res, token);
        send_success_response({ res, data : user, token });
    },

    async logout(req: Request, res: Response) {
        // Get domain using the helper function

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });
        send_success_response({ res, message: 'successfully logged out' });
    },

    async me(req : Request, res : Response) {
        const me = req.me;
        const token = me ? Token_Lib.sign(me.username) : '';
        send_success_response({ res, data : me, message : 'authorized', token })
    },

    async update_me(req : Request, res : Response) {
        const me = req.me;
        if(!me) throw new Unauthorized_Error();
        const new_me = await Auth_Service.update_user(me.id, req.body);
        send_success_response({ res, data : new_me, message : 'updated successfully'});
    },
    async check_username(req : Request, res : Response) {
        const username = req.body.username;
        await Auth_Service.check_username(username);
        send_success_response({ res, data : username, message : 'username is valid and available'});
    }
}

function set_response_cookies(res: Response, token: string) {

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 86400000 * 7,
        path: '/'
    });
}

export default Auth_Controller;
