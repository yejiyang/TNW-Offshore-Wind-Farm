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
            let data = await fs.readFile(`./${url}`);

            if (req.headers.range) {
                const parts = req.headers.range.replace(/bytes=/, "").split("-");
                let start;
                if (parts[0] !== "") {
                    start = parseInt(parts[0], 10);
                }
                let end;
                if (parts[1]) {
                    end = parseInt(parts[1], 10);
                    if (start === undefined) { // -end
                        start = data.length - end;
                        end = data.length - 1;
                    }
                }
                else {
                    // start-
                    end = data.length - 1;
                }
                if (end > data.length - 1) {
                    end = data.length - 1;
                }
                const chunksize = (end - start) + 1;
                res.setHeader('Content-Range', `bytes ${start}-${end}/${data.length}`);
                res.setHeader('Content-Length', chunksize);
                res.setHeader('Content-Type', contentType);
                res.writeHead(206);
                res.end(data.subarray(start, end + 1));
                return;
            }
            if (contentType) {
                res.writeHead(200, {
                    'Content-Type': contentType
                });
            }

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