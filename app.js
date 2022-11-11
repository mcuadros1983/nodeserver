const express = require('express')
const app = express() //le asignamos a app lo que arroja express cuando se ejecuta

app.get('/', function(req,res){ //esta es la funcion con la que vamos a controlar la peticion. req es la peticion al servidor y res es lo que vamos a responder al servidor
    res.send("Hola mundo")//esto vamos a responder al servidor cuando se visite dicha ruta
})
app.listen(3000)//le asignamos el puerto donde se cargara la aplicacion

//Ejemplo de funcion
// function suma(a,b){
//     return a+b
// }
// suma(3,8)