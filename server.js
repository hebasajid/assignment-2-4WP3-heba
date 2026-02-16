//express
const express = require("express");
const app = express();
const axios = require("axios"); //rewuiring axios to make the api call

app.use(express.json());
app.use("/app", express.static("app"));



app.get("/app", (req, res) => {
  res.sendFile(__dirname + "/app/index.html");
});

// by following the coinlore pattern provided in class:

app.post("/get-weather", async function(req, res) { 
    // getting the 3 params
    const city = req.body.city;
    const unitType = req.body.units;
    const showWind = req.body.wind;
 
    let apiUnits = "metric";  //using metric nd imperial insted of fahrenheit and celsius due to 3rd party api requirements.

    if (unitType === "fahrenheit") { 
        apiUnits = "imperial";
    }

     console.log("City:", city);
     console.log("Units:", apiUnits);

    // calling the weather api
    //  axios.get with multiple params just like the class demo
    try {
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: city,
                units: apiUnits,
                appid: "1791d9ceac96c2391e4f7e84cf08e6de" 
            }
        });
    
        console.log("API successful");
        

        // returning subset of JSON:
        res.json({
            temp: response.data.main.temp,
            name: response.data.name,
            wind: showWind ? response.data.wind.speed : null
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
