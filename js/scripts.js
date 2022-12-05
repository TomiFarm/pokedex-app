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
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modal-container');
        // append list item and button
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        // add event listener for click to button
        button.addEventListener('click', function(){
            showDetails(pokemon);
        });
    }

    function showModal(title, pokemon, pokemonImage) {
        let modalContainer = document.querySelector('#modal-container');
        
        // clear all existing modal content
        modalContainer.innerHTML = '';

        // create a new <div> with class "modal"
        let modal = document.createElement('div');
        modal.classList.add('modal');
        // create close button in modal
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        // create title element in modal
        let titleElement = document.createElement('h1');
        titleElement.innerText = title;
        // create content element in modal
        let contentElement = document.createElement('p');
        contentElement.innerHTML = 'Height: ' + pokemon.height + '<br>' + 'Types: ';
      
        // create image element in modal
        let imgElement = document.createElement('img');
        imgElement.src = pokemonImage;
        // append all above
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imgElement);
        modalContainer.appendChild(modal);

        // add pokemon types to contentElement
        pokemon.types.forEach(function(item){
            let pokemonType = item.type.name;
            contentElement.insertAdjacentHTML('beforeend', pokemonType + ' ');
        });

        // add class "is visible" to modal container to make it visible
        modalContainer.classList.add('is-visible');

        // event listener for closing modal by clicking outside of it
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    // function to hide modal
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }
    // eventListener for closing modal by pressing esc
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });


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

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});
// for each loop to write out the pokemonRepository

