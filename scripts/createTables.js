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
const connection_1 = __importDefault(require("../src/db/connection")); // Import the pool instance from your pool module
function createTableIfNotExists() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield connection_1.default.connect();
        try {
            // Check if the table exists
            const result = yield client.query(`
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_name = 'users'
        );
      `);
            const tableExists = result.rows[0].exists;
            if (!tableExists) {
                // Create the table if it doesn't exist
                yield client.query(`
          CREATE TABLE users (
            id serial PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            age INT
          );
        `);
                console.log('Table created successfully');
            }
            else {
                console.log('Table already exists');
            }
        }
        catch (error) {
            console.error('Error creating or checking table:', error);
        }
        finally {
            client.release();
        }
    });
}
// Call the function to create the table if it doesn't exist
createTableIfNotExists();
