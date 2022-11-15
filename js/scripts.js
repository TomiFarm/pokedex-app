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

    function add(item) {
        pokemonList.push(item);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

//forEach loop to write out the pokemon names with heights
pokemonRepository = pokemonRepository.getAll(); // fetch pokemonList from the function

//write out the pokemonRepository
pokemonRepository.forEach(function(pokemon){
    document.write(pokemon.name + ' (Height: ' + pokemon.height + ' m)');
    if (pokemon.height > 0.6){
        document.write(' - Wow, that\'s big!');
    }
    document.write('<br>');
});
