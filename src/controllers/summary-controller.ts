import { Request, Response } from "express";
import { getSummaryByDocumentService } from "../services/summary-service";

export async function getSummaryByDocument(req:Request, res:Response){
    const {document} = req.params;
    const summary = await getSummaryByDocumentService(document);
    res.status(200).send(summary);
}