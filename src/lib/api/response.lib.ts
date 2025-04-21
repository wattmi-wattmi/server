import { Response } from "express";
import { Pagination_Interface, Response_Interface } from "@src/lib/api/response.type";

interface Response_Params_Interface<T> {
    res : Response; 
    data? : T | null;
    message? : string;
    status? : number;
    pagination? : null | Pagination_Interface;
}

export function send_success_response<T>({res, data = null, pagination = null , message = 'successfully made an API call', status = 200} : Response_Params_Interface<T>) {
    const response : Response_Interface<T> = {
        success : true,
        message, 
        pagination, 
        data, 
        error : null
    };
    res.status(status).json(response);
}