import express, { type Express } from "express";
import morgan from 'morgan';
import Users_Router from "@src/modules/users/users.router";

const app : Express = express();
app.use(express.json());

app.use(morgan('dev'));



app.get("/", async (req: express.Request, res: express.Response) => {
    res.status(200).send("Hello World!");
});

app.use('/api/users', Users_Router);

export default app;