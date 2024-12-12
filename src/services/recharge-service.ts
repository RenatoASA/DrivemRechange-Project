import { ContactData, RechargeData } from "protocols";
import rechargeRepository, { insertRecharge } from "../repositories/recharge-repository";
import phoneRepository from "repositories/phone-repository";
// import rechargeRepository, { insertPhone } from "../repositories/recharge-repository";


export async function getRechargeByNumberService(number: string) {
    const recharges = await rechargeRepository.getRechargesListByNumber(number);
    console.log("retorno service: " + recharges.rows);
    if (recharges.rowCount < 1) throw { type: "NOT FOUND", message: "[]" }
    return recharges.rows;

}

export async function postRecharge(rechargeData: RechargeData) {

    const rechargesInDB = await rechargeRepository.getIdCompare(rechargeData.phonesnumber_id);

    if (rechargesInDB.rows.length <= 0) throw { type: "NOT FOUND", message: "Not found" }
        
    
    const newRecharge = await insertRecharge(rechargeData);

    return newRecharge;
}