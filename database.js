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
// const client = new Pool({
//   host: 'dpg-ci34h1m7avj2t378061g-a.oregon-postgres.render.com',
//   user: 'mohamedkhamis2023',
//   password: 'aIaiX05LH9vW1rju4CKAI12xDOZmwV9N',
//   database: 'download_video2023',
//   port: 5432,
// });
//PGPASSWORD=aIaiX05LH9vW1rju4CKAI12xDOZmwV9N psql -h dpg-ci34h1m7avj2t378061g-a.oregon-postgres.render.com -U mohamedkhamis2023 download_video2023
//postgres://mohamedkhamis2023:aIaiX05LH9vW1rju4CKAI12xDOZmwV9N@dpg-ci34h1m7avj2t378061g-a/download_video2023
// const connectionString =
//   'postgres://postgres:12345@127.0.0.1:5432/download_video';
const connectionString = 'postgres://mohamedkhamis2023:aIaiX05LH9vW1rju4CKAI12xDOZmwV9N@dpg-ci34h1m7avj2t378061g-a.oregon-postgres.render.com:5432/download_video2023';
// const client = new Client(conString2);
//  const connectionString = 'postgres://mohamedkhamis2023:aIaiX05LH9vW1rju4CKAI12xDOZmwV9N@dpg-ci34h1m7avj2t378061g-a.oregon-postgres.render.com/download_video2023'
// const client = new Pool({
//   connectionString,
// })
const client = new pg_1.Pool({
    connectionString,
});
exports.client = client;
