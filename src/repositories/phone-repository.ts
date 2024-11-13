import { ContactData, phonesNumbers } from "protocols";
import db from "../database"
import { number } from "joi";


export async function insertPhone(contactData:ContactData){
    const {id} = await createPhone(contactData);
    await createPhoneNumber(id, contactData.phoneNumber);
   
}

export async function createPhone(contactData:ContactData){
    const {cpf, operator, name, description } = contactData;
    const result = await db.query<ContactData>(`INSERT INTO phones 
        ( cpf, name, operator, description)
          VALUES ($1,$2, $3,$4) RETURNING *`,
           [cpf, name, operator, description]);
           return result.rows[0];
}


async function createPhoneNumber(id:number, phones: string[]){
    const promisesPhones = phones.map(phone =>{
        return db.query<phonesNumbers>(`INSERT INTO phonesNumber (phone_id, phoneNumber)
            VALUES ($1, $2)`,
        [id, phone]);
    });
    await Promise.all(promisesPhones);
}

async function getPhonesByCpf(cpf: string) {
    const cpfs = await db.query(`SELECT * FROM phones   where cpf= $1;`, [cpf])
    return cpfs;
}

async function getPhonesCompare(phoneNumber:string) {

    const numbers = await db.query(`SELECT * FROM phonesNumber   where phoneNumber = $1;`, [phoneNumber])
    return numbers;
}

async function getPhonesListByCpf(document:string){
    const phones = await db.query(`SELECT phoneNumber FROM phonesNumber JOIN phones ON phonesNumber.phone_id = phones.id where phones.cpf = $1;`, [document]);
    return phones;
}

const phoneRepository = {
    getPhonesByCpf,
    getPhonesListByCpf,
    getPhonesCompare
}

export default phoneRepository;