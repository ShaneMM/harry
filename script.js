let url = "https://hp-api.onrender.com/api/characters";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    characters = data;
});

// Søke knappen
function search() {
  const input = document.getElementById('input').value.toLowerCase();
  const errorContainer = document.getElementById('error-container');
  
  errorContainer.innerHTML = '';
  const character = characters.find(char => char.name.toLowerCase().includes(input));

  if (character) {
    displayCharacter(character);
  } else {
    const error = document.createElement('p');
    error.innerHTML = "Det er ingen med dette navnet!";
    
    errorContainer.appendChild(error);
  }

  document.getElementById('input').value = '';
}


// Viser karaktern
function displayCharacter(character) {
  const characterCard = document.createElement('div');
  characterCard.classList.add('character-card');

  const characterImg = document.createElement('img');
  characterImg.src = character.image;
  characterImg.alt = character.name;
  characterImg.classList.add('character-img');

  const characterInfo = document.createElement('div');
  characterInfo.classList.add('character-info');
  characterInfo.innerHTML = `
    <p><strong>Name:</strong> ${character.name}</p>
    <p><strong>Year of Birth:</strong> ${character.yearOfBirth || "Unknown"}</p>
    <p><strong>House:</strong> ${character.house || "Unknown"}</p>
    <p><strong>Gender:</strong> ${character.gender}</p>
    <p><strong>Eye Color:</strong> ${character.eyeColour || "Unknown"}</p>
    <p><strong>Hair Color:</strong> ${character.hairColour || "Unknown"}</p>
    <p><strong>Actor:</strong> ${character.actor || "Unknown"}</p>
  `;
  
  const existingCard = document.querySelector('.character-card');
  if (existingCard) existingCard.remove();

  document.body.appendChild(characterCard);
  characterCard.appendChild(characterImg);
  characterCard.appendChild(characterInfo);
}

// Enter knappen
document.getElementById('input').addEventListener('keypress', function() {
  if (event.key === 'Enter') {
    search();
  }
});