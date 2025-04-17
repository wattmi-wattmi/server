import express from "express";
const app = express();
app.use(express.json());
import morgan from 'morgan';

app.use(morgan('dev'));

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Hello World! changed");
});

export default app;