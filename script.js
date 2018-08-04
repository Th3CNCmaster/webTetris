document.addEventListener("DOMContentLoaded", 
	function (event) {
		document.addEventListener("keydown", klossrörelse);
		var nummer = 1;
		var lista = new Array();
		var vertikal = 12;
		var horisontell = 6;		
		var xCount = 0;
		var yCount = 0;
		var content = document.getElementById("content");
		var poäng = 0;
		var design = document.getElementById("jSDesign");
		var variabeln;
		var ordning = 1;
		var stoppa = 0;

		// Betydelse av listvärden för divar. 0: inget på platsen 1: aktiv 2: blev stuck denna "tick" 3: stuck 
		// + (horisontell*(50/andel)) +
		function styleSetup () {
			var andel;
			if (horisontell > vertikal) {
				andel = 100/horisontell;
			}else{
				andel = 100/vertikal
			};

			design.innerHTML = design.innerHTML + ".tet {background-color: gray; width: " + (andel*0.8) + "vmin; height: " + (andel*0.8) + "vmin; float: left; border: 1px solid black; margin: 0px;}"
			design.innerHTML = design.innerHTML + ".firstTet {background-color: gray; width: " + (andel*0.8) + "vmin; height: " + (andel*0.8) + "vmin; float: left; border: 1px solid black; margin: 0px; clear: both;}"
			design.innerHTML = design.innerHTML + ".hugeRed {width: 100vw; height: 100vh; background-color: red; float: left;}"
			design.innerHTML = design.innerHTML + ".hugeGreen {width: 100vw; height: 100vh; background-color: green; float: left;}"
			design.innerHTML = design.innerHTML + "#content {position: absolute; left: 50%; margin: 0 0 0 -" + (andel*0.4)*horisontell + "vmin; vw; font-family: 'Raleway', sans-serif;}"

		};

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
				// document.getElementById("content").innerHTML = document.getElementById("content").innerHTML + "<div class='hugeGreen'> win </h1>";
				console.log("Den sista raden har fyllts!!!");
				stoppa++;
				// return "radklar";
			};
			console.log("testaOmRadKlar");
		};

		function flyttaNerRad () {
			var plats = 1;
			var scroll = 1;
			var nyLista = new Array();
			while (plats <= horisontell*vertikal) {
				if (lista[plats] == 1) {
					nyLista[plats+horisontell] = 1;
					if (lista[plats+horisontell == 0]) {
						nyLista[plats] = 0;
					};
				}else if (lista[plats] == 2) {
					nyLista[plats] = 2;
				}else if (lista[plats] == 3) {
					nyLista[plats] = 3;
				};
				plats++;
			};
			plats = 1;
			while (plats <= horisontell*vertikal) {
				scroll = nyLista[plats];
				lista[plats] = scroll;
				plats++;
			};
			var mög = 0;
			var megamög = 0;
			plats = 1;
			while (mög < horisontell) {
				if (lista[vertikal*horisontell-mög] == 3 || lista[vertikal*horisontell-mög] == 2) {
					megamög++;
				};
				mög++;
				if (megamög == horisontell) {
					var mögLista = new Array();
					while (plats <= vertikal*horisontell) {
						if (lista[plats] == 3 || lista[plats] == 2) {
							scroll = lista[plats];
							mögLista[plats+horisontell] = scroll;
						}else if (lista[plats] == 1) {
							scroll = lista[plats];
							mögLista[plats] = scroll;
						};
						plats++;
					};
					plats = 1;
					while (plats <= vertikal*horisontell) {
						scroll = mögLista[plats];
						lista[plats] = scroll;
						plats++;
					};
					megamög = 0;
					mög = 0;
				};

			};
			console.log("flyttaNerRad");
		};

		function rita () {	//funktionen ritar rätt färg på rutan beroende på motsvarande divbox's värde i listan
			var räknare = 1;
			while(räknare <= vertikal*horisontell) {
				if (lista[räknare] == 1) {
					document.getElementById(räknare).style.backgroundColor = "lightblue";
				}else if (lista[räknare] == 2){
					document.getElementById(räknare).style.backgroundColor = "red";
				}else if (lista[räknare] == 3){
					document.getElementById(räknare).style.backgroundColor = "green";
				}else {
					document.getElementById(räknare).style.backgroundColor = "gray";
				};
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
					if (lista[test] == 2) {
						antalFylldaRad++;
					};
					test = test + horisontell;
					if (antalFylldaRad == vertikal) {
						document.getElementById("content").innerHTML = document.getElementById("content").innerHTML + "<div class='hugeRed'> lose </h1>";
						console.log("FAIIIIIIIIIL");
						failSomFan = 1;
					};
				};
				b++;
				test = b;
				antalFylldaRad = 0;

			};

			console.log("kontrolleraFörlust");
		};

		function slumpaKloss () {
			var platsen = 1;
			var summa = 0;
			while (platsen <= vertikal*horisontell) {
				if (lista[platsen] == 1) {
					summa++;
				};
				platsen++;
			};
			if (summa == 0) {
				var mitt = Math.round(horisontell/2);
				console.log("horisontell/2 ish: " + Math.round(horisontell/2))
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
		};

		function poänghållare () {
			document.getElementById("poäng").innerHTML = "<h2>" + poäng + "</h2>"
			poäng = poäng + 10;
			console.log("poänghållare")
		};

		function klossrörelse (event) {				//Buggy AF :-(, ritar automatiskt efter körning
			var plats = 1;
			var scroll = 1;
			var scrollare = 1;
			var blockerare = 0;
			var nyLista = new Array();
			if (event.key == "w") {

			}else if (event.key == "s") {
				var block2;
				while (blockerare == 0) {
					block2 = 0;
					while (plats <= horisontell*vertikal){
						if (lista[plats] == 1) {
							block2++;
						};
						plats++;
					};
					if (block2 == 0) {
						blockerare++;
					}else{
						görStuck ();
						flyttaNerRad();
						görStuck ();
						rita();
					};
				};

			}else if (event.key == "a") {
				while (scrollare <= vertikal) {
					if (lista[horisontell*scrollare-horisontell+1] == 1) {
						blockerare++;
						scrollare = vertikal+1;
					};
					scrollare++;
				};
				while (plats <= horisontell*vertikal){
					if (lista[plats] == 1 && lista[plats-1] == 3) {
						blockerare++;
						plats = horisontell*vertikal;
					};
					plats++;
				};
				plats = 1;
				if (blockerare == 0) {
					while (plats <= horisontell*vertikal) {
						if (lista[plats] == 1 && lista[plats-1] != 2) {
							nyLista[plats-1] = 1;
							if (lista[plats-1 == 0]) {
								nyLista[plats] = 0;
							};
						}else if (lista[plats] == 2) {
							nyLista[plats] = 2;
						}else if (lista[plats] == 3) {
							nyLista[plats] = 3;
						};
						plats++;
					};
					plats = 1;
					while (plats <= horisontell*vertikal) {
						scroll = nyLista[plats];
						lista[plats] = scroll;
						plats++;
					};	
				};
				
			}else if (event.key == "d") {
				while (scrollare <= vertikal) {
					if (lista[horisontell*scrollare] == 1) {
						blockerare++;
						scrollare = vertikal+1;
					};
					scrollare++;
				};
				while (plats <= horisontell*vertikal){
					if (lista[plats] == 1 && lista[plats+1] == 3) {
						blockerare++;
						plats = horisontell*vertikal;
					};
					plats++;
				};
				plats = 1;
				if (blockerare == 0) {
					while (plats <= horisontell*vertikal) {
						if (lista[plats] == 1 && lista[plats+1] != 2) {
							nyLista[plats+1] = 1;
						if (lista[plats+1 == 0]) {
							nyLista[plats] = 0;
						};
						}else if (lista[plats] == 2) {
							nyLista[plats] = 2;
						}else if (lista[plats] == 3) {
							nyLista[plats] = 3;
						};
						plats++;
					};
					plats = 1;
					while (plats <= horisontell*vertikal) {
						scroll = nyLista[plats];
						lista[plats] = scroll;
						plats++;
					};
				};
				

			};
			console.log(event.key + ": klossrörelse");
			rita();
		};

		//	gör så att skiten som är längst ner inte bara försvinner, utan fastnar
		function görStuck () {
			var vandra = horisontell*vertikal;
			var placement = 1;
			while (placement <= horisontell*vertikal) {
				if (lista[placement] == 2){
					lista[placement] = 3;
				};
				placement++;
			};
			placement = 1;
			while (vandra >= 1) {
				if (lista[vandra] == 1 && vandra > horisontell*vertikal-horisontell || lista[vandra+horisontell] == 2 && lista[vandra] == 1 || lista[vandra+horisontell] == 3	 && lista[vandra] == 1 || lista[vandra+1] == 2 && lista[vandra] == 1 || lista[vandra-1] == 2 && lista[vandra] == 1) {
					lista[vandra] = 2;
				};
				vandra--;
			};
			while (placement <= horisontell*vertikal) {
				if (lista[placement-horisontell] == 2 && lista[placement] == 1 || lista[placement+horisontell] == 2 && lista[placement] == 1 || lista[placement+1] == 2 && lista[placement] == 1 || lista[placement-1] == 2 && lista[placement] == 1) {
					lista[placement] = 2;
				};
				placement++;
			};

			console.log("görStuck");
		};
		
		function stuckPermanent () {
			var vandrare = 1;
			while (vandrare <= horisontell*vertikal) {
				if (lista[vandrare] == 2) {
					lista[vandrare] == 3;
				};
				vandrare++;
			};
			console.log("stuckPermanent");
		};

		styleSetup();		//stilfixarn
		tetrisskapare(horisontell, vertikal); //divboxar, spelplan
		skapaLista(horisontell, vertikal); // lista                        Dessa körs efterdirekt DOMContentLoaded och behöver bara köras en gång.





		// runttramsande för testning av funktion
		// lista[1] = 0;
		// lista[12] = 2;
		// lista[13] = 2;
		// lista[14] = 2;

			var milliPerTick = 1000/3;
			variabeln = setInterval(webTetris, milliPerTick);
			function webTetris() {
	  				flyttaNerRad();
					slumpaKloss();
					rita();
					poänghållare();
	  		 		// testaOmRadKlar();
	  		 		kontrolleraFörlust();
	  		 		görStuck();
			};

	}
);










