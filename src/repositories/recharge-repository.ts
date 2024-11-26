import { RechargeData } from "protocols";
import db from "../database";


async function getRechargesListByNumber(number: string) {
    const recharges = await db.query(`select recharge from recharges join phonesNumber on recharges.phoneNumber_rc = phonesNumber.phoneNumber where phonesNumber.phoneNumber = $1;`, [number]);
    return recharges;
}

async function getIdCompare(phonesnumber_id: number) {

    const numbers = await db.query(`SELECT * FROM phonesNumber WHERE id = $1;`, [phonesnumber_id]);
    return numbers;

}

export async function insertRecharge(rechargeData: RechargeData) {
    const { phoneNumber_rc, recharge, phonesnumber_id } = rechargeData;
    const result = await db.query<RechargeData>(`INSERT INTO recharges ( phoneNumber_rc, recharge, phonesnumber_id) 
           VALUES ($1,$2,$3) RETURNING *`,
        [phoneNumber_rc, recharge, phonesnumber_id]);
    return result.rows[0];
}

const rechargeRepository = {
    getRechargesListByNumber,
    getIdCompare,
    insertRecharge
}

export default rechargeRepository;