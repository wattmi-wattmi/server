import { Unauthorized_Error } from "@src/classes/error.classes";
import { Request, Response, NextFunction } from "express";

async function Auth_Middleware(req : Request, res : Response, next : NextFunction) {
    const me = req.me;
    if(!me) throw new Unauthorized_Error();
    else next();
}

export default Auth_Middleware;