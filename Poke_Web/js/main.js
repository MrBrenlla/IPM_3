//Class for index,catalogo.html and recommended pokemon

var currentGame;

//Wait for website load the page - Important for DOM/dynamic elements
window.addEventListener('load', function () {
    getPokemon_All(649);
    getPokemon_Recommended(649);
    changeOak_Advice();
});

//Wait for element - For Async Calls
async function rafAsync() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve); //faster than set time out
    });
}

//Check if elements exist - For Async Calls
async function checkElement(selector) {
    if (document.querySelector(selector) === null) {
        return rafAsync().then(() => checkElement(selector));
    } else {
        return Promise.resolve(true);
    }
}


//Get all pokemon games and create multiple subdivisions (table-column) with images
async function getPokemon_All(pokemonCount) {

    //Calls for all pokemon in the pokedex to get for him the sprite
    for (currentPokemon = 1; currentPokemon < pokemonCount + 1; currentPokemon++) {
		fetch("https://pokeapi.co/api/v2/pokemon/" + currentPokemon)
            .then(function (response) {

                if (response.status != 200) {
                    if (response.status == 404) {
                            window.location.href = 'errors/404.html';
                    }
                    else if (response.status == 400) {
                        alert("Bad request : Please, back to HOME page and insert valid data");
                    }
					else {
                        throw new Error(response.status)
                    }
                }

                return response.json();
            })
            .then(function (myJson) {
                addPokemon_Sprite(myJson.sprites.front_default, myJson.game_indices[0].version.name, myJson.name);
            })
            .catch(function (error) {
                console.log("Error: " + error);
            });
    }
    
}

function GameToGen(game){
	switch(game){
		case "red": case "blue": case "yellow": return 1; break;
		
		case "gold": case "silver": case "crystal": return 2; break;
		
		case "leafgreen": case "firered": case "ruby": case "sapphire": case "emerald": return 3; break;
		
		case "heartgold": case "soulsilver": case "diamond": case "pearl": case "platinum": return 4; break;
		
		case "white": case "white-2":case "black": case "black-2": return 5; break;
	}
}

//Add sprite current pokemon to website
async function addPokemon_Sprite(image, game, name) {

    var sprite;
    var link;

    link = document.createElement('a');
    link.setAttribute("href", "pokemon.html?poke_name=" + name);
    link.setAttribute("id",name);
	
    sprite = document.createElement('img');
    sprite.src = image.toString();
    sprite.setAttribute("class", "pokemon_sprite_catalogo");
    sprite.setAttribute("id","img_" +name);
	sprite.setAttribute("alt", name);
    sprite.setAttribute("style", "border: 2px solid red;border-radius: 2px;border-style: simple;");
	 
	
    document.getElementById("gen_"+GameToGen(game)).appendChild(link);
    document.getElementById(name).appendChild(sprite);

}

//Add pokemons games to website
async function addPokemon_Games(games) {

    var game_field;
    var game_field_separator;

    var extra_counter = 0;

    for (i = 0; i < games.length; i++) {

        if (i % 6 == 0) {
            game_field_separator = document.createElement('div');
            game_field_separator.setAttribute("id", "game_separator" + i.toString());
            document.getElementById('pokemon_games_list').appendChild(game_field_separator);

            if (i != 0)
                extra_counter += 6;
        }

        game_field = document.createElement('img');
        game_field.src = checkPokemonGame_Name(games[i].version.name.toString());
        game_field.setAttribute("id", "poke_game" + i.toString());
        game_field.setAttribute("class", "pokemon_game");
		pokemonGame_pic.setAttribute('alt', 'pokemon ' + games[i].version.name);

        document.getElementById('game_separator' + extra_counter).appendChild(game_field);
    }
}

//Get multiple pokemon from the api (random)
async function getPokemon_Recommended(pokemons) {
    var randomPokemon;
    

    for (i = 0; i < 3; i++) {
        randomPokemon = Math.floor(Math.random() * pokemons + 1);

        fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon)
            .then(function (response) {
                if (response.status != 200) {
                    if (response.status == 404) {
                        window.location.href = 'errors/404.html';
                    }
                    else if (response.status == 400) {
                        alert("Bad request : Please, back to HOME page and insert valid data");
                    }
                    else {
                        throw new Error(response.status)
                    }
                }

                return response.json();
            })
            .then(function (myJson) {
                addRecommendedPokemon_Sprite(myJson.sprites.front_default, myJson.id, myJson.name);
            })
            .catch(function (error) {
                console.log("Error: " + error);
            });
    } 
}

//From the random pokemon, get the sprite and place in the website
async function addRecommendedPokemon_Sprite(image, pokeId,name) {
    var img = document.createElement('img');
    var link = document.createElement('a');

    link.setAttribute("href", "pokemon.html?poke_name=" + pokeId);
    link.setAttribute("id", "image_"+pokeId);
    img.src = image.toString();
    img.setAttribute("class", "poke_recom_sprite_img");
    img.setAttribute("style", "border: 7px solid red;border-radius: 8px;border-style: double;");
	img.setAttribute("alt", name);
    document.getElementById('recommended_poke').appendChild(link);
    document.getElementById("image_" + pokeId).appendChild(img);
}

//Get random advice text from Oak
async function changeOak_Advice() {
    let advices = [
        "Aprovecha la caracter\u00EDsticas de intercambio de Pok\u00E9mon con otros entrenadores.",
        "Ten en cuenta las habilidades de tu pokem\u00F3n y el tipo de pokem\u00F3n de tu rival",
        "Recuerda: Usa las MasterBall para pokem\u00F3ns legendarios",
        "Debes terminar de recolectar la informaci\u00F3n necesaria para la pok\u00E9dex! -- Att. Oak"];
    var randomPokemon;
    randomPokemon = Math.floor(Math.random() * 4);

    document.getElementById('oak_adv').innerHTML = advices[randomPokemon];
}

