import WeatherServices from '../services/WeatherServices.js';

class WeatherController {
    async getCity(req, res) {
        const { city } = req.query;

        try {
            const result = await WeatherServices.request(city);

            return res.status(200).json(result);
        } catch (e) {
            console.log('Weather request failed:', e);
            return res.status(e.status || 500).json({
                message: e.message || 'Internal server error',
            });
        }
    }
}

export default new WeatherController();
