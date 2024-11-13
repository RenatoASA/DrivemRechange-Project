import { Request, Response } from "express";
import { ContactData } from "protocols";
import {  getPhoneByDocumentService, postPhone } from "../services/phone-service";

export async function createPhone(req:Request, res:Response){
    const contact = req.body as ContactData;
    await postPhone(contact)
    res.status(200).send("Criado com sucesso!");
}

export async function getPhoneByDocument(req:Request, res:Response){
    const {document} = req.params;
    const phones = await getPhoneByDocumentService(document);
    res.status(200).send(phones);
}