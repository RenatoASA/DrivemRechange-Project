import { Request, Response } from "express";
// import { ContactData } from "protocols";
import { getRechargeByNumberService, postRecharge } from "../services/recharge-service";
import { RechargeData } from "protocols";

export async function createRecharge(req:Request, res:Response){
    const recharge = req.body as RechargeData;
    await postRecharge(recharge)
    res.status(200).send("Criado com sucesso!");
}

export async function getRechargeByNumber(req:Request, res:Response){
    const {number} = req.params;
    const recharges = await getRechargeByNumberService(number);
    res.status(200).send(recharges);
}