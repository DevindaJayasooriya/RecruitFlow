const express = require('express');
const app = express();

const dotenv= require('dotenv').config();
 
const PORT = process.env.PORT || 5000;

app.get('/api/test', (req,res) =>{
    res.send('Test API route successfully');
})

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
}); 