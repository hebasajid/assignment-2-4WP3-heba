document.getElementById('weatherForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const cityValue = document.getElementById('title').value;
    const unitValue = document.getElementById('units').value;
    const windValue = document.getElementById('windspeed').checked;

    const formData = {
        city: cityValue,
        units: unitValue,
        wind: windValue
    };

    const response = await fetch('/get-weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    const data = await response.json();

    displayWeather(data, unitValue);

    
});

function displayWeather(data, unitType) {
    const resultsDiv = document.getElementById('results');
    const symbol = unitType === 'celsius' ? '°C' : '°F';

    resultsDiv.innerHTML = `
        <div style="border: 1px solid #333; padding: 10px; border-radius: 8px;">
            <h2>Weather for ${data.city}</h2>
            <p><strong>Temperature:</strong> ${data.temp}${symbol}</p>
            ${data.wind !== null ? `<p><strong>Wind Speed:</strong> ${data.wind} m/s</p>` : ''}
        </div>
    `;
}