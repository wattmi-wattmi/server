import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12 as const;
const Password_Lib = {
    async hash (password : string) {
        return await bcrypt.hash(password, SALT_ROUNDS);
    }, 

    async compare(password : string, hashed_password : string) {
        return await bcrypt.compare(password, hashed_password);
    },

    is_strong(password: string) {
        return password.length >= 8;
    }
}

export default Password_Lib;