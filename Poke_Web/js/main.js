//Class for index,catalogo.html and recommended pokemon

var currentGame;

//Wait for website load the page - Important for DOM/dynamic elements
window.addEventListener('load', function () {
    var pokemonCount = 649; //Includes 5th generation Pokemon - (Black and White - 2)

    getPokemon_Games(pokemonCount);
    getPokemon_Recommended(pokemonCount);
    changeOak_Advice();
})

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
async function getPokemon_All(pokemonCount, pokeGames) {
    var pokemonGame_div;
    var pokemonGame_pic;

    var htmlSite = window.location.href;

    var currentHtml = htmlSite.substring(
        htmlSite.lastIndexOf("/") + 1,
        htmlSite.lastIndexOf(".")
    );

    if (currentHtml != "pokemon")
    {
        for (i = 0; i < pokeGames.length; i++) {
            pokemonGame_sec = document.createElement('section');
            pokemonGame_pic = document.createElement('img');
            pokemonGame_pic.src = "images/" + pokeGames[i].version.name + ".png";
            pokemonGame_pic.setAttribute('style', 'margin-top: 25px;');
            pokemonGame_pic.setAttribute('class', "pokeGame_pic");
            pokemonGame_pic.setAttribute('id', "pokeGame_pic_" + pokeGames[i].version.name);
            pokemonGame_pic.setAttribute('style', 'display: none;');
			pokemonGame_pic.setAttribute('alt', 'Pokemons de pokemon edición '+pokeGames[i].version.name);
            pokemonGame_sec.setAttribute('id', pokeGames[i].version.name);
            pokemonGame_sec.setAttribute('class', pokeGames[i].version.name);
            pokemonGame_sec.setAttribute('style', 'margin-top: 25px;display: none;');
			
			

            document.getElementById('catalogo').appendChild(pokemonGame_pic);
            document.getElementById('catalogo').appendChild(pokemonGame_sec);
        }

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
                    addPokemon_Sprite(myJson.sprites.front_default, myJson.game_indices, myJson.id, myJson.name);
                })
                .catch(function (error) {
                    console.log("Error: " + error);
                });
        }
    }
    
}

//Get all pokemons games string's
async function getPokemon_Games(pokemonCount) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + "pikachu") //Pikachu will be in all Pokemon Games
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

            getPokemon_All(pokemonCount,myJson.game_indices); 
        })
        .catch(function (error) {
            console.log("Error: " + error);
        });
}

//Add sprite current pokemon to website
async function addPokemon_Sprite(image, games, currentPokemon, name) {

    var sprite;
    var link;

    for (game = games.length-1; game < games.length; game++) { //<- Check if all PokemonGame_divs are created: checking the last one - white-2

        checkElement('#' + games[game].version.name) //use whichever selector you want
            .then((element) => {
                for (game2 = 0; game2 < games.length; game2++) {
                    link = document.createElement('a');

                    link.setAttribute("href", "pokemon.html?poke_name=" + currentPokemon);
                    link.setAttribute("id", game2 +" "+currentPokemon);
                    sprite = document.createElement('img');
                    sprite.src = image.toString();
                    sprite.setAttribute("class", "pokemon_sprite_catalogo" + currentPokemon);
                    sprite.setAttribute("id", "pokemon_" + game2 +"_"+ currentPokemon);
					sprite.setAttribute("alt", name);
                    sprite.setAttribute("style", "border: 2px solid red;border-radius: 2px;border-style: simple;");
                    document.getElementById(games[game2].version.name).appendChild(link);
                    document.getElementById(game2 + " " + currentPokemon).appendChild(sprite);
                }
            });
    }


    checkElement('#' + "pokemon_3_" + "649") //use whichever selector you want
        .then((element) => {
            document.getElementById("load").setAttribute("style", "display:none");
            for (i = 0; i < games.length; i++) {
                document.getElementById("pokeGame_pic_" + games[i].version.name.toString()).setAttribute("style", "display:box");
                document.getElementById(games[i].version.name.toString()).setAttribute("style", "margin-top: 25px;display:box");
            }
        });
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

