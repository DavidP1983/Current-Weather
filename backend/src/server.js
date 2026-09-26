import dotenv from 'dotenv';
import app from './app.js';
dotenv.config();

const PORT = process.env.PORT || 7000;

const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

server.on('error', (error) => {
    console.error('Server start failed:', error);
    process.exit(1);
});
