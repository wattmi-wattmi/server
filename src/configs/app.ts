import express, { type Express } from "express";
import morgan from 'morgan';
import Users_Router from "@src/modules/users/users.router";
import { Error_Handler } from "@src/middlewares/error.middleware";
import { Not_Found_Handler } from "@src/middlewares/404.middleware";
import Auth_Router from "@src/modules/auth/auth.router";
import cors from 'cors';
import env_config from "./env";
import Me_Middleware from "@src/middlewares/me.middleware";
import cookieParser from 'cookie-parser';

const app : Express = express();

const front_end_origin = env_config.front_end_origin;
console.log('frontend origin', front_end_origin);
app.use(cors({
    origin : front_end_origin,
    credentials : true, 
    exposedHeaders : ['set-cookie']
}));

app.use(express.json());

app.use(morgan('dev'));
app.use(cookieParser());



app.get("/", async (req: express.Request, res: express.Response) => {
    res.status(200).send("Hello World!");
});
app.use(Me_Middleware);

app.use('/api/users', Users_Router);
app.use('/api/auth', Auth_Router);


app.use(Not_Found_Handler);
app.use(Error_Handler);

export default app;