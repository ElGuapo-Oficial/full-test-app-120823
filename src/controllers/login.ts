import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { insertUser, searchUser } from '../db/users';

dotenv.config();
const saltRounds = 10;
const secretKey = process.env.JWT_SECRET!;

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await searchUser(email);
        if (user && user.password && await bcrypt.compare(password, user.password)) {
            console.log(secretKey);
            const token = jwt.sign({ userId: user.id }, secretKey);
            return res.json({ token, message: 'Login successful', id: user.id });
        }

        res.status(401).json({ message: 'Login invalid credentials' });

    } catch (error) {
        console.error('Error on Login: ', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: `Error on Login: ${errorMessage}` });
    }
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const userExist = await searchUser(email);
        if (userExist) {
            return res.status(409).json({ message: 'User already exists with this email.' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await insertUser(email, hashedPassword);
        res.json({ message: 'Signup successful', id: user?.id });

    } catch (error) {
        console.log('Error on Signup: ', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({message: `Error on Singup: ${errorMessage}`});
    }
}

export {
    login,
    signup
}