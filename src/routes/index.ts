import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import loginRouter from '../routes/login';

const router = Router();

router.use(loginRouter);

router.get('/', (req: Request, res: Response) => {
    res.send('Index Page');
});

export default router;