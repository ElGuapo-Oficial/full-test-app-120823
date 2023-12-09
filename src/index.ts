import express from 'express';
import routes from './routes/index';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);

// app.get('/', (req, res) => {
//     res.send('Hello World with Express and TypeScript!');
// })

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})