"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var dotenv = require("dotenv");
var path_1 = require("path");
dotenv.config({ path: (0, path_1.resolve)(__dirname, '../../.env') });
console.log("DATABASE_URL: ", process.env.DATABASE_URL);
var pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
exports.default = pool;
