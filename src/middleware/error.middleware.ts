import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { Api_Error } from '@src/lib/api/error.class';  // Your custom error class
import { Response_Interface } from '@src/lib/api/response.type';

export const Error_Handler : ErrorRequestHandler = (
    err: Error | Api_Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof Api_Error) {
        const response : Response_Interface<null> = {
            success : false, 
            message : err.message, 
            data : null,
            error : err.errors,
            pagination : null
        }
        res.status(err.statusCode).json(response);
        return;
    }

    console.error('[UNHANDLED ERROR]', err);
    const error = new Error('Internal Server Error');
        const response : Response_Interface<null> = {
            success : false, 
            message : error.message, 
            data : null,
            error,
            pagination : null
        }
    res.status(500).json(response);
    return;
}