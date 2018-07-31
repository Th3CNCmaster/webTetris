document.addEventListener("DOMContentLoaded", 
	function (event) {
		var nummer = 1;
		var lista = new Array();
		var vertikal = 10;
		var horisontell = 5;		
		var xCount = 0;
		var yCount = 0;
		var content = document.getElementById("content");
		function tetrisskapare (x, y) {		// skapar divboxar, numrerar dem med koordinater, och ritar spelplanen
			while (xCount < x && yCount < y) {			
				if (xCount == 0) {
					content.innerHTML = content.innerHTML + "<div id='" + nummer + "' class='firstTet'></div>"
					xCount++;
				}else if (xCount == x-1) {
					content.innerHTML = content.innerHTML + "<div id='" + nummer + "' class='tet'></div>"
					xCount = 0;
					yCount++;
				}else {
					content.innerHTML = content.innerHTML + "<div id='" + nummer + "' class='tet'></div>"
					xCount++;
				};
				nummer++;
			};
		};
		
		function skapaLista (x, y) { //skapar en array med vertikal*horisontell platser 
			var i = x*y-1;
			var a = 0;
			while (a <= i) {
				lista[a] = 0;
				// console.log(lista[a]);
				a++;
			};
		};

		function testaOmRadKlar (x, y) {	//testar om den understa raden är fylld
			var steg = 0;
			var antalFyllda = 0;
			while (steg < x) {
				if (lista[x*y-steg] === 1) {
					antalFyllda++;
				};
				steg++;
			};
			if (antalFyllda == y) {
				//document.getElementById("content").innerHTML = document.getElementById("content").innerHTML + "<h1> Du vann, din fule fan</h1>";
				return "radklar";
			};
		};

		function flyttaNerRad () {
			var plats = 0;
			var nyLista = new Array();
			while (plats < horisontell*vertikal-horisontell) {
				var byte = lista[plats];
				nyLista[plats+horisontell] = byte;
				plats++;
			};
			plats = 0;
			while (plats < horisontell) {
				nyLista[plats] = 0;
				plats++;
			};
			plats = 0;
			var change;
			while (plats < vertikal*horisontell) {
				change = nyLista[plats];
				lista[plats] = change;
				plats++;
			}
		};

		function rita () {	//funktionen ritar rätt färg på rutan beroende på motsvarande divbox's värde i listan
			var räknare = "1";
			while(räknare <= 50) {
				if (lista[räknare] == 1) {
					document.getElementById(räknare).style.backgroundColor = "lightblue";
				}else {
					document.getElementById(räknare).style.backgroundColor = "gray";
				}
				räknare++;
			};

		};

		tetrisskapare(horisontell, vertikal); //divboxar, spelplan

		skapaLista(horisontell, vertikal); // lista

		// if (testaOmRadKlar(vertikal, horisontell) == "radklar") {
		// 	flyttaNerRad(vertikal, horisontell);
		// }


		// runttramsande för testning av funktion
		lista[5] = 1;
		lista[2] = 1;
		lista[36] = 1;
		lista[25] = 1;
		lista[18] = 1;
		rita();
		flyttaNerRad();
		rita();
		flyttaNerRad();
		rita();



	}
);










