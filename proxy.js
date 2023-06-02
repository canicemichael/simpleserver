const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and account APIs.');
})

// Authorization
app.use('', (req, res, next) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.sendStatus(403);
    }
});

// Then we define the proxy endpoint. We want to proxy all requests starting 
// with /json_placeholder to the notorious JSONPlaceholder API (a simple 
// mock API which contains multiple endpoints supporting all HTTP methods). 
// We also define a pathRewrite so that /json_placeholder is omitted when 
// forwarded to the API:

// Proxy endpoints
app.use('/json_placeholder', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        ['^/json_placeholder']: '',
    },
}))

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});