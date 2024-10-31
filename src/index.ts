import express, {Request, Response, json} from 'express';
import router from './routes/index-routers';


const app = express();
app.use(json());
app.get("/health", (req: Request, res: Response)=> {
    res.sendStatus(200)});

app.use(router);

app.listen(5000, ()=> console.log("app is up"));