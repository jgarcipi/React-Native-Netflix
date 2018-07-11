import data from '../data.json'
export function getAll(){
    return data
}
// funcion que divida el comtenido de nuetstro json en dos array
function getTwoLists(json){
    //variable para almacenar el array
    var array = json.slice(0)
    //variable de la longitus divididad entre dos y lo redondeamos con math
    var val= Math.floor(array.length / 2)
    //new array desde 0 hasta la longitud guardada en val
    //al momento que partimos el array js es lo suficiente inteligente como para limitar el oprimer array
    var newArray= array.splice(val,)
    console.log(array)
    //luego retornamods los dos array 
    return[array, newArray]
   
}
// Lo exportamos y le pasamor la data
export const getTwoItems = getTwoLists(data)