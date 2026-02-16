// by following the coinlore pattern provided in class:
app.post("/get-weather", async function(req, res) { 
    // getting the 3 params
    const city = req.body.city;
    const unitType = req.body.units;
    const showWind = req.body.wind;

    // calling the weather api
    //  axios.get with multiple params just like the class demo
    try {
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: city,
                units: unitType,
                appid: "" 
            }
        });

        // returning subset of JSON:
        res.json({
            temp: response.data.main.temp,
            city: response.data.name,
            wind: showWind ? response.data.wind.speed : null
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});