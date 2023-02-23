const btnAgregar = document.querySelector('#btnAgregar');
btnAgregar.addEventListener('click', agregar);

const btnGirar = document.querySelector('#btnGirar');
btnGirar.addEventListener('click', girar);

const btnExaminar = document.querySelector('#btnExaminar');
btnExaminar.addEventListener('click', examinar);

const btnPlayTimer = document.querySelector('#btnPlayTimer');
btnPlayTimer.addEventListener('click', playtimer);

const btnStopTimer = document.querySelector('#btnStopTimer');
btnStopTimer.addEventListener('click', stoptimer);


var contador = 0;
var nombres = [];
var nombresOriginal= [];
var giros = 0;
var selNombres = [];
var timerInerval;

function stoptimer(){
  var yourUlbtnStopTimer = document.getElementById("btnStopTimer"); 
  yourUlbtnStopTimer.style.display = yourUlbtnStopTimer.style.display === 'none' ? '' : 'none';

  var yourUlbtnPlayTimer = document.getElementById("btnPlayTimer"); 
  yourUlbtnPlayTimer.style.display = yourUlbtnPlayTimer.style.display === 'none' ? '' : 'none'; 

  clearInterval(timerInerval);
   
  var lastIndexElement = selNombres.length-1;
  var parrafoId="p_"+lastIndexElement;
  var objParrafo= document.getElementById(parrafoId);
  if (objParrafo != null){
    var textoOriginal = objParrafo.innerHTML;
    objParrafo.innerHTML = textoOriginal;
  
    var tiempoParticipanteId="TiempoParticipante_"+lastIndexElement;
    document.getElementById(tiempoParticipanteId).innerHTML =  document.getElementById("playtimer").innerHTML;
  }
  
  document.getElementById("playtimer").innerHTML = "00:00";
}


function examinar() {
  var yourUlmyForm = document.getElementById("myForm");
  //var yourUlbtnExaminar = document.getElementById("btnExaminar");
  var yourUltxtName = document.getElementById("txtName"); 
  var yourUlbtnAgregar = document.getElementById("btnAgregar"); 

  yourUlmyForm.style.display = yourUlmyForm.style.display === 'none' ? '' : 'none';
  //yourUlbtnExaminar.style.display = yourUlbtnExaminar.style.display === 'none' ? '' : 'none';
  yourUltxtName.style.display = yourUltxtName.style.display === 'none' ? '' : 'none';
  yourUlbtnAgregar.style.display = yourUlbtnAgregar.style.display === 'none' ? '' : 'none';
}

function pulsar(e) {
  if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      
      agregar();
  }
}

function agregar() {
  var text = document.querySelector('#txtName');
 if (text.value != '')
 {

    var exist = nombresOriginal.indexOf(text.value);
    //console.log(exist);
    if (exist!=-1){
      if (nombres.length>0){
        alert("El nombre ya fue ingresado");
      return;
      }
      else{
        nombresOriginal = [];
        contador = 0;
        selNombres=[];
        
        var yourUlbtnGirar= document.getElementById("btnGirar"); 
        yourUlbtnGirar.style.display = 'none';
      }
      
    }

    addPersona(text.value);

    text.value = "";
    text.focus();

  }

 };

 function addPersona(value)
 {
  
  var div = document.createElement('div');
  div.id = "item_"+contador;
  div.innerHTML = value;
  div.className = 'flexbox pad col-4 col-sm-4';
  div.style.borderColor =  generarNuevoColor();

  const container = document.querySelector('#container');
  container.append(div);

  nombres.push(value);
  nombresOriginal.push(value);

  contador++;

  var yourUlbtnGirar= document.getElementById("btnGirar"); 
  yourUlbtnGirar.style.display = '';

 }

 function girar(){
  document.getElementById("btnGirar").disabled = true;
  var sonido = document.querySelector('#audio');
  //sonido.setAttribute('src', 'sonido/ruleta.mp3');
  
  var divCounter= document.getElementById("divCounter"); 
  divCounter.style.display = 'none';

  var timer = document.getElementById("timer");
  timer.style.display =  '';

  var spinner = document.getElementById("spinner");
  spinner.style.display = '';
  
  var randImg = Math.floor(Math.random() * (14 - 1) + 1);
  //console.log(randImg);

  const spinnerQuerySelector = document.querySelector('#spinner');
  var src="assets/images/"+randImg+".gif";
  spinnerQuerySelector.setAttribute('src', src);

  var minute = 0;
  var sec = 3;
  identificadorDeTemporizador = setInterval(function() {
    document.getElementById("timer").innerHTML = sec;
    sec--;

    if (sec == -1) {
      //alert("termino el tiempo");
      ejecutaGiro();
      clearInterval(identificadorDeTemporizador);
      timer.style.display = "none";
      spinner.style.display = "none";
      divCounter.style.display = "";
    }
  }, 1000);
  
 }

 function ejecutaGiro(){
  if (nombres.length>0){
    giros++;
    
    var objSelect;
    var randText = nombres[Math.floor(Math.random() * nombres.length)];
    var rand = nombresOriginal.indexOf(randText);

    //console.log("Nombre "+randText);
    //console.log("Indice en array original "+rand);
    //console.log(nombresOriginal);

    objSelect = document.querySelector('#item_'+rand);
    
    nombres = nombres.filter((item) => item !== randText)

    if (objSelect !== null)
    {
      objSelect.style.backgroundColor = 'yellow';  
      selNombres.push(randText);
      //console.log(selNombres);

      
      setTimeout(() => {  
        objSelect.remove();   
        //objSelect.innerHTML = "";

        var indexNombre = selNombres.indexOf(randText); 
        //var mybtn = " <div type='button' class='btn btn-info' id='btnPlay_"+indexNombre+"'><i class='bi bi-play-fill'></i>go</div>";
        
        var parrafo = document.createElement('p');
        parrafo.id = "p_"+indexNombre;
        parrafo.innerHTML = (indexNombre+1)+". "+randText + " <span id='TiempoParticipante_"+indexNombre+"'></span>";
        parrafo.className = 'parrafos';
        
        const selection = document.querySelector('#seleccion');
        selection.append(parrafo);

        
        var divCounter= document.getElementById("divCounter"); 
        divCounter.style.display = '';

        document.getElementById("btnGirar").disabled = false;

        //console.log(nombres.length);
        if (nombres.length==0)
        {
          var yourUlbtnGirar= document.getElementById("btnGirar"); 
          yourUlbtnGirar.style.display = 'none';
        }

        }, 3000);
        //confirmAction(objSelect);
    }
  }

 }

