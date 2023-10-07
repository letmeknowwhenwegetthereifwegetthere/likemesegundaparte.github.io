const express = require('express');
const { getData, insertData, insertLike, deletePost} = require('./query');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.listen(3001,  () =>{
    console.log('CORS-enabled web server listening on port 3001')
});

const reportarConsulta = async (req, res, next) => {
const parametros = req.params;
const url = req.url;
console.log(`
Hoy ${new Date()}
Se ha recibido una consulta en la ruta ${url}
con los parámetros:`, parametros);
next();
};
    
// consulta para ver los posts 
app.get('/posts',async (req, res) => {
    try {
        const posts = await getData();
        res.json(posts);
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).send("Error al obtener los posts");
    }
});
// agregar nuevos posts
app.post('/posts', reportarConsulta, async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body;
        if (titulo !== '' && url !== '' && descripcion !== ''){
            await insertData(titulo, url, descripcion);
            res.send("producto agregado con éxito");
        }else{
            console.log("faltan datos");
            alert("faltan datos");
        }
        
    }catch({code, message}){
        console.log(code +": "+ message)
        res.status(code).send(message);
    }
});

// agregar likes
app.put('/posts/like/:id', reportarConsulta, async (req, res) => {
    try{
        const {id} = req.params;
        await insertLike(id)
        res.send("like agregado")
    }catch({code, message}){
        console.log(code +": "+ message)
        res.status(code).send(message);
    }
})

// eliminar un post
app.delete('/posts/:id', reportarConsulta, async (req, res) => {
    try{
        const {id} = req.params;
        await deletePost(id)
        res.send("post eliminado")
    }catch({code, message}){
        console.log(code +": "+ message)
        res.status(code).send(message);
    }
})
