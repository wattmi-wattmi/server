import prisma from "@src/configs/prisma";
import { Not_Found_Error } from "@src/classes/error.classes";

const Users_Service = {
    async all_users(){
         return await prisma.user.findMany();
    },
    async get_user_with_username (username : string) {
        const user = await prisma.user.findFirst({
            where : { username }
        });
        if(!user) throw new Not_Found_Error('user');
        return user;
    },
}

export default Users_Service;