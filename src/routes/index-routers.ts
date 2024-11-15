import { Router } from "express";
import phoneRouter from "./phones-router";
import rechargeRouter from "./recharges-router";
import summaryRouter from "./summary-router";

const router = Router();

router.use(phoneRouter);
router.use(rechargeRouter);
router.use(summaryRouter);

export default router;