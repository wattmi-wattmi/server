import { Router } from "express";
import Auth_Controller from "@src/modules/auth/auth.controller";
const Auth_Router = Router();

Auth_Router.post('/register', Auth_Controller.register);
Auth_Router.post('/logout', Auth_Controller.logout);
Auth_Router.post('/login', Auth_Controller.login);


export default Auth_Router;