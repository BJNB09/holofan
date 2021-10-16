//Unido con indexMATH.js

const Files={}; //Guardar todo el objeto en una constante

const fs = require('fs');

function writeFile(){
    fs.writeFile('./texto.txt', 'Este es el texto escrito desde funcion writeFile', function (err){
        if(err){ //Si error tiene valor, se ejecuta if
            console.log(err);
        }
        console.log('Archivo txt creado');
    });
};

function readFile(){
    fs.readFile('./texto.txt', function (err, data){
        if(err){ //Si error tiene valor, se ejecuta if
            console.log(err);
        }
        //console.log(data); //Envía texto crudos, buffer
        console.log('El archivo desde readFile contiene: ', data.toString()); //Envia datos en string
    });
};

Files.writeFile = writeFile;
Files.readFile = readFile;

module.exports=Files;
