let randomWordURL = "https://random-word-api.herokuapp.com/word?number=1&swear=0";
let wordDefinitionURL = "https://api.dictionaryapi.dev/api/v2/entries/en_US/";

// fetch word and definition(s) from apis
fetch(randomWordURL)
.then(function(response){
	return response.json();
})
.then(function(data){
	document.getElementById("term").innerHTML = data[0];
	return data[0];
})
.then (function(word){
	return fetch(wordDefinitionURL + word);
})
.then (function(response){
	return response.json();
})

.then(function (def){
	// used for debugging and finding array/object location
	console.log(def);

		// check if valid json received
		if (def[0] != undefined) {  
			
			
			// if there is a definition, show it
			if (def[0].meanings[0] != undefined){
				let category = def[0].meanings[0].partOfSpeech;
				document.getElementById("category").innerHTML = category;
				
				// support multiple definitions
				let output = "";
				let array = def[0].meanings[0].definitions;
				for (let i = 0; i < array.length; i++){
					let definition = def[0].meanings[0].definitions[0].definition;					
					output += "<li>" + array[i].definition;
				} // for 
				
				document.getElementById("definition").innerHTML = output;
				
			} else{
				document.getElementById("definition").innerHTML = "Sorry pal, we couldn't find definitions for the word you were looking for.";
			} // show definition if else 
			
			// if there are phonetics/audio, show it
			if (def[0].phonetics[0] != undefined){
				let output2 = "";
				let output3 = "";
				if (def[0].phonetics.length != 0){
					for(let j = 0; j < def[0].phonetics.length; j++) {
						output3 += "<br>" + def[0].phonetics[j].text;
						output2 += "<br> <audio controls> <source src=" + def[0].phonetics[j].audio + " type=" + "audio/mp3" + "> </audio>";
					} // for 
					
					document.getElementById("audio").innerHTML = output2;
					document.getElementById("phonetics").innerHTML = output3;
					
				} // if
			} // if
			
		} else{
			document.getElementById("definition").innerHTML = def.message;
		} // valid json if else 
	
}); // end of program
