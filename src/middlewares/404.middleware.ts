// src/middleware/not-found.ts
import { Response_Interface } from '@src/types/response.types';
import { Request, Response, NextFunction } from 'express';

export const Not_Found_Handler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const error = new Error(`Api route not found: ${req.originalUrl}`);
    const response : Response_Interface<null> = {
        success : false, 
        message : error.message, 
        data : null, 
        error, 
        token : null,
        pagination : null
    }
    res.status(404).json(response);
};