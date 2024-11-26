import { Carrier, ContactData, phonesNumbers } from "protocols";
import db from "../database"
import { number } from "joi";


export async function insertPhone(contactData: ContactData) {
    const { id: phoneId } = await createPhone(contactData);
    await createPhoneNumber(phoneId, contactData.phoneNumber);
    console.log(contactData.carrier);
    const carrierSelected = await selectCarrier(contactData.carrier);
    if (carrierSelected) {
        await createCarrier({
            ...carrierSelected,
            phone_id: phoneId
        });
    } else {
        throw new Error(`Carrier com o id ${contactData.carrier} não encontrado.`);
    }
}

async function createCarrier(carrier: Carrier) {
    await db.query<Carrier>(`
        INSERT INTO carriers (name, code, phone_id)
        VALUES ($1, $2, $3)
        ON CONFLICT (phone_id) DO NOTHING
    `, [carrier.name, carrier.code, carrier.phone_id]);
}

async function selectCarrier(id: number): Promise<Carrier | null> {
    const result = await db.query<Carrier>(`SELECT * FROM carriers WHERE id = $1`, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
}


export async function createPhone(contactData: ContactData) {
    const { cpf, name, description, carrier } = contactData;
    const result = await db.query<ContactData>(`
        INSERT INTO phones (cpf, name, description, carriers_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [cpf, name, description, carrier]);
    return result.rows[0];
}


async function createPhoneNumber(phoneId: number, phoneNumbers: string[]) {
    const promisesPhones = phoneNumbers.map(phoneNumber => {
        return db.query(`INSERT INTO phonesNumber (phone_id, phoneNumber)
            VALUES ($1, $2)`, [phoneId, phoneNumber]);
    });
    await Promise.all(promisesPhones);
}

async function getPhonesByCpf(cpf: string) {
    const cpfs = await db.query(`SELECT * FROM phones   where cpf= $1;`, [cpf])
    return cpfs;
}

async function getPhonesCompare(phoneNumber: string) {

    const numbers = await db.query(`SELECT * FROM phonesNumber   where phoneNumber = $1;`, [phoneNumber])
    return numbers;
}

async function getPhonesListByCpf(document: string) {
    const phones = await db.query(`SELECT phonesNumber.id, phonesNumber.phoneNumber FROM phonesNumber JOIN phones ON phonesNumber.phone_id = phones.id where phones.cpf = $1;`, [document]);
    return phones;
}

const phoneRepository = {
    getPhonesByCpf,
    getPhonesListByCpf,
    getPhonesCompare,
    insertPhone
}

export default phoneRepository;