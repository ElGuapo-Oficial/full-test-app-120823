import { PoolClient } from 'pg';
import pool from '../src/db/connection'; // Import the pool instance from your pool module

async function createTableIfNotExists() {
    const client: PoolClient = await pool.connect();
    try {
      // Check if the table exists
      const result = await client.query(`
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_name = 'users'
        );
      `);
  
      const tableExists = result.rows[0].exists;
  
      if (!tableExists) {
        // Create the table if it doesn't exist
        await client.query(`
          CREATE TABLE users (
            id serial PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            age INT
          );
        `);
        console.log('Table created successfully');
      } else {
        console.log('Table already exists');
      }
    } catch (error) {
      console.error('Error creating or checking table:', error);
    } finally {
      client.release();
    }
  }
  
  // Call the function to create the table if it doesn't exist
  createTableIfNotExists();
  
