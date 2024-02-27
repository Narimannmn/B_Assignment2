const axios = require('axios');
const apiKey = 'f0b917381c4240aaa45111118241701';

const getWeather = async (city) => {
    try {
        const link = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
        const response = await axios.get(link);
        const weatherData = {
            temperature: response.data.current.temp_c,
            condition: response.data.current.condition.text,
        };
        if (typeof weatherData.condition === 'undefined') {
            weatherData.condition = 'sunny';
        }
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        throw new Error('Error fetching weather data');
    }
};

module.exports = getWeather;
