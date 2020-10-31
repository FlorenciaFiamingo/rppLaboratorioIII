window.addEventListener("load",function(){
   
    mostrarOcultarDiv();
    ajax();
    
    var btn = document.getElementById("btn");
    btn.addEventListener("click", enviarDatos);

    var btn2 = document.getElementById("btnMas");
    btn2.addEventListener("click", mostrarOcultarDiv);
    btn2.addEventListener("click", resetForm);

    var btn1 = document.getElementById('btnCancelar');
    btn1.addEventListener('click', cerrar);

/*    var btn3 = document.getElementById('btnEliminar');
    btn3.addEventListener('click', eliminarRegistro);

    var btn4 = document.getElementById('btnModificar');
   /* btn4.addEventListener("click", function(event){
        event.preventDefault()
    });
    btn4.addEventListener('click', modificarRegistro);*/

    cargarTabla();

});

// Variable global se utiliza para obtener fila que se clickea
var miEvento;

//PARA EL ALTA
function enviarDatos(){
    
    if(validarDatos()=== true){
        var dato = obtenerDatos();
        ajaxEnviarJSON(dato,"nuevoAuto");    
    }
    
}

function obtenerUltimoID(){
    var tabla = document.getElementById('tbody');
    //console.log(tabla.lastChild.firstChild.innerHTML);
    var ultimoID = tabla.lastChild.firstChild;
    if(ultimoID===null){
        ultimoID=0;
    }else{

        ultimoID.innerHTML;
    }
    return ultimoID;
}

// Obtiene los datos del formulario
function obtenerDatos(){
    var dato = {};
    dato["id"] = document.getElementById('id').value;
    //obtenerUltimoID() + 1;
    dato["make"] = document.getElementById("make").value;
    dato["model"] = document.getElementById("model").value;
    dato["year"] = document.getElementById("year").value;

    return dato;
}

//Inserta datos en la tabla por DOM
function insertarNuevoDato(data){

    var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    var fila = document.createElement('tr');

    for (var i in data) {
            var celda = document.createElement('td');
            celda.style.textAlign = 'left';
            var dato = document.createTextNode(data[i]);
            celda.appendChild(dato);
            fila.appendChild(celda);
        }
        table.appendChild(fila);
}

// Carga los datos de la cabecera de la tabla cuando carga la pag
function cargarTabla(){

    //CABECERA
    var thead = document.getElementById('cabecera');

    var th1 = document.createElement('th');
    var txtTh1 = document.createTextNode('Id');
    th1.appendChild(txtTh1);

    var th2 = document.createElement('th');
    var txtTh2 = document.createTextNode('Make');
    th2.appendChild(txtTh2);

    var th3 = document.createElement('th');
    var txtTh3 = document.createTextNode('Model');
    th3.appendChild(txtTh3);

    var th4 = document.createElement('th');
    var txtTh4 = document.createTextNode('Year');
    th4.appendChild(txtTh4);

    thead.appendChild(th1);
    thead.appendChild(th2);
    thead.appendChild(th3);
    thead.appendChild(th4);

}

// Rellena la tabla con los datos que se pasan en JSON
function cargarTablaJSON(data){
    var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];

    for (var i in data) {
        var fila = document.createElement('tr');
        for (var j in data[i]) {
            var celda = document.createElement('td');
            var dato = document.createTextNode(data[i][j]);
            celda.appendChild(dato);
            fila.appendChild(celda);
        }

        var anios = {};
        anios = fila.lastChild.textContent;
        var an = anios.replace(4,4);
        console.log(an);
        fila.lastChild.textContent = '';
        
        var select = document.createElement('SELECT');
        var option = document.createElement('option');
    
        option.text = an;
        option.value = an;
        select.options.add(option);
        

        var ultCelda = fila.lastChild.appendChild(select);
      //  ultCelda.value(fila.lastChild.textContent);
      //  console.log(ultCelda);

      //Funcion para cargar las provincias al campo "select".
        table.appendChild(fila);

    }

}

// Vacía los datos del formulario
function resetForm(){
    
    document.getElementById("make").value = "";
    document.getElementById("model").value = "";
    document.getElementById("year").value = "2020";
}

// Debe eliminar el registro por DOM cuando tenga el ok del server, va al botón
function eliminarRegistro(){

    var dato = obtenerDatos();
    ajaxEnviarJSON(dato,"eliminar"); 

}

function eliminarDOM(){

    var fila = miEvento.parentNode;
    var tabla = document.getElementById('tbody');
    tabla.removeChild(fila);

}

// MODIFICAR VA AL BOTON Y AJAX
function modificarRegistro(){
    
    cambiarInputs();
    
    if(validarDatos()=== true){
        var datos = obtenerDatos();
        ajaxEnviarJSON(datos,"editar");
        }
}

function modificarDOM(){
    var celda = miEvento;
    var fila = miEvento.parentNode;
    var tabla = document.getElementById('tbody');

    var dato = obtenerDatos();
    var fecha = new String(dato.fecha);
    var arrayFecha = fecha.split("-", 3);
    var dia = arrayFecha[2];
    var mes = arrayFecha[1];
    var ano = arrayFecha[0];
    var mesdiaano = dia + "/"+mes+"/"+ano;

    var x1 = fila.firstChild; //id
    var x2 = x1.nextSibling; //nombre
    var x3 = x2.nextSibling; //cuatri
    var x4 = x3.nextSibling; //fecha
    var x5 = fila.lastChild; // turno

    x1.innerHTML = dato.id;
    x2.innerHTML = dato.nombre;
    x3.innerHTML = dato.cuatrimestre;
    x4.innerHTML = mesdiaano;
    x5.innerHTML = dato.turno;

}

