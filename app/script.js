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