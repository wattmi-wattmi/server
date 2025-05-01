import { Request, Response } from "express";
import Users_Service from "@src/modules/users/users.service";
import { send_success_response } from "@src/lib/response.lib";
import {Formatted_User_Search_Query_Interface, User_Search_Query_Interface} from "@src/modules/users/users.types";
import {Pagination_Interface} from "@src/types/response.types";

const Users_Controller = {
    async all_users (req : Request, res : Response) {
        const queries = req.query as User_Search_Query_Interface;
        const formatted_queries : Formatted_User_Search_Query_Interface = get_formatted_user_search_queries(queries);
        const { users, total_users, total_pages } = await Users_Service.all_users(formatted_queries);
        const pagination : Pagination_Interface = {
            page : formatted_queries.page,
            total_pages : total_pages,
            total_items : total_users
        }
        send_success_response({ res , data: users, pagination });
    },

    async get_user_with_username  (req : Request, res : Response) {
        const username = req.params.username;
        const user = await Users_Service.get_user_with_username(username);
        send_success_response({res, data : user});
    }
}

function get_formatted_user_search_queries (queries : User_Search_Query_Interface) : Formatted_User_Search_Query_Interface {
    return {
        search : queries.search || '',
        page : queries.page ? Number(queries.page) : 1,
        limit: queries.limit ? Number(queries.limit) : 10,
        gender: queries.gender || ''
    };
}

export default Users_Controller;