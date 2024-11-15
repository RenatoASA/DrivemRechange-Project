    export type ContactData = {
        id:number,
        cpf: string,
        name: string,
        operator: string,
        description: string,
        phoneNumber: string[],
        carrier: number,
        recharges: RechargeData[]
    }; 

    export type RechargeData = {
        id: number,
        phoneNumber_rc: string,
        recharge: number,
        balance: number
    };

    export type phonesNumbers ={
        id:number,
        phones_id:number,
        number:string
    }

    export type Carrier ={
        id: number,
        phone_id: number,
        name: string,
        code: number
    }


