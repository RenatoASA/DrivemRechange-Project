import { ContactData } from "protocols";
import phoneRepository, { insertPhone } from "../repositories/phone-repository";


export async function postPhone(contactData:ContactData){
    
    const phonesInserted =contactData.phoneNumber.length;
    const phonesInDB = await phoneRepository.getPhonesByCpf(contactData.cpf);
    const phonesInDBCount = phonesInDB.rowCount;
    const result = phonesInserted + phonesInDBCount;
    if (result > 3) throw { type: "CONFLICT CPF", message: "Já atingiu o limite de 3 numeros por CPF!" }

    const newPhone = await insertPhone(contactData);

    return newPhone;
}
