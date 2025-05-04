import prisma from "@src/configs/prisma";
import { Api_Error } from "@src/classes/error.classes";
import Password_Lib from "@src/lib/password.lib";
import Users_Service from "../users/users.service";

interface User_Params_Interface {
    name? : string | null;
    username? : string;
    gender? : string;
    password? : string;
    region? : string | null;
    interests? : string | null;
    about_me? : string | null;
    status_message? : string | null;
    profile? : string | null;
    age? : number | null;
    active_now? : boolean;
}

const Auth_Service = {
    async is_user_already_exist (username : string) {
        const user = await prisma.user.findFirst({
            where : { username }, 
        });
        return !!user;
    },
    async login({username , password} : {username? : string, password?: string}) {
        if(!username || !password) throw new Api_Error(500, 'invalid credentials');
        const user = await Users_Service.get_user_with_username(username);
        const result = await Password_Lib.compare(password, user.password);
        if(!result) throw new Api_Error(500, 'invalid credentials');
        return user;
    },

    async create_user ({username, password, gender, name = null, region = null, age = null, interests = null, about_me = null, status_message = null, profile = null} : User_Params_Interface){
        if(!username || !gender || !password) throw new Api_Error(500, 'no enough data, all three data, username, gender and password, must be provided');
        if(!is_username_long_enough(username)) throw new Api_Error(500, 'username is too short, must be at least 3 characters');
        if(!is_valid_username(username)) throw new Api_Error(500, 'not a valid username');
        if(await this.is_user_already_exist(username)) throw new Api_Error(500, 'user already exists');
        if(!Password_Lib.is_strong(password)) throw new Api_Error(500, 'password is not strong enough');

        const hashed_password = await Password_Lib.hash(password);
        return await prisma.user.create({
            data : {
                username,
                name,
                gender,
                password : hashed_password, 
                region, 
                interests, 
                about_me, 
                status_message, 
                profile,
                age
            }
        });
    },
    async update_user (id : number, data : Partial<User_Params_Interface>) {
        if(data.age && data.age < 18) throw new Api_Error(500, 'age must be at least 18');
        return await prisma.user.update({
            where : { id },
            data
        });
    },
    async check_username(username : string) {
        if(!is_username_long_enough(username)) throw new Api_Error(500, 'username is too short, must be at least 3 characters');
        if(!is_valid_username(username)) throw new Api_Error(500, 'not a valid username');
        if(await this.is_user_already_exist(username)) throw new Api_Error(500, 'username already exists');
    }
}

function is_username_long_enough(username : string) : boolean {
    return username.length >= 3;
}
function is_valid_username(username: string): boolean {
  // Regular expression breakdown:
  // ^[a-zA-Z0-9]      - starts with a letter or number
  // [a-zA-Z0-9_-]*    - middle can contain letters, numbers, underscores, or hyphens
  // [a-zA-Z0-9] $      - ends with a letter or number
  const username_regex = /^[a-zA-Z0-9][a-zA-Z0-9_-]*[a-zA-Z0-9]$/;
  
  return username_regex.test(username);
}

export default Auth_Service;

