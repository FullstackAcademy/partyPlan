const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2504-FTB-ET-WEB-PT/events"; 
let parties = [];
let selectedParty = null;
let error = null;

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);


function PartyList(parties) {
  const ul = document.createElement('ul');
  if (parties && parties.length > 0) {
    parties.forEach(party => {
      const li = document.createElement('li');
      li.textContent = party.name;
      li.addEventListener('click', () => fetchAndDisplayParty(party.id)); 
      ul.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'No parties found.';
    ul.appendChild(li);
  }
  app.appendChild(ul);

  return ul;
}

function PartyDetails(party) {
  const div = document.createElement('div');
  if (party) {
    div.innerHTML = `
    <h2>Party Details</h2>
      <h3>${party.name} #${party.id}</h3>
      <p>Date: ${party.date}</p>
      <p>Location: ${party.location}</p>
      <p>Description: ${party.description}</p>
    `;
  } else {
    div.textContent = 'Select a party from the list to view details.';
  }
  app.appendChild(div);

  return div;
}

function ErrorMessage(error) {
  const div = document.createElement('div');
  if (error) {
    div.textContent = `Error: ${error.message}`;
    div.style.color = 'red';
  }
  return div;
}

async function fetchParties() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    parties = data.data; 
    error = null;
    render(); 
  } catch (err) {
    error = err;
    parties = [];
    render(); 
  }
}

async function fetchAndDisplayParty(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    selectedParty = data.data; 
    error = null;
    render(); 
  } catch (err) {
    error = err;
    selectedParty = null;
    render(); 
  }
}



function render() {
  const appContainer = document.getElementById('app'); 
  appContainer.innerHTML = '<h1>Party Planner</h1>'; 

  appContainer.appendChild(PartyList(parties));
  appContainer.appendChild(PartyDetails(selectedParty));
  appContainer.appendChild(ErrorMessage(error));
}

fetchParties();
