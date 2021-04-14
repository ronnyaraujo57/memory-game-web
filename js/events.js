btnInit.addEventListener("click", () => {
	select_pares.setAttribute("disabled", "");

	// lista de las cartas
	var listimg = document.getElementsByTagName("img");
	var disables = 0;
	console.log(listimg.length);
	// agregando evento a cada carta al iniciar la partida
	for (let carta1 of listimg){
		carta1.addEventListener("click", () => {
			changeImg(carta1);
			disables = 0;
			for (let carta2 of listimg){

				// si son iguales desactivarlas
				if(carta1.src === carta2.src && carta1.id !== carta2.id){
					carta1.name = "disable";
					carta2.name = "disable";
					break;
				}

				// si son diferentes voltearlas
				if(carta2.src.indexOf("reversoCard.png")  === -1 && carta1.src.indexOf("reversoCard.png")  === -1 
					&& carta1.id !== carta2.id && carta1.name !== "disable" && carta2.name !== "disable"){
					setTimeout(changeImg,1300,carta1);
					setTimeout(changeImg,1300,carta2);
					break;
				}
			}

			for (let carta2 of listimg){
				if(carta2.name === "disable")
					disables++;
			}
			console.log(disables);
			if(disables === listimg.length){
				clearTimeout(timeRecord);
				btnInit.innerHTML = "Reset";
			}
		})
	}
})

select_pares.addEventListener("change", () => {
	if(select_pares.id !== "..."){
		btnInit.removeAttribute("disabled");
	}
})

btnRecord.addEventListener("click",() => {
	console.log(timeRecord);
	clearTimeout(timeRecord);
})


