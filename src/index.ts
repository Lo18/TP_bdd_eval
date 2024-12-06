import express, {Request, Response} from 'express';
import mongoose from 'mongoose';


// Créer notre app
const app = express();
const PORT = 3000;



const uri = "mongodb://root:example@localhost:27017/";
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })

// Route par défaut
app.get('/', (req: Request, res: Response) => {
    res.send('balbflasblfknag');
})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})