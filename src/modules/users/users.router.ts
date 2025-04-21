import { Router } from "express";
import Users_Controller from "@src/modules/users/users.controller";

const Users_Router = Router();

Users_Router.get('/', Users_Controller.all_users);

export default Users_Router;