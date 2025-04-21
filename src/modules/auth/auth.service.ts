import prisma from "@src/configs/prisma";
import Users_Service from "../users/users.service";
import { Api_Error } from "@src/classes/error.classes";
import Password_Lib from "@src/lib/password.lib";

interface Create_User_Params_Interface {
    username : string;
    gender : string;
    password : string;
    region? : string | null;
    interests? : string | null;
    about_me? : string | null;
    status_message? : string | null;
    profile? : string | null;
}

const Auth_Service = {
    async is_user_already_exist (username : string) {
        const user = await prisma.user.findFirst({
            where : { username }, 
        });
        if(user) return true;
        else return false;
    },
    async create_user ({username, password, gender, region = null, interests = null, about_me = null, status_message = null, profile = null} : Create_User_Params_Interface){
        if(await this.is_user_already_exist(username)) throw new Api_Error(500, 'user already exists');
        const hashed_password = await Password_Lib.hash(password);
        const user = await prisma.user.create({
            data : {
                username,
                gender,
                password : hashed_password, 
                region, 
                interests, 
                about_me, 
                status_message, 
                profile
            }
        });
        return user;
    }
}

export default Auth_Service;

