import { validateSchema } from "../middleware/schema-middleware";
import { createPhone, getPhoneByDocument } from "../controllers/phone-controller";
import { Router } from "express";
import phoneSchema from "../schemas";
import Schema from "../schemas";

const phoneRouter = Router();

phoneRouter.post("/phones", validateSchema(Schema.phoneSchema), createPhone);
phoneRouter.get("/phones/:document", getPhoneByDocument);

export default phoneRouter;