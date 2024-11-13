import { Router } from "express";
import phoneRouter from "./phones-router";
import rechargeRouter from "./recharges-router";

const router = Router();

router.use(phoneRouter);
router.use(rechargeRouter);

export default router;