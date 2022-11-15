let pokemonRepository = (function(){
    // list of pokemons with height and types
    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 0.7,
            types: ['grass', 'poison']
        },
        {
            name: 'Pikachu',
            height: 0.4,
            types: ['electric']
        },
        {
            name: 'Charmander',
            height: 0.6,
            types: ['fire']
        },
        {
            name: 'Squirtle',
            height: 0.5,
            types: ['water']
        }
    ];

    // function to add a new pokemon to the pokemonList
    function add(item) {
        // validation
        if (typeof item !== "object"){
            console.log('item data type must be an object');
        }
        else if (Object.keys(item) !== ['name', 'height', 'types']){
            console.log('item object keys must be name, height and types');
        }
        else{
            pokemonList.push(item);
        }
        
    }

    // function to return the whole pokemonList
    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

// fetch pokemonList from the function
pokemonRepository = pokemonRepository.getAll();

// for each loop to write out the pokemonRepository
pokemonRepository.forEach(function(pokemon){
    document.write(pokemon.name + ' (Height: ' + pokemon.height + ' m)');
    if (pokemon.height > 0.6){
        document.write(' - Wow, that\'s big!');
    }
    document.write('<br>');
});