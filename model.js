"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataUserModel = void 0;
const database_1 = require("./database");
class DataUserModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.client.connect();
                const sql = 'SELECT * FROM data_users';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Failed to get users with the following error: ${error}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.client.connect();
                const sql = 'INSERT INTO data_users (link_v,ip_user,data,time) VALUES($1,$2,$3,$4) RETURNING *';
                const result = yield connection.query(sql, [
                    u.link_v,
                    u.ip_user,
                    u.data,
                    u.time,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Failed to add the users with the following error: ${error}`);
            }
        });
    }
}
exports.DataUserModel = DataUserModel;
