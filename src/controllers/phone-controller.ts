import { Request, Response } from "express";
import { ContactData } from "protocols";
import {  postPhone } from "../services/phone-service";

export async function createPhone(req:Request, res:Response){
    const contact = req.body as ContactData;
    await postPhone(contact)
    res.status(200).send("Criado com sucesso!");
}