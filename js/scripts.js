let pokemonRepository = (function(){
    // list of pokemons as array
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // function to create a pokemon as button
    function addListItem(pokemon) {
        // select .pokemon-list unordered list
        let pokemonList = document.querySelector('.pokemon-list');
        // create list item
        let listItem = document.createElement('li');
        listItem.classList.add('list-inline-item');
        // create button
        let button = document.createElement('button');
        // make button's text be pokemon name
        button.innerText = pokemon.name;
        // add classes to the button
        button.classList.add('pokemon-button','btn','btn-primary');
        button.setAttribute('type', 'button');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemon-modal');
        // append list item and button
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        // add event listener for click to button
        button.addEventListener('click', function(){
            showDetails(pokemon);
        });
    }

    function showModal(title, pokemon, pokemonImage) {

        // modal title
        let titleElement = document.querySelector('#modal-label');
        titleElement.innerText = title;

        // modal content text
        let contentElement = document.querySelector('#modal-body-text');
        contentElement.innerHTML = 'Height: ' + pokemon.height + '<br>' + 'Types: ';

        // add pokemon types to contentElement
        pokemon.types.forEach(function(item){
            let pokemonType = item.type.name;
            contentElement.insertAdjacentHTML('beforeend', pokemonType + ' ');
        });

        // image in modal
        let pokemonImg = document.querySelector('#pokemon-image');
        pokemonImg.src = pokemonImage;
    }

    // function to show pokemon details
    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            showModal(pokemon.name, pokemon, pokemon.imageUrl);
        });
    }

    // function to add a new pokemon to the pokemonList
    function add(item) {
        if (typeof item === "object"){
            pokemonList.push(item);
        }
        else {
            console.log('Pokemon data type is not object');
        }
    }

    // function to return the whole pokemonList
    function getAll() {
        return pokemonList;
    }

    // function for loading pokemons from apiUrl and adding them to pokemonList array using add function
    function loadList(){
        return fetch(apiUrl).then(function (response){
            return response.json();
        }).then(function (json){
            json.results.forEach(function(item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
            add(pokemon);
            });   
        }).catch(function (e){
            console.error(e);
        })
    }

    function loadDetails(item){
        let url = item.detailsUrl;
        return fetch(url).then(function (response){
            return response.json();
        }).then(function (details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e){
            console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

// for each loop to write out the pokemonRepository
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});