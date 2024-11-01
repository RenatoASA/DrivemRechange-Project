import { Request, Response } from "express";
import { ContactData } from "protocols";

export function createPhone(req:Request, res:Response){
    const contact = req.body as ContactData;
    res.send(contact.name);
}