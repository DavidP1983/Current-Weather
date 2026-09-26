import http from 'http';

const PORT = 5001;

export const startServer = () => {
    const server = http.createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
        });

        res.end('Telegram bot is running');
    });

    server.listen(PORT, '0.0.0.0', () => {
        console.log(`HTTP server is running on port ${PORT}`);
    });

    return server;
};
