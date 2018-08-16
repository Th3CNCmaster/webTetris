document.addEventListener("DOMContentLoaded", 
	function (event) {
		document.addEventListener("keydown", klossrörelse);
		var nummer = 1;
		var lista = new Array();
		var vertikal = 12;
		var horisontell = 6;		
		var xCount = 0;
		var yCount = 0;
		var end = document.getElementById("end");
		var content = document.getElementById("content");
		var poäng = 0;
		var design = document.getElementById("jsDesign");
		var variabeln;
		var ordning = 1;
		var stoppa = 0;
		var bitTyp = 0;
		var mitt = Math.round(horisontell/2);
		var klossPosition;
		var horisontellPlacering = Math.round(horisontell/2);
		var vertikalPlacering = 1;
		var stickUtHöger;
		var stickUtVänster;
		var stickUtUpp;
		var tryckNer;
		var tryckHöger;
		var frånVänsterKant;
		var frånHögerKant;
		var frånTopp;

		function styleSetup () {
			var andel;
			if (horisontell > vertikal) {
				andel = 100/horisontell;
			}else{
				andel = 100/vertikal
			};

			design.innerHTML = design.innerHTML + ".tet {background-color: gray; width: " + (andel*0.8) + "vmin; height: " + (andel*0.8) + "vmin; float: left; border: 1px solid black; margin: 0px;}"
			design.innerHTML = design.innerHTML + ".firstTet {background-color: gray; width: " + (andel*0.8) + "vmin; height: " + (andel*0.8) + "vmin; float: left; border: 1px solid black; margin: 0px; clear: both;}"
			design.innerHTML = design.innerHTML + "#content {position: absolute; left: 50%; text-align: center; margin: 0 0 0 -" + (andel*0.4)*horisontell + "vmin; vw; font-family: 'Raleway', sans-serif;}"

		};

		function tetrisskapare (x, y) {	
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
			// console.log("tetrisskapare");
		};
		
		function skapaLista (x, y) {
			var i = x*y-1;
			var a = 0;
			while (a <= i) {
				lista[a] = 0;
				// console.log(lista[a]);
				a++;
			};
			// console.log("skapaLista");
		};

		function flyttaNerRad () {
			var plats = 1;
			var scroll = 1;
			vertikalPlacering++;
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
					console.log("radfull!!")
					poäng = poäng + 1000;
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
				};

			};
			console.log(nyLista);
			mitt = mitt + horisontell;
			görStuck();
			kontrolleraFörlust();
			// console.log("flyttaNerRad");
		};

		function rita () {	//funktionen ritar rätt färg på rutan beroende på motsvarande divbox's värde i listan
			var räknare = 1;
			while(räknare <= vertikal*horisontell) {
				if (lista[räknare] == 1) {
					document.getElementById(räknare).style.backgroundColor = "lightblue";
				}else if (lista[räknare] == 2){
					document.getElementById(räknare).style.backgroundColor = "green";
				}else if (lista[räknare] == 3){
					document.getElementById(räknare).style.backgroundColor = "green";
				}else {
					document.getElementById(räknare).style.backgroundColor = "gray";
				};
				räknare++;
			};
			// console.log("rita");
		};

		function kontrolleraFörlust() {
			var scroller = 1;
			var testOmFörlust = 0;
			while (scroller <= horisontell) {
				if (lista[scroller] == 2 || lista[scroller] == 3) {
					testOmFörlust++;
				}; 
				scroller++;
			};
			if (testOmFörlust != 0) {
				content.innerHTML = "";
				end.innerHTML = "<h1>Game Over!<h1> <button onclick='location.reload();'>Play again</button>"
				clearInterval(variabeln);
			};


			// console.log("kontrolleraFörlust");
		};

		function slumpaKloss () {
			kontrolleraFörlust();
			var platsen = 1;
			var summa = 0;
			while (platsen <= vertikal*horisontell) {
				if (lista[platsen] == 1) {
					summa++;
				};
				platsen++;
			};
			if (summa == 0) {
				klossPosition = 1;
				horisontellPlacering = Math.round(horisontell/2);
				vertikalPlacering = 1;
				mitt = Math.round(horisontell/2);
				console.log("horisontell/2 ish: " + Math.round(horisontell/2))
				var klossSlumpare = Math.round(Math.random()*100);
				console.log(klossSlumpare);
				if (0 <= klossSlumpare && klossSlumpare < 14) {
					lista[mitt] = 1;
					lista[mitt+1] = 1;
					lista[mitt+2] = 1;
					lista[mitt-1] = 1;
					bitTyp = 1;
					console.log("I");
				}else if (14 < klossSlumpare && klossSlumpare < 28){
					lista[mitt] = 1;
					lista[mitt+1] = 1;
					lista[mitt-1] = 1;
					lista[mitt-1+horisontell] = 1;
					bitTyp = 2;
					console.log("J");
				}else if (28 < klossSlumpare && klossSlumpare < 42){
					lista[mitt] = 1;
					lista[mitt+1] = 1;
					lista[mitt-1] = 1;
					lista[mitt-1+horisontell] = 1;
					bitTyp = 3;
					console.log("L");
				}else if (42 < klossSlumpare && klossSlumpare < 56){
					lista[mitt] = 1;
					lista[mitt+1] = 1;
					lista[mitt+horisontell] = 1;
					lista[mitt+1+horisontell] = 1;
					bitTyp = 4;
					console.log("O");
				}else if (56 < klossSlumpare && klossSlumpare < 70){
					lista[mitt] = 1;
					lista[mitt+1] = 1;
					lista[mitt+horisontell] = 1;
					lista[mitt-1+horisontell] = 1;
					bitTyp = 5;
					console.log("S");
				}else if (70 < klossSlumpare && klossSlumpare < 84){
					lista[mitt] = 1;
					lista[mitt+1] = 1;
					lista[mitt+horisontell] = 1;
					lista[mitt-1] = 1;
					bitTyp = 6;
					console.log("T");
				}else if (84 < klossSlumpare && klossSlumpare < 100){
					lista[mitt] = 1;
					lista[mitt-1] = 1;
					lista[mitt+horisontell] = 1;
					lista[mitt+1+horisontell] = 1;
					bitTyp = 7;
					console.log("Z");
				};
			};
			görStuck();
		};

		function poänghållare () {
			document.getElementById("poäng").innerHTML = "<h2>" + "Score: " + poäng + "</h2>"
			poäng = poäng + 10;
			console.log("poänghållare")
		};

		function klossrörelse (event) {				
			var plats = 1;
			var scroll = 1;
			var scrollare = 1;
			var blockerare = 0;
			var nyLista = new Array();
			if (event.key == "w" || event.key == "W") {
				if (bitTyp == 1) {
					if (klossPosition == 1) {
						stickUtVänster = 0;
						stickUtHöger = 0;
						stickUtUpp = 1;
					}else if (klossPosition == 2) {
						stickUtVänster = 1;
						stickUtHöger = 2;
						stickUtUpp = 0;
					}else if (klossPosition == 3) {
						stickUtVänster = 0;
						stickUtHöger = 0;
						stickUtUpp = 1;
					}else if (klossPosition == 4) {
						stickUtVänster = 1;
						stickUtHöger = 2;
						stickUtUpp = 0;
					};
					testaOmPush();
					if (klossPosition == 1) {
						testaOmRotation(mitt, mitt+horisontell, mitt+horisontell*2, mitt-horisontell);
					}else if (klossPosition == 2) {
						testaOmRotation(mitt, mitt+1, mitt+2, mitt-1);
					}else if (klossPosition == 3) {
						testaOmRotation(mitt, mitt+horisontell, mitt+horisontell*2, mitt-horisontell);
					}else if (klossPosition == 4) {
						testaOmRotation(mitt, mitt+1, mitt+2, mitt-1);
					};
				}else if (bitTyp == 2) {
					if (klossPosition == 1) {
						stickUtVänster = 1;
						stickUtHöger = 0;
						stickUtUpp = 1;
					}else if (klossPosition == 2) {
						stickUtVänster = 1;
						stickUtHöger = 1;
						stickUtUpp = 0;
					}else if (klossPosition == 3) {
						stickUtVänster = 0;
						stickUtHöger = 1;
						stickUtUpp = 1;
					}else if (klossPosition == 4) {
						stickUtVänster = 1;
						stickUtHöger = 1;
						stickUtUpp = 0;
					};
					testaOmPush();
					if (klossPosition == 1) {
						testaOmRotation(mitt, mitt+horisontell, mitt-horisontell, mitt+horisontell-1);
					}else if (klossPosition == 2) {
						testaOmRotation(mitt, mitt+1, mitt-1, mitt-1-horisontell);
					}else if (klossPosition == 3) {
						testaOmRotation(mitt, mitt+horisontell, mitt-horisontell, mitt-horisontell+1);
					}else if (klossPosition == 4) {
						testaOmRotation(mitt, mitt-1, mitt+1, mitt+1+horisontell);
					};
				}else if (bitTyp == 3) {
					if (klossPosition == 1) {
						stickUtVänster = 1;
						stickUtHöger = 0;
						stickUtUpp = 1;
					}else if (klossPosition == 2) {
						stickUtVänster = 1;
						stickUtHöger = 1;
						stickUtUpp = 1;
					}else if (klossPosition == 3) {
						stickUtVänster = 0;
						stickUtHöger = 1;
						stickUtUpp = 1;
					}else if (klossPosition == 4) {
						stickUtVänster = 1;
						stickUtHöger = 1;
						stickUtUpp = 0;
					};
					testaOmPush();
					if (klossPosition == 1) {
						testaOmRotation(mitt, mitt+horisontell, mitt-horisontell, mitt-horisontell-1);
					}else if (klossPosition == 2) {
						testaOmRotation(mitt, mitt+1, mitt-1, mitt+1-horisontell);
					}else if (klossPosition == 3) {
						testaOmRotation(mitt, mitt+horisontell, mitt-horisontell, mitt+horisontell+1);
					}else if (klossPosition == 4) {
						testaOmRotation(mitt, mitt-1, mitt+1, mitt-1+horisontell);
					};
				}else if (bitTyp == 4) {

				}else if (bitTyp == 5) {
					if (klossPosition == 1) {
						stickUtVänster = 1;
						stickUtHöger = 0;
						stickUtUpp = 1;
					}else if (klossPosition == 2) {
						stickUtVänster = 1;
						stickUtHöger = 1;
						stickUtUpp = 1;
					}else if (klossPosition == 3) {
						stickUtVänster = 1;
						stickUtHöger = 0;
						stickUtUpp = 1;
					}else if (klossPosition == 4) {
						stickUtVänster = 1;
						stickUtHöger = 1;
						stickUtUpp = 1;
					};
					testaOmPush();
					if (klossPosition == 1) {
						testaOmRotation(mitt, mitt-1, mitt+horisontell, mitt-horisontell-1);
					}else if (klossPosition == 2) {
						testaOmRotation(mitt, mitt+1, mitt+horisontell, mitt-1+horisontell);
					}else if (klossPosition == 3) {
						testaOmRotation(mitt, mitt-1, mitt+horisontell, mitt-horisontell-1);
					}else if (klossPosition == 4) {
						testaOmRotation(mitt, mitt+1, mitt+horisontell, mitt-1+horisontell);
					};

				}else if (bitTyp == 6) {
					if (klossPosition == 1) {
						stickUtVänster = 1;
						stickUtHöger = 0;
						stickUtUpp = 1;
					}else if (klossPosition == 2) {
						stickUtVänster = 1;
						stickUtHöger = 1;
						stickUtUpp = 1;
					}else if (klossPosition == 3) {
						stickUtVänster = 0;
						stickUtHöger = 1;
						stickUtUpp = 1;
					}else if (klossPosition == 4) {
						stickUtVänster = 1;
						stickUtHöger = 1;
						stickUtUpp = 0;
					};
					testaOmPush();
					if (klossPosition == 1) {
						testaOmRotation(mitt, mitt-1, mitt-horisontell, mitt+horisontell);
					}else if (klossPosition == 2) {
						testaOmRotation(mitt, mitt-1, mitt+1, mitt-horisontell);
					}else if (klossPosition == 3) {
						testaOmRotation(mitt, mitt+1, mitt-horisontell, mitt+horisontell);
					}else if (klossPosition == 4) {
						testaOmRotation(mitt, mitt+1, mitt-1, mitt+horisontell);
					};
				}else if (bitTyp == 7) {
					if (klossPosition == 1) {
						stickUtVänster = 1;
						stickUtHöger = 0;
						stickUtUpp = 1;
					}else if (klossPosition == 2) {
						stickUtVänster = 1;
						stickUtHöger = 1;
						stickUtUpp = 0;
					}else if (klossPosition == 3) {
						stickUtVänster = 1;
						stickUtHöger = 0;
						stickUtUpp = 1;
					}else if (klossPosition == 4) {
						stickUtVänster = 1;
						stickUtHöger = 1;
						stickUtUpp = 0;
					};
					testaOmPush();
					if (klossPosition == 1) {
						testaOmRotation(mitt, mitt-1, mitt-horisontell, mitt+horisontell-1);
					}else if (klossPosition == 2) {
						testaOmRotation(mitt, mitt-1, mitt+horisontell, mitt+1+horisontell);
					}else if (klossPosition == 3) {
						testaOmRotation(mitt, mitt-1, mitt-horisontell, mitt+horisontell-1);
					}else if (klossPosition == 4) {
						testaOmRotation(mitt, mitt-1, mitt+horisontell, mitt+1+horisontell);
					};
				};
				görStuck();
			}else if (event.key == "s" || event.key == "S") {
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
				görStuck();
			}else if (event.key == "a" || event.key == "A") {
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
					mitt--;
					horisontellPlacering--;
				};
				görStuck();
			}else if (event.key == "d" || event.key == "D") {
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
					mitt++;
					horisontellPlacering++;
				};
				görStuck();

			};
			// console.log("horisontellPlacering + " + horisontellPlacering);
			// console.log("vertikalPlacering + " + vertikalPlacering);
			// console.log(event.key + ": klossrörelse");
			rita();
		};

		function testaOmRotation (a, b, c ,d) {
			scroll = 1;
			if (d+tryckHöger+horisontell*tryckNer <= horisontell*vertikal && c+tryckHöger+horisontell*tryckNer <= horisontell*vertikal && b+tryckHöger+horisontell*tryckNer <= horisontell*vertikal && a+tryckHöger+horisontell*tryckNer <= horisontell*vertikal && lista[a+tryckHöger+horisontell*tryckNer] != 2 && lista[a+tryckHöger+horisontell*tryckNer] != 3 && lista[b+tryckHöger+horisontell*tryckNer] != 2 && lista[b+tryckHöger+horisontell*tryckNer] != 3 && lista[c+tryckHöger+horisontell*tryckNer] != 2 && lista[c+tryckHöger+horisontell*tryckNer] != 3 && lista[d+tryckHöger+horisontell*tryckNer] != 2 && lista[d+tryckHöger+horisontell*tryckNer] != 3) {
						while (scroll <= horisontell*vertikal) {
							if (lista[scroll] == 1) {
								lista[scroll] = 0;
							};
							scroll++;
						};
						lista[a+tryckHöger+horisontell*tryckNer] = 1;
						lista[b+tryckHöger+horisontell*tryckNer] = 1;
						lista[c+tryckHöger+horisontell*tryckNer] = 1;
						lista[d+tryckHöger+horisontell*tryckNer] = 1;
						if (klossPosition == 4) {
							klossPosition = 1;
						}else {
							klossPosition++;
						};
						// console.log("mitt = " + mitt);
					};
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
				if (lista[vandra] == 1 && vandra > horisontell*vertikal-horisontell || lista[vandra+horisontell] == 2 && lista[vandra] == 1 || lista[vandra+horisontell] == 3 && lista[vandra] == 1 || lista[vandra+1] == 2 && lista[vandra] == 1 || lista[vandra-1] == 2 && lista[vandra] == 1) {
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
			// console.log("görStuck");
		};

		function testaOmPush () {
			frånVänsterKant = horisontellPlacering - 1;
			frånHögerKant = horisontell - horisontellPlacering;
			frånTopp = vertikalPlacering - 1;
			if (stickUtVänster - frånVänsterKant > 0) {
				tryckHöger = stickUtVänster - frånVänsterKant;
			}else if (stickUtHöger - frånHögerKant > 0) {
				tryckHöger = frånHögerKant - stickUtHöger;
			}else {
				tryckHöger = 0;
			};
			if (stickUtUpp - frånTopp > 0) {
				tryckNer = stickUtUpp - frånTopp;
			}else {
				tryckNer = 0;
			};
		};

		function restart () {
			location.reload();
		};

		styleSetup();
		tetrisskapare(horisontell, vertikal);
		skapaLista(horisontell, vertikal);

			var milliPerTick = 700;
			variabeln = setInterval(webTetris, milliPerTick);
			function webTetris() {
					görStuck();
	  				flyttaNerRad();
					slumpaKloss();
					rita();
					poänghållare();
	  		 		kontrolleraFörlust();
			};
	}
);










