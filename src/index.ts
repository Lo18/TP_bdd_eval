import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import projectsRoutes from './routes/projectsRoutes';
import tasksRoutes from './routes/tasksRoutes';
import dotenv from 'dotenv';
dotenv.config();



// Créer notre app
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', projectsRoutes);
app.use('/api', tasksRoutes);

const uri = process.env.URI;
mongoose.connect(uri as string)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })




app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})