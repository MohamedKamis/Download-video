"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { Postgres_host, Postgres_user, Postgres_password, Postgres_database } = process.env;
const client = new pg_1.Pool({
    host: Postgres_host,
    user: Postgres_user,
    password: Postgres_password,
    database: Postgres_database,
});
exports.client = client;
