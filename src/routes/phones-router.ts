import { validateSchema } from "../middleware/schema-middleware";
import { createPhone } from "../controllers/phone-controller";
import { Router } from "express";
import phoneSchema from "../schemas";

const phoneRouter = Router();

phoneRouter.post("/phones", validateSchema(phoneSchema), createPhone);

export default phoneRouter;