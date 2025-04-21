import { Router } from "express";
import Auth_Controller from "@src/modules/auth/auth.controller";
import Auth_Middleware from "@src/middlewares/auth.middleware";
const Auth_Router = Router();

Auth_Router.post('/register', Auth_Controller.register);
Auth_Router.post('/logout', Auth_Controller.logout);
Auth_Router.post('/login', Auth_Controller.login);
Auth_Router.post('/me', Auth_Middleware, Auth_Controller.me);


export default Auth_Router;