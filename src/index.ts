import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes/index';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
    origin: 'https://www.najashmarron.com'
}));
// app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})