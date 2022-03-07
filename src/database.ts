import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config()

var {
    POSTGRES_HOST,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_DB,
    ENV,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
} = process.env

var client: any
console.log(ENV)

if (ENV === 'dev'){
    client = new Pool ({
        host: POSTGRES_HOST,
        password: POSTGRES_PASSWORD,
        user: POSTGRES_USER,
        database: POSTGRES_DB,
    })
}

if (ENV === 'test'){
    client = new Pool ({
        host: POSTGRES_HOST,
        password: POSTGRES_PASSWORD,
        user: POSTGRES_USER,
        database: POSTGRES_TEST_DB,
    })
}

export default client




