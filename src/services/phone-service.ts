import { ContactData } from "protocols";
import phoneRepository, { insertPhone } from "../repositories/phone-repository";


export async function postPhone(contactData: ContactData) {

    console.log("service contactData" + contactData.carrier);

    let error = false;

    const phonesInserted = contactData.phoneNumber.length;
    const phonesInDB = await phoneRepository.getPhonesByCpf(contactData.cpf);
    if (phonesInDB.rowCount > 0) {throw { type: "CONFLICT", message: "Já existe um usuario com este CPF!" };
    error = true;
    }
    const phonesInDBCount = phonesInDB.rowCount;
    const result = phonesInserted + phonesInDBCount;
    if (result > 3) {
        let error = false;
        throw { type: "CONFLICT", message: "Já atingiu o limite de 3 numeros por CPF!" }
    }

    for (let i = 0; i < contactData.phoneNumber.length; i++) {
        const phoneExist = await phoneRepository.getPhonesCompare(contactData.phoneNumber[i]);
        if (phoneExist.rows.length > 0){ 
            error = true;
             throw { type: "CONFLICT", message: "Numero já cadastrado!" }
        }
    }

    if (!error) {
        const newPhone = await phoneRepository.insertPhone(contactData);
        return newPhone;
    }
}

export async function getPhoneByDocumentService(document: string) {
    const phones = await phoneRepository.getPhonesListByCpf(document);
    if (phones.rowCount < 1) {
        return [];
    }
    return phones.rows;
}
