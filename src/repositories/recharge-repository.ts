import db from "../database";


async function getRechargesListByNumber(number:string){
    const recharges = await db.query(`select recharge from recharges join phonesNumber on recharges.phoneNumber_rc = phonesNumber.phoneNumber where phonesNumber.phoneNumber = $1;`, [number]);
    return recharges;
}

async function getRechargeListById(phoneNumber:string) {

    const cpfs = await db.query(`SELECT * FROM phonesNumber   where phoneNumber = $1;`, [phoneNumber])
    return cpfs;
}

async function getPhoneByNumber(number: string) {
    const recharges = await db.query(`select * from phonesNumber where phoneNumber = $1;`, [number])
    return recharges;
}

async function getIdCompare(id:number) {

    const numbers = await db.query(`select * from recharges join phonesNumber on recharges.phoneNumber_rc = phonesNumber.phoneNumber where phonesNumber.id = $1;`, [id])
    return numbers;
}


const rechargeRepository= {
    getRechargesListByNumber,
    getPhoneByNumber,
    getIdCompare
}

export default rechargeRepository;