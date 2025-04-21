import { Response } from "express";
import { Pagination_Interface, Response_Interface } from "@src/types/response.types";

interface Response_Params_Interface<T> {
    res : Response; 
    data? : T | null;
    message? : string;
    status? : number;
    pagination? : null | Pagination_Interface;
    token? : null | string;
}

export function send_success_response<T>({res, data = null, pagination = null , message = 'successfully made an API call', status = 200, token = null} : Response_Params_Interface<T>) {
    const response : Response_Interface<T> = {
        success : true,
        message, 
        pagination, 
        data, 
        token,
        error : null
    };
    res.status(status).json(response);
}