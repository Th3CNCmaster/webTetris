document.addEventListener("DOMContentLoaded", 
	function (event) {
		function tetrisskapare (x, y) {
			var xCount = 0;
			var yCount = 0;
			var content = document.getElementById("content");	// skapar divboxar och ritar spelplanen

			while (xCount < x && yCount < y) {			
				if (xCount == 0) {
					content.innerHTML = content.innerHTML + "<div class='firstTet'></div>"
					xCount++;
				}else if (xCount == x-1) {
					content.innerHTML = content.innerHTML + "<div class='tet'></div>"
					xCount = 0;
					yCount++;
				}else {
					content.innerHTML = content.innerHTML + "<div class='tet'></div>"
					xCount++;
				};
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

		function grafikMotor () {

		};

		var horisontell = 5;
		var vertikal = 10;
		tetrisskapare(horisontell, vertikal); //divboxar, spelplan
		var lista = new Array();
		skapaLista(horisontell, vertikal); // lista
		// lista[1] = 1;
		if (testaOmRadKlar(vertikal, horisontell) == "radklar") {
			flyttaNerRad(vertikal, horisontell);
		}

	}
);










