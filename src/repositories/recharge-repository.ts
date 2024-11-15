import { RechargeData } from "protocols";
import db from "../database";


async function getRechargesListByNumber(number: string) {
    const recharges = await db.query(`select recharge from recharges join phonesNumber on recharges.phoneNumber_rc = phonesNumber.phoneNumber where phonesNumber.phoneNumber = $1;`, [number]);
    return recharges;
}

async function getIdCompare(id: number, phoneNumber_rc: string) {

    const numbers = await db.query(`SELECT * FROM phonesNumber WHERE phonenumber = $1 AND id = $2;`, [phoneNumber_rc, id]);
    return numbers;

}

export async function insertRecharge(rechargeData: RechargeData) {
    const { phoneNumber_rc, recharge } = rechargeData;
    const result = await db.query<RechargeData>(`INSERT INTO recharges ( phoneNumber_rc, recharge) 
           VALUES ($1,$2) RETURNING *`,
        [phoneNumber_rc, recharge]);
    return result.rows[0];
}

const rechargeRepository = {
    getRechargesListByNumber,
    // getPhoneByNumber,
    getIdCompare,
    insertRecharge
}

export default rechargeRepository;