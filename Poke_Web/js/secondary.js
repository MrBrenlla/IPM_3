//Class for pokemon stats,... in pokemon.html

//Wait for website load the page - Important for DOM/dynamic elements 
window.addEventListener('load', function () {
    var parameter = location.search.toString();
    var pokemon = parameter.substring(parameter.indexOf("=") + 1);

    getPokemon_Info(pokemon);
})


//Realize JSON GET CALL - To Api (PokeApi)
async function getPokemon_Info(pokemon) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.toString().toLowerCase())
        .then(function (response) {

            if (response.status != 200)
            {
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
            document.querySelector("#pokeName").innerHTML = myJson.name.toString().toUpperCase() + "  /  " + myJson.id;
            addPokemon_Sprite(myJson.sprites.front_default,myJson.name);
            addPokemon_Stats(myJson.stats);
            addPokemon_Types(myJson.types);
            addPokemon_Games(myJson.game_indices);
            addPokemon_Moves(myJson.moves);
        })
        .catch(function (error) {
            console.log("Error: " + error);
        });
}

//Add current pokemon sprite to the web
async function addPokemon_Sprite(image,name) {
    var img = document.createElement('img');
    img.src = image.toString();
    img.setAttribute("class", "pokemon_sprite_img");
    img.setAttribute("style", "border: 7px solid red;border-radius: 8px;border-style: double;");
	img.setAttribute("alt", name);
    document.getElementById('poke_sprite').appendChild(img);
}

//Add pokemon stats (actual pokemon only)
async function addPokemon_Stats(stats) {

    var stat_field;
    var stat_bar;

    for (i = 0; i < stats.length; i++)
    {
        stat_field = document.createElement('p');
        stat_bar = document.createElement('div');

        stat_field.innerHTML = stats[i].stat.name.toString().toUpperCase();
        stat_field.setAttribute("id", "poke_stat" + i.toString());
        stat_bar.innerHTML = stats[i].base_stat.toString();
        stat_bar.setAttribute("class", "skills");
        if (parseInt(stats[i].base_stat) < 100)
            stat_bar.setAttribute("style", "width: " + stats[i].base_stat.toString() + '%; background-color: #72D6C9');
        else
        {
            stat_bar.setAttribute("style", "width: " + '100' + '%;background-color: #FFC785');
        }
            
        document.getElementById('poke_stats').appendChild(stat_field);
        document.getElementById('poke_stats').appendChild(stat_bar);
    }

}

//Get current pokemon types from actual pokemon
async function addPokemon_Types(types) {

    var type_field;

    for (i = 0; i < types.length; i++) {
        type_field = document.createElement('div');

        type_field.innerHTML = types[i].type.name.toString().toUpperCase();
        type_field.setAttribute("id", "poke_type" + i.toString());
        type_field.setAttribute("class", "pokemon_type");

        document.getElementById('poke_sprite').appendChild(type_field);
    }

}

//Get actual pokemon moves
async function addPokemon_Moves(moves) {

    var move_field;
   
    for (i = 0; i < moves.length; i++) {

        move_field = document.createElement('span');
        move_field.innerHTML = moves[i].move.name.toString()+ " ";
        move_field.setAttribute("id", "poke_move" + i.toString());
        move_field.setAttribute("class", "pokemon_move");

        document.getElementById('pokemon_moves_list').appendChild(move_field);
    }

}

// async function addPokemon_Moves(moves) {

    // var move_field;
	// var txt = "";
   
    // for (i = 0; i < moves.length; i++) {
		
		// txt = moves[i].move.name.toString() + " ";
		// move_field = document.createElement('span');
		// move_field.innerHTML = txt;
		// move_field.setAttribute("id", "poke_moves");
		// move_field.setAttribute("class", "pokemon_move");

		// document.getElementById('pokemon_moves_list').appendChild(move_field);
       
    // }
	
	
// }

//Get actual pokemon Games (only the games of the actual pokemon)
async function addPokemon_Games(games) {

    var game_field;
    var game_field_separator;

    var extra_counter = 0;

    for (i = 0; i < games.length; i++) {
        
        if (i % 6 == 0)
        {
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
		game_field.setAttribute("alt", "pokemon " + games[i].version.name);

        document.getElementById('game_separator' + extra_counter).appendChild(game_field);
    }
}

//Check pokemon game for add respectively sprite -- This function cannot be Asynchronous
function checkPokemonGame_Name(pokemon_game) {
    if (pokemon_game == "red")
        return "images/red.png";
    else if (pokemon_game == "blue")
        return "images/blue.png";
    else if (pokemon_game == "yellow")
        return "images/yellow.png";
    else if (pokemon_game == "gold")
        return "images/gold.png";
    else if (pokemon_game == "silver")
        return "images/silver.png";
    else if (pokemon_game == "crystal")
        return "images/crystal.png";
    else if (pokemon_game == "ruby")
        return "images/ruby.png";
    else if (pokemon_game == "sapphire")
        return "images/sapphire.png";
    else if (pokemon_game == "emerald")
        return "images/emerald.png";
    else if (pokemon_game == "firered")
        return "images/firered.png";
    else if (pokemon_game == "leafgreen")
        return "images/leafgreen.png";
    else if (pokemon_game == "diamond")
        return "images/diamond.png";
    else if (pokemon_game == "pearl")
        return "images/pearl.png";
    else if (pokemon_game == "platinum")
        return "images/platinum.png";
    else if (pokemon_game == "heartgold")
        return "images/heartgold.png";
    else if (pokemon_game == "soulsilver")
        return "images/soulsilver.png";
    else if (pokemon_game == "black")
        return "images/black.png";
    else if (pokemon_game == "white")
        return "images/white.png";
    else if (pokemon_game == "black-2")
        return "images/black-2.png";
    else if (pokemon_game == "white-2")
        return "images/white-2.png";
    else
        return null;
}
