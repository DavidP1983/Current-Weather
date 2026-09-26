import Router from 'express';
import WeatherController from '../controllers/WeatherController.js';

const router = new Router();

const { getCity } = WeatherController;

router.get('/weather', getCity);

export default router;
