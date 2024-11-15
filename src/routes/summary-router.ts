import { Router } from "express";
import { createRecharge, getRechargeByNumber } from "../controllers/recharge-controller";
import Schema from "../schemas";
import { getSummaryByDocument } from "../controllers/summary-controller";

const summaryRouter = Router();

summaryRouter.get("/summary/:document", getSummaryByDocument);


export default summaryRouter;