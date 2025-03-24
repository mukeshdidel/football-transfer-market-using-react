import express from 'express';
import cors from 'cors'




const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));







app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send('something went wrong')
})

app.listen(5000, function () {
    console.log('Server is running on port 5000');  // Server started on port 5000
})