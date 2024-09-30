const http = require('http');
const fs = require('fs/promises');

let port = 3013;

async function main() {
    const server = http.createServer(async (req, res) => {
        let url = req.url === '/' ? '/index.html' : req.url;
        if (url.startsWith("./")) url = url.slice(1);
        if (url.startsWith("/")) url = url.slice(1);
        try {
            let ext = url.split('.').pop();
            let contentType = '';
            switch (ext) {
                case 'html':
                    contentType = 'text/html';
                    break;
                case 'css':
                    contentType = 'text/css';
                    break;
                case 'js':
                    contentType = 'text/javascript';
                    break;
                case 'json':
                    contentType = 'application/json';
                    break;
                case 'png':
                    contentType = 'image/png';
                    break;
            }
            if (contentType) {
                res.writeHead(200, {
                    'Content-Type': contentType
                });
            }
            let data = await fs.readFile(`./${url}`);
            res.end(data);
        } catch {
            res.statusCode = 404;
            res.end('Not found');
        }
    });

    server.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });

    process.on('SIGINT', () => {
        console.log('Server is stopped');
        server.close();
    });
}

main();