let pokemonRepository = (function(){
    // list of pokemons with height and types
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';



    // function to create list of pokemons as buttons
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        // Why this does not work? 
        //button.addEventListener('click', showDetails(pokemon));
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
        pokemonList.push(item);
        // validation
        /*if (typeof item !== "object"){
            console.log('item data type must be an object');
        }
        else if (Object.keys(item) !== ['name', 'height', 'types']){
            console.log('item object keys must be name, height and types');
        }
        else{
            pokemonList.push(item);
        }   */
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
                    detailsUrl: item.apiUrl
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

