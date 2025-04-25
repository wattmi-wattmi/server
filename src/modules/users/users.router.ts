import { Router } from "express";
import Users_Controller from "@src/modules/users/users.controller";

const Users_Router = Router();

Users_Router.get('/', Users_Controller.all_users);
Users_Router.get('/:username', Users_Controller.get_user_with_username);

export default Users_Router;