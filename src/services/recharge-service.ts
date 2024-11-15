import { ContactData, RechargeData } from "protocols";
import rechargeRepository, { insertRecharge } from "../repositories/recharge-repository";
import phoneRepository from "repositories/phone-repository";
// import rechargeRepository, { insertPhone } from "../repositories/recharge-repository";


export async function getRechargeByNumberService(number: string) {
    const recharges = await rechargeRepository.getRechargesListByNumber(number);
    console.log("retorno service: " + recharges.rows);
    if (recharges.rowCount < 1) throw { type: "CONFLICT CPF", message: "[]" }
    return recharges.rows;

}

export async function postRecharge(rechargeData: RechargeData) {

    const rechargesInDB = await rechargeRepository.getIdCompare(rechargeData.id, rechargeData.phoneNumber_rc);

    if (rechargesInDB.rows.length <= 0) throw { type: "NOT FOUND", message: "Numero não cadastrado no sistema!" }

    const newRecharge = await insertRecharge(rechargeData);

    return newRecharge;
}