const imageCard = {
	"pikachu" : "recursos/pikachu.png",
	"charmander" : "recursos/charmander.png",
	"billy" : "recursos/billy.png",
	"coraje" : "recursos/coraje.png",
	"dexter" : "recursos/dexter.png",
	"diddy-kong" : "recursos/diddy-kong.png",
	"donkey-kong" : "recursos/donkey-kong.png",
	"fenomenoide" : "recursos/fenomenoide.png",
	"goku" : "recursos/goku.png",
	"johnny-bravo" : "recursos/johnny-bravo.png",
	"megaman" : "recursos/megaman.png",
	"metabee" : "recursos/metabee.png",
	"kratos" : "recursos/kratos.png",
	"luigiPaper" : "recursos/luigiPaper.png",
	"marioPaper" : "recursos/marioPaper.png",
	"mikey-simon" : "recursos/mikey-simon.png",

}

const indexImageCard = {
	1 : "pikachu",
	2 : "charmander",
	3 : "billy",
	4 : "coraje",
	5 : "dexter",
	6 : "diddy-kong",
	7 : "donkey-kong",
	8 : "fenomenoide",
	9 : "goku",
	10 : "johnny-bravo",
	11 : "megaman",
	12 : "metabee",
	13 : "kratos",
	14 : "luigiPaper",
	15 : "marioPaper",
	16 : "mikey-simon",
}

const gridColumns = {
	2 : "auto auto auto auto",
	4 : "auto auto auto auto",
	5 : "auto auto auto auto auto",
	6 : "auto auto auto auto",
	8 : "auto auto auto auto",
	10 : "auto auto auto auto auto"
}

const typeCardClass = {
	2 : "card3",
	4 : "card3",
	5 : "card2",
	6 : "card4",
	8 : "card",
	10 : "card"
}

function numeroRandom(intervalo_max, limite){
	var myArray = []
	while(myArray.length < limite ){
	  var numeroAleatorio = Math.ceil(Math.random()*intervalo_max);
	  var existe = false;
	  for(let i=0; i<myArray.length; i++){
		if(myArray [i] == numeroAleatorio){
	        existe = true;
	        break;
	    }
	  }
	  if(!existe){
	    myArray[myArray.length] = numeroAleatorio;
	  }
	}
	return myArray;
}

function barajar(array) {
	var i,j,k;
    for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = array[i - 1];
        array[i - 1] = array[j];
        array[j] = k;
    }
    return array;
}

var index;
var timeRecord;

function drawCard() {
	// var btn = document.getElementById("btnInit");
	// var divTable = document.getElementById("table");
	var candPares = parseInt(document.getElementById("select_pares").value);
	if(btnInit.innerHTML === "START"){
		cronometro(label_clock);
		// generando pares de card random
		index = numeroRandom(Object.keys(imageCard).length,candPares);
		index = barajar(index.concat(index));

		//insetando card		
		divTable.innerHTML = "";
		divTable.style.gridTemplateColumns = gridColumns[candPares];
		for(let i=0; i<candPares*2; i++){
			divTable.innerHTML += `
				<img id=${i}card${index[i]}
				name=enable
				class=${typeCardClass[candPares]} 
				src="recursos/reversoCard.png">		
			`;
		}

		btnInit.innerHTML = "Reset";
	} else {
		select_pares.value = "...";
		btnInit.innerHTML = "START";
		btnInit.setAttribute("disabled", "");
		label_clock.innerHTML = "00:00:00";
		divTable.innerHTML = "";
	}
}

function changeImg(element) {
	var indexImage = parseInt(element.id.substring(5));
	if (element.name != "disable" && element.src.indexOf("recursos/reversoCard.png")  != -1)
		element.src = imageCard[indexImageCard[indexImage]];
	else
		element.src = "recursos/reversoCard.png";

}

function cronometro(element) {
	var data = element.innerHTML.split(":")
	var hora = parseInt(data[0]);
	var minutos = parseInt(data[1]);
	var segundos = parseInt(data[2]);

	
	if(minutos > 59){
		minutos = 0
		hora++;
	}

	if(segundos < 60)
		segundos++;
	else{
		segundos = 0
		minutos++;
	}

	data[1] = minutos<10? "0" + minutos : minutos;
	data[2] = segundos<10? "0" + segundos : segundos;
	element.innerHTML = data[0]+":"+data[1]+":"+data[2];
	timeRecord = setTimeout(cronometro, 1000, element);
}

function cronometro_stop() {
	clearTimeout(timeRecord);
}