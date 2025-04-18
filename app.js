const axios = require('axios');

const getTemperature = async () => {
const response = await axios.get('https://api.opensensemap.org/boxes/63a1acee2d4180001b120d46');
 const data = response.data;

const tempSensor = data.sensors.find(sensor => sensor.title === "Temperature");

if (!tempSensor) {
    console.error("Temperature sensor not found");
    return;
  }
const temperature = tempSensor?.lastMeasurement?.value;

  console.log("Current temperature is:", temperature);
};

getTemperature();