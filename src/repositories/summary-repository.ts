import db from "../database";

export async function getSummaryListByDocument(document) {

    const result = await db.query(`
        SELECT 
            p.cpf AS "CPF",
            p.id AS "phoneId",
            p.name AS "userName", 
            p.description AS "description", 
            pn.phonenumber AS "phoneNumber",
            c.id AS "carrierId",
            c.name AS "carrierName",
            c.code AS "carrierCode",
            r.id AS "rechargeId",
            r.recharge AS "rechargeAmount"
        FROM 
            phones p
        JOIN 
            phonesNumber pn ON p.id = pn.phone_id
        LEFT JOIN 
            recharges r ON r.phonenumber_rc = pn.phonenumber
        LEFT JOIN 
            carriers c ON c.id = p.carriers_id
        WHERE 
            p.cpf = $1;
    `, [document]);



    if (result.rows.length === 0) {
        return [];
    }

    const formattedData = result.rows.reduce((acc, row) => {
        let user = acc.find(user => user.document === row.CPF);
        if (!user) {
            user = {
                document: row.CPF,
                phones: []
            };
            acc.push(user);
        }

        let phone = user.phones.find(phone => phone.phoneNumber === row.phoneNumber);
        if (!phone) {
            phone = {
                id: row.phoneId,
                phoneNumber: row.phoneNumber,
                description: row.description,
                carrier: {
                    id: row.carrierId,
                    name: row.carrierName,
                    code: row.carrierCode
                },
                recharges: []
            };
            user.phones.push(phone);
        }

        if (row.rechargeId) {
            phone.recharges.push({
                id: row.rechargeId,
                amount: row.rechargeAmount
            });
        }

        return acc;
    }, []);

    return formattedData;
}

const summaryRepository = {
    getSummaryListByDocument
}

export default summaryRepository;