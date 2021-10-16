//Unido con indexMATH.js
const Math={}; //Guardar todo el objeto en una constante

function add(x1, x2){
    return x1+x2;
}
function substract(x1, x2){
    return x1-x2;
}
function multiply(x1, x2){
    return x1*x2;
}
function divide(x1, x2){
    if(x2==0){
        console.log('Indivisible entre 0');
    }else{
        return x1/x2;
    }
}
function hello(name){
    console.log('Hi there, ', name);
}

Math.add=add;
Math.substract=substract;
Math.multiply=multiply;
Math.divide=divide;
Math.hello=hello;

module.exports=Math;