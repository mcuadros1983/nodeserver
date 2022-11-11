const express = require('express')
const app = express() //le asignamos a app lo que arroja express cuando se ejecuta
const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs')//paquete nativo de nodejs para interactuar con archivos de sistema

//Middler ware para leer archivos 
//const upload = multer({dest: 'uploads/'}) //Crea la carpeta donde se guardar
const storageStrategy = multer.memoryStorage() //modifica la linea anterior
const upload = multer({storage: storageStrategy}) //ya no se almacena en el proyecto sino en memoria
//Middleware para parsera la info que viene del body
app.use(express.json())

app.get('/', function(req,res){ //esta es la funcion con la que vamos a controlar la peticion. req es la peticion al servidor y res es lo que vamos a responder al servidor
    res.send("Hola mundo")//esto vamos a responder al servidor cuando se visite dicha ruta
})

app.post('/imagen', upload.single('imagen'), async function (req,res){ //debido a que .toBuffer() devuelve una promesa se le debe agregar async a la funcion para que pueda esperara a que termine la funcion toBuffer()
    const body = req.body;
    const imagen = req.file //se almacena el dato requerido 
    const proccesedImage = sharp(imagen.buffer) //se transforma el buffer de datos del archivo requerido
    console.log(proccesedImage)
    res.send("Hola mundo desde post")
    const resizeImage = proccesedImage.resize(800,200,{//este nuevo objeto es para darle las oopciones a la imagen reescalada
        fit:"contain",//esta propiedad permite que la imagen este contenida dentro del contenedor
        background:"#fff" //color fondo
    })//se procede a redefinir el tamaño de la imagen
    const resizeImageBuffer = await resizeImage.toBuffer()//se vuelve a convertir en buffer de datos, devuelve una promsea
    fs.writeFileSync("nuevaruta/prueba.png",resizeImageBuffer)//instruccion para visualizar la imagen reescalada (se debe crear manualmente la nueva carpeta)


})

const PORT = process.env.PORT || 3000 //variable de entorno indica que se utilice el puerto que nos otorguen en su defecto el puerto 3000
console.log({PORT})
app.listen(PORT, function(){
    console.log("Servidor escuchando en el puerto",PORT)
})//le asignamos el puerto donde se cargara la aplicacion


//Ejemplo de funcion
// function suma(a,b){
//     return a+b
// }
// suma(3,8)