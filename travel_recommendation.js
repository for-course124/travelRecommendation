let travelData = null;

fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log('Travel data loaded:', data);
  })
  .catch(error => console.error('Error loading data:', error));

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const results = document.getElementById('results');


function escapeHtml(text) {
    return String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

function showPage(page) {
  document.getElementById('home').style.display = 'none';
  document.getElementById('about').style.display = 'none';
  document.getElementById('contact').style.display = 'none';
  document.getElementById(page).style.display = 'block';
  document.getElementById('searchBar').style.display = page === 'home' ? 'inline' : 'none';
}
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for contacting us!');
  e.target.reset();
});

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim().toLowerCase();
  results.innerHTML = '';

  if (!query) {
    results.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }

  if (!travelData) {
    results.innerHTML = '<p>Travel data not loaded yet. Please try again.</p>';
    return;
  }

  let output = '';

  if (query.includes('beach')) {
    output += '<h3>Beaches</h3>';
    travelData.beaches.forEach(beach => {
      output += `
        <div>
          <h4>${escapeHtml(beach.name)}</h4>
          <img src="${beach.imageUrl}" alt="${beach.name}" width="200">
          <p>${escapeHtml(beach.description)}</p>
        </div>`;
    });
  } else if (query.includes('temple')) {
    output += '<h3>Temples</h3>';
    travelData.temples.forEach(temple => {
      output += `
        <div>
          <h4>${escapeHtml(temple.name)}</h4>
          <img src="${temple.imageUrl}" alt="${temple.name}" width="200">
          <p>${escapeHtml(temple.description)}</p>
        </div>`;
    });
  } else if (query.includes('country') || query.includes('countries')) {
    output += '<h3>Countries</h3>';
    travelData.countries.forEach(country => {
      output += `
        <div>
          <h4>${escapeHtml(country.name)}</h4>
          <ul>
            ${country.cities.map(city => `
              <li>
                <strong>${escapeHtml(city.name)}</strong><br>
                <img src="${city.imageUrl}" alt="${city.name}" width="200"><br>
                ${escapeHtml(city.description)}
              </li>
            `).join('')}
          </ul>
        </div>`;
    });
  } else {
    output = `<p>No matching results found for "${escapeHtml(query)}".</p>`;
  }

  results.innerHTML = output;
});

resetBtn.addEventListener('click', () => {
  searchInput.value = '';
  results.innerHTML = '';
});
