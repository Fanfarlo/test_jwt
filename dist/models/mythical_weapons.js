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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponStore = void 0;
const database_1 = __importDefault(require("../database"));
class WeaponStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var conn = yield database_1.default.connect();
                const sql = 'SELECT* FROM mythical_weapons';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Cannot get weapons ${error}`);
            }
        });
    }
    create(b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO mythical_weapons (name, quantity, bullets) VALUES ($1, $2, $3) RETURNING *";
                const resolve = yield conn.query(sql, [b.name, b.quantity, b.bullets]);
                conn.realease();
                return resolve.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot create weapons ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM mythical_weapons WHERE id=($1)';
                const resolve = conn.query(sql, [id]);
                conn.release();
                return resolve.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot delete weapon ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM mythical_weapons WHERE id=($1)';
                const resolve = yield conn.query(sql, [id]);
                conn.realease();
                return resolve.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot show weapon ${error}`);
            }
        });
    }
    edit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'ALTER TABLE mythical_weapons WHERE id=($1)';
                const resolve = yield conn.query(sql, [id]);
                conn.realease();
                return resolve.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot edit weapon ${error}`);
            }
        });
    }
}
exports.WeaponStore = WeaponStore;
