import express, { type Express } from "express";
import morgan from 'morgan';
import Users_Router from "@src/modules/users/users.router";
import { Error_Handler } from "@src/middleware/error.middleware";
import { Not_Found_Handler } from "@src/middleware/404.middleware";

const app : Express = express();
app.use(express.json());

app.use(morgan('dev'));



app.get("/", async (req: express.Request, res: express.Response) => {
    res.status(200).send("Hello World!");
});

app.use('/api/users', Users_Router);


app.use(Not_Found_Handler);
app.use(Error_Handler);

export default app;