function cerrar(){
    cancelar();
}

function cancelar(){
    mostrarOcultarDiv();
}
//Cambiar border inputs a negro
function cambiarInputs(){
    var nombre = document.getElementById('make');
    nombre.style.borderColor = 'black';
    var fecha = document.getElementById('model');
    fecha.style.borderColor = 'black';
}

//Valida nombre y fecha
function validarDatos(){
    
    var dato = obtenerDatos();

    var min = 3
    var make = document.getElementById('make');
    var model = document.getElementById('model');
    var makeString = new String(dato.make);
    var modelString = new String(dato.model);
    
    var retorno;

    if(makeString.length > 0 && makeString.length < min){
        make.style.borderColor = 'red';
        alert('La cantidad mínima de caracteres para la marca es de : ' + min);
        console.log(makeString);
        retorno = false;
    }else if(modelString.length > 0 && modelString.length < min){
        model.style.borderColor = 'red';
        alert('La cantidad mínima de caracteres para el modelo es de : ' + min);
        retorno = false;

    }else{
        make.style.borderColor = 'black';
        model.style.borderColor = 'black';
        year.style.borderColor = 'black';
        retorno = true;
    }

    return retorno;
    
}

function mostrarOcultarDiv(){
    var div = document.getElementById("divForm");
    div.style.display = (div.style.display == 'none') ? 'block' : 'none';
}
/*
function mostrarSpinner(){
    var contenedor = document.getElementById('contenedor_spinner');
    contenedor.style.visibility = visible;
    contenedor.style.opacity='0';
}*/


// MUESTRA EN EL FORMULARIO LOS DATOS DE LA LÍNEA QUE CLICKEÉ EN LA TABLA
function levantarDatos(event) { 
  /*  if(document.getElementById("divForm").style.display == 'none'){
        mostrarOcultarDiv();
    }
     */
    mostrarOcultarDiv();

    var x = event.target.parentElement;
    
    var x1 = x.firstChild; //id
    var x2 = x1.nextSibling; //make
    var x3 = x2.nextSibling; //model
    var x4 = x.lastChild; //year

    var x1txt = x1.innerHTML; //id txt
    var x2txt = x2.innerHTML; //make txt
    var x3txt = x3.innerHTML;//model txt
    var x4txt = x4.innerHTML; //year

    var id = document.getElementById("id");
    var make = document.getElementById("make");
    var model = document.getElementById("model");
    var year = document.getElementById("year");

    
    id.value = x1txt;
    make.value = x2txt;
    model.value = x3txt;
    year.value =  x4txt;

    miEvento = event.target; //Exactamente la celda que toqué
   // console.log(miEvento);
  }

// ************** AJAX ****************

// CARGA AL INICIO
  function ajax(){

    var datos = {};

    var promesa = new Promise(function(resolve, rejected){
        var peticionHttp = new XMLHttpRequest();
        peticionHttp.open("GET","http://localhost:3000/autos?id="+ datos.id +"&make="+datos.make+"&model="+ datos.model+"&year="+datos.year, true);
        peticionHttp.setRequestHeader("Content-type","application/json");// si es json "application/json
        peticionHttp.send(JSON.stringify({"id": datos.id, "make": datos.make , "model" : datos.model , 
        "year" : datos.year}));
    
        peticionHttp.onload = function(){
            if(peticionHttp.readyState=== 4){
                if(peticionHttp.status === 200){
                  //  console.log("ok");
                    resolve(peticionHttp.response);
                    var datos = JSON.parse(peticionHttp.response);
                    cargarTablaJSON(datos);     
                    
                }else{
                    rejected("Error");
                }
            }else{
                rejected("Error");
            }    
        }
    });

    promesa.then(
        function(){cargarTablaJSON(datos);}
    );

}

//ENVIO JSON Y URL PARA ELIMINAR O MODIFICAR
function ajaxEnviarJSON(datos, url){

    var promesa = new Promise(function(resolve, rejected){
        var peticionHttp = new XMLHttpRequest();
        peticionHttp.open("POST","http://localhost:3000/" + url, true);
        peticionHttp.setRequestHeader("Content-type","application/json");// si es json "application/json
        peticionHttp.send(JSON.stringify({"id": datos.id, "make": datos.make , "model" : datos.model , 
        "year" : datos.year}));
    
        peticionHttp.onload = function(){
            if(peticionHttp.readyState=== 4){
                if(peticionHttp.status === 200){
                    console.log("ok");
                    resolve(peticionHttp.response);
                }else{
                    rejected("Error");
                }
            }else{
                rejected("Error");
            }    
        }
    });

  /*  promesa.then(
        function(){insertarNuevoDato(datos); console.log("pase por acá");}
    );*/
    promesa.then(
        function(){
            if(url == "eliminar"){
                eliminarDOM();
                console.log(miEvento.parentNode);
                resetForm();
            }else if(url == 'editar'){
                modificarDOM();
                resetForm();
            }else if(url == 'nuevoAuto'){
                insertarNuevoDato(datos);
                resetForm();
            }
        }
    );
    
}
