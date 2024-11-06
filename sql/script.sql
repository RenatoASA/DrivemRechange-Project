

CREATE TABLE phones (
    id SERIAL PRIMARY KEY,
    cpf INTEGER NOT NULL,
    name: TEXT NOT NULL,
    operator TEXT NOT NULL,
    description TEXT 
);


CREATE TABLE phonesNumber (
    id SERIAL PRIMARY KEY,
    phone_id INTEGER NOT NULL, 
    phoneNumber: INTEGER NOT NULL,
    CONSTRAINT  fk_phone_id
        FOREIGN KEY(phone_id)
        REFERENCES phones(id)
);