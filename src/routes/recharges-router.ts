import { validateSchema } from "../middleware/schema-middleware";
import { Router } from "express";
import phoneSchema from "../schemas";
import { createRecharge, getRechargeByNumber } from "../controllers/recharge-controller";
import Schema from "../schemas";

const rechargeRouter = Router();

rechargeRouter.post("/recharges", validateSchema(Schema.rechargeSchema), createRecharge);
rechargeRouter.get("/recharges/:number", getRechargeByNumber);

export default rechargeRouter;