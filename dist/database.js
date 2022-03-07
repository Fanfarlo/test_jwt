"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
var { POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_TEST_DB, POSTGRES_USER, POSTGRES_DB, ENV, } = process.env;
var client;
console.log(ENV);
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        password: POSTGRES_PASSWORD,
        user: POSTGRES_USER,
        database: POSTGRES_DB,
    });
}
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        password: POSTGRES_PASSWORD,
        user: POSTGRES_USER,
        database: POSTGRES_TEST_DB,
    });
}
exports.default = client;
