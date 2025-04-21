import prisma from "@src/configs/prisma";

const Users_Service = {
    all_users : async () =>  {
        const all_users = await prisma.user.findMany();
        return all_users;
    },
}

export default Users_Service;