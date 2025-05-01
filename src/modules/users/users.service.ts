import prisma from "@src/configs/prisma";
import {type Prisma} from "@prisma/generated";
import { Not_Found_Error } from "@src/classes/error.classes";
import {Formatted_User_Search_Query_Interface} from "@src/modules/users/users.types";

const Users_Service = {
    async all_users(queries : Formatted_User_Search_Query_Interface){
        const where_queries = get_user_where_query_conditions(queries);
        const total = await prisma.user.count({ where : where_queries });
        const users = await prisma.user.findMany({
            where: where_queries,
            take : queries.limit,
            skip : (queries.page - 1) * queries.limit,
        });
        return { users, total_users : total, total_pages : Math.ceil(total / queries.limit) };
    },

    async get_user_with_username (username : string) {
        const user = await prisma.user.findFirst({
            where : { username }
        });
        if(!user) throw new Not_Found_Error('user');
        return user;
    },
}

function get_user_where_query_conditions(queries : Formatted_User_Search_Query_Interface) : Prisma.UserWhereInput {
    const keyword = queries.search.trim();

    const where: Prisma.UserWhereInput = {};

    if (keyword) {
        where.OR = [
            { name: { contains: keyword, mode: "insensitive" } },
            { region: { contains: keyword, mode: "insensitive" } },
            { interests: { contains: keyword, mode: "insensitive" } },
            { about_me: { contains: keyword, mode: "insensitive" } },
            { status_message: { contains: keyword, mode: "insensitive" } },
        ];
    }

    if (queries.gender) {
        where.gender = queries.gender;
    }

    return where;
}

export default Users_Service;