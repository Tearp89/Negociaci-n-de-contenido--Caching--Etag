//Marla Aguilar

const express = require('express');
const app = express();
const crypto = require('crypto');

//Middleware para parsear JSON en la petición
app.use(express.json()); 

app.get('/etag', (req,res)=>{
    const content = {mensaje: "Contenido con Etag"};
    const jsonString = JSON.stringify(content);
    const etag = crypto.createHash('md5').update(jsonString).digest('hex');
    if(req.header['if-none-match']==etag){
        return res.status(304).end();
    }
    res.set('Etag', etag);
    res.json(content)
})

app.listen(3003, ()=>{
    console.log("Servidor escuchando en puerto 3003");
})

/*
curl -i -H "If-None-Match: d7d091a471455d5f08951542d5bcdd5a" http://localhost:3003/etag
curl -i http://localhost:3003/etag
*/