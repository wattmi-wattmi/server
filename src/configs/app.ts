import express, { type Express } from "express";
import morgan from 'morgan';
import User_Model from "../services/user/model";

const app : Express = express();
app.use(express.json());

app.use(morgan('dev'));



app.get("/", async (req: express.Request, res: express.Response) => {
    await User_Model.create_user();
    await User_Model.all_users();
    res.status(200).send("Hello World! changed");
});

export default app;