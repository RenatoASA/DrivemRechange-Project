import { ContactData, RechargeData } from "protocols";
import summaryRepository from "../repositories/summary-repository";


export async function getSummaryByDocumentService(document:string){
    const summary = await summaryRepository.getSummaryListByDocument(document);
    if (summary.rowCount < 1) throw { type: "CONFLICT CPF", message: "[]" }
    return summary;

}