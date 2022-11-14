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

// for loop to write out the pokemons with heights
for (let i = 0; i < pokemonList.length; i++){
    document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ' m)');
    // write "Wow, that's big!" if a pokemon is big
    if (pokemonList[i].height > 0.6){
        document.write(' - Wow, that\'s big!');
    }
    // add a line break to the end of the loop
    document.write('<br>');
}