import { PrismaClient } from "@prisma/generated";
const prisma = new PrismaClient();

const User_Model = {
    all_users : async () =>  {
        const all_users = await prisma.user.findMany();
        console.log("all_users", all_users);
    },
    create_user : async () => {
        await prisma.user.create({
            data : {
                username : new Date().getTime() + '-user',
                gender : 'male'
            }
        });
    }
}

export default User_Model;


function resolve_prisma_promise(func: Promise<void>) {
    func
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
}