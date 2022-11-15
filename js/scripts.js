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

//forEach loop to write out the pokemon names with heights
pokemonList.forEach(function(pokemon){
    document.write(pokemon.name + ' (Height: ' + pokemon.height + ' m)');
    if (pokemon.height > 0.6){
        document.write(' - Wow, that\'s big!');
    }
    document.write('<br>');
});
