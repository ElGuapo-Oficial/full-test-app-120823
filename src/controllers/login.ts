import { Request, Response, NextFunction } from 'express';

const login = (req: Request, res: Response, next: NextFunction) => {
    res.send('Login Page');
}

export {
    login
}