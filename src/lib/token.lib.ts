import { Unauthorized_Error } from "@src/classes/error.classes";
import env_config from "@src/configs/env";
import jwt from 'jsonwebtoken';

const Token_Lib = {
    secret_key : env_config.jwt_secret, 
    sign(username : string) {
        return jwt.sign({ username }, this.secret_key, {
            expiresIn : '7d'
        }); 
    },
    verify(token : string) {
        try {
            return jwt.verify(token, this.secret_key) as { username : string };
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

export default Token_Lib;