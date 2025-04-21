import prisma from "@src/configs/prisma";

const User_Model = {
    create_user : async () => {
        const user = await prisma.user.create({
            data : {
                username : new Date().getTime() + '-user',
                gender : 'male',
                password : '12345'
            }
        });
        return user;
    }
}

export default User_Model;

