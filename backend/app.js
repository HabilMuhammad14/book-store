import express from 'express';
import bcrypt from 'bcrypt'
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hallo')
    console.log("Aktif")
})

app.listen(5000, () => {
    console.log('Server Berjalan Pada Port 5000')
});