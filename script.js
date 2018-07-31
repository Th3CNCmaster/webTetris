document.addEventListener("DOMContentLoaded", 
	function (event) {
		var nummer = 1;
		var lista = new Array();
		var vertikal = 10;
		var horisontell = 5;		
		var xCount = 0;
		var yCount = 0;
		var content = document.getElementById("content");
		var poäng = 0;
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
			console.log("tetrisskapare");
		};
		
		function skapaLista (x, y) { //skapar en array med vertikal*horisontell platser 
			var i = x*y-1;
			var a = 0;
			while (a <= i) {
				lista[a] = 0;
				// console.log(lista[a]);
				a++;
			};
			console.log("skapaLista");
		};

		function testaOmRadKlar () {	//testar om den understa raden är fylld KAN VARA BUGGIG!!
			var steg = 0;
			var antalFyllda = 0;
			while (steg < horisontell) {
				if (lista[vertikal*horisontell-steg] === 1) {
					antalFyllda++;
				};
				steg++;
			};
			if (antalFyllda == horisontell) {     // antalFyllda=x?????????????
				document.getElementById("content").innerHTML = document.getElementById("content").innerHTML + "<div class='hugeGreen'> win </h1>";
				console.log("Den sista raden har fyllts!!!");
				return "radklar";
			};
			console.log("testaOmRadKlar");
		};

		function flyttaNerRad () {
			var plats = 1;
			var nyLista = new Array();
			while (plats <= horisontell*vertikal-horisontell) {
				var byte = lista[plats];
				nyLista[plats+horisontell] = byte;
				plats++;
			};
			plats = 1;
			while (plats <= horisontell) {
				nyLista[plats] = 0;
				plats++;
			};
			plats = 1;
			var change;
			while (plats <= vertikal*horisontell) {
				change = nyLista[plats];
				lista[plats] = change;
				plats++;
			};
			console.log("flyttaNerRad");
		};

		function rita () {	//funktionen ritar rätt färg på rutan beroende på motsvarande divbox's värde i listan
			var räknare = "1";
			while(räknare <= vertikal*horisontell) {
				if (lista[räknare] == 1) {
					document.getElementById(räknare).style.backgroundColor = "lightblue";
				}else {
					document.getElementById(räknare).style.backgroundColor = "gray";
				}
				räknare++;
			};
			console.log("rita");
		};

		function kontrolleraFörlust() {
			var antalFylldaRad = 0;
			var test = 1;
			var b = 1;
			while (b <= horisontell) {
				while (test < vertikal*horisontell) {
					if (lista[test] == 1) {
						antalFylldaRad++;
					};
					test = test + horisontell;
					if (antalFylldaRad == vertikal) {
						document.getElementById("content").innerHTML = document.getElementById("content").innerHTML + "<div class='hugeRed'> lose </h1>";
						console.log("FAIIIIIIIIIL");
						// return "förlust";
					};
				};
				b++;
				test = b;
				antalFylldaRad = 0;

			};

			console.log("kontrolleraFörlust");
		};

		function slumpaKloss () {
			var mitt = Math.round(horisontell/2);
			var klossSlumpare = Math.round(Math.random()*100);
			console.log(klossSlumpare);
			if (0 <= klossSlumpare && klossSlumpare < 25) {
				lista[mitt] = 1;
				lista[mitt+horisontell] = 1;
				lista[mitt+2*horisontell] =1;
				console.log("bit vertikal skapad");
			}else if (25 < klossSlumpare && klossSlumpare < 50){
				lista[mitt] = 1;
				lista[mitt+1] = 1;
				lista[mitt-1] = 1;
				console.log("bit horisontell skapad");
			}else if (50 < klossSlumpare && klossSlumpare < 75){
				lista[mitt] = 1;
				lista[mitt+1] = 1;
				lista[mitt-1] = 1;
				lista[mitt+1+horisontell] = 1;
				console.log("krokbit2 skapad");
			}else if (75 < klossSlumpare && klossSlumpare < 100){
				lista[mitt] = 1;
				lista[mitt+1] = 1;
				lista[mitt-1+horisontell] = 1;
				lista[mitt-1] = 1;
				console.log("krokbit skapad");
			};
		};

		function poänghållare () {
			document.getElementById("poäng").innerHTML = "<h2>" + poäng + "</h2>"
			poäng = poäng + 10;
			console.log("poänghållare")
		}
		tetrisskapare(horisontell, vertikal); //divboxar, spelplan
		skapaLista(horisontell, vertikal); // lista                        Dessa körs efterdirekt DOMContentLoaded och behöver bara köras en gång.





		// runttramsande för testning av funktion
		lista[1] = 1;
		lista[2] = 1;
		lista[3] = 1;
		lista[4] = 1;

		rita();
		kontrolleraFörlust();
		testaOmRadKlar();
		var variabeln;
		function webTetris() {
			var milliPerTick = 1000/3;
			variablen = setInterval(poänghållare, milliPerTick*3);
  			variabeln = setInterval(flyttaNerRad, milliPerTick);
  		 	variabeln = setInterval(rita, milliPerTick/20);
  		 	variabeln = setInterval(testaOmRadKlar, milliPerTick/3);
  		 	variabeln = setInterval(kontrolleraFörlust, milliPerTick/3);
  		 	variabeln = setInterval(slumpaKloss, milliPerTick*7);

		}

		webTetris();
	}
);










