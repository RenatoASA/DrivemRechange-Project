-- Database: rechargeDB

-- DROP DATABASE IF EXISTS "rechargeDB";

CREATE DATABASE "rechargeDB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

---------------------------------------------------

-- Table: public.carriers

-- DROP TABLE IF EXISTS public.carriers;

CREATE TABLE IF NOT EXISTS public.carriers
(
    id integer NOT NULL DEFAULT nextval('carriers_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    code integer NOT NULL,
    phone_id integer,
    CONSTRAINT carriers_pkey PRIMARY KEY (id),
    CONSTRAINT unique_phone_id UNIQUE (phone_id),
    CONSTRAINT fk_phone_id FOREIGN KEY (phone_id)
        REFERENCES public.phones (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.carriers
    OWNER to postgres;

-------------------------------------------------------------

-- Table: public.phones

-- DROP TABLE IF EXISTS public.phones;

CREATE TABLE IF NOT EXISTS public.phones
(
    id integer NOT NULL DEFAULT nextval('phones_id_seq'::regclass),
    cpf character varying(11) COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    operator text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    carriers_id integer,
    CONSTRAINT phones_pkey PRIMARY KEY (id),
    CONSTRAINT fk_carriers_id FOREIGN KEY (carriers_id)
        REFERENCES public.carriers (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.phones
    OWNER to postgres;

-------------------------------------------------------------------

-- Table: public.phonesnumber

-- DROP TABLE IF EXISTS public.phonesnumber;

CREATE TABLE IF NOT EXISTS public.phonesnumber
(
    id integer NOT NULL DEFAULT nextval('phonesnumber_id_seq'::regclass),
    phone_id integer NOT NULL,
    phonenumber character varying(11) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT phonesnumber_pkey PRIMARY KEY (id),
    CONSTRAINT unique_phonenumber UNIQUE (phonenumber),
    CONSTRAINT fk_phone_id FOREIGN KEY (phone_id)
        REFERENCES public.phones (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.phonesnumber
    OWNER to postgres;


---------------------------------------------------------------------------

-- Table: public.recharges

-- DROP TABLE IF EXISTS public.recharges;

CREATE TABLE IF NOT EXISTS public.recharges
(
    id integer NOT NULL DEFAULT nextval('recharges_id_seq'::regclass),
    phonenumber_rc character varying(11) COLLATE pg_catalog."default" NOT NULL,
    recharge numeric(6,2),
    balance integer,
    CONSTRAINT recharges_pkey PRIMARY KEY (id),
    CONSTRAINT fk_phonenumber_rc FOREIGN KEY (phonenumber_rc)
        REFERENCES public.phonesnumber (phonenumber) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.recharges
    OWNER to postgres;