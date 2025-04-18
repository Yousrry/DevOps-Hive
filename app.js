const axios = require('axios');
const express = require('express');

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
// setting the port as 3000 by default or as an environment variable 
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get('https://api.opensensemap.org/boxes/63a1acee2d4180001b120d46');
    const data = response.data;

    const tempSensor = data.sensors.find(sensor => sensor.title === "Temperature");
    if (!tempSensor) {
      console.error("Temperature sensor not found");
      return res.status(404).send("Temperature sensor not found");
    }


    const temperature = tempSensor?.lastMeasurement?.value;

    res.json({ temperature });
  }
  catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
}
);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// This code fetches data from the OpenSenseMap API and displays the current temperature on the webpage.
// It uses Express to create a server and Axios to make HTTP requests.
// The server listens on port 3000 or any port specified in the environment variables.
// The code handles errors gracefully and logs them to the console.
// The temperature sensor data is extracted from the API response and displayed on the webpage.
// The server serves static files from the "public" directory.
// The code is structured to be easily readable and maintainable.
// The use of async/await makes the code cleaner and easier to understand.