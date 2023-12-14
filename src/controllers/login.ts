import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { insertUser, searchUser } from '../db/users';

const saltRounds = 10;

const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        console.log("SERVER1: ", email, password);

        const userExist = await searchUser(email);
        console.log("userExist: ", userExist);
        if (userExist) {
            return res.status(409).json({ message: 'User already exists with this email.' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log("SERVER2: ", email, password);
        const user = await insertUser(email, hashedPassword);
        res.json({ message: 'Signup successful', id: user?.id });

    } catch (error) {
        console.log('Error on Signup: ', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({message: `Error on Singup: ${errorMessage}`});
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await searchUser(email);
        if (user && user.password && await bcrypt.compare(password, user.password)) {
            return res.json({ message: 'Login successful', id: user.id });
        }

        res.status(401).json({ message: 'Login invalid credentials' });

    } catch (error) {
        console.error('Error on Login: ', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: `Error on Login: ${errorMessage}` });
    }
}

export {
    login,
    signup
}