function playtimer(){
  var yourUlbtnStopTimer = document.getElementById("btnStopTimer"); 
  yourUlbtnStopTimer.style.display = yourUlbtnStopTimer.style.display === 'none' ? '' : 'none';

  var yourUlbtnPlayTimer = document.getElementById("btnPlayTimer"); 
  yourUlbtnPlayTimer.style.display = yourUlbtnPlayTimer.style.display === 'none' ? '' : 'none';

  var minute = 0; //cero min por default
  var sec = 0;
  
  timerInerval = setInterval(function() {
    document.getElementById("playtimer").innerHTML = minute.toString().padStart(2, '0') + ":" + sec.toString().padStart(2, '0');
    sec++;

    if (sec == 60) {
      minute++;
      sec = 0;

      if (minute == 60) {
        minute = 0; //cero min por default
      }
    }
  }, 1000);

}


function confirmAction(objSelect) {
  let confirmAction = confirm("Remove?");
  if (confirmAction) {
    //alert("Action successfully executed");
    objSelect.remove();   
  } else {
    //alert("Action canceled");
  }
}



////

var input = myForm.myInput;
var reader = new FileReader;

input.addEventListener('change', onChange);


function onChange(event) {
  var file = event.target.files[0];
  
  reader.readAsText(file);
  
  reader.onload = onLoad;
  
}

function onLoad() {
  
  //contador = nombres.length;

  var result = reader.result; // Obtienes el texto
  // En tu ejemplo lo obtienes de una petición HTTP
  
  var lineas = result.split('\n');
  
  
  // o lineas.forEach(function(linea){ ... })
  // o lineas.find(function(linea){ return linea == contraseña })
    
  //console.log(nombres.length);
  //if (selNombres.length>0){
    for (var i=0; i<nombresOriginal.length; i++){
      objSelectDivItem = document.querySelector('#item_'+i);
      objSelectParrafo = document.querySelector('#p_'+i);
      if (objSelectDivItem != null)
      {
        objSelectDivItem.remove();
      }
      if (objSelectParrafo != null)
      {
        objSelectParrafo.remove();
      }
      

    }
  //}

  nombres=[];
  nombresOriginal=[];
  contador=0;
  selNombres=[];

  var yourUlbtnGirar= document.getElementById("btnGirar"); 
  yourUlbtnGirar.style.display = 'none';
  
  var divCounter= document.getElementById("divCounter"); 
  divCounter.style.display = 'none';

  for(var linea of lineas) {
    
    addPersona(linea);
    
  }

  myForm.myInput.value="";
  
}

function generarNuevoColor(){
	var simbolos, color;
	simbolos = "0123456789ABCDEF";
	color = "#";

	for(var i = 0; i < 6; i++){
		color = color + simbolos[Math.floor(Math.random() * 16)];
	}

	return color;
}