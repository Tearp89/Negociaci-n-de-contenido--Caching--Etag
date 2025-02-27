//Marla Aguilar

const express = require('express');
const app = express();

// Middleware para parsear JSON en la petición
app.use(express.json());

app.get('/preferencia', (req, res) => {
    const data = { mensaje: "Desarrollo de sistemas en red" };
    const accept = req.accepts(['json', 'xml', 'html']); // Definir correctamente los tipos

    if (accept === 'json') {
        res.json(data);
    } else if (accept === 'xml') {
        res.type('application/xml');
        res.send(`<mensaje>${data.mensaje}</mensaje>`);
    } else if (accept === 'html') {
        res.send(`<h1>${data.mensaje}</h1>`);
    } else {
        res.status(406).send("Not acceptable");
    }
});

app.listen(3001, () => {
    console.log("Servidor escuchando en puerto 3001");
});
/*
C:\Users\marla>curl -H "Accept: text/html;q=0.9, application/json;q=0.7" http://localhost:3001/q-data
<h1>Desarrollo de sistemas en red</h1>
C:\Users\marla>
 */