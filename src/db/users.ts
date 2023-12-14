import pool from './connection';

interface User {
    id: number;
    email: string;
    password?: string; 
}

const insertUser = async (email: string, password: string): Promise<User | null> => {
    try {
        const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
        const user = result.rows[0];
        return { id: user.id, email: user.email };
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const searchUser = async (email: string): Promise<User | null> => {
    try {
        console.log("searchUser1: ", email);
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            const user =  result.rows[0];
            return { id: user.id, email: user.email, password: user.password };
        }
        return null;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export {
    insertUser,
    searchUser
}