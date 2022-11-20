let pokemonRepository = (function(){
    // list of pokemons as array
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // function to create list of pokemons as buttons
    function addListItem(pokemon) {
        // select .pokemon-list unordered list
        let pokemonList = document.querySelector('.pokemon-list');
        // create list item
        let listItem = document.createElement('li');
        // create button
        let button = document.createElement('button');
        // make button's text be pokemon name
        button.innerText = pokemon.name;
        // make button's class .pokemon-button
        button.classList.add('pokemon-button');
        // append list item and button
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        // add event listener for click to button
        button.addEventListener('click', function(){
            showDetails(pokemon);
        });
    }

    // function to show pokemon details
    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            console.log(pokemon);
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

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});
// for each loop to write out the pokemonRepository

