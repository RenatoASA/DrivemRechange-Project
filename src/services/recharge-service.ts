import { ContactData, RechargeData } from "protocols";
import rechargeRepository from "../repositories/recharge-repository";
import phoneRepository from "repositories/phone-repository";
// import rechargeRepository, { insertPhone } from "../repositories/recharge-repository";


export async function getRechargeByNumberService(number:string){
    const recharges = await rechargeRepository.getRechargesListByNumber(number);
    console.log("retorno service: "+ recharges.rows);
    if (recharges.rowCount < 1) throw { type: "CONFLICT CPF", message: "[]" }
    return recharges.rows;

}

export async function postRecharge({id, recharge}){
    
    // const phonesInserted =contactData.phoneNumber.length;
    // const rechargesInDB = await rechargeRepository.getRechargeByNumber(rechargeData.phoneNumber_rc);
    // if(phonesInDB.rowCount > 0) throw { type: "CONFLICT", message: "Já existe um usuario com este CPF!" }
    // const phonesInDBCount = phonesInDB.rowCount;
    // const result = phonesInserted + phonesInDBCount;
    
    const phoneExist = await rechargeRepository.getIdCompare(id);
    if(phoneExist.rows.length <= 0) throw { type: "NOT FOUND", message: "Numero não cadastrado no sistema!" }
    

    // const newPhone = await insertPhone(contactData);

    return phoneExist;
}