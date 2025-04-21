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
        return jwt.verify(token, this.secret_key) as { username : string };
    }
}

export default Token_Lib;