import { Router } from "express";
import Auth_Controller from "@src/modules/auth/auth.controller";
const Auth_Router = Router();

Auth_Router.post('/register', Auth_Controller.register);


export default Auth_Router;