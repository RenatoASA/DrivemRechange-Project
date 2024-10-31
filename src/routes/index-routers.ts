import { Router } from "express";
import phoneRouter from "./phones-router";

const router = Router();

router.use(phoneRouter);

export default router;