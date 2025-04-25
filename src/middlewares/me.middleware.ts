import Token_Lib from "@src/lib/token.lib";
import { Request, Response, NextFunction } from "express";
import prisma from "@src/configs/prisma";
// type User = Prisma.UserGetPayload<{}>
async function Me_Middleware(req : Request, res : Response, next : NextFunction) {
    const  cookie_token  = req.cookies?.token as string || null;
    const header_token = req.header('Authorization')?.replace('Bearer ', '') || null;
    const token = header_token || cookie_token || null;
    
    if(!token) {
        req.me = null;
        next();
        return;
    }

    const decoded = Token_Lib.verify(token);
    if(!decoded) {
        req.me = null;
        next();
        return;
    }

    const user  = await prisma.user.findFirst({
        where : { username : decoded.username }
    });
    req.me = user;
    next();
}

export default Me_Middleware;